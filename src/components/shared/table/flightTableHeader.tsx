export default function FlightTableHeader() {
  return (
    <div className="grid grid-cols-6 gap-4 border-b bg-muted/40 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
      <span>Date</span>
      <span>Flight</span>
      <span>Aircraft</span>
      <span>From</span>
      <span>To</span>
      <span>Airline</span>
    </div>
  );
}