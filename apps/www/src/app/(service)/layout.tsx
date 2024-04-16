import React from "react";

import { BottomNavigation } from "./_components/bottom-navigation";

export default function ServiceLayout({
  children,
}: {
  children?: React.ReactNode
}) {

  return (
    <div className="h-full">
      <div className="h-full flex justify-center items-center">
        <div className="relative w-full max-w-[430px] h-full max-h-[932px] md:rounded-md border border-slate-200 bg-white shadow-md overflow-hidden">
          <div className="h-full flex flex-col">
            {children}
            <BottomNavigation />
          </div>
        </div>
      </div>
    </div>
  );
}
