"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";
export default function Sort() {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const selectedOrder = searchParams.get('order') || 'newest';

    const handleUpdateParam = (key: string, value: string) => {

        const params = new URLSearchParams(searchParams.toString());
        params.set(key,value);

        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        handleUpdateParam('order', value);
    }

    return (
        <label>
            <select value={selectedOrder} onChange={onChange} >
                <option value="newest">newest</option>
                <option value="oldest">oldest</option>
            </select>
        </label>
    );
}