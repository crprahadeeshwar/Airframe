"use client";

import Search from "./flightSearch";
import Filter from "./flightFilter";
import Sort from "./flightSort";

export default function FlightControls() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-background p-3 shadow-sm sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <Search />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
        <Filter />
        <Sort />
      </div>
    </div>
  );
}