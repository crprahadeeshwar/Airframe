"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";

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
    <select
      value={selectedCriteria}
      onChange={onChange}
      aria-label="Filter flights"
      className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {filterOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}