import EventCard from '@/components/EventCard';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import {
  fetchPosts,
  getFeaturedPosts,
  getPageStats,
  type Post,
} from '@/lib/data';
import { Calendar, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

function getRecentPosts(posts: Post[], featured: Post[], limit = 9): Post[] {
  const featuredIds = new Set(featured.map((p) => p.id));
  return posts
    .filter((p) => !featuredIds.has(p.id))
    .sort(
      (a, b) =>
        new Date(b.created_time).getTime() - new Date(a.created_time).getTime(),
    )
    .slice(0, limit);
}

async function HomeContent() {
  const posts = await fetchPosts();
  const featured = getFeaturedPosts(posts, 8);
  const recent = getRecentPosts(posts, featured);
  const stats = getPageStats(posts);

  const statCards = [
    {
      value: stats.totalEvents.toLocaleString('en-IN'),
      label: 'Events listed',
      icon: <Calendar className='size-7' aria-hidden />,
    },
    {
      value: stats.upcomingEvents.toLocaleString('en-IN'),
      label: 'Posted this week',
      icon: <Sparkles className='size-7' aria-hidden />,
    },
    {
      value: `${stats.totalOrganizers}+`,
      label: 'Sources',
      icon: <Users className='size-7' aria-hidden />,
    },
  ];

  return (
    <>
      <HeroSection />

      <StatsSection stats={statCards} />

      {featured.length > 0 && <FeaturedCarousel posts={featured} />}

      <section
        className='section-spacing'
        aria-labelledby='recent-events-heading'>
        <div className='container-max'>
          <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <h2
                id='recent-events-heading'
                className='text-2xl font-semibold tracking-tight md:text-3xl'>
                Recent events
              </h2>
              <p className='mt-2 max-w-xl text-muted-foreground'>
                Fresh listings from organizers across the platform.
              </p>
            </div>
            <Link href='/events' className='btn-secondary shrink-0'>
              View all events
            </Link>
          </div>

          {recent.length > 0 ? (
            <ul className='stagger-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {recent.map((post) => (
                <li key={crypto.randomUUID()}>
                  <EventCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-center text-muted-foreground'>
              No additional events right now.{' '}
              <Link
                href='/events'
                className='text-primary font-medium hover:underline'>
                Browse the full directory
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      <section className='border-t border-border bg-muted/40 py-14 md:py-16'>
        <div className='container-max text-center'>
          <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
            Want to feature your event?
          </h2>
          <p className='mx-auto mt-3 max-w-lg text-muted-foreground'>
            Reach people actively browsing for things to do. Submit your event
            and we&apos;ll help you get in front of the right audience.
          </p>
          <Link href='/contact' className='btn-primary mt-8 inline-flex'>
            Add your event
          </Link>
        </div>
      </section>
    </>
  );
}

export default async function HomePage() {
  return (
    <>
      <Header />
      <main id='main-content'>
        <HomeContent />
      </main>
      <Footer />
    </>
  );
}
