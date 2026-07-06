// App — composition, nav state, scroll progress, reveal observer.
// Ported from the v4 design (app_v4.jsx). Copy + theme come from
// src/data/content.json.

import React, { useState, useEffect } from 'react'
import content from './data/content.json'
import CV from './assets/BrandonsResume.pdf'
import Hero from './components/Hero'
import {
  TransitionStrip, About, Experience, Projects, Skills, Contact, SECTIONS,
} from './components/Sections'

const App = () => {
  const { meta, theme } = content
  const [active, setActive] = useState('hero')
  const [scrollPct, setScrollPct] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Apply theme CSS vars + page title from content.json
  useEffect(() => {
    const r = document.documentElement
    if (theme.accent) {
      r.style.setProperty('--magenta', theme.accent[0])
      r.style.setProperty('--pink',    theme.accent[1])
      r.style.setProperty('--gold',    theme.accent[2])
    }
    if (theme.bg) r.style.setProperty('--bg', theme.bg)
    document.title = meta.pageTitle
  }, [theme, meta.pageTitle])

  // Scroll progress + nav scrolled state
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrollPct(Math.max(0, Math.min(1, window.scrollY / Math.max(1, max))))
        setScrolled(window.scrollY > 40)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile nav drawer is open
  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
  }, [menuOpen])

  // Reveal-on-scroll observer (covers .reveal and .reveal-soft)
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal, .reveal-soft').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Active section tracking
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { threshold: 0.35, rootMargin: '-20% 0px -40% 0px' })
    ;['hero', ...SECTIONS.map(s => s.id)].forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {theme.showProgress && (
        <div className="scroll-bar" style={{ width: `${scrollPct * 100}%` }}></div>
      )}

      <header className={`topbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"></span>
          <span>{meta.brand}<span style={{ color: 'var(--magenta)' }}>{meta.brandAccent}</span></span>
        </a>
        <nav className="topnav">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''}>
              {s.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 4h14M1 8h14M1 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </header>

      <nav id="mobile-nav" className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {SECTIONS.map(s => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''} onClick={() => setMenuOpen(false)}>
            {s.label}
          </a>
        ))}
      </nav>

      <main>
        <Hero />
        <TransitionStrip />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact resumeHref={CV} />
      </main>
    </>
  )
}

export default App
