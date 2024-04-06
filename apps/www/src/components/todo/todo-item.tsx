import React, { useMemo } from "react";
import { format } from "date-fns";
import type { CheckboxProps } from "@radix-ui/react-checkbox";
import { CalendarDays, Dot, EllipsisVertical, SquarePen, Trash, UserRound } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
  onEdit,
  onDelete,
 }: {
  id: number
  title: string
  description: string
  date: Date
  name: string
  checked: boolean
  className?: string
  onCheckedChange?: CheckboxProps['onCheckedChange']
  onEdit?: () => void
  onDelete?: () => void
}) {
  const formattedDate = useMemo(() => format(date, "yyyy-MM-dd"), [date]);

  return (
    <div className={cn("relative m-4 px-4 py-4 flex gap-4 border-b border-gray-200", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 h-5 w-5"
          >
            <EllipsisVertical className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>
            <SquarePen className="mr-2 h-4 w-4" />
            <span>수정</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="mr-2 h-4 w-4" />
            <span>삭제</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="pt-0.5">
        <Checkbox
          id={String(id)}
          checked={checked}
          className="rounded-full border border-gray-300 w-5 h-5"
          onCheckedChange={onCheckedChange}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={String(id)}
          className={cn(
            "font-medium",
            checked && "text-black/50 line-through",
          )}
        >
          {title}
        </label>
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
  );
}
