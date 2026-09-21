import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate } from 'framer-motion'
import Lenis from 'lenis'
import { Menu as MenuIcon, X, Phone, MessageCircle, Heart, Building2, Cake, ChefHat, Sparkles, ArrowRight } from 'lucide-react'
import { packages } from './data'

const PHONE = '9975110727'
const WA = `https://wa.me/91${PHONE}`
const NAV = [['home', 'Home'], ['about', 'About'], ['menu', 'Menu'], ['gallery', 'Gallery'], ['contact', 'Contact']]
// Stock photos (Unsplash). Swap any ID here to change an image.
const P = {
  hero: 'photo-1519741497674-611481863552', arch: 'photo-1555244162-803834f70033', about: 'photo-1414235077428-338989a2e8c0',
  g1: 'photo-1478146059778-26028b07395a', g2: 'photo-1585937421612-70a008356fbe', g3: 'photo-1464366400600-7168b8af9bc3',
  g4: 'photo-1555939594-58d7cb561ad1', g5: 'photo-1601050690597-df0568f70950', g6: 'photo-1563805042-7684c019e1cb',
}
const ease = [0.22, 1, 0.36, 1]
const D = 1.6 // delay for hero sequence (after preloader)

const go = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

const Img = ({ id, w = 1200, className = '', alt = '' }) => {
  const [bad, setBad] = useState(false)
  if (bad) return <div role="img" aria-label={alt} className={`${className} bg-gradient-to-br from-cream via-amber-50 to-rose-100`} />
  return <img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`} alt={alt} loading="lazy" onError={() => setBad(true)} className={className} />
}

const Reveal = ({ children, delay = 0, y = 40, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
)
const Title = ({ children, className = '' }) => (
  <Reveal><h2 className={`font-display text-4xl font-semibold leading-[1.05] text-maroon md:text-6xl ${className}`}>{children}</h2></Reveal>
)

function Count({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [seen, to])
  return <span ref={ref}>{prefix}{n}{suffix}</span>
}

function Nav({ active }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const to = (id) => { setOpen(false); go(id) }
  return (
    <>
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1, delay: D, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'bg-white/85 py-2 shadow-[0_1px_0_rgba(184,137,58,.3)] backdrop-blur-xl' : 'py-4'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <button onClick={() => to('home')} className="flex items-center gap-3" aria-label="Shahu Catering home">
            <span className="block h-12 w-12 overflow-hidden rounded-full border border-gold/50 bg-cream">
              <img src="/logo.png" alt="" className="-ml-[65%] -mt-[6%] w-[230%] max-w-none" />
            </span>
            <span className="font-display text-2xl font-semibold leading-none text-maroon">Shahu Catering</span>
          </button>
          <nav className="hidden items-center gap-9 md:flex">
            {NAV.map(([id, l]) => (
              <button key={id} onClick={() => to(id)} className={`relative py-1 text-[15px] tracking-wide transition-colors ${active === id ? 'text-maroon' : 'text-neutral-600 hover:text-maroon'}`}>
                {l}{active === id && <motion.span layoutId="navline" className="absolute inset-x-0 -bottom-0.5 h-px bg-gold" />}
              </button>
            ))}
          </nav>
          <a href={`tel:${PHONE}`} className="hidden rounded-full bg-maroon px-6 py-2.5 text-sm text-white transition hover:bg-wine md:block">Call {PHONE}</a>
          <button className="text-maroon md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <MenuIcon />}</button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-white md:hidden">
            {NAV.map(([id, l], i) => (
              <motion.button key={id} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 * i, ease }} onClick={() => to(id)} className="font-display text-4xl text-maroon">{l}</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 140])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -70])
  const words = 'Feasts worth gathering for'.split(' ')
  return (
    <section id="home" ref={ref} className="relative overflow-hidden bg-white pt-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-wine/10 blur-3xl" />
      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 px-5 pb-20 md:px-8 lg:grid-cols-2">
        <div>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: D, duration: 0.9, ease }} className="mb-5 font-display text-2xl italic text-gold">Good food brings people together</motion.p>
          <h1 className="font-display text-6xl font-semibold leading-[0.98] text-maroon sm:text-7xl xl:text-8xl">
            {words.map((w, i) => (
              <span key={i} className="mr-4 inline-block overflow-hidden align-bottom">
                <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: D + 0.15 + i * 0.13, ease }}>{w}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 0.9, duration: 0.9, ease }} className="mt-7 max-w-lg text-lg leading-relaxed text-neutral-600">
            Weddings, receptions, birthdays and corporate events, catered with a full menu of live chaat, curries, Chinese and royal sweets.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1.1, duration: 0.9, ease }} className="mt-9 flex flex-wrap gap-4">
            <button onClick={() => go('menu')} className="group flex items-center gap-2 rounded-full bg-maroon px-8 py-4 text-white shadow-xl shadow-maroon/20 transition hover:bg-wine">Explore packages <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></button>
            <button onClick={() => go('contact')} className="rounded-full border border-gold px-8 py-4 text-maroon transition hover:bg-gold hover:text-white">Get a quote</button>
          </motion.div>
        </div>
        <div className="relative mx-auto h-[520px] w-full max-w-[520px] md:h-[640px]">
          <motion.div style={{ y: y1 }} initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ delay: D + 0.2, duration: 1.4, ease }} className="absolute right-0 top-0 h-[85%] w-[78%]">
            <Img id={P.hero} w={1000} alt="Wedding celebration" className="h-full w-full rounded-t-full border-[6px] border-white object-cover shadow-2xl" />
          </motion.div>
          <motion.div style={{ y: y2 }} initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ delay: D + 0.6, duration: 1.4, ease }} className="absolute bottom-0 left-0 h-[46%] w-[46%]">
            <Img id={P.arch} w={700} alt="Plated food" className="h-full w-full rounded-t-full border-[6px] border-white object-cover shadow-2xl" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: D + 1.6, type: 'spring' }} className="absolute right-0 top-[58%]">
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="rounded-2xl border border-gold/40 bg-white/95 px-5 py-4 text-center shadow-2xl backdrop-blur">
              <p className="text-xs text-neutral-500">Packages from</p>
              <p className="font-display text-3xl font-semibold text-maroon">₹280<span className="text-base font-normal"> / plate</span></p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const t = ['Weddings', 'Receptions', 'Engagements', 'Birthdays', 'Corporate events', 'Live counters', 'Royal sweets']
  return (
    <div className="overflow-hidden bg-maroon py-5">
      <motion.div className="flex w-max whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 32, ease: 'linear', repeat: Infinity }}>
        {[...t, ...t].map((x, i) => (
          <span key={i} className="flex items-center gap-12 pr-12 font-display text-2xl italic text-white/90">{x}<Sparkles className="h-4 w-4 text-gold" /></span>
        ))}
      </motion.div>
    </div>
  )
}

function About() {
  const stats = [[3, '', 'Signature packages'], [100, '+', 'Dishes to choose from'], [280, '', 'Starting price per plate', '₹'], [500, '+', 'Guests: package rates apply']]
  const svc = [[Heart, 'Weddings & receptions', 'Full multi-course menus for your biggest day.'], [Cake, 'Birthdays & parties', 'Chaat, snacks and sweets guests talk about.'], [Building2, 'Corporate events', 'Clean, on-time service for teams and clients.'], [ChefHat, 'Live counters', 'Dosa, chaat, Maggi and more, made fresh.']]
  return (
    <section id="about" className="bg-white py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border border-gold/60" />
            <Img id={P.about} alt="Chef plating a dish" className="relative h-[520px] w-full rounded-[2rem] object-cover" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-8 -right-3 w-40 rounded-2xl bg-white p-2 shadow-2xl md:w-52">
              <img src="/logo.png" alt="Shahu Catering logo" className="rounded-xl" />
            </motion.div>
          </div>
        </Reveal>
        <div>
          <Title>A kitchen that treats every plate like a guest of honour</Title>
          <Reveal delay={0.15}><p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">Shahu Catering & Event Management cooks and manages the food for your celebration, from the first welcome drink to the last spoon of halwa. Pick your dishes from a fixed-price package and we take care of the rest.</p></Reveal>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {stats.map(([n, s, l, p], i) => (
              <Reveal key={l} delay={0.1 * i} y={20}>
                <p className="font-display text-5xl font-semibold text-wine"><Count to={n} suffix={s} prefix={p} /></p>
                <p className="mt-1 text-sm text-neutral-500">{l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-24 grid max-w-7xl gap-5 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        {svc.map(([Icon, t, d], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <motion.div whileHover={{ y: -8 }} className="group h-full rounded-3xl border border-gold/25 bg-cream/60 p-7 transition-colors hover:border-gold hover:bg-white hover:shadow-xl">
              <Icon className="h-9 w-9 text-gold transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
              <h3 className="mt-5 font-display text-2xl font-semibold text-maroon">{t}</h3>
              <p className="mt-2 text-neutral-600">{d}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function MenuSection() {
  const [i, setI] = useState(0)
  const p = packages[i]
  return (
    <section id="menu" className="bg-cream py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <Title>Choose your package, then pick your dishes</Title>
          <Reveal delay={0.1}><p className="mx-auto mt-5 max-w-xl text-neutral-600">Prices are per plate. Each course shows how many dishes you can choose.</p></Reveal>
        </div>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap justify-center gap-2">
          {packages.map((x, k) => (
            <button key={x.id} onClick={() => setI(k)} className="relative rounded-full px-7 py-3 text-[15px] transition-colors" style={{ color: i === k ? '#fff' : '#5a1420' }}>
              {i === k && <motion.span layoutId="pkg" className="absolute inset-0 rounded-full bg-maroon" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
              <span className="relative">{x.name} · ₹{x.price}</span>
            </button>
          ))}
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease }}>
            <p className="mt-8 text-center font-display text-2xl italic text-gold">{p.tag}</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {p.cats.map(([t, b, items], k) => (
                <motion.div key={t} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * k, duration: 0.6, ease }} whileHover={{ y: -6 }}
                  className="rounded-3xl border border-gold/25 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-2xl font-semibold text-maroon">{t}</h3>
                    <span className="shrink-0 rounded-full bg-gold/15 px-3 py-1 text-xs text-gold">{b}</span>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {items.map((it) => <li key={it} className="rounded-full border border-gold/30 bg-cream/70 px-3 py-1 text-[13px] text-neutral-700">{it}</li>)}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <Reveal className="mx-auto mt-14 max-w-2xl rounded-3xl border border-maroon/15 bg-white p-7 text-center">
          <p className="font-display text-2xl text-maroon">These rates apply to events above 500 guests</p>
          <p className="mt-2 text-neutral-600">Full payment must be deposited before the event starts.</p>
          <button onClick={() => go('contact')} className="mt-5 rounded-full bg-maroon px-8 py-3 text-white transition hover:bg-wine">Check my date</button>
        </Reveal>
      </div>
    </section>
  )
}

function Gallery() {
  const g = [[P.g1, 'Reception setups', 'row-span-2'], [P.g2, 'Rich curries', ''], [P.g3, 'Wedding tables', ''], [P.g4, 'Live grills', ''], [P.g5, 'Biryani & pulao', 'row-span-2'], [P.g6, 'Cold desserts', '']]
  return (
    <section id="gallery" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Title className="max-w-3xl">Moments from tables we have set</Title>
        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-3 lg:auto-rows-[260px]">
          {g.map(([id, cap, span], i) => (
            <Reveal key={id} delay={(i % 3) * 0.1} y={30} className={`group relative overflow-hidden rounded-3xl ${span}`}>
              <Img id={id} w={900} alt={cap} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <p className="absolute bottom-4 left-5 font-display text-2xl text-white">{cap}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const inp = 'w-full rounded-xl border border-gold/30 bg-white px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20'
function Contact() {
  const send = (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.target))
    const msg = `Hello Shahu Catering! I'd like a quote.\nName: ${f.name}\nPhone: ${f.phone}\nEvent date: ${f.date || '-'}\nGuests: ${f.guests || '-'}\nPackage: ${f.pkg}\n${f.note || ''}`
    window.open(`${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }
  return (
    <section id="contact" className="bg-cream py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <Title>Tell us about your event</Title>
          <Reveal delay={0.1}><p className="mt-6 max-w-md text-lg text-neutral-600">Share the date and guest count. We will reply with a menu and quote for your celebration.</p></Reveal>
          <Reveal delay={0.2} className="mt-10 space-y-4">
            <a href={`tel:${PHONE}`} className="flex items-center gap-4 rounded-2xl border border-gold/30 bg-white p-5 transition hover:shadow-xl"><Phone className="text-gold" /><span><span className="block text-sm text-neutral-500">Mr. Dipesh Shahu</span><span className="font-display text-3xl text-maroon">{PHONE}</span></span></a>
            <a href={WA} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-gold/30 bg-white p-5 transition hover:shadow-xl"><MessageCircle className="text-gold" /><span className="text-lg text-maroon">Chat on WhatsApp</span></a>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <form onSubmit={send} className="grid gap-4 rounded-3xl border border-gold/25 bg-white p-7 shadow-xl sm:grid-cols-2 md:p-9">
            <input required name="name" placeholder="Your name" className={inp} />
            <input required name="phone" type="tel" placeholder="Phone number" className={inp} />
            <input name="date" type="date" aria-label="Event date" className={inp} />
            <input name="guests" type="number" min="1" placeholder="Number of guests" className={inp} />
            <select name="pkg" aria-label="Package" className={`${inp} sm:col-span-2`}>{packages.map((x) => <option key={x.id}>{x.name} · ₹{x.price} per plate</option>)}</select>
            <textarea name="note" rows="3" placeholder="Anything else we should know?" className={`${inp} sm:col-span-2`} />
            <button className="rounded-full bg-maroon py-4 text-white transition hover:bg-wine sm:col-span-2">Send enquiry on WhatsApp</button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gold/40 bg-white py-12 text-center">
      <img src="/logo.png" alt="Shahu Catering" className="mx-auto w-40 mix-blend-multiply" />
      <div className="mt-6 flex flex-wrap justify-center gap-7 text-neutral-600">{NAV.map(([id, l]) => <button key={id} onClick={() => go(id)} className="transition hover:text-maroon">{l}</button>)}</div>
      <p className="mt-6 text-sm text-neutral-400">© {new Date().getFullYear()} Shahu Catering & Event Management</p>
    </footer>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState('home')
  const { scrollYProgress } = useScroll()
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useEffect(() => { const t = setTimeout(() => setReady(true), 1500); return () => clearTimeout(t) }, [])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis({ duration: 1.25 })
    window.__lenis = l
    let id
    const raf = (t) => { l.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); l.destroy(); window.__lenis = null }
  }, [])
  useEffect(() => {
    const o = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) o.observe(el) })
    return () => o.disconnect()
  }, [])
  return (
    <>
      <AnimatePresence>
        {!ready && (
          <motion.div key="pre" exit={{ y: '-100%' }} transition={{ duration: 0.9, ease }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
            <motion.img src="/logo.png" alt="" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="w-56 mix-blend-multiply" />
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.3 }} className="mt-6 h-px w-40 origin-left bg-gold" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div style={{ scaleX: sx }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gold" />
      <Nav active={active} />
      <main><Hero /><Marquee /><About /><MenuSection /><Gallery /><Contact /></main>
      <Footer />
      <a href={WA} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-maroon text-white shadow-2xl">
        <span className="absolute inset-0 animate-ping rounded-full bg-maroon/40" /><MessageCircle className="relative" />
      </a>
    </>
  )
}
