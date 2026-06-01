import {
  FALLBACK_IMAGE,
  getAttachmentDescription,
  getLinkImage,
  getPhotoOrAlbumImage,
  getVideoMedia,
  type Attachment,
} from '@/lib/attachments';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type MediaComponentProps = {
  attachment: Attachment;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  mode?: 'thumbnail' | 'full';
};

function RemoteImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const isLocal = src.startsWith('/');

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={isLocal}
        sizes={sizes ?? '100vw'}
        priority={priority}
        className={cn('object-cover', className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized={isLocal}
      sizes={sizes}
      priority={priority}
      className={cn('h-full w-full rounded-lg object-cover', className)}
    />
  );
}

export default function MediaComponent({
  attachment,
  className,
  fill = false,
  sizes,
  priority = false,
  mode = 'thumbnail',
}: MediaComponentProps) {
  const desc = getAttachmentDescription(attachment);

  switch (attachment.media_type) {
    case 'photo': {
      const img = getPhotoOrAlbumImage(attachment);
      return (
        <RemoteImage
          src={img.src}
          alt={desc}
          width={img.width}
          height={img.height}
          fill={fill}
          className={className}
          sizes={sizes}
          priority={priority}
        />
      );
    }

    case 'album': {
      const img = getPhotoOrAlbumImage(attachment);
      return (
        <RemoteImage
          src={img.src}
          alt={desc}
          width={img.width}
          height={img.height}
          fill={fill}
          className={className}
          sizes={sizes}
          priority={priority}
        />
      );
    }

    case 'video': {
      const video = getVideoMedia(attachment);
      const poster = video.image;

      if (mode === 'thumbnail') {
        return (
          <RemoteImage
            src={poster.src}
            alt={desc}
            width={poster.width}
            height={poster.height}
            fill={fill}
            className={className}
            sizes={sizes}
            priority={priority}
          />
        );
      }

      return (
        <video
          controls
          width={poster.width}
          height={poster.height}
          poster={poster.src}
          className={cn(
            'bg-black object-cover',
            fill
              ? 'absolute inset-0 h-full w-full'
              : 'h-full w-full rounded-lg',
            className,
          )}>
          <source src={video.source} />
        </video>
      );
    }

    case 'link': {
      const img = getLinkImage(attachment);
      return (
        <RemoteImage
          src={img.src}
          alt={desc}
          width={img.width}
          height={img.height}
          fill={fill}
          className={className}
          sizes={sizes}
          priority={priority}
        />
      );
    }

    default:
      return (
        <RemoteImage
          src={FALLBACK_IMAGE.src}
          alt='Nothing to show'
          width={FALLBACK_IMAGE.width}
          height={FALLBACK_IMAGE.height}
          fill={fill}
          className={className}
          sizes={sizes}
        />
      );
  }
}
