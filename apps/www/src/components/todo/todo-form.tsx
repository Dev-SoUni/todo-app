"use client";

import React, {useMemo, useState} from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TodoForm({
  className,
  onSubmit,
  onCancel,
}: {
  className?: string
  onSubmit?: (values: { title: string; description: string; date: Date | undefined }) => void
  onCancel?: () => void
}) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>();

  const formattedDate = useMemo(() => {
    if (!date) return "날짜 없음";

    return format(date, "yyyy-MM-dd");
  }, [date])

  const handleSubmit = () => {
    if (!onSubmit) return;

    onSubmit({ title, description, date });
  }

  return (
    <div className={cn('rounded-md w-full h-full border border-gray-100', className)}>
      <div className="px-2 py-1 border-b border-gray-100">
        <input
          placeholder='제목'
          value={title}
          className='p-2 w-full font-medium focus:outline-none'
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="p-2 border-b border-gray-100">
        <textarea
          placeholder='내용'
          value={description}
          className='p-2 w-full h-[150px] text-sm text-gray-500 focus:outline-none'
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className='p-2 flex justify-between'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[150px] justify-start text-gray-500 text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{formattedDate}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className='flex gap-3'>
          <Button variant='outline' onClick={onCancel}>
            취소
          </Button>
          <Button variant='default' onClick={handleSubmit}>
            등록
          </Button>
        </div>
      </div>
    </div>
  )
}
