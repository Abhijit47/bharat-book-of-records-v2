import {
  getMediaTypeBadge,
  getPostExcerpt,
  getPrimaryAttachment,
  Post,
} from '@/lib/data';
import { cn, formatTimeAgo, truncateText } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import MediaComponent from './MediaComponent';

interface EventCardProps {
  post: Post;
  variant?: 'default' | 'featured';
}

export default function EventCard({
  post,
  variant = 'default',
}: EventCardProps) {
  const attachment = getPrimaryAttachment(post);
  const excerpt = getPostExcerpt(post.message);
  const timeAgo = formatTimeAgo(post.created_time);
  const mediaType = post.attachments?.data?.[0]?.media_type;
  const badge = mediaType ? getMediaTypeBadge(mediaType) : null;
  const title = truncateText(
    post.message || 'Untitled event',
    variant === 'featured' ? 80 : 60,
  );

  const media = attachment ? (
    <MediaComponent
      attachment={attachment}
      fill
      mode='thumbnail'
      priority={variant === 'featured'}
      sizes={
        variant === 'featured'
          ? '100vw'
          : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      }
      className='motion-safe:transition-transform motion-safe:duration-[var(--duration-ui)] motion-safe:ease-[var(--ease-out-strong)] group-hover:scale-[1.02]'
    />
  ) : null;

  if (variant === 'featured') {
    return (
      <Link
        href={`/events/${post.id}`}
        className='group relative block h-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'>
        {media ?? (
          <div className='flex h-full items-center justify-center bg-muted'>
            <ImageIcon
              className='size-12 text-muted-foreground/50'
              aria-hidden
            />
          </div>
        )}
        <span className='sr-only'>{title}</span>
        <div className='absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent' />
        <div className='absolute inset-x-0 bottom-0 p-5 text-primary-foreground md:p-8'>
          <p className='text-sm text-primary-foreground/85'>{timeAgo}</p>
          <h3 className='mt-2 line-clamp-2 text-xl font-semibold tracking-tight md:text-2xl'>
            {title}
          </h3>
          {badge && (
            <span
              className={cn(
                'mt-3 inline-block rounded-md px-2 py-0.5 text-xs font-medium',
                badge.className,
              )}>
              {badge.label}
            </span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/events/${post.id}`}
      className='group card flex h-full flex-col overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:transition-[box-shadow,transform] motion-safe:duration-[var(--duration-ui)] motion-safe:ease-[var(--ease-out-strong)] hover:shadow-md'>
      <div className='relative aspect-[4/3] overflow-hidden bg-muted'>
        {media ?? (
          <div className='flex h-full items-center justify-center bg-muted'>
            <ImageIcon
              className='size-10 text-muted-foreground/40'
              aria-hidden
            />
          </div>
        )}
      </div>

      <div className='flex flex-1 flex-col p-4 md:p-5'>
        <div className='mb-2 flex items-center justify-between gap-2'>
          {badge ? (
            <span
              className={cn(
                'rounded-md px-2 py-0.5 text-xs font-medium',
                badge.className,
              )}>
              {badge.label}
            </span>
          ) : (
            <span />
          )}
          <time
            className='shrink-0 text-xs text-muted-foreground'
            dateTime={post.created_time}>
            {timeAgo}
          </time>
        </div>

        <h3 className='line-clamp-2 text-base font-semibold tracking-tight group-hover:text-primary motion-safe:transition-colors motion-safe:duration-[var(--duration-ui-fast)] md:text-lg'>
          {title}
        </h3>

        <p className='mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground'>
          {excerpt}
        </p>

        <span className='btn-primary mt-4 w-full text-center text-sm'>
          View details
        </span>
      </div>
    </Link>
  );
}
