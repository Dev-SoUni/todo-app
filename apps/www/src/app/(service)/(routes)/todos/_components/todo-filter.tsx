"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useServiceState, useServiceDispatch } from "@/hooks/use-service";

import { ListFilter } from "lucide-react";

export function TodoFilter() {
  const { filter } = useServiceState();
  const dispatch = useServiceDispatch();

  const handleValueChange = (value: string) => {
    dispatch({ type: "SET_FILTER", payload: value as "0" | "1" | "all"});
  }


  return (
    <div className='flex justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="focus:outline-none">
            <ListFilter className="w-4 h-4 mr-2"/>
            <span>필터</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20 mr-2">
          <DropdownMenuRadioGroup
            value={filter}
            onValueChange={handleValueChange}
          >
            <DropdownMenuRadioItem value="all">전체</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="1">완료</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="0">미완료</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
