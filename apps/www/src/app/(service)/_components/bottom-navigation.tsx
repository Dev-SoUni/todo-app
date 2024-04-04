import React from 'react';
import { Home } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function BottomNavigation() {
  return (
    <div
      className={cn(
        "px-10",

        // size
        "h-[80px]",

        // align
        "flex justify-between items-center",

        // border
        "border-t border-gray-100",
      )}
    >
      <div className="h-12 w-12" />

      <Button variant="secondary" size="icon" asChild className="h-12 w-12">
        <Link href="/todos">
          <Home className="h-6 w-6" />
        </Link>
      </Button>

      <Button variant="ghost" size="icon" className="h-12 w-12">
        <UserButton
          // 로그아웃 후 이동할 URL
          afterSignOutUrl="/"
        />
      </Button>
    </div>
  );
}
