import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LOGS = [
  "Initializing cloud environment...",
  "Connecting to AWS regions: us-east-1, node-01",
  "Checking S3 bucket permissions... SUCCESS",
  "Scaling EC2 instances: +2 containers",
  "Monitoring CloudWatch metrics... OK",
  "Updating Lambda function: 'processImages'...",
  "Deploying Docker container: v2.4.0",
  "Configuring NGINX reverse proxy...",
  "Establishing Secure Shell (SSH) handshake...",
  "Optimizing database indexing for MongoDB atlas...",
  "Route53 DNS propagation: 98% complete",
  "Analyzing serverless execution logs...",
  "Backup redundancy check: OK",
  "Patching security vulnerabilities... COMPLETED",
];

export default function SystemConsole() {
  const [activeLogs, setActiveLogs] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setActiveLogs((prev) => {
        const nextLogs = [...prev, LOGS[index % LOGS.length]];
        if (nextLogs.length > 8) nextLogs.shift();
        return nextLogs;
      });
      index++;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="glass-card noise-filter" 
      style={{ 
        padding: "1.5rem", 
        fontFamily: "JetBrains Mono, monospace", 
        fontSize: "0.85rem",
        minHeight: "260px",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        border: "1px solid rgba(139, 92, 246, 0.2)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", borderBottom: "1px solid rgba(139, 92, 246, 0.1)", paddingBottom: "0.5rem" }}>
        <span style={{ color: "var(--purple-400)", fontWeight: "600" }}>LIVE_SYSTEM_TELEMETRY</span>
        <span style={{ color: "#64748B", fontSize: "0.7rem" }}>v4.0.2</span>
      </div>

      <div ref={containerRef} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {activeLogs.map((log, i) => (
          <motion.div
            key={`${log}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ color: log.includes("SUCCESS") || log.includes("OK") ? "#10B981" : "#94A3B8" }}
          >
            <span style={{ color: "var(--purple-500)", marginRight: "8px" }}>$</span>
            {log}
          </motion.div>
        ))}
      </div>

      {/* Decorative Scanline */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
        backgroundSize: "100% 2px, 3px 100%",
        pointerEvents: "none",
        opacity: 0.1
      }} />
    </div>
  );
}
