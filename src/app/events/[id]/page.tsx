'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MediaComponent from '@/components/MediaComponent';
import {
  Post,
  fetchPosts,
  getMediaTypeBadge,
  getPostById,
  getPrimaryAttachment,
} from '@/lib/data';
import { formatDate, formatTimeAgo } from '@/lib/utils';
import { ArrowLeft, ExternalLink, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EventDetailPage() {
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setError(null);
        const posts = await fetchPosts();
        const found = getPostById(posts, postId);
        if (!found) {
          setError('Event not found');
        } else {
          setPost(found);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load event');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [postId]);

  if (loading) {
    return (
      <>
        <Header />
        <main className='min-h-screen flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-12 h-12 bg-blue-200 rounded-full animate-pulse mx-auto mb-4'></div>
            <p className='text-gray-600'>Loading event...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <main className='min-h-screen flex items-center justify-center'>
          <div className='text-center max-w-md'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>
              Event Not Found
            </h1>
            <p className='text-gray-600 mb-8'>
              {error || "The event you're looking for could not be found."}
            </p>
            <Link href='/events' className='btn-primary inline-block'>
              Back to Events
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const primaryAttachment = getPrimaryAttachment(post);
  const mediaType = post.attachments?.data?.[0]?.media_type;
  const badge = mediaType ? getMediaTypeBadge(mediaType) : null;
  const timeAgo = formatTimeAgo(post.created_time);
  const date = formatDate(post.created_time);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.message,
        text: `Check out this event: ${post.message}`,
        url: post.permalink_url,
      });
    } else {
      navigator.clipboard.writeText(post.permalink_url);
      alert('Event link copied to clipboard!');
    }
  };

  return (
    <>
      <Header />
      <main id='main-content'>
        <div className='container-max py-4'>
          <Link
            href='/events'
            className='flex items-center text-blue-600 hover:text-blue-700 font-medium'>
            <ArrowLeft size={16} className='mr-2' />
            Back to Events
          </Link>
        </div>

        {primaryAttachment && (
          <div className='relative h-96 w-full md:h-[500px]'>
            <MediaComponent
              attachment={primaryAttachment}
              fill
              priority
              className='object-contain'
              mode={
                primaryAttachment.media_type === 'video' ? 'full' : 'thumbnail'
              }
              sizes='100vw'
            />
          </div>
        )}

        <section className='py-8 md:py-12'>
          <div className='container-max max-w-3xl'>
            <div className='mb-8'>
              <div className='flex items-start justify-between mb-4'>
                <div className='flex-1'>
                  <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                    {post.message}
                  </h1>
                  <div className='flex flex-wrap items-center gap-4'>
                    {badge && (
                      <span
                        className={`rounded-md px-2.5 py-1 text-sm font-medium ${badge.className}`}>
                        {badge.label}
                      </span>
                    )}
                    <span className='text-gray-600 text-sm'>{timeAgo}</span>
                    <span className='text-gray-600 text-sm'>{date}</span>
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  className='p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0'
                  title='Share this event'>
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {post.attachments?.data && post.attachments.data.length > 0 && (
              <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold tracking-tight'>
                  Media
                </h2>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  {post.attachments.data.map((attachment, index) => (
                    <div
                      key={index}
                      className='relative min-h-48 overflow-hidden rounded-lg border border-border bg-muted'>
                      <MediaComponent
                        attachment={attachment}
                        mode={
                          attachment.media_type === 'video'
                            ? 'full'
                            : 'thumbnail'
                        }
                        className='min-h-48'
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className='flex flex-col sm:flex-row gap-4 py-8 border-t border-gray-200 border-b'>
              <a
                href={post.permalink_url}
                target='_blank'
                rel='noopener noreferrer'
                className='btn-primary flex items-center justify-center'>
                <ExternalLink size={18} className='mr-2' />
                View on Facebook
              </a>
              <button
                onClick={handleShare}
                className='btn-secondary flex items-center justify-center'>
                <Share2 size={18} className='mr-2' />
                Share Event
              </button>
            </div>
          </div>
        </section>

        <section className='py-12 md:py-16 bg-gray-50'>
          <div className='container-max'>
            <h2 className='text-2xl md:text-3xl font-bold mb-8'>More Events</h2>
            <Link href='/events' className='btn-primary inline-block'>
              Browse All Events
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
