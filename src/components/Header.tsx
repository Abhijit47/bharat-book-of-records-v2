'use client';

import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/events', label: 'Explore events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75'>
      <div className='container-max'>
        <nav
          className='flex h-16 items-center justify-between md:h-[4.5rem]'
          aria-label='Main'>
          <Link
            href='/'
            className='group flex min-h-11 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring'>
            <span
              className='flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground md:size-10'
              aria-hidden>
              B
            </span>
            <span className='hidden font-semibold tracking-tight sm:inline'>
              Bharat Book of Records
            </span>
          </Link>

          <div className='hidden items-center gap-1 md:flex'>
            {navLinks.map(({ href, label }) => {
              const active =
                href === '/events'
                  ? pathname.startsWith('/events')
                  : pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-[var(--duration-ui-fast)]',
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                  aria-current={active ? 'page' : undefined}>
                  {label}
                </Link>
              );
            })}
            <Link href='/contact' className='btn-primary ml-2'>
              Add your event
            </Link>
          </div>

          <button
            type='button'
            onClick={() => setIsOpen((open) => !open)}
            className='pressable flex size-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden'
            aria-expanded={isOpen}
            aria-controls='mobile-nav'
            aria-label={isOpen ? 'Close menu' : 'Open menu'}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {isOpen && (
          <div
            id='mobile-nav'
            className='border-t border-border pb-4 md:hidden'>
            <div className='flex flex-col gap-1 pt-2'>
              {navLinks.map(({ href, label }) => {
                const active =
                  href === '/events'
                    ? pathname.startsWith('/events')
                    : pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'min-h-11 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                    )}
                    aria-current={active ? 'page' : undefined}>
                    {label}
                  </Link>
                );
              })}
              <Link
                href='/contact'
                onClick={() => setIsOpen(false)}
                className='btn-primary mt-2 text-center'>
                Add your event
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
