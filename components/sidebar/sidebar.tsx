import React from 'react'
import SidebarHeader from './sidebarHeader'
import SidebarFooter from './sidebarFooter'
import SidebarMenu from './sidebarMenu'

const menuItems = [
    {"title": "Dashboard", "link": "/dashboard"},
    {"title": "Flights", "link": "/flights"}
]
export default function Sidebar() {
  return (
    <>
    <div className="flex flex-col gap-2">
        <SidebarHeader title="Airframe"/>
        <SidebarMenu items={menuItems}/>
        <SidebarFooter/>
    </div>
    </>
  )
}
