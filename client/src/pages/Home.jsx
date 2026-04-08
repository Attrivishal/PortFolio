import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import { useState } from 'react'
import Magnetic from '../components/Magnetic'
import ParticleBackground from '../components/ParticleBackground'
import MascotSkills from '../components/MascotSkills'
import GitHubPulse from '../components/GitHubPulse'

const stats = [
  { value: 29, suffix: '+', label: 'GitHub Repositories', icon: '🗂️', color: 'cyan', delay: 0 },
  { value: 2, suffix: '+', label: 'Major Projects', icon: '🚀', color: 'purple', delay: 0.1 },
  { value: 8.39, suffix: '', label: 'CGPA / 10', icon: '🎓', color: 'pink', delay: 0.2 },
  { value: 2026, suffix: '', label: 'Graduation Year', icon: '📅', color: 'cyan', delay: 0.3 },
]

const rooms = [
  {
    id: 'mern',
    path: '/mern-room',
    title: 'MERN Stack Developer',
    description: 'Building full-stack web applications with modern JavaScript technologies, real-time features, and clean UI/UX.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'JWT'],
    gradient: 'var(--gradient-cyan)',
    icon: '⚡',
  },
  {
    id: 'cloud',
    path: '/cloud-room',
    title: 'Cloud Engineer',
    description: 'Designing, deploying, and optimizing scalable cloud infrastructure with cost-awareness and automation.',
    tags: ['AWS EC2', 'Lambda', 'Docker', 'Actions'],
    gradient: 'var(--gradient-purple)',
    icon: '🌩️',
  },
]

