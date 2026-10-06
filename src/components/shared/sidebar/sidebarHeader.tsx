import Image from "next/image"

interface SidebarHeaderProps {
  title: string
}

export default function SidebarHeader({
  title,

}: SidebarHeaderProps) {

  return (
    <div className="border-b px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg">
          <Image
            src="/airframe.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </div>

        <div>
          <div className="text-base font-semibold tracking-tight">
            {title}
          </div>

          <div className="text-xs text-muted-foreground">
            Flight Logger
          </div>
        </div>
      </div>
    </div>
  )
}