"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Filter() {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const selectedCriteria = searchParams.get('filter') || 'all';


    const handleUpdateParam = (key: string, value: string) => {

        const params = new URLSearchParams(searchParams.toString());
        
        if (value && value !== 'all') {
            params.set(key,value);
        } else {
            params.delete(key);
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handleUpdateParam('filter', value);
    }

    return (
        <label>
            <input
            type="radio"
            name='filter'
            value="all"
            checked={selectedCriteria === 'all'}
            onChange={onChange}
            />
            <input
            type="radio"
            name='filter'
            value="flight_number"
            checked={selectedCriteria === 'flight_number'}
            onChange={onChange}
            />

            {/* and so on? */}
            
        </label>
    );
}