export default function Home() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: 120, 
        paddingBottom: 60,
        position: 'relative', 
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        <ParticleBackground />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '2rem' }}
          >
            <div style={{
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.6rem',
              padding: '0.5rem 1.25rem',
              background: 'rgba(6,182,212,0.05)',
              border: '1px solid rgba(6,182,212,0.2)',
              borderRadius: 999,
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#22D3EE',
              fontFamily: 'JetBrains Mono, monospace',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ 
                width: 8, height: 8, borderRadius: '50%', background: '#22D3EE', 
                boxShadow: '0 0 12px #22D3EE', animation: 'pulse 2s infinite' 
              }} />
              READY FOR GLOBAL OPPORTUNITIES
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 500, 
              color: '#94A3B8', 
              letterSpacing: '0.4em', 
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              Hi, I'm
            </h2>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 10vw, 6.5rem)', 
              lineHeight: 0.9,
              fontWeight: 800, 
              letterSpacing: '-0.04em',
              marginBottom: '1.5rem' 
            }}>
              <span className="gradient-text-cyan">Vishal</span>
              <br />
              <span style={{ color: '#F8FAFC' }}>Attri</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ 
              margin: '-40px auto 20px',
              width: '100%', 
              maxWidth: 600, 
              height: 400,
              display: 'flex', 
              justifyContent: 'center' 
            }}
          >
            <MascotSkills />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div style={{ 
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', 
              fontWeight: 600,
              color: '#22D3EE', 
              marginBottom: '1rem',
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              <TypeAnimation
                sequence={[
                  'MERN Stack Developer', 2000,
                  'Cloud Engineer', 2000,
                  'Full Stack Enthusiast', 2000,
                ]}
                repeat={Infinity}
              />
            </div>
            <p style={{ 
              color: '#94A3B8', 
              fontSize: '1.1rem', 
              lineHeight: 1.6, 
              marginBottom: '3rem', 
              maxWidth: 600, 
              margin: '0 auto 3rem'
            }}>
              Bridging the gap between <span style={{ color: '#F8FAFC', fontWeight: 600 }}>cutting-edge code</span> and <span style={{ color: '#F8FAFC', fontWeight: 600 }}>scalable infrastructure.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}
          >
            <Magnetic><Link to="/mern-room" className="btn btn-primary" style={{ padding: '0.875rem 2.25rem' }}>View Projects</Link></Magnetic>
            <Magnetic><Link to="/contact" className="btn btn-outline" style={{ padding: '0.875rem 2.25rem' }}>Let's Collaborate</Link></Magnetic>
          </motion.div>
        </div>
        
        <style>{`
          @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
        `}</style>
      </section>

      {/* ─── BENTO GRID Section ──────────────────────────────────────────── */}
      <section className="section" style={{ position: 'relative', zIndex: 2, paddingBottom: 100 }}>
        <div className="container">
          <SectionReveal>
            <p style={{ color: '#22D3EE', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', marginBottom: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'center' }}>
              // Digital Mosaic
            </p>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>Professional Ecosystem</h2>
          </SectionReveal>

          <div className="bento-grid">
            {/* MERN Room Tile */}
            <div className="bento-item large glass-card noise-filter" style={{ padding: '2.5rem' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: rooms[0].gradient }} />
              <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>{rooms[0].icon}</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>{rooms[0].title}</h3>
              <p style={{ color: '#94A3B8', marginBottom: '2rem', flexGrow: 1, fontSize: '0.95rem' }}>{rooms[0].description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                 {rooms[0].tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <Link to={rooms[0].path} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Enter MERN Room →</Link>
            </div>

            {/* Repos Stat */}
            <div className="bento-item small glass-card noise-filter" style={{ padding: '1.5rem', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
               <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stats[0].icon}</div>
               <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#22D3EE' }}>{stats[0].value}{stats[0].suffix}</div>
               <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stats[0].label}</div>
            </div>

            {/* Projects Stat */}
            <div className="bento-item small glass-card noise-filter" style={{ padding: '1.5rem', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
               <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stats[1].icon}</div>
               <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#A78BFA' }}>{stats[1].value}{stats[1].suffix}</div>
               <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stats[1].label}</div>
            </div>

            {/* GitHub Pulse */}
            <div className="bento-item wide glass-card glass-refraction noise-filter" style={{ padding: '2rem' }}>
               <GitHubPulse />
            </div>

            {/* CGPA Stat */}
            <div className="bento-item small glass-card noise-filter" style={{ padding: '1.5rem', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
               <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stats[2].icon}</div>
               <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F472B6' }}>{stats[2].value}</div>
               <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stats[2].label}</div>
            </div>

            {/* Grad Year Stat */}
            <div className="bento-item small glass-card noise-filter" style={{ padding: '1.5rem', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
               <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stats[3].icon}</div>
               <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#22D3EE' }}>{stats[3].value}</div>
               <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stats[3].label}</div>
            </div>

            {/* Cloud Room Tile */}
            <div className="bento-item large glass-card noise-filter" style={{ padding: '2.5rem' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: rooms[1].gradient }} />
              <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>{rooms[1].icon}</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>{rooms[1].title}</h3>
              <p style={{ color: '#94A3B8', marginBottom: '2rem', flexGrow: 1, fontSize: '0.95rem' }}>{rooms[1].description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                 {rooms[1].tags.map(t => <span key={t} className="tag tag-purple">{t}</span>)}
              </div>
              <Link to={rooms[1].path} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>Enter Cloud Room →</Link>
            </div>

            {/* Availability Tile */}
            <div className="bento-item wide glass-card glass-refraction noise-filter" style={{ padding: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.5rem' }}>
               <div style={{ 
                 width: 70, height: 70, borderRadius: '20px', background: 'rgba(34, 211, 238, 0.05)', 
                 display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
                 border: '1px solid rgba(34, 211, 238, 0.1)' 
               }}>📡</div>
               <div>
                 <h4 style={{ color: '#F8FAFC', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Collaboration Protocol</h4>
                 <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.5 }}>Always open to discussing new projects or creative opportunities in the tech space.</p>
                 <Link to="/contact" style={{ color: '#22D3EE', display: 'inline-block', marginTop: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Initiate Contact →</Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────── */}
      <section className="section" style={{ position: 'relative', zIndex: 2, paddingBottom: 100 }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <SectionReveal>
            <p style={{ color: '#22D3EE', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', marginBottom: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>
              // Terminal Input
            </p>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Connect with me</h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div className="glass-card noise-filter" style={{ padding: '2.5rem' }}>
              <ContactForm />
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </>
  )
}