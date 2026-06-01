'use client';

import EventCard from '@/components/EventCard';
import FilterBar from '@/components/FilterBar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SkeletonGrid from '@/components/Skeleton';
import { EmptyState, ErrorState } from '@/components/StateComponents';
import {
  $fetch,
  MediaType,
  Post,
  filterByDateRange,
  filterByMediaType,
  sortPosts,
} from '@/lib/data';
import { useEffect, useState } from 'react';

export default function EventsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  // const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedMediaTypes, setSelectedMediaTypes] = useState<MediaType[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<
    'week' | 'month' | 'all'
  >('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      setError(null);
      const { data: allPosts, error } = await $fetch<Post[]>('/');
      if (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to load events',
        );
        return;
      }
      setPosts(allPosts);
      console.log('Fetched posts:', allPosts.length);
      setLoading(false);
    }

    loadPosts();
  }, []);

  // useEffect(() => {
  //   let result = posts;

  //   if (selectedMediaTypes.length > 0) {
  //     result = filterByMediaType(result, selectedMediaTypes);
  //   }

  //   result = filterByDateRange(result, selectedDateRange);
  //   result = sortPosts(result, sortOrder);

  //   setFilteredPosts(result);
  // }, [posts, selectedMediaTypes, selectedDateRange, sortOrder]);

  let result = posts;

  if (selectedMediaTypes.length > 0) {
    result = filterByMediaType(result, selectedMediaTypes);
  }

  result = filterByDateRange(result, selectedDateRange);
  result = sortPosts(result, sortOrder);

  // setFilteredPosts(result);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <>
      <Header />
      <main id='main-content'>
        <section className='border-b border-border bg-muted/30 py-10 md:py-12'>
          <div className='container-max'>
            <h1 className='text-3xl font-semibold tracking-tight md:text-4xl'>
              Explore events
            </h1>
            <p className='mt-2 text-muted-foreground'>
              {!loading && !error
                ? `${result.length} event${result.length !== 1 ? 's' : ''}`
                : 'Loading directory…'}
            </p>
          </div>
        </section>

        {!loading && (
          <FilterBar
            selectedMediaTypes={selectedMediaTypes}
            selectedDateRange={selectedDateRange}
            sortOrder={sortOrder}
            onMediaTypeChange={setSelectedMediaTypes}
            onDateRangeChange={setSelectedDateRange}
            onSortChange={setSortOrder}
          />
        )}

        <section className='py-8 md:py-12'>
          <div className='container-max'>
            {loading && <SkeletonGrid count={9} />}

            {error && !loading && <ErrorState onRetry={handleRetry} />}

            {!loading && !error && result.length === 0 && (
              <EmptyState
                onClear={() => {
                  setSelectedMediaTypes([]);
                  setSelectedDateRange('all');
                  setSortOrder('newest');
                }}
              />
            )}

            {!loading && !error && result.length > 0 && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {result.map((post) => (
                  <EventCard key={crypto.randomUUID()} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
