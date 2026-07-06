// Hero — continuous fluid scroll sequence.
//
// One thin clock dial rotates as you scroll; soft ripple rings emit
// from the center; the name's tracking gently opens; then a blur-out
// departure delivers you to the work. One unbroken motion.
//
// Ported from the v4 design (hero_v4.jsx) into a real React module.
// Copy comes from src/data/content.json.

import React, { useState, useEffect, useRef } from 'react'
import content from '../data/content.json'

const { hero } = content

// ─── helpers ────────────────────────────────────────────────────
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ss = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1)
  return t * t * (3 - 2 * t)
}
const frac = (x) => x - Math.floor(x)

// ─── Ripple rings — fluid pulses emitted from the center ───────
const Ripples = ({ p, drift, exit }) => {
  const groupOp = drift * (1 - exit)
  if (groupOp < 0.02) return null
  return (
    <g opacity={groupOp}>
      {Array.from({ length: 5 }).map((_, i) => {
        const t = frac(p * 1.6 + i * 0.2)
        const r = 90 + t * 420
        const op = ss(0, 0.1, t) * (1 - t) * 0.35
        if (op < 0.01) return null
        return (
          <circle key={i} cx="0" cy="0" r={r} fill="none"
                  stroke={i % 2 === 0 ? 'var(--magenta)' : 'var(--gold)'}
                  strokeWidth={1.2} opacity={op} />
        )
      })}
    </g>
  )
}

// ─── The dial — one thin instrument ─────────────────────────────
const Dial = ({ p, exit }) => {
  const rot  = p * 200   // continuous dial rotation
  const hand = p * 720   // two full revolutions across the scroll
  const roman = ['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI']

  const drift  = ss(0.02, 0.4, p)
  const baseOp = (0.32 + drift * 0.5) * (1 - exit)
  const scale  = 0.92 + ss(0, 0.5, p) * 0.12 + exit * 0.55

  return (
    <svg
      viewBox="-500 -500 1000 1000"
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        transform: `scale(${scale})`,
        opacity: baseOp,
        willChange: 'transform, opacity',
      }}
    >
      <Ripples p={p} drift={drift} exit={exit} />

      <g transform={`rotate(${rot})`}>
        <circle cx="0" cy="0" r="352" fill="none" stroke="var(--fg)" strokeWidth="1" opacity="0.14" />
        <circle cx="0" cy="0" r="150" fill="none" stroke="var(--fg)" strokeWidth="1" opacity="0.08" />
        <circle cx="0" cy="0" r="216" fill="none" stroke="var(--magenta)"
                strokeWidth="1" opacity="0.3" strokeDasharray="2 10" />
        {/* 60 ticks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * 6 - 90) * Math.PI / 180
          const isHour = i % 5 === 0
          const r1 = 352, r2 = r1 + (isHour ? 14 : 7)
          return (
            <line key={i}
                  x1={Math.cos(a) * r1} y1={Math.sin(a) * r1}
                  x2={Math.cos(a) * r2} y2={Math.sin(a) * r2}
                  stroke="var(--fg-dim)" strokeWidth={isHour ? 1.5 : 0.7}
                  opacity={isHour ? 0.55 : 0.28} />
          )
        })}
        {/* numerals — counter-rotated so they stay upright */}
        {roman.map((n, i) => {
          const a = (i * 30 - 90) * Math.PI / 180
          const x = Math.cos(a) * 306, y = Math.sin(a) * 306
          return (
            <text key={n} x={x} y={y} textAnchor="middle" dominantBaseline="central"
                  fontFamily="'Instrument Serif', serif" fontStyle="italic"
                  fontSize="26" fill="var(--fg)" opacity="0.5"
                  transform={`rotate(${-rot} ${x} ${y})`}>
              {n}
            </text>
          )
        })}
      </g>

      {/* sweep hand — continuous, gold tip */}
      <g transform={`rotate(${hand})`}>
        <line x1="0" y1="-40" x2="0" y2="-322"
              stroke="var(--magenta)" strokeWidth="1.5" opacity="0.85" />
        <polygon points="0,-338 5,-320 -5,-320" fill="var(--gold)" />
      </g>

      <circle cx="0" cy="0" r="3.5" fill="var(--bg)" stroke="var(--fg-dim)" strokeWidth="1.5" />
    </svg>
  )
}

// ─── Name with letter-stagger entrance ──────────────────────────
const StaggerLine = ({ text, base }) => (
  <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
    {text.split('').map((ch, i) => (
      <span key={i} className="hero-letter" style={{ animationDelay: `${base + i * 0.04}s` }}>
        {ch}
      </span>
    ))}
  </span>
)

