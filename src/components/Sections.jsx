// Content sections — About / Experience / Projects / Skills / Contact.
//
// Apple-grade motion: word-by-word illumination, parallax portrait,
// staggered cascades. Ported from the v4 design (portfolio_v4.jsx) into
// real React modules. All copy comes from src/data/content.json.

import React, { useEffect, useRef } from 'react'
import content from '../data/content.json'
import PORTRAIT from '../assets/me.jpg'

export const SECTIONS = content.nav

// ─── Word-by-word scroll illumination (Apple marketing-page move) ───
// segments: [{ t: 'text', c: 'className' }]
const WordReveal = ({ segments, style }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll('[data-w]').forEach(w => { w.style.opacity = 1 })
      return
    }
    const words = el.querySelectorAll('[data-w]')
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        const start = vh * 0.88, end = vh * 0.42
        const prog = Math.min(1, Math.max(0, (start - r.top) / (r.height + start - end)))
        const lit = prog * (words.length + 2)
        words.forEach((w, i) => {
          const o = Math.min(1, Math.max(0, lit - i))
          w.style.opacity = 0.16 + o * 0.84
        })
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <p ref={ref} style={style}>
      {segments.map((seg, si) =>
        seg.t.split(' ').filter(Boolean).map((word, wi) => (
          <span key={`${si}-${wi}`} data-w="" className={`wr-word ${seg.c || ''}`}
                style={{ opacity: 0.16 }}>
            {word}{' '}
          </span>
        ))
      )}
    </p>
  )
}

