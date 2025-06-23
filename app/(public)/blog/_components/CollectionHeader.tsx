// app/(public)/blog/_components/CollectionHeader.tsx
import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function CollectionHeader() {
  return (
    <div className="relative py-16 bg-secondary-900 dark:bg-secondary-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 z-10 relative">
        <SectionHeader
          title="Our Blog & Insights"
          description="Discover the latest insights, tips, and stories from the world of luxury car rentals. Stay informed with expert advice and exclusive content from 4Matic."
          align="center"
          className="max-w-3xl mx-auto"
          titleClassName="text-white"
          descriptionClassName="text-secondary-300 text-lg"
        />
      </div>
    </div>
  );
}