"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [text, setText] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setText(searchParams.get("search") || "");
  }, [searchParams]);

  const handleUpdateParam = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setText(value);
    handleUpdateParam(value);
  };

  return (
    <div className="relative w-full sm:max-w-sm">
      <input
        type="search"
        value={text}
        placeholder="Search flights..."
        onChange={onChange}
        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}