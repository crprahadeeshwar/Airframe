import { Button } from "../../ui/button"
export default function FlightDetailsCard() {

    return(
        <div className=" border-2 rounded-2xl m-4 p-4 max-w-200 max-h-300 min-h-100">
            <div className="flex flex-col items-center border-2 rounded-lg p-2">
                <h1>Flight Reg</h1>
            </div>
            <div className="flex flex-row justify-between m-10">
                <div className="border rounded-3xl p-4"> Aircraft </div>
                <div className="border rounded-3xl p-4"> Flight No. </div>
                <div className="border rounded-3xl p-4"> Airline </div>
            </div>
            <div className="flex flex-row justify-between m-20">
                <div className="border p-4 rounded-2xl"> From </div>
                <div> Icon </div>
                <div className="border p-4 rounded-2xl"> To </div>
            </div>
            <div className="flex flex-col items-center m-4">
                <div> Date </div>
            </div>
            <div className="flex flex-col items-center m-4 border rounded-3xl min-h-20">
                <div> Notes </div>
            </div>
            <div className="flex flex-row justify-between">
                <div>
                    <Button variant={"outline"}> Edit </Button>
                </div>
                <div>
                    <Button variant={"destructive"}> Delete </Button>
                </div>
            </div>
        </div>
    )


}