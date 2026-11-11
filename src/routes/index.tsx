import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Clock,
  MapPin,
  Menu as MenuIcon,
  Navigation,
  Phone,
  Star,
  X,
} from 'lucide-react'

import { BookingForm } from '@/components/BookingForm'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  formatPrice,
  highlights,
  hours,
  menu,
  restaurant,
  reviews,
} from '@/data/restaurant'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: Home,
})

const img = (src: string, w: number) =>
  `${import.meta.env.BASE_URL}${encodeURIComponent(src)}&w=${w}&fm=webp&q=75`

const nav = [
  { href: '#meny', label: 'Meny' },
  { href: '#om', label: 'Om oss' },
  { href: '#recensioner', label: 'Recensioner' },
  { href: '#hitta', label: 'Hitta hit' },
]

function Home() {
  return (
    <div className="overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <Highlights />
        <MenuSection />
        <About />
        <Reviews />
        <Booking />
        <FindUs />
      </main>
      <Footer />
    </div>
  )
}

function Logo({ light }: { light?: boolean }) {
  return (
    <a
      href="#top"
      className="group flex items-baseline gap-2"
      aria-label={restaurant.name}
    >
      <span
        className={cn(
          'font-display text-2xl font-semibold italic tracking-tight',
          light ? 'text-white' : 'text-primary',
        )}
      >
        Blue
      </span>
      <span
        className={cn(
          'text-xs font-semibold uppercase tracking-[0.28em]',
          light ? 'text-white/80' : 'text-foreground/70',
        )}
      >
        Brunch &amp; Bar
      </span>
    </a>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid ? 'bg-background/95 shadow-sm backdrop-blur' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5">
        <Logo light={!solid} />
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Huvudmeny"
        >
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={cn(
                'text-sm font-medium transition-colors',
                solid
                  ? 'text-foreground/80 hover:text-primary'
                  : 'text-white/90 hover:text-white',
              )}
            >
              {n.label}
            </a>
          ))}
          <Button asChild className="rounded-full px-5">
            <a href="#boka">Boka bord</a>
          </Button>
        </nav>
        <button
          className={cn('md:hidden', solid ? 'text-foreground' : 'text-white')}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Stäng meny' : 'Öppna meny'}
          aria-expanded={open}
        >
          {open ? <X /> : <MenuIcon />}
        </button>
      </div>
      {open && (
        <nav
          className="border-t bg-background px-5 pb-6 md:hidden"
          aria-label="Mobilmeny"
        >
          {[...nav, { href: '#boka', label: 'Boka bord' }].map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b py-4 font-display text-xl"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span
      className={cn('inline-flex', className)}
      aria-label={`${value} av 5 stjärnor`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            'size-4',
            i <= Math.round(value)
              ? 'fill-accent text-accent'
              : 'text-current opacity-30',
          )}
        />
      ))}
    </span>
  )
}

function useOpenStatus() {
  const [status, setStatus] = useState<string | null>(null)
  useEffect(() => {
    const now = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Europe/Stockholm' }),
    )
    const mins = now.getHours() * 60 + now.getMinutes()
    const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3))
    const todays = hours.find((h) => h.day === now.getDay())
    if (
      todays?.open &&
      todays.close &&
      mins >= toMin(todays.open) &&
      mins < toMin(todays.close)
    ) {
      setStatus(`Öppet nu · stänger ${todays.close}`)
      return
    }
    for (let i = 0; i < 7; i++) {
      const day = (now.getDay() + i) % 7
      const h = hours.find((x) => x.day === day)
      if (!h?.open) continue
      if (i === 0 && mins >= toMin(h.open)) continue
      const when =
        i === 0
          ? 'idag'
          : i === 1
            ? 'imorgon'
            : h.label.toLowerCase().slice(0, 3)
      setStatus(`Stängt · öppnar ${when} kl. ${h.open.replace(':00', '')}`)
      return
    }
  }, [])
  return status
}

