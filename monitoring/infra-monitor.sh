#!/bin/bash

# ==============================================================================
# AWS INFRASTRUCTURE MONITOR & AUTO-HEALER
# ==============================================================================
# This script monitors system vitals (CPU, Memory, Disk) and backend container health.
# If the backend is down, it executes an auto-healing reboot and alerts the admin.
# ==============================================================================


# Configurations
SNS_TOPIC_ARN=""  # ADD YOUR AWS SNS TOPIC ARN HERE (e.g. "arn:aws:sns:us-east-1:123456789012:portfolio-alerts")
AWS_REGION="us-east-1"


# Thresholds (%)
CPU_THRESHOLD=80
MEM_THRESHOLD=85
DISK_THRESHOLD=80

# Paths & Log Files
LOG_FILE="/var/log/infra-monitor.log"
if [ ! -w "$LOG_FILE" ]; then
    # Fallback to local user home directory if root log path is unwritable
    LOG_FILE="$HOME/infra-monitor.log"
fi

# Log helper function
log_message() {
    local LEVEL="$1"
    local MSG="$2"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$LEVEL] $MSG" | tee -a "$LOG_FILE"
}

# Alert helper function
send_alert() {
    local LEVEL="$1"
    local SUBJECT="$2"
    local MSG="$3"

    log_message "ALERT" "Sending SNS notification: $SUBJECT"

    # Verify if SNS Topic is configured
    if [ -z "$SNS_TOPIC_ARN" ]; then
        log_message "WARNING" "SNS ARN is not set. Alert skipped."
        return
    fi

    # Build full message body
    local FULL_MESSAGE="
========================================
AWS INFRASTRUCTURE MONITOR & AUTO-HEALER
========================================
Level: $LEVEL
Time: $(date '+%Y-%m-%d %H:%M:%S')
Host: $(hostname)
System IP: $(curl -s https://ifconfig.me || echo "Unknown")

Alert Details:
$MSG
========================================
"

    # Publish to AWS SNS
    aws sns publish \
        --region "$AWS_REGION" \
        --topic-arn "$SNS_TOPIC_ARN" \
        --subject "[$LEVEL] $SUBJECT" \
        --message "$FULL_MESSAGE" 2>&1 | tee -a "$LOG_FILE"
}

log_message "INFO" "==================== MONITOR START ===================="

# ------------------------------------------------------------------------------
# 1. System Resource Checks
# ------------------------------------------------------------------------------

# Check Disk Usage (Root Partition)
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt "$DISK_THRESHOLD" ]; then
    log_message "WARNING" "Disk usage is CRITICAL at $DISK_USAGE%"
    send_alert "WARNING" "System Disk Warning" "Disk usage on the root partition has reached $DISK_USAGE% (Threshold: $DISK_THRESHOLD%). Clean old Docker logs or unused images."
else
    log_message "INFO" "Disk usage: $DISK_USAGE% (OK)"
fi

# Check CPU Usage
# Calculates CPU idle percentage and subtracts from 100
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')
CPU_INT=${CPU_USAGE%.*} # Convert to integer
if [ "$CPU_INT" -gt "$CPU_THRESHOLD" ]; then
    log_message "WARNING" "CPU usage is CRITICAL at $CPU_USAGE%"
    send_alert "WARNING" "System CPU Warning" "CPU utilization has reached $CPU_USAGE% (Threshold: $CPU_THRESHOLD%). Check top consuming processes."
else
    log_message "INFO" "CPU usage: $CPU_USAGE% (OK)"
fi

# Check Memory Usage
MEM_USAGE=$(free | grep Mem | awk '{print $3/$2 * 100.0}')
MEM_INT=${MEM_USAGE%.*} # Convert to integer
if [ "$MEM_INT" -gt "$MEM_THRESHOLD" ]; then
    log_message "WARNING" "Memory usage is CRITICAL at $MEM_USAGE%"
    send_alert "WARNING" "System Memory Warning" "RAM utilization is at $MEM_USAGE% (Threshold: $MEM_THRESHOLD%)."
else
    log_message "INFO" "Memory usage: $MEM_INT% (OK)"
fi


# ------------------------------------------------------------------------------
# 2. Service & Container Health (Auto-Healing Engine)
# ------------------------------------------------------------------------------

CONTAINER_NAME="portfolio-backend"

# Step 2a: Check if container is running
CONTAINER_STATUS=$(docker ps -a --filter "name=$CONTAINER_NAME" --format '{{.State}}')

if [ -z "$CONTAINER_STATUS" ]; then
    log_message "ERROR" "Container $CONTAINER_NAME does not exist!"
    send_alert "CRITICAL" "Service Missing Alert" "The backend container '$CONTAINER_NAME' is completely missing from the EC2 instance. Manual intervention is required."
elif [ "$CONTAINER_STATUS" != "running" ]; then
    log_message "ERROR" "Container $CONTAINER_NAME is DOWN (Current Status: $CONTAINER_STATUS). Triggering Auto-Healer..."
    
    # Attempting Auto-Healing Boot
    if docker restart "$CONTAINER_NAME" >/dev/null 2>&1; then
        log_message "INFO" "AUTO-HEAL SUCCESS: Container $CONTAINER_NAME was restarted successfully."
        send_alert "INFO" "Service Auto-Healed" "The container '$CONTAINER_NAME' was down (Status: $CONTAINER_STATUS) but was successfully restarted by the automated monitor script. Health check verification is running."
    else
        log_message "CRITICAL" "AUTO-HEAL FAILED: Could not restart container $CONTAINER_NAME!"
        send_alert "CRITICAL" "Auto-Heal Critical Failure" "The backend container was detected as down and the automated reboot script failed to start it. Manual troubleshooting is required immediately."
    fi
else
    # Container is running, let's verify if the endpoint responds to health check
    log_message "INFO" "Container is running. Verifying HTTP Health Check..."
    
    HEALTH_CHECK_URL="http://localhost:5001/api/health"
    HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$HEALTH_CHECK_URL")

    if [ "$HTTP_RESPONSE" -eq 200 ]; then
        log_message "INFO" "Health check passed: /api/health returned 200 (OK)"
    else
        log_message "ERROR" "Health check FAILED! Response code: $HTTP_RESPONSE. App is unresponsive. Restarting..."
        
        # Unresponsive Container Auto-Healing Swap
        if docker restart "$CONTAINER_NAME" >/dev/null 2>&1; then
            log_message "INFO" "AUTO-HEAL SUCCESS: Unresponsive container $CONTAINER_NAME restarted."
            send_alert "INFO" "Service Auto-Healed (Unresponsive)" "The container '$CONTAINER_NAME' was running but unresponsive (API health check returned code $HTTP_RESPONSE). It was successfully restarted."
        else
            log_message "CRITICAL" "AUTO-HEAL FAILED: Could not reboot unresponsive container $CONTAINER_NAME!"
            send_alert "CRITICAL" "Auto-Heal Swap Failure" "The backend container was unresponsive (HTTP $HTTP_RESPONSE) and automated restart attempts failed."
        fi
    fi
fi

log_message "INFO" "==================== MONITOR COMPLETE ===================="
