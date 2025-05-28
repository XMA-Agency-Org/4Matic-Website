// app/(public)/vehicles/_components/CollectionHeader.tsx
import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function CollectionHeader() {
  return (
    <div className="relative py-16 bg-secondary-900 dark:bg-secondary-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 z-10 relative">
        <SectionHeader
          title="Explore Our Vehicle Collection"
          description="Browse our premium selection of vehicles and find the perfect car for your needs. Use the filters to narrow down your search and find your dream ride."
          align="center"
          className="max-w-3xl mx-auto"
          titleClassName="text-white"
          descriptionClassName="text-secondary-300 text-lg"
        />
      </div>
    </div>
  );
}
