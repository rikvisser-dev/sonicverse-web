import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { AudioLines, CalendarClock, GitBranch, Radio, Server, Waypoints } from 'lucide-react'

import { SignalsSection } from '@/components/content/content-ui'
import { CTASection } from '@/components/site/cta-section'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import {
  capabilities,
  principles,
  projectArchetypes,
  repositorySignals,
  serviceAreas,
} from '@/lib/site-data'
import {
  getFeaturedBlogPost,
  getLatestBlogPosts,
  getLatestChangelogEntries,
  getRecentRoadmapEntries,
} from '@/lib/content'

const capabilityIcons: LucideIcon[] = [Radio, CalendarClock, Server]
const advantageIcons: LucideIcon[] = [Waypoints, GitBranch, Server]

const legacyProblems: { id: string; title: string; body: string }[] = [
  {
    id: 'lock-in',
    title: 'Vendor lock-in',
    body: 'A handful of proprietary vendors, long contracts, and roadmaps dictated by someone else’s priorities.',
  },
  {
    id: 'silos',
    title: 'Tools that don’t talk',
    body: 'Closed formats and limited APIs mean every integration needs expensive middleware to bridge the gap.',
  },
  {
    id: 'sunset',
    title: 'Acquired and sunset',
    body: 'When a vendor gets bought or shuts a product down, the station is left scrambling. The community can’t.',
  },
]

const scheduleRows: { time: string; title: string; state: 'live' | 'next' | 'cued' }[] = [
  { time: '08:00', title: 'Morning Drive', state: 'live' },
  { time: '11:00', title: 'Midday Mix', state: 'next' },
  { time: '14:00', title: 'Afternoon Sessions', state: 'cued' },
]

