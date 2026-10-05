import Link from "next/link"
import {
  ArrowRight,
  Plane,
  BookOpen,
  Search,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex size-8 items-center justify-center rounded-lg border bg-muted">
              <Plane className="size-4" />
            </div>
            <span>Airframe</span>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>

            <Link
              href="/signup"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-24 text-center sm:pt-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
            <Plane className="size-3.5" />
            Your personal flight log
          </div>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Keep track of every flight.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Airframe gives you a simple place to record, organize, and revisit
            the flights that make up your aviation journey.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start logging
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-md border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              Sign in
            </Link>
          </div>

          {/* Product preview */}
          <div className="mt-20 w-full max-w-5xl">
            <div className="overflow-hidden rounded-xl border bg-background text-left shadow-2xl">
              <div className="grid min-h-[420px] grid-cols-[180px_1fr]">
                {/* Sidebar */}
                <aside className="hidden border-r bg-muted/30 md:flex md:flex-col">
                  <div className="border-b px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
                        ✈
                      </div>

                      <div>
                        <div className="text-sm font-semibold tracking-tight">
                          Airframe
                        </div>

                        <div className="text-[10px] text-muted-foreground">
                          Flight Logger
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 px-3 py-4">
                    <p className="mb-2 px-3 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                      General
                    </p>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2.5 font-medium">
                        <LayoutDashboard className="size-3.5" />
                        Dashboard
                      </div>

                      <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground">
                        <Plane className="size-3.5" />
                        Flights
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Main content */}
                <div className="overflow-hidden p-6 sm:p-8">
                  <div className="mb-7">
                    <p className="text-xs text-muted-foreground">Flight history</p>

                    <div className="mt-1 flex items-center justify-between">
                      <h2 className="text-xl font-semibold tracking-tight">
                        Your Flights
                      </h2>

                      <div className="hidden rounded-md border px-3 py-1.5 text-xs text-muted-foreground sm:block">
                        Search flights
                      </div>
                    </div>
                  </div>

                  {/* Flight table */}
                  <div className="overflow-hidden rounded-xl border">
                    <div className="grid grid-cols-6 gap-3 border-b bg-muted/40 px-4 py-3 text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
                      <span>Date</span>
                      <span>Flight</span>
                      <span>Aircraft</span>
                      <span>From</span>
                      <span>To</span>
                      <span>Airline</span>
                    </div>

                    <div>
                      {[
                        ["2026-09-28", "AI 101", "B787", "DEL", "LHR", "Air India"],
                        ["2026-09-14", "6E 204", "A320", "HYD", "DEL", "IndiGo"],
                        ["2026-08-31", "SQ 423", "A350", "DEL", "SIN", "Singapore"],
                        ["2026-08-12", "EK 526", "B777", "HYD", "DXB", "Emirates"],
                      ].map(([date, flight, aircraft, from, to, airline]) => (
                        <div
                          key={`${date}-${flight}`}
                          className="grid grid-cols-6 gap-3 border-b px-4 py-3 text-[10px] last:border-b-0"
                        >
                          <span className="text-muted-foreground">{date}</span>
                          <span className="font-medium">{flight}</span>
                          <span className="text-muted-foreground">{aircraft}</span>
                          <span>{from}</span>
                          <span>{to}</span>
                          <span className="text-muted-foreground">{airline}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-muted-foreground">
              Built for aviation enthusiasts
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Your flights, organized.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Keep the details of your journeys in one place without turning
              your flight history into another spreadsheet.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<BookOpen className="size-5" />}
              title="Log your flights"
              description="Record routes, aircraft, dates, flight numbers, and the details you want to remember."
            />

            <FeatureCard
              icon={<Search className="size-5" />}
              title="Find them later"
              description="Search and browse your flight history whenever you want to revisit an old journey."
            />

            <FeatureCard
              icon={<ShieldCheck className="size-5" />}
              title="Keep it yours"
              description="Your flight history is tied to your account and protected by authenticated access."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <Plane className="mx-auto size-7" />

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Start building your flight history.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Create your Airframe account and start logging your next flight.
          </p>

          <Link
            href="/signup"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Create your account
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Airframe.</p>

          <div className="flex gap-5">
            <Link
              href="/legal/terms_of_service"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>

            <Link
              href="/legal/privacy_policy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>

            <Link
              href="/login"
              className="transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}