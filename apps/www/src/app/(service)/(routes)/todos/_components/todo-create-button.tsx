"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useServiceDispatch } from "@/hooks/use-service";
import { cn } from "@/lib/utils";

export const TodoCreateButton = ({ className }: { className?: string }) => {
  const dispatch = useServiceDispatch();

  const handleClick = () => {
    dispatch({ type: "OPEN_CREATE_DRAWER" });
  }

  return (
    <Button
      variant="default"
      size="icon"
      className={cn("h-12 w-12", className)}
      onClick={handleClick}
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
}
