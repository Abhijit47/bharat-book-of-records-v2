import { CalendarSearch } from 'lucide-react';
import Link from 'next/link';

export function EmptyState({ onClear }: { onClear?: () => void }) {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center md:py-24'>
      <div className='mb-4 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground'>
        <CalendarSearch className='size-7' aria-hidden />
      </div>
      <h3 className='text-lg font-semibold tracking-tight'>No events found</h3>
      <p className='mt-2 max-w-md text-sm leading-relaxed text-muted-foreground'>
        Nothing matches your filters. Try a wider date range or fewer media
        types.
      </p>
      {onClear ? (
        <button type='button' onClick={onClear} className='btn-primary mt-6'>
          Clear filters
        </button>
      ) : (
        <Link href='/events' className='btn-primary mt-6'>
          Browse all events
        </Link>
      )}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center md:py-24'>
      <h3 className='text-lg font-semibold tracking-tight'>
        Couldn&apos;t load events
      </h3>
      <p className='mt-2 max-w-md text-sm text-muted-foreground'>
        Something went wrong while fetching data. Check your connection and try
        again.
      </p>
      <div className='mt-6 flex flex-wrap justify-center gap-3'>
        {onRetry && (
          <button type='button' onClick={onRetry} className='btn-primary'>
            Try again
          </button>
        )}
        <Link href='/' className='btn-secondary'>
          Back to home
        </Link>
      </div>
    </div>
  );
}
