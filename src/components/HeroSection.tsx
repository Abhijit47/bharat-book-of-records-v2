import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className='relative overflow-hidden border-b border-border'>
      <div
        className='absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_oklch,var(--primary)_28%,transparent),transparent)]'
        aria-hidden
      />
      <div className='container-max relative py-14 md:py-20 lg:py-24'>
        <div className='max-w-2xl'>
          <p className='mb-4 text-sm font-medium tracking-wide text-primary uppercase'>
            Event discovery for India
          </p>
          <h1 className='text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]'>
            Discover events near you
          </h1>
          <p className='mt-5 text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl'>
            Browse the latest events from organizers you follow — concerts,
            workshops, sports, and meetups in one place.
          </p>
          <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Link href='/events' className='btn-primary'>
              Explore events
            </Link>
            <Link
              href='/contact'
              className='btn-secondary text-center'>
              List your event
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
