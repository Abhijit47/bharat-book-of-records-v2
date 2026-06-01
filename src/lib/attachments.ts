import type { Post } from '@/lib/data';

export type Attachment = Post['attachments']['data'][number];

export const FALLBACK_IMAGE = {
  src: '/no-image-placeholder.svg',
  width: 330,
  height: 406,
} as const;

export const FALLBACK_VIDEO = {
  image: {
    src: '/no-video-poster.svg',
    width: 593,
    height: 333,
  },
  source: '/no-video-poster.svg',
} as const;

export function getAttachmentDescription(attachment: Attachment): string {
  if ('description' in attachment && attachment.description) {
    return attachment.description;
  }
  if ('title' in attachment && attachment.title) {
    return attachment.title;
  }
  return 'Event media';
}

function hasAttachmentImage(
  attachment: Attachment,
): attachment is Attachment & {
  media: { image: { src: string; width: number; height: number } };
} {
  return 'media' in attachment && 'image' in attachment.media;
}

export function getPhotoOrAlbumImage(attachment: Attachment) {
  if (
    (attachment.type === 'photo' || attachment.type === 'album') &&
    hasAttachmentImage(attachment)
  ) {
    return attachment.media.image;
  }
  return FALLBACK_IMAGE;
}

export function getVideoMedia(attachment: Attachment) {
  if (
    attachment.type === 'video_inline' &&
    hasAttachmentImage(attachment) &&
    'source' in attachment.media
  ) {
    return attachment.media;
  }
  return FALLBACK_VIDEO;
}

export function getLinkImage(attachment: Attachment) {
  if (attachment.type === 'share' && hasAttachmentImage(attachment)) {
    return attachment.media.image;
  }
  if (attachment.type === 'native_templates' && hasAttachmentImage(attachment)) {
    return attachment.media.image;
  }
  return FALLBACK_IMAGE;
}

export function getAttachmentImageSrc(attachment: Attachment): string {
  switch (attachment.media_type) {
    case 'photo':
    case 'album':
      return getPhotoOrAlbumImage(attachment).src;
    case 'video':
      return getVideoMedia(attachment).image.src;
    case 'link':
      return getLinkImage(attachment).src;
    default:
      return FALLBACK_IMAGE.src;
  }
}

export function hasDisplayableAttachment(attachment: Attachment): boolean {
  if (hasAttachmentImage(attachment)) {
    return true;
  }
  return attachment.media_type === 'video' && attachment.type === 'video_inline';
}

export function getPostImage(post: Post): string | null {
  const first = post.attachments?.data?.[0];
  if (first && hasDisplayableAttachment(first)) {
    return getAttachmentImageSrc(first);
  }
  if (post.full_picture) {
    return post.full_picture;
  }
  return null;
}

export function getPrimaryAttachment(post: Post): Attachment | null {
  return post.attachments?.data?.[0] ?? null;
}
