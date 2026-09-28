"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Sort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedOrder = searchParams.get("order") || "newest";

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams.toString());
    params.set("order", value);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <select
      value={selectedOrder}
      onChange={onChange}
      aria-label="Sort flights"
      className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <option value="newest">Newest first</option>
      <option value="oldest">Oldest first</option>
    </select>
  );
}