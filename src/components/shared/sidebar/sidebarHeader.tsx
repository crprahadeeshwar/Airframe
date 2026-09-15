import React from 'react'


interface SidebarHeaderProps {
    title: string
}
export default function SidebarHeader({ title }: SidebarHeaderProps) {
    return(
        <div className="text-lg font-bold">
            {title}
        </div>
    )
}
