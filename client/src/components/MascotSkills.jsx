import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const TECH_STACK = [
  { label: 'React.js', color: '#61DAFB' },
  { label: 'Node.js', color: '#68A063' },
  { label: 'AWS', color: '#FF9900' },
  { label: 'MongoDB', color: '#47A248' },
  { label: 'Express', color: '#828282' },
  { label: 'Docker', color: '#2496ED' },
  { label: 'Linux', color: '#FCC624' },
  { label: 'GitHub', color: '#F05032' },
]

export default function MascotSkills() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showHint, setShowHint] = useState(true)

  const handleToggle = () => {
    setIsAnimating(!isAnimating)
    setShowHint(false)
  }

  return (
    <div 
      onClick={handleToggle}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '500px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        cursor: 'pointer' 
      }}
    >
      {/* Click Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -200 }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
            style={{
              position: 'absolute',
              color: '#22D3EE',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              zIndex: 20,
              background: 'rgba(15, 23, 42, 0.6)',
              padding: '4px 12px',
              borderRadius: '20px',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              backdropFilter: 'blur(4px)'
            }}
          >
            CLICK TO POWER UP
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* ─── ORBITING SKILLS HALO ────────────────────────────────────────── */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        pointerEvents: 'none', 
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ position: 'relative', width: 400, height: 400 }}
            >
              {TECH_STACK.map((tech, i) => {
                const angle = (i / TECH_STACK.length) * (Math.PI * 2)
                const radius = 180
                const initialX = Math.cos(angle) * radius
                const initialY = Math.sin(angle) * radius

                return (
                  <motion.div
                    key={tech.label}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      x: initialX, 
                      y: initialY,
                    }}
                    exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.05, 
                      type: "spring", 
                      stiffness: 120 
                    }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-40px',
                      marginTop: '-20px',
                    }}
                  >
                    {/* Counter-rotate the text so it stays upright */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        backdropFilter: 'blur(12px)',
                        padding: '6px 14px',
                        borderRadius: '12px',
                        border: `1px solid ${tech.color}`,
                        color: tech.color,
                        fontSize: '0.85rem',
                        fontFamily: 'JetBrains Mono, monospace',
                        boxShadow: `0 0 20px ${tech.color}44`,
                        whiteSpace: 'nowrap',
                        pointerEvents: 'auto',
                        cursor: 'pointer'
                      }}
                      whileHover={{ scale: 1.2, boxShadow: `0 0 30px ${tech.color}88`, zIndex: 100 }}
                    >
                      {tech.label}
                    </motion.div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── THE MASCOT (BIT-BOT) ─────────────────────────────────── */}
      <motion.div 
        style={{ position: 'relative', zIndex: 5 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="220" height="320" viewBox="0 0 220 320" fill="none">
          {/* LEGS */}
          <rect x="75" y="240" width="15" height="40" rx="7.5" fill="#1E293B" />
          <rect x="130" y="240" width="15" height="40" rx="7.5" fill="#1E293B" />
          
          {/* TORSO */}
          <motion.rect 
            x="60" y="140" width="100" height="110" rx="24" 
            fill="url(#bodyGradient)" 
            stroke="rgba(6, 182, 212, 0.3)" 
            strokeWidth="2"
          />

          {/* LEFT ARM (raised on animation) */}
          <motion.g
            animate={isAnimating ? { rotate: -140, y: -20, x: -10 } : { rotate: 0 }}
            style={{ transformOrigin: '70px 160px' }}
            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.5 }}
          >
            <rect x="35" y="155" width="40" height="12" rx="6" fill="#0F172A" stroke="#22D3EE" strokeWidth="1" />
            <rect x="5" y="155" width="35" height="12" rx="6" fill="#0F172A" stroke="#22D3EE" strokeWidth="1" />
          </motion.g>

          {/* RIGHT ARM (raised on animation) */}
          <motion.g
            animate={isAnimating ? { rotate: 140, y: -20, x: 10 } : { rotate: 0 }}
            style={{ transformOrigin: '150px 160px' }}
            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.6 }}
          >
            <rect x="145" y="155" width="40" height="12" rx="6" fill="#0F172A" stroke="#22D3EE" strokeWidth="1" />
            <rect x="180" y="155" width="35" height="12" rx="6" fill="#0F172A" stroke="#22D3EE" strokeWidth="1" />
          </motion.g>

          {/* HEAD */}
          <motion.g
             animate={{ rotate: [-2, 2, -2] }}
             transition={{ duration: 5, repeat: Infinity }}
             style={{ transformOrigin: '110px 120px' }}
          >
            <rect x="65" y="50" width="90" height="80" rx="20" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
            
            {/* EYES (Tracking Cursor Glow) */}
            <motion.ellipse 
                cx="90" cy="90" rx="8" ry="8" 
                fill="#22D3EE" 
                animate={{ scaleY: [1, 0.1, 1] }} 
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
            <motion.ellipse 
                cx="130" cy="90" rx="8" ry="8" 
                fill="#22D3EE" 
                animate={{ scaleY: [1, 0.1, 1] }} 
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
            
            {/* MOUTH PULSE */}
            <motion.rect 
                x="95" y="110" width="30" height="4" rx="2" 
                fill="#22D3EE" 
                animate={{ opacity: [0.4, 1, 0.4] }} 
                transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.g>

          {/* GRADIENTS */}
          <defs>
            <linearGradient id="bodyGradient" x1="110" y1="140" x2="110" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0F172A" />
              <stop offset="1" stopColor="#1E293B" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>

        {/* ENERGY SHIELD BASE */}
        <motion.div
           animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.6, 0.4] }}
           transition={{ duration: 3, repeat: Infinity }}
           style={{
             position: 'absolute',
             bottom: -10,
             left: '10%',
             right: '10%',
             height: '20px',
             background: 'radial-gradient(ellipse at center, #22D3EE 0%, transparent 80%)',
             filter: 'blur(10px)',
             zIndex: -1
           }}
        />
      </motion.div>
    </div>
  )
}
