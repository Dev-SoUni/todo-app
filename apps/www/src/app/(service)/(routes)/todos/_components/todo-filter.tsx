"use client";

import React from "react";
import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useServiceState, useServiceDispatch } from "@/hooks/use-service";

const filters = [
  { label: "전체", value: "all" },
  { label: "할일", value: "0" },
  { label: "완료", value: "1" },
]

export function TodoFilter() {
  const { filter } = useServiceState();
  const dispatch = useServiceDispatch();

  const handleValueChange = (value: string) => {
    dispatch({
      type: "SET_FILTER",
      payload: value as "0" | "1" | "all",
    });
  }

  return (
    <div className="flex justify-end">
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
            {
              filters.map((filter) => (
                <DropdownMenuRadioItem
                  key={filter.value}
                  value={filter.value}
                >
                  {filter.label}
                </DropdownMenuRadioItem>
              ))
            }
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
