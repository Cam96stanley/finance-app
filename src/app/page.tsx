import { ChartPieIcon, PiggyBankIcon, ReceiptIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Button } from "@/ui/primitives/Button";



export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <CtaBanner />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-background px-6 pt-20 pb-16 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <span
          className="text-preset-5-bd uppercase tracking-[0.18em] mb-5 inline-block text-green"
        >
          Personal Finance
        </span>

        <h1
          className="text-foreground mb-6"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
          }}
        >
          Take control of
          <br />
          your finances.
        </h1>

        <p
          className="text-muted-foreground mb-10 max-w-lg"
          style={{ fontSize: "1.0625rem", lineHeight: 1.65 }}
        >
          Track budgets, organize savings pots, and review every transaction —
          all in one focused dashboard built for clarity.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Button asChild size="default">
            <Link href="/sign-up">Get Started Free</Link>
          </Button>
          <Button variant="outline" asChild size="default">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="mt-16 w-full max-w-2xl mx-auto select-none">
      <div
        className="rounded-2xl px-8 py-7 text-left mb-3 bg-primary"
      >
        <p
          className="text-preset-5-rg mb-2 bg-primary"
        >
          Current Balance
        </p>
        <p
          style={{
            fontSize: "2.75rem",
            fontWeight: 700,
            color: "white",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          $4,836.00
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-card rounded-2xl px-7 py-6 text-left border border-border">
          <p className="text-preset-5-rg text-muted-foreground mb-2">Income</p>
          <p
            style={{
              fontSize: "1.875rem",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            $3,814.25
          </p>
        </div>
        <div className="bg-card rounded-2xl px-7 py-6 text-left border border-border">
          <p className="text-preset-5-rg text-muted-foreground mb-2">
            Expenses
          </p>
          <p
            style={{
              fontSize: "1.875rem",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            $1,700.50
          </p>
        </div>
      </div>

      <div className="bg-card rounded-2xl px-7 py-5 border border-border flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-preset-5-bd">Emma Richardson</p>
          <p className="text-preset-5-rg text-muted-foreground">19 Aug 2024</p>
        </div>
        <p className="text-preset-4-bd text-green">
          +$75.50
        </p>
      </div>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <ChartPieIcon size={28} weight="bold" />,
      title: "Budget Tracking",
      description:
        "Set monthly limits by category and watch your spending in real time. No surprises at month-end.",
    },
    {
      icon: <PiggyBankIcon size={28} weight="bold" />,
      title: "Savings Pots",
      description:
        "Earmark money for specific goals — holiday funds, new gear, or a rainy-day reserve — without opening extra accounts.",
    },
    {
      icon: <ReceiptIcon size={28} weight="bold" />,
      title: "Transaction History",
      description:
        "Every income and expense in one searchable list. See the full picture of your financial life at a glance.",
    },
  ];

  return (
    <section className="bg-card py-24 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-preset-5-bd uppercase tracking-[0.18em] inline-block mb-4 text-green"
          >
            Features
          </span>
          <h2 className="text-preset-1" style={{ fontSize: "2rem" }}>
            Everything you need, nothing you don't.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-background rounded-xl p-8 border-t-0 border-r-0 border-b-0"
              style={{ borderLeft: `3px solid var(--green)` }}
            >
              <div className="mb-5 text-green">
                {f.icon}
              </div>
              <h3 className="text-preset-3 mb-3">{f.title}</h3>
              <p className="text-preset-4-rg text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="bg-primary text-primary-foreground py-20 px-6 text-center">
      <h2
        className="mb-3"
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
        }}
      >
        Ready to get started?
      </h2>
      <p
        className="mb-10 max-w-sm mx-auto"
        style={{ fontSize: "0.9375rem", lineHeight: 1.6, opacity: 0.65 }}
      >
        Join people managing their money with confidence, one dashboard at a
        time.
      </p>
      <Button variant="secondary" asChild size="default">
        <Link href="/sign-up">Create Free Account</Link>
      </Button>
    </section>
  );
}
