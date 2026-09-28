"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
export default function Search() {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [text, setText] = useState(searchParams.get('search') || "");

    const handleUpdateParam = useDebouncedCallback((key: string, value: string) => {

        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key,value);
        } else {
            params.delete(key);
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value 
        setText(value);
        handleUpdateParam('search', value)
    }

    return (
        <input 
        type="text"
        value={text}
        placeholder="Search..."
        onChange={onChange}
        />
    )
}