// ─── Crossfading captions ────────────────────────────────────────
const Caption = ({ text, opacity, big }) => (
  <div className={big ? 'serif-it' : 'mono'} style={{
    position: 'absolute', left: 0, right: 0, textAlign: 'center',
    opacity: clamp(opacity, 0, 1),
    pointerEvents: 'none',
    ...(big
      ? { fontSize: 'clamp(20px, 2.4vw, 30px)', color: 'var(--fg-dim)', letterSpacing: '0.02em' }
      : { fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--fg-dim)' }),
  }}>
    {text}
  </div>
)

// ─── Hero ────────────────────────────────────────────────────────
const Hero = () => {
  const sectionRef = useRef(null)
  const [p, setP] = useState(0)

  // Inertia-smoothed scroll progress — the whole sequence runs on this.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0, last = performance.now()
    let current = 0, shown = -1

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const target = clamp(-rect.top / Math.max(1, total), 0, 1)

      // critically-damped chase — frame-rate independent
      current = reduced ? target : current + (target - current) * (1 - Math.exp(-dt * 9))
      if (Math.abs(target - current) < 0.0004) current = target

      if (Math.abs(current - shown) > 0.0004) {
        shown = current
        setP(current)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // signals
  const drift = ss(0.02, 0.5, p)
  const exit  = ss(0.62, 0.96, p)

  // caption phases
  const introCap = 1 - ss(0.3, 0.46, p)
  const afterCap = ss(0.5, 0.62, p) * (1 - ss(0.86, 0.96, p))

  // tracking gently opens as the sequence progresses
  const tracking = -0.035 + drift * 0.028

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-screen-label="00 Hero"
      style={{ position: 'relative', height: '220vh', padding: 0, background: 'var(--bg)' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>

        {/* ambient corona — barely there, deepens with scroll */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 50% 46%,
            rgba(217,70,239,${0.10 + drift * 0.08}),
            rgba(139,92,246,${0.05 + drift * 0.05}) 32%,
            var(--bg) 72%)`,
        }} />

        {/* vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 26%, rgba(4,3,8,0.9) 100%)',
          opacity: 0.6,
          pointerEvents: 'none',
        }} />

        <Dial p={p} exit={exit} />

        {/* NAME — rises in on load, tracking opens with scroll, blur-departs on exit */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          pointerEvents: 'none', zIndex: 4,
          transform: `translateY(${-drift * 22}px) scale(${1 + drift * 0.03 + exit * 0.32})`,
          opacity: 1 - exit,
          filter: exit > 0.01 ? `blur(${exit * 16}px)` : 'none',
          willChange: 'transform, opacity, filter',
        }}>
          <div className="eyebrow hero-fade hero-eyebrow" style={{ animationDelay: '0.15s', marginBottom: 26, color: 'var(--fg-dim)' }}>
            {hero.eyebrow}
          </div>

          <h1 className="display hero-name" style={{
            fontSize: 'clamp(72px, 12.5vw, 190px)',
            textAlign: 'center', margin: 0, lineHeight: 0.94,
            letterSpacing: `${tracking}em`,
            textShadow: `0 0 ${20 + drift * 34}px rgba(217,70,239,${0.22 + drift * 0.1})`,
          }}>
            <StaggerLine text={hero.nameLines[0]} base={0.3} />
            <StaggerLine text={hero.nameLines[1]} base={0.62} />
          </h1>

          {/* subtitle crossfade */}
          <div className="hero-fade hero-caption-big" style={{ animationDelay: '1.25s', height: 44, position: 'relative', width: '100%', marginTop: 30 }}>
            <Caption big text={hero.subtitleIntro} opacity={introCap} />
            <Caption big text={hero.subtitleAfter} opacity={afterCap} />
          </div>

          {/* eyebrow-level state line */}
          <div style={{ height: 20, position: 'relative', width: '100%', marginTop: 22 }}>
            <Caption text={hero.stateLine} opacity={introCap * 0.9} />
          </div>
        </div>

        {/* scroll cue */}
        <div className="hero-fade" style={{
          animationDelay: '1.7s',
          position: 'absolute', bottom: 34, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          opacity: 1 - ss(0.02, 0.09, p),
          zIndex: 5,
        }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.4em', color: 'var(--fg-mute)', textTransform: 'uppercase' }}>
            scroll
          </div>
          <svg className="cue-chevron" width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1l6 6 6-6" stroke="var(--fg-dim)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* thin scroll meter, bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'var(--line)', opacity: 1 - exit, zIndex: 5,
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: `${p * 100}%`,
            background: 'linear-gradient(90deg, var(--magenta), var(--gold))',
          }} />
        </div>
      </div>
    </section>
  )
}

export default Hero
