import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useInView, animate } from 'framer-motion'
import Lenis from 'lenis'
import {
  Menu as MenuIcon,
  X,
  Phone,
  MessageCircle,
  Heart,
  Building2,
  Cake,
  ChefHat,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import { packages } from './data'

const PHONE = '9975110727'
const FORM_PHONE = '9795255947'
const wa = (text, phone = PHONE) => `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`
const WA_DEFAULT = wa(
  "Hello Shahu Catering! I found your website and I'd like to know more about your catering packages. Could you please share the menu and pricing?"
)

const NAV = [
  ['home', 'Home'],
  ['about', 'About'],
  ['menu', 'Menu'],
  ['gallery', 'Gallery'],
  ['contact', 'Contact'],
]

// Stock photos (Unsplash).
const P = {
  hero: 'photo-1519741497674-611481863552',
  about: 'photo-1414235077428-338989a2e8c0',
  g1: 'photo-1478146059778-26028b07395a',
  g2: 'photo-1585937421612-70a008356fbe',
  g3: 'photo-1464366400600-7168b8af9bc3',
  g4: 'photo-1555939594-58d7cb561ad1',
  g5: 'photo-1601050690597-df0568f70950',
  g6: 'photo-1563805042-7684c019e1cb',
}

const ease = [0.22, 1, 0.36, 1]

const go = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72, duration: 1.2 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

const Img = ({ id, w = 1200, className = '', alt = '' }) => {
  const [bad, setBad] = useState(false)
  if (bad) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${className} bg-gradient-to-br from-cream via-[#f7f1e6] to-[#ebdcbe]`}
      />
    )
  }
  return (
    <img
      src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`}
      alt={alt}
      loading="lazy"
      onError={() => setBad(true)}
      className={className}
    />
  )
}

const Reveal = ({ children, delay = 0, y = 25, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.75, delay, ease }}
  >
    {children}
  </motion.div>
)

const Title = ({ children, className = '', subtitle = '' }) => (
  <Reveal>
    {subtitle && (
      <p className="mb-2 text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold font-medium">
        {subtitle}
      </p>
    )}
    <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] text-maroon ${className}`}>
      {children}
    </h2>
  </Reveal>
)

function Count({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    const c = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [seen, to])
  return <span ref={ref}>{prefix}{n}{suffix}</span>
}