function Hero() {
  const status = useOpenStatus()
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-end bg-navy text-white"
    >
      <img
        src={img('/img/hero.png', 1800)}
        srcSet={[800, 1200, 1800, 2400]
          .map((w) => `${img('/img/hero.png', w)} ${w}w`)
          .join(', ')}
        sizes="100vw"
        alt="Brunchbord med chicken & waffle, avokadotoast, ägg benedict, pannkakor och kaffe"
        className="absolute inset-0 size-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/20" />
      <div className="relative mx-auto w-full max-w-content px-5 pb-16 pt-32 md:pb-24">
        <p className="rise mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
          <MapPin className="size-4" /> Vasagatan 11 · Göteborg
        </p>
        <h1 className="rise max-w-4xl text-5xl font-medium leading-[1.02] tracking-tight [animation-delay:120ms] sm:text-7xl md:text-8xl">
          Långa förmiddagar{' '}
          <em className="font-normal text-accent">i blått.</em>
        </h1>
        <p className="rise mt-6 max-w-xl text-lg text-white/85 [animation-delay:240ms] md:text-xl">
          Chicken &amp; waffle, avocado toast med pocherade ägg, fluffiga
          pannkakor och riktigt kaffe – mitt på Vasagatan.
        </p>
        <div className="rise mt-9 flex flex-wrap items-center gap-4 [animation-delay:360ms]">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-accent px-8 text-base text-accent-foreground hover:bg-accent/90"
          >
            <a href="#boka">Boka bord</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-white/40 bg-transparent px-8 text-base text-white hover:bg-white/10 hover:text-white"
          >
            <a href="#meny">Se menyn</a>
          </Button>
        </div>
        <div className="rise mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80 [animation-delay:480ms]">
          <span className="flex items-center gap-2">
            <Stars value={restaurant.rating} className="text-white" />
            <strong className="text-white">
              {restaurant.rating.toString().replace('.', ',')}
            </strong>{' '}
            · {restaurant.reviewCount} recensioner
          </span>
          {status && (
            <span className="flex items-center gap-2">
              <Clock className="size-4" /> {status}
            </span>
          )}
          <span>{restaurant.priceRange}</span>
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="favoriter">
      <div className="mx-auto max-w-content px-5">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
              Gästernas favoriter
            </p>
            <h2
              id="favoriter"
              className="mt-3 text-4xl font-medium tracking-tight md:text-5xl"
            >
              Det alla pratar om
            </h2>
          </div>
          <a
            href="#meny"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Hela menyn →
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-content snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none]">
        {highlights.map((h, i) => (
          <figure
            key={h.title}
            className={cn(
              'group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[42%] lg:w-[30%]',
              i === 0 && 'lg:w-[38%]',
            )}
          >
            <img
              src={img(h.image, 800)}
              alt={h.title}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-5 pt-16 text-white">
              <p className="font-display text-2xl">{h.title}</p>
              <p className="text-sm text-white/75">{h.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function MenuSection() {
  return (
    <section id="meny" className="scroll-mt-16 bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-content gap-12 px-5 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
            Meny
          </p>
          <h2 className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">
            Brunch hela dagen
          </h2>
          <p className="mt-5 max-w-sm text-muted-foreground">
            Pannkakor, benedicts, bowls och kaffe – hela menyn med priser. Fråga
            personalen om allergier – vi anpassar gärna.
          </p>
          <img
            src={img('/img/coffee.png', 700)}
            alt="Kaffe med latte art"
            loading="lazy"
            className="mt-8 hidden aspect-[4/5] w-full max-w-sm rounded-2xl object-cover lg:block"
          />
        </div>
        <Tabs defaultValue={menu[0].id}>
          <TabsList className="mb-8 h-auto flex-wrap rounded-full bg-card p-1.5">
            {menu.map((c) => (
              <TabsTrigger
                key={c.id}
                value={c.id}
                className="rounded-full px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {c.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {menu.map((c) => (
            <TabsContent key={c.id} value={c.id}>
              {c.compact ? (
                <ul className="grid gap-x-10 sm:grid-cols-2">
                  {c.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline gap-3 border-b border-border py-3"
                    >
                      <span className="font-medium">
                        {item.name}
                        {item.description && (
                          <span className="block text-xs font-normal text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </span>
                      <span
                        aria-hidden
                        className="flex-1 border-b border-dotted border-border"
                      />
                      <span className="shrink-0 tabular-nums text-muted-foreground">
                        {formatPrice(item.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="divide-y divide-border">
                  {c.items.map((item) => (
                    <li key={item.name} className="py-6 first:pt-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-2xl font-medium">{item.name}</h3>
                          {item.isNew && (
                            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                              Nyhet
                            </span>
                          )}
                          {item.popular && (
                            <span className="rounded-full bg-accent/25 px-2.5 py-0.5 text-xs font-semibold text-foreground">
                              Populär
                            </span>
                          )}
                          {item.tags?.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="shrink-0 font-display text-xl tabular-nums text-primary">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="mt-2 max-w-xl text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                      {item.descriptionEn && (
                        <p
                          lang="en"
                          className="mt-1 max-w-xl text-sm italic text-muted-foreground/80"
                        >
                          {item.descriptionEn}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-8 text-sm text-muted-foreground">
                Alla priser är inkl. moms.
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="om" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto grid max-w-content items-center gap-12 px-5 md:grid-cols-2">
        <img
          src={img('/img/lokalen.png', 1100)}
          alt="Lokalen på Blue Brunch & Bar med tegeltak, hängande växter, runda lampor och blå sammetssoffor"
          loading="lazy"
          className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
            Om oss
          </p>
          <h2 className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">
            Ett blått vardagsrum mitt i stan
          </h2>
          <div className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>
              Blue Brunch &amp; Bar är brunchstället på Vasagatan för dig som
              vill ta det lugnt en stund. Kom för en snabb latte, stanna för
              chicken &amp; waffle – eller samla gänget till en lång helgbrunch.
            </p>
            <p>
              Mysig atmosfär, snabb service och personal som bryr sig. Vi
              serverar vid bordet och har fullständiga rättigheter.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t pt-8">
            {[
              [
                restaurant.rating.toString().replace('.', ','),
                'betyg på Google',
              ],
              [String(restaurant.reviewCount), 'recensioner'],
              ['<10 min', 'till maten kommer'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-3xl text-primary md:text-4xl">
                  {v}
                </dd>
                <dd className="mt-1 text-sm text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section
      id="recensioner"
      className="scroll-mt-16 bg-navy py-20 text-white md:py-28"
    >
      <div className="mx-auto max-w-content px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
              Recensioner
            </p>
            <h2 className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">
              Gästerna säger
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-display text-6xl">
              {restaurant.rating.toString().replace('.', ',')}
            </span>
            <div>
              <Stars value={restaurant.rating} className="text-white" />
              <p className="mt-1 text-sm text-white/70">
                {restaurant.reviewCount} recensioner på Google
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <blockquote
              key={r.author}
              className="flex flex-col rounded-2xl bg-white/[0.06] p-7 ring-1 ring-white/10"
            >
              <Stars value={r.rating} className="text-white" />
              <p className="mt-5 flex-1 font-display text-xl italic leading-relaxed">
                ”{r.text}”
              </p>
              <footer className="mt-6 text-sm">
                <span className="font-semibold">{r.author}</span>
                <span className="text-white/60"> · {r.meta}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        <a
          href={restaurant.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline"
        >
          Läs fler recensioner på Google →
        </a>
      </div>
    </section>
  )
}

function Booking() {
  return (
    <section id="boka" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto grid max-w-content gap-12 px-5 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
            Boka bord
          </p>
          <h2 className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">
            Spara en plats vid bordet
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Skicka en förfrågan så bekräftar vi ditt bord. Större sällskap,
            födelsedagar och spontanbesök är alltid välkomna.
          </p>
          <a
            href={restaurant.phoneHref}
            className="mt-8 inline-flex items-center gap-3 text-lg font-semibold text-primary"
          >
            <span className="grid size-11 place-items-center rounded-full bg-secondary">
              <Phone className="size-5" />
            </span>
            {restaurant.phone}
          </a>
        </div>
        <BookingForm />
      </div>
    </section>
  )
}

function FindUs() {
  const [today, setToday] = useState<number | null>(null)
  useEffect(() => setToday(new Date().getDay()), [])
  return (
    <section id="hitta" className="scroll-mt-16 bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-content gap-10 px-5 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
            Hitta hit
          </p>
          <h2 className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">
            Vasagatan 11
          </h2>
          <p className="mt-3 text-muted-foreground">
            {restaurant.address}, {restaurant.postal} · Nära Vasaplatsen och
            Avenyn.
          </p>
          <div className="mt-8 rounded-2xl bg-card p-6">
            <h3 className="flex items-center gap-2 text-xl font-medium">
              <Clock className="size-5 text-primary" /> Öppettider
            </h3>
            <table className="mt-4 w-full text-sm">
              <tbody>
                {hours.map((h) => (
                  <tr
                    key={h.day}
                    className={cn(
                      'border-b last:border-0',
                      today === h.day && 'font-semibold text-primary',
                    )}
                  >
                    <td className="py-2.5">{h.label}</td>
                    <td className="py-2.5 text-right tabular-nums">
                      {h.open ? `${h.open}–${h.close}` : 'Stängt'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer">
                <Navigation /> Vägbeskrivning
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full bg-card">
              <a href={restaurant.phoneHref}>
                <Phone /> Ring
              </a>
            </Button>
          </div>
        </div>
        <div className="min-h-[360px] overflow-hidden rounded-2xl shadow-lg">
          <iframe
            title="Karta till Blue Brunch & Bar, Vasagatan 11"
            src={restaurant.mapsEmbed}
            className="size-full min-h-[360px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  )
}

function Footer() {
  return (
    <footer className="bg-navy py-14 text-white/80">
      <div className="mx-auto flex max-w-content flex-col gap-10 px-5 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo light />
          <p className="mt-3 max-w-xs text-sm">
            Brunchrestaurang &amp; bar på Vasagatan i Göteborg.
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          <span className="flex items-center gap-2">
            <MapPin className="size-4" /> {restaurant.address},{' '}
            {restaurant.postal}
          </span>
          <a
            href={restaurant.phoneHref}
            className="flex items-center gap-2 hover:text-white"
          >
            <Phone className="size-4" /> {restaurant.phone}
          </a>
          <a
            href={restaurant.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white"
          >
            <InstagramIcon /> Följ oss på Instagram
          </a>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-content px-5 text-xs text-white/50">
        © {new Date().getFullYear()} {restaurant.name}
      </p>
    </footer>
  )
}
