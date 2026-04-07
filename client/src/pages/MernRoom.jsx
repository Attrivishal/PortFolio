import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import SectionReveal from "../components/SectionReveal";
import SkillCard from "../components/SkillCard";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import RoomEntry from "../components/RoomEntry";
import Magnetic from "../components/Magnetic";
import ParticleBackground from "../components/ParticleBackground";

const PHOTO = "/images/vishal-photo.jpg";

const skills = [
  { name: "JavaScript", percent: 92 },
  { name: "React.js", percent: 90 },
  { name: "Tailwind CSS", percent: 90 },
  { name: "MongoDB", percent: 88 },
  { name: "REST APIs", percent: 88 },
  { name: "Node.js", percent: 85 },
  { name: "Git", percent: 85 },
  { name: "Express.js", percent: 83 },
  { name: "JWT Auth", percent: 80 },
];

const certifications = [
  {
    name: "Meta Front-End Developer",
    issuer: "Coursera / Meta",
    year: "2024",
    color: "cyan",
  },
  {
    name: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    year: "2023",
    color: "purple",
  },
  {
    name: "React - The Complete Guide",
    issuer: "Udemy",
    year: "2024",
    color: "pink",
  },
];

export default function MernRoom() {
  const [showRoomEntry, setShowRoomEntry] = useState(true);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Floating code particles
  const codeParticles = [
    "{ }",
    "< />",
    "</>",
    "() =>",
    "{}",
    "import",
    "from",
    "const",
    "=>",
    "useState",
    "useEffect",
    "return",
    "props",
  ];

  return (
    <>
      {showRoomEntry && (
        <RoomEntry type="mern" onComplete={() => setShowRoomEntry(false)} />
      )}

      {/* ─── ENHANCED HERO SECTION ──────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: 100,
          paddingBottom: 60,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <ParticleBackground />
        {/* Animated Background Orbs */}
        <motion.div
          className="orb orb-cyan"
          style={{
            width: 600,
            height: 600,
            top: -150,
            right: -200,
            opacity: 0.4,
            y: heroY,
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="orb orb-purple"
          style={{
            width: 400,
            height: 400,
            bottom: -100,
            left: -100,
            opacity: 0.3,
            y: heroY,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating Code Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              fontSize: Math.random() * 20 + 12,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
              fontFamily: "JetBrains Mono, monospace",
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          >
            {codeParticles[i % codeParticles.length]}
          </motion.div>
        ))}

        <motion.div
          className="container"
          style={{ position: "relative", zIndex: 2, opacity: heroOpacity }}
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "2.5rem",
                fontSize: "0.85rem",
                color: "#64748B",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              <span>Home</span>
              <span style={{ color: "#22D3EE" }}>/</span>
              <motion.span
                style={{ color: "#22D3EE" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                MERN Room
              </motion.span>
            </div>
          </motion.div>

          {/* Hero Grid - Responsive with Photo Below on Mobile */}
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {/* Left - Text Content (Desktop: Left, Mobile: Below) */}
            <div className="hero-text">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <motion.div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1.25rem",
                      background: "rgba(6,182,212,0.1)",
                      border: "1px solid rgba(6,182,212,0.3)",
                      borderRadius: 999,
                      fontSize: "0.85rem",
                      color: "#22D3EE",
                      marginBottom: "2rem",
                      fontFamily: "JetBrains Mono, monospace",
                      backdropFilter: "blur(10px)",
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(6,182,212,0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.span
                      animate={{
                        y: [-2, 2, -2],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ⚡
                    </motion.span>
                    MERN Stack Room
                  </motion.div>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    marginBottom: "1rem",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.1,
                    fontWeight: 800,
                  }}
                >
                  <motion.span
                    className="gradient-text-cyan"
                    style={{ display: "inline-block" }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    MERN Stack
                  </motion.span>
                  <br />
                  <motion.span
                    style={{ color: "#F8FAFC", display: "inline-block" }}
                    whileHover={{ scale: 1.05, color: "#22D3EE" }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    Developer
                  </motion.span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#22D3EE",
                    marginBottom: "1.5rem",
                    fontSize: "1rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                >
                  React.js • Node.js • Express.js • MongoDB
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  style={{
                    color: "#94A3B8",
                    lineHeight: 1.8,
                    marginBottom: "2.5rem",
                    fontSize: "1.1rem",
                  }}
                >
                  I specialize in building end-to-end web applications — from
                  pixel-perfect UIs in React to scalable RESTful APIs in Node.js,
                  backed by MongoDB and secured with JWT.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}
                >
                  <Magnetic>
                    <motion.a
                      href="/MERN-Resume.pdf"
                      download
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <motion.span
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        }}
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                      <span style={{ position: "relative", zIndex: 1 }}>
                        ⬇ Download Resume
                      </span>
                    </motion.a>
                  </Magnetic>

                  <Magnetic>
                    <motion.a
                      href="https://github.com/Attrivishal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{
                        borderColor: "rgba(6,182,212,0.5)",
                        color: "#22D3EE",
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -3,
                        borderColor: "rgba(6,182,212,1)",
                        boxShadow: "0 10px 30px rgba(6,182,212,0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      View GitHub
                    </motion.a>
                  </Magnetic>
                </motion.div>
              </motion.div>
            </div>

            {/* Right - Photo (Desktop: Right, Mobile: Top) */}
            <motion.div
              className="hero-photo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ position: "relative", width: 320, height: 320 }}>
                {/* Animated blob ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: -12,
                    borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%",
                    background:
                      "linear-gradient(135deg, rgba(6,182,212,0.3), rgba(139,92,246,0.3))",
                    animation: "morphBlob 8s ease-in-out infinite",
                    filter: "blur(2px)",
                  }}
                />

                {/* Photo container */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%",
                    overflow: "hidden",
                    background: PHOTO
                      ? "transparent"
                      : "linear-gradient(135deg, #0F172A, #1e293b)",
                    border: "2px solid rgba(6,182,212,0.3)",
                    animation: "morphBlob 8s ease-in-out infinite",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "6rem",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {PHOTO ? (
                    <img
                      src={PHOTO}
                      alt="Vishal Attri"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span>👨‍💻</span>
                  )}
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    position: "absolute",
                    top: -10,
                    right: -20,
                    background: "rgba(6,182,212,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(6,182,212,0.3)",
                    borderRadius: 12,
                    padding: "0.5rem 0.75rem",
                    fontSize: "0.8rem",
                    color: "#22D3EE",
                    fontFamily: "JetBrains Mono, monospace",
                    whiteSpace: "nowrap",
                  }}
                >
                  ⚡ React.js
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: -30,
                    background: "rgba(139,92,246,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(139,92,246,0.3)",
                    borderRadius: 12,
                    padding: "0.5rem 0.75rem",
                    fontSize: "0.8rem",
                    color: "#A78BFA",
                    fontFamily: "JetBrains Mono, monospace",
                    whiteSpace: "nowrap",
                  }}
                >
                  🗄️ MongoDB
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  style={{
                    position: "absolute",
                    bottom: -5,
                    right: -10,
                    background: "rgba(236,72,153,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(236,72,153,0.3)",
                    borderRadius: 12,
                    padding: "0.5rem 0.75rem",
                    fontSize: "0.8rem",
                    color: "#F472B6",
                    fontFamily: "JetBrains Mono, monospace",
                    whiteSpace: "nowrap",
                  }}
                >
                  🟢 Node.js
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── ENHANCED ABOUT SECTION ──────────────────────────────────────── */}
      <section
        className="section"
        style={{
          position: "relative",
          zIndex: 2,
          background: "rgba(6,182,212,0.02)",
        }}
      >
        <div
          className="orb orb-cyan"
          style={{
            width: 300,
            height: 300,
            top: "20%",
            left: "-100px",
            opacity: 0.15,
          }}
        />

        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionReveal>
            <motion.p
              style={{
                color: "#22D3EE",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.9rem",
                marginBottom: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
              whileHover={{ letterSpacing: "0.2em" }}
              transition={{ duration: 0.3 }}
            >
              // My Journey
            </motion.p>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
              About My MERN Path
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <motion.div
              className="glass-card"
              style={{
                padding: "3rem",
                borderColor: "rgba(6,182,212,0.3)",
                position: "relative",
                overflow: "hidden",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(6,182,212,0.2)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(6,182,212,0.05), transparent)",
                  opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <p
                  style={{
                    color: "#94A3B8",
                    lineHeight: 1.9,
                    fontSize: "1.05rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  My journey into MERN stack development started with a
                  curiosity about how websites work under the hood. What began
                  as simple HTML pages evolved into building full-stack
                  applications with sophisticated architectures.
                </p>

                <p
                  style={{
                    color: "#94A3B8",
                    lineHeight: 1.9,
                    fontSize: "1.05rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  I started with{" "}
                  <strong style={{ color: "#22D3EE", fontWeight: 600 }}>
                    React.js
                  </strong>
                  , building component-based UIs. This led me to explore the
                  backend with{" "}
                  <strong style={{ color: "#22D3EE", fontWeight: 600 }}>
                    Node.js and Express.js
                  </strong>
                  , and then to data persistence with{" "}
                  <strong style={{ color: "#22D3EE", fontWeight: 600 }}>
                    MongoDB
                  </strong>
                  . Today I build complete full-stack applications — from
                  databases to production deployments.
                </p>

                <p
                  style={{
                    color: "#94A3B8",
                    lineHeight: 1.9,
                    fontSize: "1.05rem",
                  }}
                >
                  My strongest project,{" "}
                  <strong style={{ color: "#F8FAFC", fontWeight: 600 }}>
                    PipelineIQ
                  </strong>
                  , is a production-grade Sales CRM demonstrating real-time
                  features with Socket.io, role-based access control, and
                  complex data visualization.
                </p>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── ENHANCED PROJECT SECTION ──────────────────────────────────────── */}
      <section className="section" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="orb orb-purple"
          style={{
            width: 400,
            height: 400,
            bottom: "10%",
            right: "-150px",
            opacity: 0.2,
          }}
        />

        <div className="container">
          <SectionReveal>
            <motion.p
              style={{
                color: "#22D3EE",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.9rem",
                marginBottom: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
              whileHover={{ letterSpacing: "0.2em" }}
              transition={{ duration: 0.3 }}
            >
              // Featured Project
            </motion.p>
            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
              PipelineIQ
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "3rem" }}>
              Sales Management CRM
            </p>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.1}
              whileDrag={{ scale: 1.02, zIndex: 10, cursor: "grabbing" }}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 24,
                background: "rgba(17,24,39,0.8)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(6,182,212,0.2)",
                padding: "3rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                cursor: "grab",
              }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 30px 60px rgba(6,182,212,0.2)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Top Gradient Bar */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background:
                    "linear-gradient(90deg, #06B6D4, #8B5CF6, #EC4899)",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "3rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Project Info */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <motion.div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 16,
                        background: "rgba(6,182,212,0.15)",
                        border: "1px solid rgba(6,182,212,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 360,
                      }}
                      transition={{
                        rotate: { duration: 0.6 },
                        scale: { type: "spring", stiffness: 300 },
                      }}
                    >
                      📊
                    </motion.div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "1.4rem",
                          marginBottom: "0.25rem",
                          letterSpacing: "-0.01em",
                          fontWeight: 700,
                        }}
                      >
                        PipelineIQ
                      </h3>
                      <p
                        style={{
                          color: "#64748B",
                          fontSize: "0.85rem",
                          fontFamily: "JetBrains Mono, monospace",
                          fontWeight: 500,
                        }}
                      >
                        Full-Stack CRM Application
                      </p>
                    </div>
                  </div>

                  <p
                    style={{
                      color: "#94A3B8",
                      lineHeight: 1.8,
                      fontSize: "1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    Full-stack CRM with lead tracking, pipeline visualization,
                    team collaboration, and real-time analytics. Features JWT
                    authentication, role-based access control, and interactive
                    dashboards.
                  </p>

                  <div
                    style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                  >
                    <motion.a
                      href="https://github.com/Attrivishal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ fontSize: "0.9rem", padding: "0.75rem 1.5rem" }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View on GitHub
                    </motion.a>
                    <motion.a
                      href="http://pipelineiq-bucket.s3-website-us-east-1.amazonaws.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{
                        fontSize: "0.9rem",
                        padding: "0.75rem 1.5rem",
                        borderColor: "rgba(6,182,212,0.5)",
                        color: "#22D3EE",
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -3,
                        borderColor: "rgba(6,182,212,1)",
                        boxShadow: "0 10px 30px rgba(6,182,212,0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </motion.a>
                  </div>
                </div>

                {/* Features & Tech Stack */}
                <div>
                  <h4
                    style={{
                      color: "#94A3B8",
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      marginBottom: "1.25rem",
                      fontWeight: 700,
                    }}
                  >
                    Key Features
                  </h4>

                  {[
                    "Lead tracking & pipeline board",
                    "Real-time updates with Socket.io",
                    "JWT + Role-based access control",
                    "Interactive analytics dashboard",
                    "Team collaboration tools",
                    "RESTful API architecture",
                  ].map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "0.75rem",
                        color: "#94A3B8",
                        fontSize: "0.95rem",
                      }}
                    >
                      <motion.span
                        style={{
                          color: "#22D3EE",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                        }}
                        whileHover={{ scale: 1.3 }}
                      >
                        ✓
                      </motion.span>
                      {feature}
                    </motion.div>
                  ))}

                  <div className="divider" style={{ margin: "1.5rem 0" }} />

                  <h4
                    style={{
                      color: "#94A3B8",
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      marginBottom: "1rem",
                      fontWeight: 700,
                    }}
                  >
                    Tech Stack
                  </h4>

                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}
                  >
                    {[
                      "React.js",
                      "Node.js",
                      "Express.js",
                      "MongoDB",
                      "JWT",
                      "Tailwind CSS",
                      "Socket.io",
                    ].map((tech, i) => (
                      <motion.span
                        key={tech}
                        className="tag"
                        style={{ fontSize: "0.8rem" }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{
                          scale: 1.15,
                          backgroundColor: "rgba(6,182,212,0.3)",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── ENHANCED SKILLS SECTION ──────────────────────────────────────── */}
      <section
        className="section"
        style={{
          position: "relative",
          zIndex: 2,
          background: "rgba(6,182,212,0.02)",
        }}
      >
        <div className="container">
          <SectionReveal>
            <motion.p
              style={{
                color: "#22D3EE",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.9rem",
                marginBottom: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
              whileHover={{ letterSpacing: "0.2em" }}
              transition={{ duration: 0.3 }}
            >
              // Technical Skills
            </motion.p>
            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
              MERN Expertise
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "3rem" }}>
              Skills gained through building real projects
            </p>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '1rem 0'
            }}>
              {skills.map((skill, i) => (
                <SkillCard 
                  key={skill.name} 
                  {...skill} 
                  delay={i * 0.1}
                  color={i % 2 === 0 ? 'cyan' : 'purple'}
                />
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── ENHANCED CERTIFICATIONS ──────────────────────────────────────── */}
      <section className="section" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="orb orb-cyan"
          style={{
            width: 500,
            height: 500,
            top: "15%",
            left: "-200px",
            opacity: 0.15,
          }}
        />

        <div className="container">
          <SectionReveal>
            <motion.p
              style={{
                color: "#22D3EE",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.9rem",
                marginBottom: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
              whileHover={{ letterSpacing: "0.2em" }}
              transition={{ duration: 0.3 }}
            >
              // Credentials
            </motion.p>
            <h2 className="section-title" style={{ marginBottom: "3rem" }}>
              Certifications
            </h2>
          </SectionReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.75rem",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {certifications.map((cert, i) => (
              <SectionReveal key={cert.name} delay={i * 0.12}>
                <motion.div
                  className="glass-card"
                  style={{
                    padding: "2rem",
                    position: "relative",
                    overflow: "hidden",
                    borderColor: "rgba(6,182,212,0.3)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 25px 50px rgba(6,182,212,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Top Gradient Bar */}
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background:
                        cert.color === "purple"
                          ? "var(--gradient-purple)"
                          : cert.color === "pink"
                            ? "var(--gradient-pink)"
                            : "var(--gradient-cyan)",
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                  />

                  <motion.div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(135deg, ${
                        cert.color === "purple"
                          ? "rgba(139,92,246,0.1)"
                          : cert.color === "pink"
                            ? "rgba(244,114,182,0.1)"
                            : "rgba(6,182,212,0.1)"
                      }, transparent)`,
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <motion.div
                      style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      🏆
                    </motion.div>

                    <h4
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem",
                        lineHeight: 1.4,
                        color: "#F8FAFC",
                      }}
                    >
                      {cert.name}
                    </h4>

                    <p
                      style={{
                        color: "#64748B",
                        fontSize: "0.9rem",
                        marginBottom: "0.75rem",
                        fontWeight: 500,
                      }}
                    >
                      {cert.issuer}
                    </p>

                    <motion.p
                      style={{
                        color:
                          cert.color === "purple"
                            ? "#A78BFA"
                            : cert.color === "pink"
                              ? "#F472B6"
                              : "#22D3EE",
                        fontSize: "0.8rem",
                        fontFamily: "JetBrains Mono, monospace",
                        fontWeight: 600,
                        display: "inline-block",
                        padding: "0.35rem 0.9rem",
                        background:
                          cert.color === "purple"
                            ? "rgba(139,92,246,0.15)"
                            : cert.color === "pink"
                              ? "rgba(244,114,182,0.15)"
                              : "rgba(6,182,212,0.15)",
                        borderRadius: 999,
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {cert.year}
                    </motion.p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENHANCED CONTACT SECTION ──────────────────────────────────────── */}
      <section className="section" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="orb orb-purple"
          style={{
            width: 400,
            height: 400,
            bottom: "-150px",
            right: "-150px",
            opacity: 0.2,
          }}
        />

        <div className="container" style={{ maxWidth: 800, margin: "0 auto" }}>
          <SectionReveal>
            <motion.p
              style={{
                color: "#22D3EE",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.9rem",
                marginBottom: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
              whileHover={{ letterSpacing: "0.2em" }}
              transition={{ duration: 0.3 }}
            >
              // Hire a MERN Dev
            </motion.p>
            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
              Let's Build Together
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "3rem" }}>
              Need a full-stack React/Node developer? Let's talk.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <motion.div
              className="glass-card"
              style={{
                padding: "3rem",
                borderColor: "rgba(6,182,212,0.3)",
              }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 25px 50px rgba(6,182,212,0.2)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ContactForm defaultRole="mern" />
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes morphBlob {
          0%, 100% { border-radius: 60% 40% 70% 30% / 40% 60% 30% 70%; }
          25% { border-radius: 40% 60% 30% 70% / 60% 40% 70% 30%; }
          50% { border-radius: 70% 30% 50% 50% / 30% 70% 50% 50%; }
          75% { border-radius: 30% 70% 60% 40% / 70% 30% 40% 60%; }
        }
        
        /* Desktop: Photo on Right */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        
        /* Mobile: Photo on Top, Text Below */
        @media (max-width: 768px) {
          .hero-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .hero-photo {
            order: -1 !important;
            margin-bottom: 2rem;
          }
          .hero-text {
            order: 2 !important;
          }
        }
      `}</style>
    </>
  );
}