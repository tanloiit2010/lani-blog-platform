"use client";

import Header from "./components/Header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full">
      <Header />
      {children}
    </div>
  );
}
