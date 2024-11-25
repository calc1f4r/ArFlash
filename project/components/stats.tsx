const stats = [
  { id: 1, name: "Total Value Locked", value: "$1.2B+" },
  { id: 2, name: "Flash Loans Processed", value: "2.5M+" },
  { id: 3, name: "Average Loan Size", value: "$50K" },
  { id: 4, name: "Protocol Revenue", value: "$5M+" },
];

export default function Stats() {
  return (
    <div className="border-y">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by traders worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-foreground/60">
              Our protocol has processed millions of flash loans, providing
              liquidity to traders and developers.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col p-8 bg-muted">
                <dt className="text-sm font-semibold leading-6 text-foreground/60">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}