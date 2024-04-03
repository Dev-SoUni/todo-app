import React from 'react';

import { BottomNavigation } from "./_components/bottom-navigation";

export default function ServiceLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="h-full flex flex-col">
      <main className="flex-1">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
