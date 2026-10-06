"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { ChevronDown } from "lucide-react";

const filterOptions = [
  { value: "all", label: "All fields" },
  { value: "date", label: "Has date" },
  { value: "flight_number", label: "Has flight number" },
  { value: "registration", label: "Has registration" },
  { value: "airline", label: "Has airline" },
  { value: "aircraft_type", label: "Has aircraft type" },
  { value: "departure", label: "Has departure" },
  { value: "arrival", label: "Has arrival" },
  { value: "notes", label: "Has notes" },
];


export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedCriteria = searchParams.get("filter") || "all";

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative min-w-0">
      <select
        value={selectedCriteria}
        onChange={onChange}
        aria-label="Filter flights"
        className="h-10 w-full appearance-none rounded-md border bg-background py-2 pl-3 pr-9 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}