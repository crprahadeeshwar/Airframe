import React from 'react'

interface SidebarMenuProps {
    items: {
        title: string,
        link: string
    }[]
}

export default function Sidebarmenu({items}: SidebarMenuProps) {
    return(
        <div className="flex flex-col gap-2">
            <ul>
                {items.map((item, index) => (
                    <li key = {index} className="py-2 px-4 hover:bg-slate-100 cursor-pointer">
                        <a href={item.link}>
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}