// app/(public)/blog/_components/Loading.tsx
export default function Loading() {
  return (
    <div className="w-full">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="mb-4 sm:mb-0 flex items-center">
          <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-48 mr-4 animate-pulse"></div>
          <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-20 animate-pulse"></div>
        </div>
      </div>
      
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-secondary-800 rounded-xl overflow-hidden shadow-sm">
            <div className="h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>
            <div className="h-48 bg-secondary-200 dark:bg-secondary-700 animate-pulse"></div>
            <div className="p-5">
              <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded mb-1 animate-pulse"></div>
              <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-16 animate-pulse"></div>
                <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-20 animate-pulse"></div>
              </div>
              <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}