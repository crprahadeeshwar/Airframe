import React from 'react'
interface FlightCardsProps {
    title: string,
    metric: number
}

export default function FlightCard( {title, metric}: FlightCardsProps) {
    return(
        <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div>
                {title}
            </div>
            <div>
                {metric}
            </div>
        </div>

    )
}

