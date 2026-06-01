import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StatsSection from '@/components/StatsSection';
import { fetchPosts, getPageStats } from '@/lib/data';
import { Calendar, CheckCircle, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

async function AboutContent() {
  const posts = await fetchPosts();
  const stats = getPageStats(posts);

  const statCards = [
    {
      value: stats.totalEvents.toLocaleString('en-IN'),
      label: 'Total Events',
      icon: <Calendar className='w-8 h-8' />,
    },
    {
      value: stats.upcomingEvents.toLocaleString('en-IN'),
      label: 'This Week',
      icon: <Sparkles className='w-8 h-8' />,
    },
    {
      value: `${stats.totalOrganizers}+`,
      label: 'Event Organizers',
      icon: <Users className='w-8 h-8' />,
    },
  ];

  return (
    <>
      <section className='border-b border-border bg-muted/30 py-14 md:py-20'>
        <div className='container-max max-w-3xl'>
          <h1 className='text-4xl font-semibold tracking-tight md:text-5xl'>
            About Bharat Book of Records
          </h1>
          <p className='mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl'>
            Unifying event discovery across the nation — one centralized hub for
            seekers and organizers.
          </p>
        </div>
      </section>

      <section className='section-spacing'>
        <div className='container-max max-w-3xl'>
          <h2 className='mb-6 text-3xl font-semibold tracking-tight'>
            Our mission
          </h2>
          <p className='mb-6 text-lg leading-relaxed text-muted-foreground'>
            At Bharat Book of Records, we believe that discovering events should
            be simple, transparent, and accessible to everyone. Currently, event
            enthusiasts are scattered across social media platforms, struggling
            to find the best events happening in their region.
          </p>
          <p className='mb-6 text-lg leading-relaxed text-muted-foreground'>
            We&apos;ve created a centralized hub that brings together the best
            events from across the country. Whether you&apos;re looking for
            concerts, workshops, sports events, meetups, or any other gathering,
            you&apos;ll find it here—easily searchable, beautifully presented,
            and linked back to the original organizers.
          </p>
          <p className='text-lg leading-relaxed text-muted-foreground'>
            Our vision is to become the go-to platform for event discovery in
            India, helping event seekers and organizers connect more
            effectively.
          </p>
        </div>
      </section>

      <section className='section-spacing'>
        <StatsSection stats={statCards} />
      </section>

      <section className='section-spacing bg-muted/30'>
        <div className='container-max'>
          <h2 className='mb-12 text-center text-3xl font-semibold tracking-tight'>
            How it works for event seekers
          </h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div className='card p-6 text-center'>
              <div className='mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground'>
                1
              </div>
              <h3 className='mb-3 text-xl font-semibold'>Browse events</h3>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                Explore thousands of events posted by organizers across the
                country. Use our intuitive interface to find events that match
                your interests.
              </p>
            </div>
            <div className='card p-6 text-center'>
              <div className='mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground'>
                2
              </div>
              <h3 className='mb-3 text-xl font-semibold'>Filter & sort</h3>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                Filter by event type, date range, or media type. Sort by newest
                or oldest to find events that fit your schedule.
              </p>
            </div>
            <div className='card p-6 text-center'>
              <div className='mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground'>
                3
              </div>
              <h3 className='mb-3 text-xl font-semibold'>Attend & share</h3>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                Click through to the original event on Facebook to register and
                attend. Share events with your friends on social media.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='section-spacing'>
        <div className='container-max'>
          <h2 className='mb-12 text-center text-3xl font-semibold tracking-tight'>
            How it works for organizers
          </h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div className='card p-6 text-center'>
              <div className='mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground'>
                1
              </div>
              <h3 className='mb-3 text-xl font-semibold'>Post on Facebook</h3>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                Create and post your event on Facebook as you normally would.
                Our system automatically indexes and showcases eligible events.
              </p>
            </div>
            <div className='card p-6 text-center'>
              <div className='mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground'>
                2
              </div>
              <h3 className='mb-3 text-xl font-semibold'>Get listed</h3>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                Your event appears in our directory, reaching thousands of
                potential attendees who are actively looking for events in your
                category.
              </p>
            </div>
            <div className='card p-6 text-center'>
              <div className='mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground'>
                3
              </div>
              <h3 className='mb-3 text-xl font-semibold'>Drive attendance</h3>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                Increase visibility and attendance for your events. Every
                click-through drives traffic back to your Facebook event page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='section-spacing bg-muted/30'>
        <div className='container-max'>
          <h2 className='mb-12 text-3xl font-semibold tracking-tight'>
            Why choose us
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {[
              {
                title: 'Centralized Discovery',
                description:
                  'All events in one place. No more scrolling through social media to find what&apos;s happening near you.',
              },
              {
                title: 'Easy Filtering',
                description:
                  'Filter by event type, date, and media format. Find exactly what you&apos;re looking for in seconds.',
              },
              {
                title: 'Direct Connection',
                description:
                  'Every event links directly to the original Facebook post. No intermediaries, just direct connections.',
              },
              {
                title: 'Beautiful Presentation',
                description:
                  'Events are displayed with high-quality images and clear information. Visual, accessible, and engaging.',
              },
              {
                title: 'Free for Everyone',
                description:
                  'Browse, filter, and discover events completely free. No registration, no hidden costs.',
              },
              {
                title: 'Organizer-Friendly',
                description:
                  'Event organizers benefit from increased visibility with zero effort. Post on Facebook and get discovered.',
              },
            ].map((feature, index) => (
              <div key={index} className='flex gap-4'>
                <CheckCircle className='w-6 h-6 text-blue-600 shrink-0 mt-1' />
                <div>
                  <h3 className='mb-2 text-lg font-semibold'>
                    {feature.title}
                  </h3>
                  <p className='text-sm leading-relaxed text-muted-foreground'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section-spacing border-t border-border bg-primary text-primary-foreground'>
        <div className='container-max text-center'>
          <h2 className='text-3xl font-semibold tracking-tight md:text-4xl'>
            Ready to get started?
          </h2>
          <p className='mx-auto mt-4 mb-8 max-w-2xl text-primary-foreground/85'>
            Whether you&apos;re looking for your next outing or promoting an
            event, start here.
          </p>
          <div className='flex flex-col justify-center gap-3 sm:flex-row'>
            <Link
              href='/events'
              className='inline-flex min-h-11 items-center justify-center rounded-lg bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary'>
              Browse events
            </Link>
            <Link
              href='/contact'
              className='btn-secondary border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10'>
              List your event
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function AboutPage() {
  return (
    <>
      <Header />
      <main id='main-content'>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
