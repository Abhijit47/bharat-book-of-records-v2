export function SkeletonCard() {
  return (
    <div className='card flex h-full animate-pulse flex-col overflow-hidden'>
      <div className='aspect-[4/3] bg-muted' />
      <div className='flex flex-1 flex-col p-4'>
        <div className='mb-3 h-4 w-20 rounded bg-muted' />
        <div className='mb-2 h-6 rounded bg-muted' />
        <div className='mb-2 h-4 w-5/6 rounded bg-muted' />
        <div className='mt-auto h-10 rounded-lg bg-muted' />
      </div>
    </div>
  );
}

export default function SkeletonGrid({ count = 9 }: { count?: number }) {
  return (
    <div
      className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
      aria-busy
      aria-label='Loading events'>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
