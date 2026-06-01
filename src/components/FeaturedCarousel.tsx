'use client';

import { Post } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import EventCard from './EventCard';

interface FeaturedCarouselProps {
  posts: Post[];
}

export default function FeaturedCarousel({ posts }: FeaturedCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isAutoPlay || prefersReducedMotion || posts.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlay, prefersReducedMotion, posts.length]);

  if (posts.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrent((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % posts.length);
    setIsAutoPlay(false);
  };

  const transitionClass = prefersReducedMotion
    ? ''
    : 'transition-opacity duration-[var(--duration-ui)] ease-[var(--ease-out-strong)]';

  return (
    <section className='section-spacing' aria-labelledby='featured-heading'>
      <div className='container-max'>
        <h2
          id='featured-heading'
          className='mb-6 text-2xl font-semibold tracking-tight md:text-3xl'>
          Featured events
        </h2>

        <div className='relative'>
          <div
            className='relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted md:aspect-[21/9]'
            role='region'
            aria-roledescription='carousel'
            aria-label='Featured events'>
            {posts.map((post, index) => (
              <div
                key={crypto.randomUUID()}
                className={cn(
                  'absolute inset-0',
                  transitionClass,
                  index === current
                    ? 'z-10 opacity-100'
                    : 'pointer-events-none opacity-0',
                )}
                aria-hidden={index !== current}>
                <EventCard post={post} variant='featured' />
              </div>
            ))}
          </div>

          {posts.length > 1 && (
            <>
              <button
                type='button'
                onClick={goToPrevious}
                className='pressable absolute top-1/2 left-3 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-sm backdrop-blur-sm'
                aria-label='Previous featured event'>
                <ChevronLeft size={22} />
              </button>

              <button
                type='button'
                onClick={goToNext}
                className='pressable absolute top-1/2 right-3 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-sm backdrop-blur-sm'
                aria-label='Next featured event'>
                <ChevronRight size={22} />
              </button>

              <div
                className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2'
                role='tablist'
                aria-label='Choose slide'>
                {posts.map((_, index) => (
                  <button
                    key={index}
                    type='button'
                    role='tab'
                    aria-selected={index === current}
                    aria-label={`Slide ${index + 1} of ${posts.length}`}
                    onClick={() => {
                      setCurrent(index);
                      setIsAutoPlay(false);
                    }}
                    className={cn(
                      'h-2 rounded-full transition-[width,background-color] duration-[var(--duration-ui-fast)] ease-[var(--ease-out-strong)]',
                      index === current
                        ? 'w-7 bg-primary'
                        : 'w-2 bg-foreground/30 hover:bg-foreground/50',
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {posts.length > 1 && !prefersReducedMotion && (
          <div className='mt-4 flex justify-center'>
            <button
              type='button'
              onClick={() => setIsAutoPlay((playing) => !playing)}
              className='inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'>
              {isAutoPlay ? (
                <>
                  <Pause size={16} aria-hidden />
                  Pause autoplay
                </>
              ) : (
                <>
                  <Play size={16} aria-hidden />
                  Resume autoplay
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