function HeroBroadcastVisual() {
  return (
    <div className="relative isolate flex h-full min-h-80 flex-col gap-4">
      <div className="log-grid absolute inset-0 opacity-40" />
      <div className="absolute top-6 right-6 h-28 w-28 rounded-full bg-primary/14 blur-3xl" />

      {/* On-air now-playing panel */}
      <div className="relative z-10 rounded-[1rem] border border-border/70 bg-background/70 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="on-air-pill">
            <span className="on-air-dot" />
            On Air
          </span>
          <span className="signal-label">CH 01 · 96kHz</span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[0.75rem] border border-border/60 bg-primary/10 text-primary">
            <AudioLines className="size-5" strokeWidth={1.8} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground/88">Morning Drive</p>
            <p className="truncate text-xs text-foreground/52">Now playing · auto-failover armed</p>
          </div>
        </div>
        {/* Signal meter */}
        <div className="mt-4 flex items-end gap-1">
          {[34, 58, 42, 76, 64, 88, 52, 70, 46, 82, 60, 38].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-primary/55"
              style={{ height: `${h * 0.32}px` }}
            />
          ))}
        </div>
      </div>

      {/* Schedule log */}
      <div className="relative z-10 rounded-[1rem] border border-border/70 bg-background/62 p-4 backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="signal-label">Schedule log</span>
          <CalendarClock className="size-3.5 text-foreground/40" strokeWidth={1.8} />
        </div>
        <div className="space-y-2">
          {scheduleRows.map((row) => (
            <div
              key={row.time}
              className="flex items-center gap-3 rounded-[0.6rem] border border-border/50 bg-background/40 px-3 py-2"
            >
              <span className="font-mono text-xs text-foreground/55">{row.time}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-foreground/82">
                {row.title}
              </span>
              <span
                className={
                  row.state === 'live'
                    ? 'font-mono text-[0.62rem] tracking-[0.18em] text-primary uppercase'
                    : 'font-mono text-[0.62rem] tracking-[0.18em] text-foreground/40 uppercase'
                }
              >
                {row.state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function HomePage() {
  const [featuredBlog, recentChangelog, recentRoadmap] = await Promise.all([
    getFeaturedBlogPost(),
    getLatestChangelogEntries(3),
    getRecentRoadmapEntries(3),
  ])
  const recentBlog = await getLatestBlogPosts(2, {
    excludeSlug: featuredBlog?.slug,
  })

  return (
    <>
      <PageHero
        layout="split"
        eyebrow="The open broadcast stack"
        title="Broadcast software, built in the open."
        description="Open-source playout, scheduling, streaming, and station tooling — built by broadcasters and developers for the realities of modern radio."
        highlights={['Open source at the core', 'Built for on-air reliability']}
        primaryAction={{ href: '/contact', label: 'Get early access' }}
        secondaryAction={{ href: '/platform', label: 'Explore the stack' }}
        visual={<HeroBroadcastVisual />}
      />

      <section className="pb-8 sm:pb-10">
        <Container>
          <Reveal className="section-frame px-6 py-5 sm:px-8">
            <div className="grid gap-5 md:grid-cols-4">
              {principles.map((principle, index) => (
                <div key={principle} className="flex items-center gap-3">
                  <span className="font-mono text-xs font-medium tracking-[0.15em] text-primary/80">
                    0{index + 1}
                  </span>
                  <p className="text-sm text-foreground/68">{principle}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="The problem"
              title="Radio has been stuck with the same software for decades."
              description="Proprietary vendors, opaque pricing, and tools that were never built for how stations actually work. That era is ending."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {legacyProblems.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <Badge variant="muted">0{index + 1}</Badge>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.body}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="The open stack"
              title="One open stack for the whole broadcast workflow."
              description="From the on-air engine to the tooling around it — designed to interoperate on open standards instead of vendor lock-in."
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {capabilities.map((item, index) => {
              const CapIcon = capabilityIcons[index]
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-[0.85rem] border border-border/60 bg-primary/10 text-primary">
                        <CapIcon className="size-5" strokeWidth={1.8} />
                      </div>
                      <Badge variant="muted">0{index + 1}</Badge>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Modules"
              title="Every part of the day, covered."
              description="The pieces that have been underserved for too long — from show preparation to station management to infrastructure."
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {serviceAreas.slice(0, 4).map((service, index) => (
              <Reveal key={service.title} delay={index * 0.04}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {service.bullets.map((bullet) => (
                        <span
                          key={bullet}
                          className="inline-flex items-center rounded-full border border-border/55 bg-background/40 px-3 py-1 font-mono text-[0.66rem] tracking-[0.1em] text-foreground/60 uppercase"
                        >
                          {bullet}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Button asChild variant="outline" size="lg">
              <Link href="/platform">Explore the full stack</Link>
            </Button>
          </Reveal>
        </Container>
      </section>

      <SignalsSection
        featuredBlog={featuredBlog}
        recentBlog={recentBlog}
        recentChangelog={recentChangelog}
        recentRoadmap={recentRoadmap}
      />

      <section className="section-space">
        <Container>
          <Reveal>
            <div className="section-frame space-y-10 px-6 py-10 sm:px-10 sm:py-12">
              <SectionHeader
                eyebrow="Why open source"
                title="Your stack, your roadmap."
                description="Open source has already solved these problems for industries far more demanding than broadcasting. Radio deserves the same control."
              />
              <div className="grid gap-4 md:grid-cols-3">
                {repositorySignals.map((item, index) => {
                  const AdvIcon = advantageIcons[index]
                  return (
                    <Reveal key={item} delay={index * 0.05}>
                      <Card className="h-full">
                        <CardHeader>
                          <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-border/60 bg-primary/10 text-primary">
                            <AdvIcon className="size-4" strokeWidth={1.8} />
                          </div>
                          <CardTitle className="text-xl">{item}</CardTitle>
                        </CardHeader>
                      </Card>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="section-space pt-0">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Who it’s for"
              title="Built for the people who run stations."
              description="Independent and community stations, the managers who budget for them, and the technical teams who keep them on air."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {projectArchetypes.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Early access"
        title="The tools are ready. The only question is whether your station is."
        description="We’re building in the open and shaping the stack around real stations. Get early access, or tell us how yours works."
      />
    </>
  )
}
