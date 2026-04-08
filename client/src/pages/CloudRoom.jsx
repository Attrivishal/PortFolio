import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import SectionReveal from '../components/SectionReveal'
import SkillCard from '../components/SkillCard'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import RoomEntry from '../components/RoomEntry'
import Magnetic from '../components/Magnetic'
import ParticleBackground from '../components/ParticleBackground'
import SystemConsole from '../components/SystemConsole'

const PHOTO = "/images/vishal-photo.jpg"

const skills = [
  { name: 'Postman (API Testing)', percent: 85 },
  { name: 'Git & Version Control', percent: 85 },
  { name: 'AWS (EC2, S3, Lambda)', percent: 80 },
  { name: 'Linux Administration', percent: 78 },
  { name: 'CloudFormation (IaC)', percent: 70 },
  { name: 'Bash Scripting', percent: 70 },
  { name: 'Docker', percent: 65 },
  { name: 'GitHub Actions (CI/CD)', percent: 75 },
]

const awsServices = [
  { name: 'EC2', icon: '🖥️', desc: 'Virtual servers in the cloud' },
  { name: 'S3', icon: '🗄️', desc: 'Object storage service' },
  { name: 'Lambda', icon: 'λ', desc: 'Serverless compute' },
  { name: 'CloudWatch', icon: '📊', desc: 'Monitoring & observability' },
  { name: 'CloudFormation', icon: '🏗️', desc: 'Infrastructure as Code' },
  { name: 'IAM', icon: '🔑', desc: 'Identity & access management' },
  { name: 'VPC', icon: '🌐', desc: 'Virtual private cloud' },
  { name: 'RDS', icon: '🗃️', desc: 'Managed relational DB' },
]

const certifications = [
  { name: 'AWS Cloud Practitioner Essentials', issuer: 'Amazon Web Services', year: '2024', color: 'purple' },
  { name: 'Linux Fundamentals', issuer: 'Linux Foundation', year: '2023', color: 'cyan' },
  { name: 'Docker for Beginners', issuer: 'KodeKloud', year: '2024', color: 'pink' },
]

