// app/(public)/vehicles/_components// app/(public)/vehicles/_components/CarCollection.tsx
import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarCard from "@/components/cars/CarCard";
import SortDropdown from "./SortDropdown";
import CollectionEmpty from "./CollectionEmpty";
import FilterModal from "./FilterModal";
import { getCars } from "../_actions/car-actions";

interface CarCollectionProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    passengers?: string;
    sort?: string;
    page?: string;
    q?: string;
  }>;
}

export default async function CarCollection({ searchParams }: CarCollectionProps) {
  const params = await searchParams;
  const { 
    category, 
    brand, 
    minPrice, 
    maxPrice, 
    passengers, 
    sort = "recommended",
    page = "1",
    q: searchQuery
  } = params;
  
  const currentPage = parseInt(page, 10) || 1;
  const pageSize = 9;
  
  // Fetch cars with server action
  const { cars, totalCars } = await getCars({
    category,
    brand,
    minPrice: minPrice ? parseInt(minPrice, 10) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
    passengers: passengers ? parseInt(passengers, 10) : undefined,
    sort,
    page: currentPage,
    pageSize,
    searchQuery,
  });
  
  const totalPages = Math.ceil(totalCars / pageSize);
  
  if (cars.length === 0) {
    return <CollectionEmpty />;
  }
  
  // Generate pagination links
  const getPaginationLinks = () => {
    const links = [];
    
    // Always include first page
    links.push(1);
    
    // Calculate range of pages to show around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust range for edge cases
    if (startPage === 2) endPage = Math.min(totalPages - 1, endPage + 1);
    if (endPage === totalPages - 1) startPage = Math.max(2, startPage - 1);
    
    // Add ellipsis and adjust range if needed
    if (startPage > 2) links.push("ellipsis1");
    
    // Add pages in range
    for (let i = startPage; i <= endPage; i++) {
      links.push(i);
    }
    
    // Add ellipsis if needed
    if (endPage < totalPages - 1) links.push("ellipsis2");
    
    // Always include last page if there's more than one page
    if (totalPages > 1) links.push(totalPages);
    
    return links;
  };
  
  const paginationLinks = getPaginationLinks();
  
  // Helper to create page URL
  const createPageUrl = (p: number) => {
    const urlParams = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null) as [string, string][]
    );
    urlParams.set("page", p.toString());
    return `/vehicles?${urlParams.toString()}`;
  };
  
  return (
    <div className="w-full">
      {/* Collection header with total count, filters and sorting */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
        <div className="mb-4 sm:mb-0 flex items-center">
          <p className="text-sm text-secondary-600 dark:text-secondary-400 mr-4">
            Showing <span className="font-medium text-secondary-900 dark:text-white">{cars.length}</span> of{" "}
            <span className="font-medium text-secondary-900 dark:text-white">{totalCars}</span> vehicles
            {searchQuery && (
              <span className="ml-2 text-primary-600 dark:text-primary-400">
                for &quot;{searchQuery}&quot;
              </span>
            )}
          </p>
          
          <FilterModal />
        </div>
        
        <SortDropdown currentSort={sort || "recommended"} />
      </div>
      
      {/* Car grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12">
          <div className="text-sm text-secondary-600 dark:text-secondary-400 mb-4 sm:mb-0">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="flex items-center space-x-1">
            {/* Previous page button */}
            {currentPage > 1 ? (
              <Link
                href={createPageUrl(currentPage - 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-secondary-200 dark:border-secondary-800 text-secondary-800 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-800"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
            ) : (
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-secondary-200 dark:border-secondary-800 text-secondary-400 dark:text-secondary-600 cursor-not-allowed">
                <ChevronLeft className="h-4 w-4" />
              </div>
            )}
            
            {/* Page numbers */}
            {paginationLinks.map((link, index) => {
              if (link === "ellipsis1" || link === "ellipsis2") {
                return (
                  <span
                    key={link}
                    className="inline-flex h-9 w-9 items-center justify-center text-secondary-600 dark:text-secondary-400"
                  >
                    ...
                  </span>
                );
              }
              
              return (
                <Link
                  key={link}
                  href={createPageUrl(link as number)}
                  className={`inline-flex h-9 min-w-[36px] items-center justify-center rounded-md px-2 ${
                    currentPage === link
                      ? "bg-primary-600 text-white font-medium hover:bg-primary-700"
                      : "border border-secondary-200 dark:border-secondary-800 text-secondary-800 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-800"
                  }`}
                >
                  {link}
                </Link>
              );
            })}
            
            {/* Next page button */}
            {currentPage < totalPages ? (
              <Link
                href={createPageUrl(currentPage + 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-secondary-200 dark:border-secondary-800 text-secondary-800 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-800"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-secondary-200 dark:border-secondary-800 text-secondary-400 dark:text-secondary-600 cursor-not-allowed">
                <ChevronRight className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
