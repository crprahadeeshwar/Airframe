"use client";

import Search from "./flightSearch";
import Filter from "./flightFilter";
import Sort from "./flightSort";

export default function FlightControls() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-background p-3 shadow-sm sm:flex-row sm:items-center">
      <div className="flex-1">
        <Search />
      </div>

      <div className="flex gap-2">
        <Filter />
        <Sort />
      </div>
    </div>
  );
}