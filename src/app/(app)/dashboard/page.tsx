export default function Page() {
  const stats: { title: string; total: string }[] = [
    { title: "Current Balance", total: "4,836.00" },
    { title: "Income", total: "3,814.25" },
    { title: "Expenses", total: "1,700.50" },
  ];

  return (
    <div>
      <main className="px-10 py-8">
        <h1 className="text-preset-1">Overview</h1>
        <div className="py-8 grid grid-cols-3 gap-6">
          {stats.map(({ title, total }, i) => (
            <div
              key={title}
              className={`p-6 rounded-xl flex flex-col gap-3 ${i === 0 ? "bg-primary text-white" : "bg-card"}`}
            >
              <p
                className={`text-preset-4-rg ${i === 0 ? "text-grey" : "text-muted-foreground"}`}
              >
                {title}
              </p>
              <p className="text-preset-1">${total}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
