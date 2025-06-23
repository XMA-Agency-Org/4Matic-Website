// app/(public)/blog/_components/CollectionEmpty.tsx
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CollectionEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center mb-6">
        <FileText className="w-8 h-8 text-secondary-400 dark:text-secondary-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
        No articles found
      </h3>
      
      <p className="text-secondary-600 dark:text-secondary-400 text-center mb-8 max-w-md">
        We couldn't find any articles matching your current filters. Try adjusting your search criteria or browse all articles.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          size="md"
          asLink
          href="/blog"
        >
          View All Articles
        </Button>
        
        <Button
          variant="outline"
          size="md"
          asLink
          href="/vehicles"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Browse Vehicles
        </Button>
      </div>
    </div>
  );
}