export default function CloudRoom() {
  const [showRoomEntry, setShowRoomEntry] = useState(true)
  const heroRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <>
      {showRoomEntry && (
        <RoomEntry type="cloud" onComplete={() => setShowRoomEntry(false)} />
      )}

      {/* ─── ENHANCED HERO SECTION ──────────────────────────────────────────── */}
      <section 
        ref={heroRef}
        style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          paddingTop: 100, 
          paddingBottom: 60, 
          position: 'relative', 
          overflow: 'hidden' 
        }}
      >
        <ParticleBackground />
        {/* Animated Background Orbs */}
        <motion.div 
          className="orb orb-purple" 
          style={{ 
            width: 600, 
            height: 600, 
            top: -150, 
            right: -200, 
            opacity: 0.4,
            y: heroY
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="orb orb-cyan" 
          style={{ 
            width: 400, 
            height: 400, 
            bottom: -100, 
            left: -100, 
            opacity: 0.3,
            y: heroY
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Cloud Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              fontSize: Math.random() * 20 + 15,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            ☁️
          </motion.div>
        ))}

        <motion.div 
          className="container" 
          style={{ position: 'relative', zIndex: 2, opacity: heroOpacity }}
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '2.5rem', 
              fontSize: '0.85rem', 
              color: '#64748B', 
              fontFamily: 'JetBrains Mono, monospace' 
            }}>
              <span>Home</span><span style={{ color: '#A78BFA' }}>/</span>
              <motion.span 
                style={{ color: '#A78BFA' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Cloud Room
              </motion.span>
            </div>
          </motion.div>

          {/* Hero Grid - Responsive with Photo on Right Desktop, Top Mobile */}
          <div 
            className="cloud-hero-grid"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '5rem', 
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            {/* Left - Text Content */}
            <div className="cloud-hero-text">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <motion.div 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      padding: '0.5rem 1.25rem', 
                      background: 'rgba(139,92,246,0.1)', 
                      border: '1px solid rgba(139,92,246,0.3)', 
                      borderRadius: 999, 
                      fontSize: '0.85rem', 
                      color: '#A78BFA', 
                      marginBottom: '2rem', 
                      fontFamily: 'JetBrains Mono, monospace',
                      backdropFilter: 'blur(10px)'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 30px rgba(139,92,246,0.3)'
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.span
                      animate={{ 
                        y: [-2, 2, -2],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🌩️
                    </motion.span>
                    Cloud Engineering Room
                  </motion.div>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  style={{ 
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                    marginBottom: '1rem', 
                    letterSpacing: '-0.04em',
                    lineHeight: 1.1,
                    fontWeight: 800
                  }}
                >
                  <motion.span 
                    className="gradient-text-purple"
                    style={{ display: 'inline-block' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    Cloud
                  </motion.span>
                  <br />
                  <motion.span 
                    style={{ color: '#F8FAFC', display: 'inline-block' }}
                    whileHover={{ scale: 1.05, color: '#A78BFA' }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    Engineer
                  </motion.span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  style={{ 
                    fontFamily: 'JetBrains Mono, monospace', 
                    color: '#A78BFA', 
                    marginBottom: '1.5rem', 
                    fontSize: '1rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em'
                  }}
                >
                  AWS • Linux • Postman • 
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  style={{ 
                    color: '#94A3B8', 
                    lineHeight: 1.8, 
                    marginBottom: '2.5rem', 
                    fontSize: '1.1rem'
                  }}
                >
                  I design and manage cloud infrastructure on AWS, automating deployments with GitHub Actions, 
                  writing Infrastructure-as-Code with CloudFormation, and optimizing resource utilization for cost efficiency.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}
                >
                  <Magnetic>
                    <motion.a 
                      href="/Cloud-Resume.pdf" 
                      download 
                      className="btn btn-secondary"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <motion.span
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        }}
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      />
                      <span style={{ position: 'relative', zIndex: 1 }}>⬇ Download Resume</span>
                    </motion.a>
                  </Magnetic>

                  <Magnetic>
                    <motion.a 
                      href="https://github.com/Attrivishal" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-outline" 
                      style={{ borderColor: 'rgba(139,92,246,0.5)', color: '#A78BFA' }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -3,
                        borderColor: 'rgba(139,92,246,1)',
                        boxShadow: '0 10px 30px rgba(139,92,246,0.3)'
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

            {/* Right: Console & Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <SystemConsole />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {[
                  { label: 'Uptime', value: '99.99%', icon: '📈' },
                  { label: 'Region', value: 'Global', icon: '🌍' },
                  { label: 'Latency', value: '24ms', icon: '⚡' },
                  { label: 'Security', value: 'Active', icon: '🛡️' }
                ].map(s => (
                  <div key={s.label} className="glass-card noise-filter" style={{ padding: '1.25rem', textAlign: 'center', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{s.icon}</div>
                    <div style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>{s.label}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#A78BFA' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── ENHANCED ABOUT SECTION ──────────────────────────────────────── */}
      <section className="section" style={{ position: 'relative', zIndex: 2, background: 'rgba(139,92,246,0.02)' }}>
        <div className="orb orb-purple" style={{ width: 300, height: 300, top: '20%', left: '-100px', opacity: 0.15 }} />
        
        <div className="container" style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionReveal>
            <motion.p 
              style={{ 
                color: '#A78BFA', 
                fontFamily: 'JetBrains Mono, monospace', 
                fontSize: '0.9rem', 
                marginBottom: '0.75rem', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                fontWeight: 600
              }}
              whileHover={{ letterSpacing: '0.2em' }}
              transition={{ duration: 0.3 }}
            >
              // My Cloud Journey
            </motion.p>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>About My Cloud Path</h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <motion.div 
              className="glass-card" 
              style={{ 
                padding: '3rem', 
                borderColor: 'rgba(139,92,246,0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(139,92,246,0.2)'
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.05), transparent)',
                  opacity: 0
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ 
                  color: '#94A3B8', 
                  lineHeight: 1.9, 
                  fontSize: '1.05rem', 
                  marginBottom: '1.75rem' 
                }}>
                  Cloud engineering fascinates me because it sits at the intersection of software and infrastructure. 
                  After mastering full-stack development, I realized that knowing how to{' '}
                  <em style={{ color: '#F8FAFC', fontWeight: 600 }}>deploy and scale</em> applications is just as 
                  important as building them.
                </p>

                <p style={{ 
                  color: '#94A3B8', 
                  lineHeight: 1.9, 
                  fontSize: '1.05rem', 
                  marginBottom: '1.75rem' 
                }}>
                  I started with <strong style={{ color: '#A78BFA', fontWeight: 600 }}>AWS EC2 and S3</strong>, 
                  then expanded to <strong style={{ color: '#A78BFA', fontWeight: 600 }}>Lambda</strong> for 
                  serverless compute, <strong style={{ color: '#A78BFA', fontWeight: 600 }}>CloudWatch</strong> for 
                  monitoring, and <strong style={{ color: '#A78BFA', fontWeight: 600 }}>CloudFormation</strong> for 
                  Infrastructure-as-Code. I also work with Linux, Docker, and GitHub Actions CI/CD pipelines.
                </p>

                <p style={{ 
                  color: '#94A3B8', 
                  lineHeight: 1.9, 
                  fontSize: '1.05rem' 
                }}>
                  My <strong style={{ color: '#F8FAFC', fontWeight: 600 }}>Cloud Intelligence Platform</strong> demonstrates 
                  my ability to build dashboards that provide real-time AWS infrastructure visibility — detecting idle 
                  resources and forecasting costs.
                </p>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── ENHANCED PROJECT SECTION ──────────────────────────────────────── */}
      <section className="section" style={{ position: 'relative', zIndex: 2 }}>
        <div className="orb orb-cyan" style={{ width: 400, height: 400, bottom: '10%', right: '-150px', opacity: 0.2 }} />

        <div className="container">
          <SectionReveal>
            <motion.p 
              style={{ 
                color: '#A78BFA', 
                fontFamily: 'JetBrains Mono, monospace', 
                fontSize: '0.9rem', 
                marginBottom: '0.75rem', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                fontWeight: 600
              }}
              whileHover={{ letterSpacing: '0.2em' }}
              transition={{ duration: 0.3 }}
            >
              // Featured Project
            </motion.p>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Cloud Intelligence Platform</h2>
            <p className="section-subtitle" style={{ marginBottom: '3rem' }}>Risk & Cost Optimization Dashboard</p>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <motion.div 
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.1}
              whileDrag={{ scale: 1.02, zIndex: 10, cursor: 'grabbing' }}
              style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                borderRadius: 24, 
                background: 'rgba(17,24,39,0.8)', 
                backdropFilter: 'blur(20px)', 
                border: '1px solid rgba(139,92,246,0.2)', 
                padding: '3rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                cursor: 'grab'
              }}
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 30px 60px rgba(139,92,246,0.2)'
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Top Gradient Bar */}
              <motion.div 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  height: 4, 
                  background: 'linear-gradient(90deg, #8B5CF6, #22D3EE, #EC4899)'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: '3rem',
                position: 'relative',
                zIndex: 1
              }}>
                {/* Project Info */}
                <div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1.25rem', 
                    marginBottom: '1.5rem' 
                  }}>
                    <motion.div 
                      style={{ 
                        width: 60, 
                        height: 60, 
                        borderRadius: 16, 
                        background: 'rgba(139,92,246,0.15)', 
                        border: '1px solid rgba(139,92,246,0.4)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '2rem' 
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360
                      }}
                      transition={{ 
                        rotate: { duration: 0.6 },
                        scale: { type: "spring", stiffness: 300 }
                      }}
                    >
                      ☁️
                    </motion.div>
                    <div>
                      <h3 style={{ 
                        fontFamily: 'Space Grotesk, sans-serif', 
                        fontSize: '1.4rem',
                        marginBottom: '0.25rem',
                        letterSpacing: '-0.01em',
                        fontWeight: 700
                      }}>
                        Cloud Intelligence Platform
                      </h3>
                      <p style={{ 
                        color: '#64748B', 
                        fontSize: '0.85rem', 
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 500
                      }}>
                        AWS Infrastructure Dashboard
                      </p>
                    </div>
                  </div>

                  <p style={{ 
                    color: '#94A3B8', 
                    lineHeight: 1.8, 
                    fontSize: '1rem', 
                    marginBottom: '2rem' 
                  }}>
                    Risk & cost optimization dashboard for cloud infrastructure. Detects idle resources, provides cost 
                    forecasting, and features a custom risk scoring engine with real-time AWS CloudWatch integration.
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <motion.a 
                      href="https://github.com/Attrivishal" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-secondary" 
                      style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View on GitHub
                    </motion.a>
                    <motion.span 
                      className="btn btn-ghost" 
                      style={{ 
                        fontSize: '0.9rem', 
                        padding: '0.75rem 1.5rem', 
                        opacity: 0.6,
                        cursor: 'not-allowed'
                      }}
                    >
                      Live Demo (Soon)
                    </motion.span>
                  </div>
                </div>

                {/* Features & Tech Stack */}
                <div>
                  <h4 style={{ 
                    color: '#94A3B8', 
                    fontSize: '0.8rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.15em', 
                    marginBottom: '1.25rem',
                    fontWeight: 700
                  }}>
                    Key Features
                  </h4>

                  {[
                    'Real-time CloudWatch integration',
                    'Idle resource detection alerts',
                    'Cost forecasting & budgets',
                    'Custom risk scoring engine',
                    'Interactive data visualization',
                    'CloudFormation-managed infra'
                  ].map((feature, i) => (
                    <motion.div 
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1rem', 
                        marginBottom: '0.75rem', 
                        color: '#94A3B8', 
                        fontSize: '0.95rem' 
                      }}
                    >
                      <motion.span 
                        style={{ color: '#A78BFA', fontSize: '0.85rem', fontWeight: 700 }}
                        whileHover={{ scale: 1.3 }}
                      >
                        ✓
                      </motion.span>
                      {feature}
                    </motion.div>
                  ))}

                  <div className="divider" style={{ margin: '1.5rem 0' }} />

                  <h4 style={{ 
                    color: '#94A3B8', 
                    fontSize: '0.8rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.15em', 
                    marginBottom: '1rem',
                    fontWeight: 700
                  }}>
                    Tech Stack
                  </h4>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {['AWS EC2', 'S3', 'Lambda', 'CloudWatch', 'Node.js', 'React', 'CloudFormation'].map((tech, i) => (
                      <motion.span 
                        key={tech} 
                        className="tag tag-purple" 
                        style={{ fontSize: '0.8rem' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ 
                          scale: 1.15,
                          backgroundColor: 'rgba(139,92,246,0.3)'
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
      <section className="section" style={{ position: 'relative', zIndex: 2, background: 'rgba(139,92,246,0.02)' }}>
        <div className="container">
          <SectionReveal>
            <motion.p 
              style={{ 
                color: '#A78BFA', 
                fontFamily: 'JetBrains Mono, monospace', 
                fontSize: '0.9rem', 
                marginBottom: '0.75rem', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                fontWeight: 600
              }}
              whileHover={{ letterSpacing: '0.2em' }}
              transition={{ duration: 0.3 }}
            >
              // Technical Skills
            </motion.p>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Cloud Expertise</h2>
            <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
              Infrastructure skills built through hands-on cloud projects
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
                  color={i % 2 === 0 ? 'purple' : 'cyan'}
                />
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── ENHANCED AWS SERVICES ──────────────────────────────────────── */}
      <section className="section" style={{ position: 'relative', zIndex: 2 }}>
        <div className="orb orb-purple" style={{ width: 500, height: 500, top: '15%', left: '-200px', opacity: 0.15 }} />

        <div className="container">
          <SectionReveal>
            <motion.p 
              style={{ 
                color: '#A78BFA', 
                fontFamily: 'JetBrains Mono, monospace', 
                fontSize: '0.9rem', 
                marginBottom: '0.75rem', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                fontWeight: 600
              }}
              whileHover={{ letterSpacing: '0.2em' }}
              transition={{ duration: 0.3 }}
            >
              // AWS Ecosystem
            </motion.p>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>AWS Services I Use</h2>
            <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
              Cloud services I've worked with professionally
            </p>
          </SectionReveal>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {awsServices.map((service, i) => (
              <SectionReveal key={service.name} delay={i * 0.08} direction="scale">
                <motion.div 
                  className="glass-card" 
                  style={{ 
                    padding: '2rem 1.5rem', 
                    textAlign: 'center', 
                    borderColor: 'rgba(139,92,246,0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -10,
                    borderColor: 'rgba(139,92,246,0.5)',
                    boxShadow: '0 20px 40px rgba(139,92,246,0.3)'
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at center, rgba(139,92,246,0.1), transparent)',
                      opacity: 0
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div 
                      style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
                      animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    >
                      {service.icon}
                    </motion.div>

                    <h4 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 700, 
                      marginBottom: '0.5rem', 
                      fontFamily: 'JetBrains Mono, monospace', 
                      color: '#A78BFA',
                      letterSpacing: '-0.01em'
                    }}>
                      {service.name}
                    </h4>

                    <p style={{ 
                      color: '#64748B', 
                      fontSize: '0.8rem', 
                      lineHeight: 1.6 
                    }}>
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENHANCED CERTIFICATIONS ──────────────────────────────────────── */}
      <section className="section" style={{ position: 'relative', zIndex: 2, background: 'rgba(139,92,246,0.02)' }}>
        <div className="container">
          <SectionReveal>
            <motion.p 
              style={{ 
                color: '#A78BFA', 
                fontFamily: 'JetBrains Mono, monospace', 
                fontSize: '0.9rem', 
                marginBottom: '0.75rem', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                fontWeight: 600
              }}
              whileHover={{ letterSpacing: '0.2em' }}
              transition={{ duration: 0.3 }}
            >
              // Credentials
            </motion.p>
            <h2 className="section-title" style={{ marginBottom: '3rem' }}>Certifications & Tools</h2>
          </SectionReveal>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.75rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {certifications.map((cert, i) => (
              <SectionReveal key={cert.name} delay={i * 0.12}>
                <motion.div 
                  className="glass-card" 
                  style={{ 
                    padding: '2rem', 
                    position: 'relative', 
                    overflow: 'hidden', 
                    borderColor: 'rgba(139,92,246,0.3)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    boxShadow: '0 25px 50px rgba(139,92,246,0.3)'
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Top Gradient Bar */}
                  <motion.div 
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      height: 3,
                      background: cert.color === 'purple' 
                        ? 'var(--gradient-purple)' 
                        : cert.color === 'pink' 
                        ? 'var(--gradient-pink)' 
                        : 'var(--gradient-cyan)'
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                  />

                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg, ${
                        cert.color === 'purple' 
                          ? 'rgba(139,92,246,0.1)' 
                          : cert.color === 'pink' 
                          ? 'rgba(244,114,182,0.1)' 
                          : 'rgba(6,182,212,0.1)'
                      }, transparent)`,
                      opacity: 0
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div 
                      style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    >
                      🏆
                    </motion.div>

                    <h4 style={{ 
                      fontSize: '1.05rem', 
                      fontWeight: 700, 
                      marginBottom: '0.5rem',
                      lineHeight: 1.4,
                      color: '#F8FAFC'
                    }}>
                      {cert.name}
                    </h4>

                    <p style={{ 
                      color: '#64748B', 
                      fontSize: '0.9rem', 
                      marginBottom: '0.75rem',
                      fontWeight: 500
                    }}>
                      {cert.issuer}
                    </p>

                    <motion.p 
                      style={{ 
                        color: cert.color === 'purple' ? '#A78BFA' : cert.color === 'pink' ? '#F472B6' : '#22D3EE',
                        fontSize: '0.8rem', 
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 600,
                        display: 'inline-block',
                        padding: '0.35rem 0.9rem',
                        background: cert.color === 'purple' 
                          ? 'rgba(139,92,246,0.15)' 
                          : cert.color === 'pink' 
                          ? 'rgba(244,114,182,0.15)' 
                          : 'rgba(6,182,212,0.15)',
                        borderRadius: 999
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
      <section className="section" style={{ position: 'relative', zIndex: 2 }}>
        <div className="orb orb-cyan" style={{ width: 400, height: 400, bottom: '-150px', right: '-150px', opacity: 0.2 }} />

        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <SectionReveal>
            <motion.p 
              style={{ 
                color: '#A78BFA', 
                fontFamily: 'JetBrains Mono, monospace', 
                fontSize: '0.9rem', 
                marginBottom: '0.75rem', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                fontWeight: 600
              }}
              whileHover={{ letterSpacing: '0.2em' }}
              transition={{ duration: 0.3 }}
            >
              // Hire a Cloud Eng
            </motion.p>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Let's Scale Together</h2>
            <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
              Need AWS cloud expertise? I'm available for projects.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <motion.div 
              className="glass-card" 
              style={{ 
                padding: '3rem', 
                borderColor: 'rgba(139,92,246,0.3)'
              }}
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 25px 50px rgba(139,92,246,0.2)'
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ContactForm defaultRole="cloud" />
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
        .cloud-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        
        /* Mobile: Photo on Top, Text Below */
        @media (max-width: 768px) {
          .cloud-hero-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .cloud-hero-photo {
            order: -1 !important;
            margin-bottom: 2rem;
          }
          .cloud-hero-text {
            order: 2 !important;
          }
        }
      `}</style>
    </>
  )
}