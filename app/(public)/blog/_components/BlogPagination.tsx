import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function BlogPagination({ currentPage, totalPages, onPageChange }: BlogPaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showPages = 5 // Number of page buttons to show
    
    if (totalPages <= showPages) {
      // Show all pages if total is less than showPages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      if (currentPage > 3) {
        pages.push('...')
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      
      // Always show last page
      pages.push(totalPages)
    }
    
    return pages
  }
  
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 inline-flex items-center justify-center border border-gray-700 text-secondary-100 bg-transparent hover:bg-gray-800 rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      {getPageNumbers().map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className="px-3 py-2">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={cn(
                "w-10 h-10 inline-flex items-center justify-center rounded-md transition-colors",
                currentPage === page 
                  ? "bg-primary-600 text-white pointer-events-none" 
                  : "border border-gray-700 text-secondary-100 bg-transparent hover:bg-gray-800"
              )}
            >
              {page}
            </button>
          )}
        </div>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 inline-flex items-center justify-center border border-gray-700 text-secondary-100 bg-transparent hover:bg-gray-800 rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}