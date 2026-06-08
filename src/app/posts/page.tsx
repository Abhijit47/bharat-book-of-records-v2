// 'use client';

import { getPosts } from '@/lib/requests';
// import { useFetch } from '@hyper-fetch/react';
import { notFound } from 'next/navigation';

export default async function PostsPage() {
  const { data, error } = await getPosts.send();

  if (error) {
    return notFound();
  }

  // const { data, loading, error } = useFetch(getPosts);

  // if (loading) {
  //   return <div>Loading</div>;
  // }

  // if (error) {
  //   return <p>Something went wrong</p>;
  // }

  return (
    <div>
      PostsPage
      <p>{data?.length} posts</p>
    </div>
  );
}
