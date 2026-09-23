export default function FlightTableHeader() {
  return(
    <div className="grid grid-cols-6 gap-4  py-2 text-sm font-semibold text-muted-foreground sm:grid-cols-8">
      <span>Date</span>
      <span>Flight</span>
      <span>Aircraft</span>
      <span>From</span>
      <span>To</span>
      <span>Airline</span>
    </div>
  )
}