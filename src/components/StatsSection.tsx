interface StatCard {
  value: string | number;
  label: string;
  icon: React.ReactNode;
}

interface StatsSectionProps {
  stats: StatCard[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className='border-b border-border bg-muted/30' aria-label='Platform stats'>
      <div className='container-max py-10 md:py-12'>
        <ul className='grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6'>
          {stats.map((stat) => (
            <li
              key={stat.label}
              className='card flex flex-col items-center px-6 py-8 text-center sm:items-start sm:text-left'>
              <div className='mb-3 text-primary'>{stat.icon}</div>
              <p className='text-3xl font-semibold tracking-tight tabular-nums md:text-4xl'>
                {stat.value}
              </p>
              <p className='mt-1 text-sm font-medium text-muted-foreground'>
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
