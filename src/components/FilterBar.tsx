'use client';

import { MediaType } from '@/lib/data';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  selectedMediaTypes: MediaType[];
  selectedDateRange: 'week' | 'month' | 'all';
  sortOrder: 'newest' | 'oldest';
  onMediaTypeChange: (types: MediaType[]) => void;
  onDateRangeChange: (range: 'week' | 'month' | 'all') => void;
  onSortChange: (order: 'newest' | 'oldest') => void;
}

const mediaTypeOptions: { value: MediaType; label: string }[] = [
  { value: 'photo', label: 'Photo' },
  { value: 'video', label: 'Video' },
  { value: 'album', label: 'Album' },
  { value: 'link', label: 'Link' },
];

const dateRangeOptions: { value: 'week' | 'month' | 'all'; label: string }[] = [
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'all', label: 'All time' },
];

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'pressable min-h-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-[var(--duration-ui-fast)]',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-foreground hover:bg-muted/80',
      )}>
      {children}
    </button>
  );
}

export default function FilterBar({
  selectedMediaTypes,
  selectedDateRange,
  sortOrder,
  onMediaTypeChange,
  onDateRangeChange,
  onSortChange,
}: FilterBarProps) {
  const handleMediaTypeToggle = (mediaType: MediaType) => {
    if (selectedMediaTypes.includes(mediaType)) {
      onMediaTypeChange(selectedMediaTypes.filter((t) => t !== mediaType));
    } else {
      onMediaTypeChange([...selectedMediaTypes, mediaType]);
    }
  };

  const hasActiveFilters =
    selectedMediaTypes.length > 0 ||
    selectedDateRange !== 'all' ||
    sortOrder !== 'newest';

  return (
    <div
      className='sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md md:top-[4.5rem]'
      role='search'
      aria-label='Filter events'>
      <div className='container-max py-4'>
        <div className='flex flex-col gap-5'>
          <fieldset className='min-w-0 border-0 p-0'>
            <legend className='mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
              Media type
            </legend>
            <div className='flex flex-wrap gap-2'>
              {mediaTypeOptions.map((option) => (
                <FilterChip
                  key={option.value}
                  active={selectedMediaTypes.includes(option.value)}
                  onClick={() => handleMediaTypeToggle(option.value)}>
                  {option.label}
                </FilterChip>
              ))}
            </div>
          </fieldset>

          <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-8'>
            <div className='min-w-0 flex-1 sm:max-w-[200px]'>
              <label
                htmlFor='date-range'
                className='mb-2 block text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
                Date
              </label>
              <select
                id='date-range'
                value={selectedDateRange}
                onChange={(e) =>
                  onDateRangeChange(e.target.value as 'week' | 'month' | 'all')
                }
                className='min-h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'>
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className='min-w-0 flex-1 sm:max-w-[200px]'>
              <label
                htmlFor='sort-order'
                className='mb-2 block text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
                Sort
              </label>
              <select
                id='sort-order'
                value={sortOrder}
                onChange={(e) =>
                  onSortChange(e.target.value as 'newest' | 'oldest')
                }
                className='min-h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'>
                <option value='newest'>Newest first</option>
                <option value='oldest'>Oldest first</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type='button'
                onClick={() => {
                  onMediaTypeChange([]);
                  onDateRangeChange('all');
                  onSortChange('newest');
                }}
                className='min-h-10 text-sm font-medium text-primary hover:underline sm:mb-0.5'>
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
