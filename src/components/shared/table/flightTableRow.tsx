'use client'

interface FlightTableProps {
    flights: {
        date: string,
        flight_number: string,
        aircraft_type: string,
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
                    <span>{flight.flight_number}</span>
                    <span>{flight.aircraft_type}</span>
                    <span>{flight.departure}</span>
                    <span>{flight.arrival}</span>
                    <span>{flight.airline}</span>
                </div>
            ))}
        </div>
    )

}