

interface FlightTableProps {
    flights: {
        date: string,
        flightNumber: string,
        aircraft: string,
        departure: string,
        arrival: string,
        airline: string
    }[]
}

export default function FlightTableRow( {flights}: FlightTableProps) {
    return(
        <div className="flex flex-col gap-2">
            {flights.map((flight, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 py-2 text-sm sm:grid-cols-8">
                    <span>{flight.date}</span>
                    <span>{flight.flightNumber}</span>
                    <span>{flight.aircraft}</span>
                    <span>{flight.departure}</span>
                    <span>{flight.arrival}</span>
                    <span>{flight.airline}</span>
                </div>
            ))}
        </div>
    )

}