import { motion } from 'framer-motion'
import { Tilt } from 'react-tilt'
import { useInView } from 'react-intersection-observer'

const defaultOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.05,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: 'cubic-bezier(.03,.98,.52,.99)',
}

export default function SkillCard({ name, percent, icon, color = 'cyan', delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const glowColor = color === 'purple' ? '#A78BFA' : '#22D3EE'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      <Tilt options={defaultOptions} style={{ height: '100%' }}>
        <div 
          className="glass-card" 
          style={{
            position: 'relative',
            padding: '2rem',
            height: '100%',
            overflow: 'hidden',
            border: `1px solid rgba(255, 255, 255, 0.05)`,
            background: 'rgba(17, 24, 39, 0.4)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            transition: 'all 0.3s ease',
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = glowColor
            e.currentTarget.style.boxShadow = `0 0 30px ${glowColor}33`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
            e.currentTarget.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.3)`
          }}
        >
          {/* Top Glow Accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
            opacity: 0.5,
          }} />

          {/* Skill Info */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ 
                fontSize: '1.1rem', 
                fontWeight: 700, 
                color: '#F8FAFC',
                fontFamily: 'Space Grotesk, sans-serif'
            }}>
              {name}
            </span>
            <span style={{ 
                fontSize: '0.85rem', 
                fontFamily: 'JetBrains Mono, monospace', 
                color: glowColor,
                opacity: 0.8 
            }}>
              {percent}%
            </span>
          </div>

          {/* Progress Ring/Glow Container */}
          <div style={{
            position: 'relative',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '999px',
            overflow: 'hidden',
          }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${percent}%`,
                background: glowColor,
                borderRadius: '999px',
                transformOrigin: 'left',
                boxShadow: `0 0 15px ${glowColor}`,
              }}
            />
          </div>

          <p style={{
            color: '#94A3B8',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            margin: 0,
          }}>
            Expertise level in {name} production environments.
          </p>

          {/* Background Decorative Pattern */}
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-20px',
            fontSize: '4rem',
            opacity: 0.03,
            zIndex: -1,
            transform: 'rotate(-15deg)',
          }}>
            {name.charAt(0)}
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}