function Nav({ active }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 30)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const to = (id) => {
    setOpen(false)
    go(id)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          solid
            ? 'bg-white/95 py-2.5 sm:py-3 shadow-[0_1px_0_rgba(184,137,58,0.25)] backdrop-blur-md'
            : 'bg-white/80 py-3 sm:py-4 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          <button onClick={() => to('home')} className="flex items-center gap-2.5 sm:gap-3 text-left" aria-label="Shahu Catering home">
            <span className="block h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-full border border-gold/40 bg-cream p-0.5 shadow-sm">
              <img src="/logo.webp" onError={(e) => { e.currentTarget.src = '/logo.png' }} alt="" className="h-full w-full object-cover rounded-full" />
            </span>
            <div>
              <span className="block font-display text-lg sm:text-xl md:text-2xl font-semibold leading-tight text-maroon">
                Shahu Catering
              </span>
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gold font-medium">
                Event Management
              </span>
            </div>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map(([id, l]) => (
              <button
                key={id}
                onClick={() => to(id)}
                className={`relative py-1 text-[15px] font-medium tracking-wide transition-colors ${
                  active === id ? 'text-maroon' : 'text-neutral-600 hover:text-maroon'
                }`}
              >
                {l}
                {active === id && (
                  <motion.span
                    layoutId="navline"
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-gold"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href={`tel:${PHONE}`}
              className="group flex items-center gap-2 rounded-full border border-gold/40 bg-cream/60 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-maroon transition hover:border-gold hover:bg-maroon hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-gold group-hover:text-white" />
              <span>{PHONE}</span>
            </a>
          </div>

          <button
            className="flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center p-2 text-maroon md:hidden active:scale-95"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu with >= 48px Tap Targets & Scroll Lock */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex min-h-[100svh] flex-col justify-between bg-white px-6 py-6 md:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <div className="flex items-center gap-3">
                <span className="block h-10 w-10 overflow-hidden rounded-full border border-gold/40 bg-cream p-0.5">
                  <img src="/logo.webp" onError={(e) => { e.currentTarget.src = '/logo.png' }} alt="" className="h-full w-full object-cover rounded-full" />
                </span>
                <span className="font-display text-xl font-semibold text-maroon">Shahu Catering</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-full text-maroon hover:bg-cream active:scale-95"
                aria-label="Close menu"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <div className="my-auto flex flex-col items-center gap-2 py-8">
              {NAV.map(([id, l]) => (
                <button
                  key={id}
                  onClick={() => to(id)}
                  className={`flex min-h-[48px] w-full items-center justify-center py-2 font-display text-3xl font-medium transition ${
                    active === id ? 'text-maroon font-semibold' : 'text-neutral-600 hover:text-maroon active:text-gold'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gold/20">
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-maroon py-3.5 text-sm font-semibold text-white shadow-md active:bg-wine"
              >
                <MessageCircle className="h-4 w-4 text-gold" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${PHONE}`}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-gold/50 bg-cream/60 py-3.5 text-sm font-semibold text-maroon active:bg-cream"
              >
                <Phone className="h-4 w-4 text-gold" />
                <span>Call {PHONE}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Hero() {
  return (
    <section id="home" className="relative bg-white pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 min-h-[100svh] flex flex-col justify-center overflow-hidden">
      {/* Subtle gold ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[350px] sm:h-[450px] w-[600px] sm:w-[750px] rounded-full bg-gold/10 blur-[100px] sm:blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 w-full">
        {/* Top Editorial Eyebrow Bar */}
        <div className="flex items-center justify-between border-b border-gold/25 pb-3 sm:pb-4 mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold font-medium">
            Royal Banquets & Catering
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] text-neutral-400">
            Pure Vegetarian Excellence
          </span>
          <span className="text-[11px] sm:text-xs tracking-wider text-maroon font-medium">
            Ph: {PHONE}
          </span>
        </div>

        {/* Large Serif Headline & Vertically Stacked Responsive Intro */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start lg:items-end mb-8 sm:mb-12">
          <div className="lg:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.3rem] font-semibold text-maroon leading-[1.02] tracking-tight"
            >
              Feasts Worth <br />
              <span className="italic font-normal text-gold">Gathering For.</span>
            </motion.h1>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed font-sans"
            >
              From royal wedding banquets to intimate celebrations. Multi-course vegetarian feasts curated with live counters, artisanal chaat, and royal sweets.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center"
            >
              <button
                onClick={() => go('menu')}
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-maroon/15 transition hover:bg-wine active:scale-95"
              >
                <span>Explore Curated Menus</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 text-gold" />
              </button>
              <button
                onClick={() => go('contact')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-gold/70 px-7 py-3.5 text-sm font-semibold text-maroon transition hover:bg-gold hover:text-white active:scale-95"
              >
                Check Date Availability
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bold Full-Width Composition with Big Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease }}
          className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-gold/30 shadow-xl sm:shadow-2xl"
        >
          <div className="relative h-[260px] xs:h-[320px] sm:h-[420px] md:h-[520px] w-full">
            <Img
              id={P.hero}
              w={1800}
              alt="Luxury wedding banquet and catering setup by Shahu Catering"
              className="h-full w-full object-cover"
            />
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-black/30 to-transparent" />

            {/* Asymmetric Floating Insignia & Caption Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 md:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] sm:text-xs uppercase tracking-wider text-maroon font-semibold mb-2 sm:mb-3 shadow">
                  <Sparkles className="h-3 w-3 text-gold" /> Live Sigdi, Chaat & Royal Sweets
                </span>
                <p className="font-display text-xl sm:text-2xl md:text-3xl text-white font-medium leading-snug">
                  Impeccably prepared vegetarian banquets tailored for 500 to 5,000+ guests.
                </p>
              </div>

              {/* Floating Package Seal */}
              <div className="self-start sm:self-auto rounded-xl border border-gold/40 bg-white/95 backdrop-blur-md p-3.5 sm:p-5 text-left sm:text-right shadow-2xl">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Bespoke Catering From</p>
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-maroon">
                  ₹280<span className="text-xs sm:text-sm font-normal text-neutral-600"> / plate</span>
                </p>
                <p className="text-[11px] sm:text-xs text-gold font-medium mt-0.5">Silver · Golden · Platinum</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Editorial Sub-bar with 3 Key Highlights */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-5 sm:pt-6 border-t border-gold/20">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="font-display text-xl sm:text-2xl text-gold font-semibold leading-none">01</span>
            <div>
              <p className="text-sm font-semibold text-maroon">Authentic Heritage Flavors</p>
              <p className="text-xs text-neutral-500 mt-0.5">Traditional recipes cooked fresh with premium pure-veg ingredients</p>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="font-display text-xl sm:text-2xl text-gold font-semibold leading-none">02</span>
            <div>
              <p className="text-sm font-semibold text-maroon">Signature Live Counters</p>
              <p className="text-xs text-neutral-500 mt-0.5">Sigdi dosa, live pasta, Chinese, Maggi, and custom chaat bars</p>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="font-display text-xl sm:text-2xl text-gold font-semibold leading-none">03</span>
            <div>
              <p className="text-sm font-semibold text-maroon">Seamless Banquet Management</p>
              <p className="text-xs text-neutral-500 mt-0.5">Dedicated service staff and punctual hospitality for every celebration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const t = [
    'Weddings & Receptions',
    'Signature Live Counters',
    'Artisanal Chaat & Sigdi',
    'Royal Indian Sweets',
    'Corporate Banquets',
    'Milestone Birthdays',
    'Pure Vegetarian Heritage',
  ]
  return (
    <div className="overflow-hidden border-y border-gold/30 bg-maroon py-3.5 sm:py-4">
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {[...t, ...t].map((x, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-10 pr-8 sm:pr-10 font-display text-lg sm:text-xl md:text-2xl italic text-white/95">
            {x}
            <Sparkles className="h-3.5 w-3.5 text-gold" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function About() {
  const stats = [
    [3, '', 'Signature packages', ''],
    [100, '+', 'Dishes to choose from', ''],
    [280, '', 'Starting price per plate', '₹'],
    [500, '+', 'Guests: package rates apply', ''],
  ]

  const services = [
    {
      num: '01',
      icon: Heart,
      title: 'Weddings & Receptions',
      desc: 'Complete multi-course royal dining crafted to leave an unforgettable impression on every wedding guest.',
    },
    {
      num: '02',
      icon: Cake,
      title: 'Birthdays & Milestones',
      desc: 'Vibrant live food counters, artisanal chaat, and indulgent mithai that keep guests raving.',
    },
    {
      num: '03',
      icon: Building2,
      title: 'Corporate Banquets',
      desc: 'Punctual, dignified dining logistics and hygienic service for corporate conferences, galas, and gatherings.',
    },
    {
      num: '04',
      icon: ChefHat,
      title: 'Signature Live Counters',
      desc: 'Made-to-order Sigdi dosas, sizzling Chinese pans, live Maggi, and custom pasta bars served piping hot.',
    },
  ]

  return (
    <section id="about" className="bg-white py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Asymmetric Editorial Spread */}
        <div className="grid items-center gap-10 sm:gap-16 lg:grid-cols-12">
          {/* Left: Asymmetric Framed Imagery */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                <div className="absolute -left-2 -top-2 sm:-left-3 sm:-top-3 h-full w-full rounded-2xl border border-gold/40" />
                <Img
                  id={P.about}
                  alt="Chef preparing luxury banquet meal"
                  className="relative h-[340px] sm:h-[440px] md:h-[500px] w-full rounded-2xl object-cover shadow-xl"
                />
                {/* Floating Medallion */}
                <div className="absolute -bottom-5 -right-2 sm:-bottom-6 sm:-right-4 flex items-center gap-2.5 sm:gap-3 rounded-xl border border-gold/30 bg-white p-2.5 sm:p-4 shadow-xl">
                  <span className="block h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border border-gold/40 bg-cream p-0.5">
                    <img src="/logo.webp" onError={(e) => { e.currentTarget.src = '/logo.png' }} alt="Shahu Logo" className="h-full w-full object-cover rounded-full" />
                  </span>
                  <div>
                    <p className="font-display text-sm sm:text-base font-semibold text-maroon leading-tight">Shahu Catering</p>
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gold font-medium">Catering & Events</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Editorial Narrative & Statistics */}
          <div className="lg:col-span-7">
            <Title subtitle="Our Culinary Philosophy">
              A kitchen that treats every plate like a guest of honour.
            </Title>
            <Reveal delay={0.1}>
              <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-neutral-600">
                At Shahu Catering & Event Management, food is never an afterthought—it is the centerpiece of memory. From the first refreshing welcome punch to the final spoon of warm Gulab Jamun or Basundi, our team handles every preparation with authentic regional taste, strict hygiene, and warm hospitality.
              </p>
            </Reveal>

            {/* Metrics separated by thin gold hairlines (no rounded card boxes) */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-y-6 sm:gap-y-8 gap-x-4 sm:gap-x-6 border-t border-gold/20 pt-6 sm:pt-8 sm:grid-cols-4">
              {stats.map(([n, s, l, p], i) => (
                <Reveal key={l} delay={0.06 * i} y={15} className="border-l border-gold/30 pl-3 sm:pl-4">
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-maroon">
                    <Count to={n} suffix={s} prefix={p} />
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 leading-snug">{l}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Services Breakdown: Editorial Grid with Thin Gold Hairlines */}
        <div className="mt-16 sm:mt-24 border-t border-gold/20 pt-12 sm:pt-16">
          <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold font-medium">Bespoke Services</p>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-maroon">What We Bring to Your Feast</h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm">
              Tailored culinary execution across wedding celebrations, private parties, and corporate events.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((svc, i) => {
              const Icon = svc.icon
              return (
                <Reveal key={svc.title} delay={i * 0.06}>
                  <div className="group relative border-t border-gold/30 pt-5 sm:pt-6 transition-all duration-300 hover:border-gold">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-semibold tracking-widest text-gold">{svc.num}</span>
                      <Icon className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h4 className="mt-3 sm:mt-4 font-display text-xl sm:text-2xl font-semibold text-maroon">{svc.title}</h4>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-neutral-600">{svc.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function MenuSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const currentPkg = packages[activeIdx]

  return (
    <section id="menu" className="bg-[#faf6ee] py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center">
          <Title subtitle="Curated Banquet Packages">
            The Printed Banquet Menu
          </Title>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-neutral-600">
              Select your package below. Each course details the allowance of selections included in your per-plate tariff.
            </p>
          </Reveal>
        </div>

        {/* Tab Selection: Horizontally Scrollable on Mobile with Clear Active State */}
        <Reveal delay={0.12} className="mt-8 sm:mt-10 flex overflow-x-auto no-scrollbar py-2 sm:justify-center gap-2 sm:gap-3 px-1 -mx-1">
          {packages.map((pkg, idx) => {
            const isSelected = activeIdx === idx
            return (
              <button
                key={pkg.id}
                onClick={() => setActiveIdx(idx)}
                className={`relative shrink-0 rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-300 min-h-[44px] flex items-center justify-center ${
                  isSelected
                    ? 'bg-maroon text-white shadow-md'
                    : 'border border-gold/40 bg-white text-maroon hover:border-gold hover:bg-cream active:scale-95'
                }`}
              >
                <span className="tracking-wide">
                  {pkg.name} · ₹{pkg.price}
                </span>
              </button>
            )
          })}
        </Reveal>

        {/* The Printed Restaurant Menu Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPkg.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
            className="mt-8 sm:mt-12"
          >
            <div className="relative rounded-xl sm:rounded-2xl border-2 border-[#d6b77c] bg-[#fdfbf7] p-5 sm:p-10 md:p-14 shadow-xl sm:shadow-2xl">
              {/* Inner delicate gold hairline border */}
              <div className="pointer-events-none absolute inset-2 sm:inset-4 md:inset-5 rounded-lg sm:rounded-xl border border-gold/30" />

              {/* Menu Card Masthead */}
              <div className="relative z-10 border-b border-gold/30 pb-6 sm:pb-8 text-center">
                <div className="mb-2 flex items-center justify-center gap-2.5 sm:gap-3">
                  <span className="h-px w-8 sm:w-10 bg-gold/50" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold font-semibold">
                    Shahu Catering & Event Management
                  </span>
                  <span className="h-px w-8 sm:w-10 bg-gold/50" />
                </div>

                <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-maroon tracking-tight">
                  {currentPkg.name} Collection
                </h3>

                <p className="mt-1.5 sm:mt-2 font-display text-lg sm:text-2xl italic text-gold">
                  {currentPkg.tag}
                </p>

                <div className="mt-4 sm:mt-5 inline-flex items-baseline gap-1.5 sm:gap-2 rounded-full border border-gold/40 bg-white px-4 sm:px-5 py-1 sm:py-1.5 shadow-sm">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500 font-medium">Per Plate</span>
                  <span className="font-display text-xl sm:text-2xl font-bold text-maroon">₹{currentPkg.price}</span>
                  <span className="text-[10px] sm:text-xs text-neutral-500">all inclusive</span>
                </div>
              </div>

              {/* Courses Breakdown: Single Column on Mobile, 2 Columns on md+ */}
              <div className="relative z-10 mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-8">
                {currentPkg.cats.map(([courseTitle, countNote, items]) => (
                  <div key={courseTitle} className="border-b border-gold/20 pb-4 sm:pb-5">
                    {/* Course Header with small right-aligned count note */}
                    <div className="flex items-baseline justify-between gap-3 border-b border-gold/15 pb-1.5 mb-2 sm:mb-2.5">
                      <h4 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-maroon tracking-tight">
                        {courseTitle}
                      </h4>
                      <span className="shrink-0 text-[11px] sm:text-xs uppercase tracking-wider text-gold font-medium italic">
                        {countNote}
                      </span>
                    </div>

                    {/* Dishes as a clean, flowing editorial list (minimum 14px text) */}
                    <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-neutral-700">
                      {items.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Menu Card Policy & 'Book this package' WhatsApp CTA */}
              <div className="relative z-10 mt-10 sm:mt-12 border-t border-gold/30 pt-6 sm:pt-8 text-center">
                <div className="mx-auto max-w-xl">
                  <p className="font-display text-lg sm:text-xl text-maroon font-medium">
                    Package rates apply to gatherings of 500+ guests
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                    Custom live counters, dietary variations, and live sweet sizzlers can be arranged. Full payment is deposited prior to the start of the event.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <a
                      href={wa(
                        `Hello Shahu Catering! I'm interested in the ${currentPkg.name} package (₹{currentPkg.price} per plate). Please share availability and a quote for my event.`
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-maroon px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-wine active:scale-95"
                    >
                      <span>Book this package</span>
                      <ArrowRight className="h-4 w-4 text-gold" />
                    </a>
                    <button
                      onClick={() => go('contact')}
                      className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center rounded-full border border-gold/60 bg-white px-7 py-3.5 text-sm font-medium text-maroon transition hover:bg-cream active:scale-95"
                    >
                      Customize in Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Gallery() {
  const g = [
    [P.g1, 'Grand Reception Banquets', 'md:col-span-2 md:row-span-2'],
    [P.g2, 'Rich Heritage Curries', ''],
    [P.g3, 'Bespoke Wedding Tables', ''],
    [P.g4, 'Live Sigdi & Tandoor Grills', ''],
    [P.g5, 'Aromatic Biryanis & Pulaos', 'md:col-span-2'],
    [P.g6, 'Royal Mithai & Desserts', ''],
  ]

  return (
    <section id="gallery" className="bg-white py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Title subtitle="Visual Showcase">
            Moments From Tables We Have Set
          </Title>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 max-w-md">
            A glimpse into the celebrations, live counters, and multi-course feasts curated across hundreds of memorable gatherings.
          </p>
        </div>

        {/* Gallery: 2 Columns on Mobile with Consistent Heights */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {g.map(([id, caption, spanClass], i) => (
            <Reveal
              key={id}
              delay={(i % 3) * 0.06}
              y={20}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-gold/25 aspect-[4/3] sm:aspect-auto sm:h-64 md:h-[290px] ${spanClass}`}
            >
              <Img
                id={id}
                w={1000}
                alt={caption}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/85 via-maroon/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
              <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5">
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-gold font-medium">Shahu Gallery</span>
                <p className="font-display text-sm sm:text-xl md:text-2xl text-white font-medium leading-tight">{caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// Input font size minimum 16px (text-base) prevents iOS auto-zoom
const inp =
  'w-full rounded-xl border border-gold/30 bg-white px-4 py-3.5 text-base text-neutral-800 outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/30'

function Contact() {
  const [status, setStatus] = useState('idle') // 'idle' | 'success'
  const [lastData, setLastData] = useState(null)
  const [waUrl, setWaUrl] = useState('')

  const send = (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.target))
    setLastData(f)

    const msg = `Hello Shahu Catering! I would like to request a quotation for an upcoming event:

• Name: ${f.name}
• Phone: ${f.phone}
• Email: ${f.email || 'Not provided'}
• Event Date: ${f.date || 'To be decided'}
• Estimated Guests: ${f.guests || 'Not specified'}
• Package: ${f.pkg}
• Notes & Preferences: ${f.note || 'None'}`

    const url = wa(msg, FORM_PHONE)
    setWaUrl(url)
    setStatus('success')
    window.open(url, '_blank', 'noreferrer')
  }

  return (
    <section id="contact" className="bg-[#faf6ee] py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 sm:gap-16 px-4 sm:px-6 md:px-8 lg:grid-cols-12">
        {/* Left: Concierge Inquiry Information */}
        <div className="lg:col-span-5">
          <Title subtitle="Concierge & Inquiries">
            Tell us about your celebration.
          </Title>
          <Reveal delay={0.1}>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-neutral-600">
              Share your expected guest count and event date. We will prepare an exact proposal, menu breakdown, and quote tailored to your banquet.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
            <a
              href={`tel:${PHONE}`}
              className="flex min-h-[48px] items-center gap-3.5 sm:gap-4 rounded-2xl border border-gold/35 bg-white p-4 sm:p-5 shadow-sm transition hover:border-gold hover:shadow-lg active:scale-95"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-maroon">
                <Phone className="h-5 w-5 text-gold" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 font-medium">Direct Inquiries · Mr. Dipesh Shahu</span>
                <span className="font-display text-2xl sm:text-3xl font-semibold text-maroon">{PHONE}</span>
              </div>
            </a>

            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[48px] items-center gap-3.5 sm:gap-4 rounded-2xl border border-gold/35 bg-white p-4 sm:p-5 shadow-sm transition hover:border-gold hover:shadow-lg active:scale-95"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-maroon">
                <MessageCircle className="h-5 w-5 text-gold" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 font-medium">Instant Consultation</span>
                <span className="font-display text-2xl font-semibold text-maroon">Chat on WhatsApp</span>
              </div>
            </a>
          </Reveal>

          <div className="mt-6 sm:mt-8 border-t border-gold/20 pt-5 sm:pt-6 space-y-2">
            <div className="flex items-center gap-2.5 text-xs text-neutral-600">
              <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
              <span>Menu tastings and live counter customizations available</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-600">
              <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
              <span>Packages apply for 500+ guests with dedicated service crew</span>
            </div>
          </div>
        </div>

        {/* Right: Quotation Form */}
        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            {status === 'success' ? (
              <div className="rounded-2xl border border-gold/40 bg-white p-6 sm:p-12 shadow-xl text-center">
                <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-cream text-gold mb-4 sm:mb-5 border border-gold/30">
                  <CheckCircle2 className="h-8 w-8 sm:h-9 sm:w-9 text-gold" />
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-semibold text-maroon">
                  Inquiry Dispatched to WhatsApp
                </h3>
                <p className="mt-2.5 sm:mt-3 text-neutral-600 leading-relaxed text-sm sm:text-base max-w-lg mx-auto">
                  Thank you, <span className="font-semibold text-maroon">{lastData?.name}</span>. WhatsApp has been opened with your event details pre-filled. Simply send the message to connect directly with Mr. Dipesh Shahu.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-wine w-full sm:w-auto active:scale-95"
                  >
                    <MessageCircle className="h-4 w-4 text-gold" />
                    <span>Open in WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-gold/50 px-7 py-3.5 text-sm font-medium text-maroon transition hover:bg-cream w-full sm:w-auto active:scale-95 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={send}
                className="rounded-2xl border border-gold/35 bg-white p-5 sm:p-8 md:p-10 shadow-xl"
              >
                <div className="mb-5 sm:mb-6 border-b border-gold/20 pb-3 sm:pb-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-maroon">
                    Request a Quotation
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    Fill in your details below to generate your banquet proposal and connect directly on WhatsApp with our team.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                      Your Name *
                    </label>
                    <input required name="name" type="text" placeholder="e.g. Ramesh Patil" className={inp} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                      Phone Number *
                    </label>
                    <input required name="phone" type="tel" placeholder="e.g. 9876543210" className={inp} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                      Email Address <span className="text-neutral-400 normal-case">(optional)</span>
                    </label>
                    <input name="email" type="email" placeholder="e.g. ramesh@example.com" className={inp} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                      Event Date
                    </label>
                    <input name="date" type="date" aria-label="Event date" className={inp} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                      Estimated Guests
                    </label>
                    <input name="guests" type="number" min="1" placeholder="e.g. 600" className={inp} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                      Select Package
                    </label>
                    <select name="pkg" aria-label="Package" className={inp}>
                      {packages.map((x) => (
                        <option key={x.id} value={`${x.name} (₹${x.price}/plate)`}>
                          {x.name} · ₹{x.price} per plate ({x.tag})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-600 font-medium mb-1.5">
                      Additional Notes & Preferences
                    </label>
                    <textarea
                      name="note"
                      rows="3"
                      placeholder="Specific live counters, event venue, or menu preferences..."
                      className={inp}
                    />
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <button
                      type="submit"
                      className="w-full min-h-[48px] rounded-full bg-maroon py-3.5 sm:py-4 text-sm font-semibold text-white shadow-lg shadow-maroon/20 transition hover:bg-wine flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 text-gold" />
                      <span>Submit Catering Inquiry via WhatsApp</span>
                    </button>
                    <p className="mt-2 text-center text-[11px] text-neutral-500">
                      Directly opens WhatsApp with your pre-filled inquiry details for an instant response.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gold/30 bg-white pt-12 pb-28 md:pb-14 text-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center">
          <span className="block h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-full border border-gold/40 bg-cream p-1 shadow-sm">
            <img src="/logo.webp" onError={(e) => { e.currentTarget.src = '/logo.png' }} alt="Shahu Catering Logo" className="h-full w-full object-cover rounded-full" />
          </span>
          <h4 className="mt-3 font-display text-xl sm:text-2xl font-semibold text-maroon">
            Shahu Catering & Event Management
          </h4>
          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gold font-medium">
            Pure Vegetarian Catering & Grand Banquets
          </p>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-6 sm:gap-8 text-sm font-medium text-neutral-600">
          {NAV.map(([id, l]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="transition hover:text-maroon min-h-[44px] flex items-center"
            >
              {l}
            </button>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 border-t border-gold/15 pt-5 sm:pt-6 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Shahu Catering & Event Management. All rights reserved.</p>
          <p className="mt-1">Inquiries: +91 {PHONE} · Dedicated Event Management Services</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [active, setActive] = useState('home')
  const { scrollYProgress } = useScroll()
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis({ duration: 1.25 })
    window.__lenis = l
    let id
    const raf = (t) => {
      l.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      l.destroy()
      window.__lenis = null
    }
  }, [])

  useEffect(() => {
    const o = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        }),
      { rootMargin: '-35% 0px -45% 0px' }
    )
    NAV.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) o.observe(el)
    })
    return () => o.disconnect()
  }, [])

  return (
    <>
      {/* Top Gold Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: sx }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gold"
      />

      <Nav active={active} />

      <main className="overflow-x-hidden">
        <Hero />
        <Marquee />
        <About />
        <MenuSection />
        <Gallery />
        <Contact />
      </main>

      <Footer />

      {/* Mobile-Only Sticky Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-gold/30 bg-white/95 px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={`tel:${PHONE}`}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full border border-gold/50 bg-cream/70 py-2.5 text-sm font-semibold text-maroon transition active:bg-gold active:text-white"
        >
          <Phone className="h-4 w-4 text-gold" />
          <span>Call</span>
        </a>
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-maroon py-2.5 text-sm font-semibold text-white shadow transition active:bg-wine"
        >
          <MessageCircle className="h-4 w-4 text-gold" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Floating WhatsApp CTA (Desktop / Tablet only) */}
      <a
        href={WA_DEFAULT}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-maroon text-white shadow-2xl transition hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-maroon/30" />
        <MessageCircle className="relative h-6 w-6 text-white" />
      </a>
    </>
  )
}
