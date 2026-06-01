import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='mt-auto border-t border-border bg-muted/30'>
      <div className='container-max py-12 md:py-14'>
        <div className='grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]'>
          <div>
            <p className='font-semibold tracking-tight'>Bharat Book of Records</p>
            <p className='mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground'>
              A centralized hub to discover events from organizers across the
              country.
            </p>
          </div>

          <div>
            <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
              Explore
            </p>
            <ul className='mt-3 space-y-2'>
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className='text-sm text-foreground/80 transition-colors hover:text-foreground'>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
              Organizers
            </p>
            <ul className='mt-3 space-y-2'>
              <li>
                <Link
                  href='/contact'
                  className='text-sm text-foreground/80 transition-colors hover:text-foreground'>
                  List your event
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-sm text-foreground/80 transition-colors hover:text-foreground'>
                  How it works
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-2 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
          <p>&copy; {currentYear} Bharat Book of Records</p>
          <p className='text-xs'>Events link back to their original Facebook posts.</p>
        </div>
      </div>
    </footer>
  );
}
