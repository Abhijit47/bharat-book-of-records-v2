import { createFetch } from '@better-fetch/fetch';
import z from 'zod';

export const mediaTypes = ['photo', 'video', 'link', 'album'] as const;
export const attachmentDataTypes = [
  'album',
  'photo',
  'video_inline',
  'share',
  'native_templates',
] as const;

export type MediaType = (typeof mediaTypes)[number];
export type AttachmentDataType = (typeof attachmentDataTypes)[number];

export const AttachmentImage = z.object({
  height: z.number(),
  src: z.string(),
  width: z.number(),
});

export const AttachmentsSchema = z.object({
  data: z.array(
    z
      .object({
        media: z.object({
          image: AttachmentImage,
        }),
        media_type: z.enum(mediaTypes),
        title: z.string(),
        url: z.string(),
        type: z.enum(attachmentDataTypes),
      })
      .or(
        z.object({
          media: z.object({
            image: AttachmentImage,
          }),
          media_type: z.enum(mediaTypes),
          url: z.string(),
          type: z.enum(attachmentDataTypes),
          description: z.string(),
        }),
      )
      .or(
        z.object({
          media: z.object({
            image: AttachmentImage,
            source: z.string(),
          }),
          media_type: z.enum(mediaTypes),
          url: z.string(),
          type: z.enum(attachmentDataTypes),
        }),
      )
      .or(
        z.object({
          media: z.object({
            image: AttachmentImage,
          }),
          media_type: z.enum(mediaTypes),
          title: z.string(),
          url: z.string(),
          type: z.enum(attachmentDataTypes),
          description: z.string(),
        }),
      )
      .or(
        z.object({
          media_type: z.enum(mediaTypes),
          title: z.string(),
          type: z.enum(attachmentDataTypes),
          description: z.string(),
        }),
      ),
  ),
});

export const PostSchema = z.object({
  full_picture: z.string().optional(),
  attachments: AttachmentsSchema,
  id: z.string(),
  is_published: z.boolean(),
  is_hidden: z.boolean(),
  is_live_clip: z.boolean(),
  permalink_url: z.string(),
  message: z.string().optional(),
  created_time: z.string(),
});

export type Attachments = z.infer<typeof AttachmentsSchema>;
export type Post = z.infer<typeof PostSchema>;

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const $fetch = createFetch({
  baseURL: `${BASE_URL}/data/fb_posts_107248091187807.json`,
  retry: {
    type: 'linear',
    attempts: 3,
    delay: 1000,
  },
  headers: {
    'Content-Type': 'application/json',
  },
  output: z.array(PostSchema),
});

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(
    `${BASE_URL}/data/fb_posts_107248091187807.json`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const data = await response.json();
  return z.array(PostSchema).parse(data);
}

export function getFeaturedPosts(posts: Post[], limit: number = 8): Post[] {
  return posts
    .filter((post) => post.attachments?.data?.length > 0)
    .sort(
      (a, b) =>
        new Date(b.created_time).getTime() - new Date(a.created_time).getTime(),
    )
    .slice(0, limit);
}

export {
  getPostImage,
  getPrimaryAttachment,
  type Attachment,
} from '@/lib/attachments';

export function getPostExcerpt(
  message: string | undefined,
  maxLength: number = 150,
): string {
  if (!message) return 'No description available';
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength) + '...';
}

export function getMediaTypeBadge(mediaType: MediaType): {
  label: string;
  className: string;
} {
  const badgeMap: Record<MediaType, { label: string; className: string }> = {
    photo: {
      label: 'Photo',
      className: 'bg-primary/15 text-primary',
    },
    video: {
      label: 'Video',
      className: 'bg-destructive/15 text-destructive',
    },
    album: {
      label: 'Album',
      className: 'bg-secondary text-secondary-foreground',
    },
    link: {
      label: 'Link',
      className: 'bg-muted text-muted-foreground',
    },
  };

  return (
    badgeMap[mediaType] || {
      label: mediaType,
      className: 'bg-muted text-muted-foreground',
    }
  );
}

export function filterByMediaType(
  posts: Post[],
  mediaTypes: MediaType[],
): Post[] {
  if (mediaTypes.length === 0) return posts;

  return posts.filter((post) => {
    const postMediaTypes =
      post.attachments?.data?.map((a) => a.media_type) || [];
    return postMediaTypes.some((type) => mediaTypes.includes(type));
  });
}

export function filterByDateRange(
  posts: Post[],
  range: 'week' | 'month' | 'all',
): Post[] {
  if (range === 'all') return posts;

  const now = new Date();
  const days = range === 'week' ? 7 : 30;

  return posts.filter((post) => {
    const postDate = new Date(post.created_time);
    const diffInDays =
      (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= days;
  });
}

export function sortPosts(posts: Post[], order: 'newest' | 'oldest'): Post[] {
  return [...posts].sort((a, b) => {
    const timeA = new Date(a.created_time).getTime();
    const timeB = new Date(b.created_time).getTime();
    return order === 'newest' ? timeB - timeA : timeA - timeB;
  });
}

export function getPostById(posts: Post[], id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}

export function getPageStats(posts: Post[]) {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const upcomingCount = posts.filter(
    (p) => new Date(p.created_time) > weekAgo,
  ).length;
  const totalOrganizers = new Set(posts.map((p) => p.id.split('_')[0])).size;

  return {
    totalEvents: posts.length,
    upcomingEvents: upcomingCount,
    totalOrganizers: totalOrganizers,
  };
}
