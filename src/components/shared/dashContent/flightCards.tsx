interface FlightCardsProps {
  title: string;
  metric: number;
}

export default function FlightCard({
  title,
  metric,
}: FlightCardsProps) {
  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm sm:p-5">
      <div className="text-sm font-medium text-muted-foreground">
        {title}
      </div>

      <div className="mt-2 text-3xl font-semibold tracking-tight">
        {metric}
      </div>
    </div>
  );
}