// ─── Gentle parallax wrapper ─────────────────────────────────────
const Parallax = ({ amt = 26, children, style }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        const c = (r.top + r.height / 2 - vh / 2) / vh // -0.5 … 0.5-ish
        el.style.transform = `translateY(${(-c * amt).toFixed(2)}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [amt])
  return <div ref={ref} style={{ willChange: 'transform', ...style }}>{children}</div>
}

// ─── Transition strip (marquee) ──────────────────────────────────
export const TransitionStrip = () => (
  <div style={{ position: 'relative', padding: '60px 0 20px' }}>
    <div style={{
      maxWidth: 1100, margin: '0 auto',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      padding: '20px 32px',
      overflow: 'hidden',
      maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
    }}>
      <div className="marquee">
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} style={{ display: 'flex', gap: 56, paddingRight: 56, alignItems: 'center' }}>
            {content.marquee.map(([k2, v], i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline', whiteSpace: 'nowrap' }}>
                <span className="eyebrow">{k2}</span>
                <span className="serif-it" style={{ fontSize: 22, color: 'var(--fg)' }}>{v}</span>
                <span style={{ color: 'var(--magenta)', marginLeft: 12 }}>✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
)

// ─── Section header ──────────────────────────────────────────────
const SectionHeader = ({ num, title, italic, lead }) => {
  let titleEl = title
  if (italic && title.includes(italic)) {
    const parts = title.split(italic)
    titleEl = <>{parts[0]}<span className="accent-it">{italic}</span>{parts[1]}</>
  }
  return (
    <header style={{ marginBottom: 72 }}>
      <div className="reveal-soft" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
        <span className="eyebrow" style={{ color: 'var(--magenta)' }}>{num}</span>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <h2 className="display reveal" style={{ fontSize: 'clamp(48px, 7vw, 96px)', marginBottom: 24 }}>
        {titleEl}
      </h2>
      {lead && (
        <p className="serif reveal" style={{
          fontSize: 'clamp(20px, 2.2vw, 26px)',
          color: 'var(--fg-dim)', lineHeight: 1.45, maxWidth: 720,
          transitionDelay: '0.12s',
        }}>
          {lead}
        </p>
      )}
    </header>
  )
}

// ─── About — word illumination + portrait ────────────────────────
const PORTRAIT_SHAPES = {
  rounded: { radius: '28px',                   aspect: '4 / 5' },
  arch:    { radius: '999px 999px 28px 28px',  aspect: '4 / 5' },
  circle:  { radius: '50%',                    aspect: '1 / 1' },
}

export const About = () => {
  const a = content.about
  const shape = PORTRAIT_SHAPES[a.portraitShape] || PORTRAIT_SHAPES.rounded
  return (
    <section id="about" data-screen-label="01 About">
      <div className="wrap">
        <SectionHeader num={a.sectionNum} title={a.title} />

        <div className="grid-2" style={{
          display: 'grid', gridTemplateColumns: '1.15fr 0.85fr',
          gap: 80, alignItems: 'start',
        }}>
          {/* left — the statement, lit word by word as you scroll */}
          <div>
            <WordReveal
              style={{
                fontSize: 'clamp(24px, 2.6vw, 33px)',
                fontWeight: 500, lineHeight: 1.42,
                letterSpacing: '-0.015em',
                color: 'var(--fg)',
                marginBottom: 44,
              }}
              segments={a.statement}
            />
            <div className="reveal" style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--fg-dim)', maxWidth: 560 }}>
              {a.paragraphs.map((para, i) => (
                <p key={i} style={{ marginBottom: i === a.paragraphs.length - 1 ? 0 : 22 }}>{para}</p>
              ))}
            </div>

            {/* facts */}
            <div className="reveal stagger" style={{ marginTop: 52, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '26px 40px' }}>
              {a.facts.map(([k, v, sub], i) => (
                <div key={k} style={{ '--i': i, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>{k}</div>
                  <div className="serif" style={{ fontSize: 21, color: 'var(--fg)', marginBottom: 2 }}>{v}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: 'var(--fg-mute)' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right — portrait with parallax */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <Parallax amt={30}>
              <div style={{ position: 'relative' }}>
                {/* soft glow behind */}
                <div style={{
                  position: 'absolute', inset: -60,
                  background: 'radial-gradient(circle, rgba(217,70,239,0.14), transparent 65%)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'relative',
                  border: '1px solid var(--line-2)',
                  borderRadius: shape.radius,
                  padding: 10,
                  background: 'linear-gradient(180deg, rgba(245,243,255,0.03), rgba(245,243,255,0))',
                  transition: 'border-radius 0.6s var(--ease-out)',
                }}>
                  <img
                    src={PORTRAIT}
                    alt={content.meta.name}
                    style={{
                      display: 'block', width: '100%',
                      aspectRatio: shape.aspect,
                      objectFit: 'cover',
                      borderRadius: shape.radius,
                      overflow: 'hidden',
                      transition: 'border-radius 0.6s var(--ease-out)',
                    }}
                  />
                </div>
                {/* caption */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginTop: 16, padding: '0 6px',
                }}>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--fg-mute)' }}>
                    {a.portraitCaption}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--magenta)', boxShadow: '0 0 8px var(--magenta)' }}></span>
                    <span className="mono" style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--fg-dim)' }}>
                      {a.portraitBadge}
                    </span>
                  </span>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Experience ──────────────────────────────────────────────────
const ExperienceRow = ({ xp, last }) => (
  <article className="reveal exp-row" style={{
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    gap: 48,
    padding: '44px 0',
    borderBottom: last ? 'none' : '1px solid var(--line)',
  }}>
    <div className="exp-meta">
      <div className="mono" style={{ fontSize: 12, color: 'var(--fg-dim)', marginBottom: 8 }}>{xp.date}</div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-mute)' }}>{xp.where}</div>
      {xp.current && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          marginTop: 14, padding: '4px 10px',
          border: '1px solid var(--magenta)', color: 'var(--magenta)',
          borderRadius: 100,
          fontFamily: 'JetBrains Mono', fontSize: 10,
          letterSpacing: '0.25em', textTransform: 'uppercase',
        }}>
          <span style={{ width: 6, height: 6, background: 'var(--magenta)', borderRadius: '50%', boxShadow: '0 0 8px var(--magenta)' }}></span>
          Current
        </span>
      )}
    </div>
    <div className="exp-body">
      <h3 className="display" style={{ fontSize: 30, marginBottom: 8 }}>{xp.role}</h3>
      <div className="serif-it" style={{ fontSize: 20, color: 'var(--magenta)', marginBottom: 22 }}>{xp.company}</div>
      <ul className="stagger" style={{ listStyle: 'none', padding: 0, marginBottom: 22 }}>
        {xp.bullets.map((b, i) => (
          <li key={i} style={{
            '--i': i,
            fontSize: 15, lineHeight: 1.7, color: 'var(--fg)',
            paddingLeft: 24, position: 'relative', marginBottom: 10,
          }}>
            <span style={{ position: 'absolute', left: 0, top: 13, width: 10, height: 1, background: 'var(--magenta)' }}></span>
            {b}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {xp.stack.map(s => <span key={s} className="chip">{s}</span>)}
      </div>
    </div>
  </article>
)

export const Experience = () => {
  const e = content.experience
  return (
    <section id="experience" data-screen-label="02 Experience">
      <div className="wrap">
        <SectionHeader num={e.sectionNum} title={e.title} italic={e.italic} lead={e.lead} />
        <div>
          {e.roles.map((xp, i) => <ExperienceRow key={i} xp={xp} last={i === e.roles.length - 1} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Projects ────────────────────────────────────────────────────
const ProjectCard = ({ p, i }) => {
  const inner = (
    <>
      <div style={{
        position: 'absolute', top: -120, right: -120,
        width: 300, height: 300,
        background: `radial-gradient(circle, ${p.color}, transparent 70%)`,
        opacity: 0.14, pointerEvents: 'none',
      }}></div>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
          <span className="eyebrow" style={{ color: p.color }}>{p.n} · {p.date}</span>
          <span className="go-arrow" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 14L14 4M14 4H6.5M14 4v7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <h3 className="display" style={{
          fontSize: 'clamp(40px, 5vw, 62px)',
          marginBottom: 8,
          background: `linear-gradient(135deg, ${p.color}, var(--fg) 80%)`,
          WebkitBackgroundClip: 'text', backgroundClip: 'text',
          WebkitTextFillColor: 'transparent', color: 'transparent',
        }}>
          {p.name}
        </h3>
        <div className="serif-it" style={{ fontSize: 22, color: 'var(--fg-dim)', marginBottom: 10 }}>
          — {p.sub}
        </div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--fg-mute)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20 }}>
          {p.role}
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg)', marginBottom: 26 }}>
          {p.blurb}
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
        </div>
      </div>
    </>
  )

  const cardStyle = {
    padding: 44,
    position: 'relative',
    overflow: 'hidden',
    transitionDelay: `${i * 0.12}s`,
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
  }

  return p.link
    ? <a href={p.link} target="_blank" rel="noreferrer" className="reveal card" style={cardStyle}>{inner}</a>
    : <article className="reveal card" style={cardStyle}>{inner}</article>
}

export const Projects = () => {
  const pr = content.projects
  return (
    <section id="projects" data-screen-label="03 Projects">
      <div className="wrap">
        <SectionHeader num={pr.sectionNum} title={pr.title} italic={pr.italic} lead={pr.lead} />
        <div style={{ display: 'grid', gap: 28, gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))' }}>
          {pr.items.map((p, i) => <ProjectCard key={i} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Skills ──────────────────────────────────────────────────────
export const Skills = () => {
  const sk = content.skills
  return (
    <section id="skills" data-screen-label="04 Skills">
      <div className="wrap">
        <SectionHeader num={sk.sectionNum} title={sk.title} italic={sk.italic} lead={sk.lead} />
        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {Object.entries(sk.groups).map(([cat, list]) => (
            <div key={cat} className="reveal-soft" style={{ padding: '20px 0', borderTop: '1px solid var(--line)' }}>
              <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--magenta)' }}>{cat}</div>
              <div className="stagger" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {list.map((s, i) => <span key={s} className="chip" style={{ '--i': i }}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────
export const Contact = ({ resumeHref }) => {
  const c = content.contact
  const f = content.footer
  return (
    <section id="contact" data-screen-label="05 Contact" style={{ paddingBottom: 80 }}>
      <div className="wrap-tight" style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: -40, left: '50%',
          transform: 'translateX(-50%)',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(217,70,239,0.16), transparent 60%)',
          pointerEvents: 'none', zIndex: -1,
        }}></div>

        <div className="eyebrow reveal-soft" style={{ marginBottom: 28, color: 'var(--magenta)' }}>{c.eyebrow}</div>
        <h2 className="display reveal" style={{
          fontSize: 'clamp(56px, 9vw, 130px)',
          lineHeight: 0.92, marginBottom: 32,
        }}>
          {c.headingLine1}<br />
          <span className="accent-it" style={{ fontWeight: 400 }}>{c.headingLine2}</span>
        </h2>
        <p className="serif reveal" style={{
          fontSize: 20, color: 'var(--fg-dim)',
          marginBottom: 44, maxWidth: 540,
          marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.55,
          transitionDelay: '0.1s',
        }}>
          {c.blurb}
        </p>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 90, transitionDelay: '0.18s' }}>
          <a href={`mailto:${c.email}`} className="btn btn-primary">✉ {c.email}</a>
          {resumeHref && <a href={resumeHref} target="_blank" rel="noreferrer" className="btn">{c.resumeLabel}</a>}
          {c.socials.map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="btn">{s.label}</a>
          ))}
        </div>

        <div style={{ height: 1, background: 'var(--line)', marginBottom: 28 }}></div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-mute)', letterSpacing: '0.2em' }}>{f.left}</span>
          <span className="serif-it" style={{ fontSize: 16, color: 'var(--fg-mute)' }}>{f.center}</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--magenta)', letterSpacing: '0.2em' }}>{f.right}</span>
        </div>
      </div>
    </section>
  )
}
