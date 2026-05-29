<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0a66c2&height=100&section=header" />
</div>

<div align="center">

# 🚀 Vishal Attri Portfolio
### ☁️ Cloud Engineer (Aspirant) | 💻 Full Stack Developer

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=3000&pause=500&color=0a66c2&center=true&width=500&lines=Cloud+Engineer+in+the+making;Full+Stack+Developer;Building+scalable+systems;Always+learning+new+things!" />
</p>

[![GitHub followers](https://img.shields.io/github/followers/Attrivishal?style=for-the-badge&logo=github&color=0a66c2)](https://github.com/Attrivishal)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0a66c2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/vishalattri)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-ff6b6b?style=for-the-badge&logo=google-chrome)](http://13.222.120.250)

</div>

---

## 🏆 Production-Grade AWS DevOps & Deployment Architecture

This repository has been upgraded from a basic local MERN stack website into an **enterprise-ready, automated cloud architecture on AWS**. It serves as a comprehensive demonstration of production-level cloud engineering, containing complete **Infrastructure as Code (IaC)**, **containerization**, **automated CI/CD pipelines**, and a custom **auto-healing monitoring engine**.

---

## 🏗️ Cloud Deployment Topology

```text
                           [ USER ]
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
         [ CloudFront CDN ]    [ App Load Balancer ]
            (Global Edge)        (Public Subnets)
                    │                   │
                    ▼                   ▼
           [ Private S3 Bucket ]   [ EC2 Backend Host ]
             (Static Frontend)      (Private Subnets)
                                        │
                                        ▼
                               [ MongoDB Atlas ]
                                 (Data Tier)
```

---

## 🛠️ Tech Stack & DevOps Components

### ☁️ Cloud Infrastructure (AWS & IaC)
*   **Infrastructure as Code:** Deployed entirely via **Terraform** (`/infrastructure`) for 100% reproducible environments.
*   **Networking (VPC):** Multi-Availability-Zone VPC featuring isolated public subnets for edge gateways and private subnets for application workloads.
*   **Edge Tier (CloudFront CDN):** Low-latency asset delivery globally with automated HTTP-to-HTTPS redirection and secure **Origin Access Control (OAC)** integration.
*   **Load Balancing (ALB):** Custom Application Load Balancer implementing active backend endpoint health checking.
*   **Compute Tier (EC2):** Bootstrap-provisioned Linux micro-hosts running containerized workloads.

### 🐳 Containerization & Local Development
*   **Multi-Container Orchestration:** Standardized production Dockerfiles for frontend (`client/Dockerfile`) and backend (`server/Dockerfile`).
*   **Local Development:** Root `docker-compose.yml` bootstrapper that configures local hot-reloads, isolated container networks, and local MongoDB storage volumes with a single command:
    ```bash
    docker-compose up --build
    ```

### 🚀 Continuous Integration & Deployment (CI/CD)
*   **Frontend Workflow (`.github/workflows/frontend-deploy.yml`):** Compiles Vite React assets, pushes assets cleanly to S3, and fires a global CloudFront cache invalidation for immediate worldwide deployments.
*   **Backend Workflow (`.github/workflows/backend-deploy.yml`):** Automatically triggers on backend changes, builds and registers the backend image in AWS ECR, and executes secure container hotswapping on the EC2 server with zero downtime.

### 🩺 System Monitoring & Auto-Healing
*   **Automated Monitor Daemon (`/monitoring/infra-monitor.sh`):** A custom cron-executable system agent that measures disk space, RAM utilization, CPU limits, and service uptime.
*   **Zero-Downtime Auto-Healer:** If the backend container crashes or stops responding to HTTP `/api/health`, the script automatically triggers a safe restart of the container and sends an email notification with diagnosis data via AWS SNS.

---

## 🔒 Security Best Practices Implemented

1.  **Zero Private S3 Buckets Exposed:** The frontend S3 bucket blocks 100% of public reads. Global access is permitted exclusively via authenticated CloudFront distributions using **Origin Access Control (OAC)**.
2.  **Strict Security Group Boundaries:** The backend EC2 instance is completely closed to public API requests. It accepts port `5001` incoming calls **only** if they originate from the ALB.
3.  **Encrypted Secrets Management:** 100% of production keys, database credentials, and SMTP credentials are separated into environment variables and injected at runtime via GitHub Secrets, ensuring no private keys are committed.
4.  **Least-Privilege System Roles:** Custom IAM Roles govern the EC2 server, authorizing access strictly for publishing log data and checking health statuses.

---

## 📂 Repository Structure

```text
├── .github/workflows/
│   ├── frontend-deploy.yml   # Frontend build, S3 sync & CDN invalidation pipeline
│   └── backend-deploy.yml    # Backend Docker build, ECR push & SSH-less deployment
├── client/
│   ├── src/                  # React application files
│   ├── Dockerfile            # Frontend production multi-stage Docker configuration
│   └── nginx.conf            # Custom Nginx configuration enabling SPA URL routing
├── server/
│   ├── routes/               # Express backend API route endpoints
│   ├── Dockerfile            # Lightweight Node production container configuration
│   └── server.js             # Main server startup entry point
├── infrastructure/           # Infrastructure as Code (IaC) configuration
│   ├── main.tf               # Core provider and state setup
│   ├── vpc.tf                # VPC topology (Public/Private subnets, IGW)
│   ├── security_groups.tf    # Multi-tier firewall and network rules
│   ├── alb.tf                # Application Load Balancer and health check targets
│   ├── cloudfront.tf         # Edge distribution caching and origin controls
│   ├── s3.tf                 # S3 private bucket definitions
│   ├── iam.tf                # Secure instance profiles and server credentials
│   ├── ec2.tf                # Backend compute hosts with Docker bootstrapping
│   ├── variables.tf          # Configurable deployment settings
│   └── outputs.tf            # Deployment end-point values
├── monitoring/
│   └── infra-monitor.sh      # Shell-based system vitals check & auto-healing engine
├── docker-compose.yml        # Local multi-container development bootstrapper
└── README.md                 # Upgraded DevOps documentation
```

---

## 🚀 How to Launch the Stack

### 1. Local Orchestration (No AWS required)
Ensure you have Docker and Docker Compose installed.
```bash
# Clone the repository
git clone https://github.com/Attrivishal/PortFolio.git
cd PortFolio

# Run the local compose stack
docker-compose up --build
```
Open `http://localhost:3000` in your web browser. Nginx will automatically serve the React frontend and proxy all `/api` traffic seamlessly to the Node container.

### 2. AWS Production Deployment via IaC
Ensure you have the Terraform CLI installed and configured with your AWS credentials.
```bash
# Enter the infrastructure repository
cd infrastructure

# Initialize provider modules
terraform init

# Plan and preview AWS resources
terraform plan

# Deploy the entire stack automatically
terraform apply
```
Terraform will output your global CloudFront endpoint URL (e.g., `https://dxxxxx.cloudfront.net`). Open this URL in your web browser to access your live, production-grade portfolio!

---

## 💼 Recruiter Core Talking Points (Interview Ready)

When presenting this project to hiring managers or technical leads, use these high-impact talking points:

*   **"I built a production-grade cloud setup instead of just a standard portfolio app."** Explain that your code runs containerized behind a public Application Load Balancer, while the static React files are globally distributed via a CloudFront CDN with strict Origin Access Control (OAC) to secure the private S3 bucket.
*   **"Everything is version-controlled via Infrastructure as Code."** Highlight that you wrote complete Terraform code for the VPC, public subnets, secure routing, ALB, S3, CloudFront, and EC2, meaning you can destroy and rebuild your entire cloud infrastructure in under 5 minutes with a single command.
*   **"I implemented true automated CI/CD pipelines."** Discuss how you configured two separated workflows using GitHub Actions: the frontend pipeline compiles, syncs to S3, and invalidates CloudFront caches; the backend pipeline compiles a Docker container, registers it in AWS ECR, and ssh-deploys it on EC2 with zero downtime.
*   **"I created an automated auto-healing monitor daemon."** Explain that you wrote a custom monitoring agent in Bash that runs via cron on the EC2 host. If it detects a system resource alert or a crash in the backend container, it executes an automated recovery reboot and sends an diagnostic email via AWS SNS.

---

## 🤝 Connect with Me

*   **LinkedIn:** [Vishal Attri](https://linkedin.com/in/vishalattri)
*   **GitHub:** [@Attrivishal](https://github.com/Attrivishal)

---

## 📝 License

This project is licensed under the MIT License - see the [SECURITY.md](SECURITY.md) file for details.
