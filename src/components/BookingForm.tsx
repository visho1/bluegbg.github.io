import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { restaurant } from '@/data/restaurant'

type State = 'idle' | 'pending' | 'success' | 'error'

const times = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00']

const selectClass =
  'flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

function today() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export function BookingForm() {
  const [state, setState] = useState<State>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const form = event.currentTarget
    const body = new URLSearchParams()
    new FormData(form).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/booking-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      if (/\bdata-netlify\s*=/i.test(await response.text())) throw new Error('Form handling unavailable')
      setState('success')
      form.reset()
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-2xl bg-card p-8 text-card-foreground shadow-xl">
        <CheckCircle2 className="size-10 text-primary" />
        <h3 className="text-2xl font-semibold">Tack! Vi har fått din förfrågan.</h3>
        <p className="text-muted-foreground">
          Vi återkommer så snart vi kan för att bekräfta bordet. Brådskande? Ring oss på{' '}
          <a className="font-semibold text-primary underline-offset-4 hover:underline" href={restaurant.phoneHref}>
            {restaurant.phone}
          </a>
          .
        </p>
        <Button variant="outline" onClick={() => setState('idle')}>
          Skicka en ny förfrågan
        </Button>
      </div>
    )
  }

  return (
    <form
      name="bordsbokning"
      method="POST"
      action="/booking-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state === 'error') setState('idle')
      }}
      className="rounded-2xl bg-card p-6 text-card-foreground shadow-xl sm:p-8"
    >
      <input type="hidden" name="form-name" value="bordsbokning" />
      <p hidden>
        <label>
          Lämna tomt <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Bokningsuppgifter</legend>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="namn">Namn</Label>
          <Input id="namn" name="namn" autoComplete="name" required maxLength={100} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="telefon">Telefon</Label>
          <Input id="telefon" name="telefon" type="tel" autoComplete="tel" required maxLength={30} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-post</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required maxLength={254} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="datum">Datum</Label>
          <Input id="datum" name="datum" type="date" min={today()} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="tid">Tid</Label>
            <select id="tid" name="tid" required defaultValue="11:00" className={selectClass}>
              {times.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="antal">Gäster</Label>
            <select id="antal" name="antal" required defaultValue="2" className={selectClass}>
              {Array.from({ length: 8 }, (_, i) => String(i + 1)).map((n) => (
                <option key={n} value={n}>
                  {n} {n === '1' ? 'person' : 'personer'}
                </option>
              ))}
              <option value="9+">9+ (sällskap)</option>
            </select>
          </div>
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="meddelande">Meddelande (valfritt)</Label>
          <Textarea
            id="meddelande"
            name="meddelande"
            maxLength={1000}
            rows={3}
            placeholder="Allergier, barnstol, födelsedag…"
          />
        </div>
        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Bokningen är en förfrågan – den gäller när vi har bekräftat den.
          </p>
          <Button type="submit" size="lg" className="rounded-full px-8">
            {state === 'pending' ? (
              <>
                <Loader2 className="animate-spin" /> Skickar…
              </>
            ) : (
              'Skicka förfrågan'
            )}
          </Button>
        </div>
      </fieldset>
      {state === 'error' && (
        <p role="alert" className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          Förfrågan kunde inte skickas. Dina uppgifter finns kvar – försök igen, eller ring oss på{' '}
          {restaurant.phone}.
        </p>
      )}
    </form>
  )
}
