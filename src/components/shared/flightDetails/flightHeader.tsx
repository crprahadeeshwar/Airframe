import { buttonVariants } from "../../ui/button"
export default function FlightHeader() {
    return(
        <div className="flex justify-between border-b p-4">
            <span>Flights</span>
            <span>
                <a
                href="https://github.com/crprahadeeshwar/Airframe" target="_blank" rel="noopener"
                className={buttonVariants({ variant: "secondary", size: "sm" })}
                >
                Github
                </a>
            </span>
        </div>
    )
}