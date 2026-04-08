import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const points = useRef([])
  const MAX_POINTS = 20

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const cursor = cursorRef.current

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Add new point
      points.current.push({ ...mouse.current })
      if (points.current.length > MAX_POINTS) {
        points.current.shift()
      }

      if (points.current.length > 1) {
        ctx.beginPath()
        ctx.moveTo(points.current[0].x, points.current[0].y)
        
        // Get theme color
        const isPurple = document.documentElement.classList.contains('theme-purple')
        const color = isPurple ? '#A78BFA' : '#22D3EE'

        for (let i = 1; i < points.current.length; i++) {
          const p = points.current[i]
          const prev = points.current[i - 1]
          
          // Quadratic curve for smoothness
          const xc = (p.x + prev.x) / 2
          const yc = (p.y + prev.y) / 2
          ctx.quadraticCurveTo(prev.x, prev.y, xc, yc)
          
          // Dynamic width and opacity based on position in trail
          const ratio = i / points.current.length
          ctx.lineWidth = ratio * 6
          ctx.strokeStyle = `${color}${Math.floor(ratio * 255).toString(16).padStart(2, '0')}`
          ctx.lineCap = 'round'
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(xc, yc)
        }
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    resize()
    animate()

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)
    const interactives = document.querySelectorAll('a, button, [data-hover]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          pointerEvents: 'none', 
          zIndex: 9998,
          opacity: 0.6 
        }} 
      />
      <div 
        ref={cursorRef} 
        className={`cursor ${hovering ? 'hovering' : ''}`} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          pointerEvents: 'none', 
          zIndex: 9999,
          willChange: 'transform'
        }} 
      />
    </>
  )
}
