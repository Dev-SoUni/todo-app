import React, { useMemo } from "react";
import { format } from "date-fns";
import type { CheckboxProps } from "@radix-ui/react-checkbox";
import { CalendarDays, Dot, UserRound } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export function TodoItem({
  id,
  title,
  description,
  date,
  name,
  checked,
  className,
  onCheckedChange,
 }: {
  id: string
  title: string
  description: string
  date: Date
  name: string
  checked: boolean
  className?: string
  onCheckedChange?: CheckboxProps['onCheckedChange']
}) {
  const formattedDate = useMemo(() => format(date, "yyyy-MM-dd"), [date]);

  return (
    <div className={cn("px-4 py-4 flex gap-4", className)}>
      <div className="pt-0.5">
        <Checkbox
          id={id}
          checked={checked}
          className="rounded-full border border-gray-300 w-5 h-5"
          onCheckedChange={onCheckedChange}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor={id} className="font-medium">{title}</label>
        <div className="text-sm text-gray-500 leading-4">
          {description}
        </div>

        <div className="mt-1 text-sm flex">
          <span className="text-red-500 flex items-center gap-x-2">
            <CalendarDays className="w-4 h-4" />
            <span>{formattedDate}</span>
          </span>

          <Dot className="text-gray-500" />

          <span className="text-gray-500 flex items-center gap-x-2">
            <UserRound className="w-4 h-4" />
            <span>{name}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
