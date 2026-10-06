"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    <div className="relative min-w-0">
      <select
        value={selectedOrder}
        onChange={onChange}
        aria-label="Sort flights"
        className="h-10 w-full appearance-none rounded-md border bg-background py-2 pl-3 pr-9 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>

      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}