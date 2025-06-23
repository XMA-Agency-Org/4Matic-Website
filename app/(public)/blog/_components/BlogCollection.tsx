// app/(public)/blog/_components/BlogCollection.tsx
import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "./BlogCard";
import BlogFilterModal from "./BlogFilterModal";
import CollectionEmpty from "./CollectionEmpty";
import { BlogPost, BlogCategory, BlogTag } from "@/types/blog";

interface BlogCollectionProps {
  posts: BlogPost[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  categories: BlogCategory[];
  tags: BlogTag[];
  filters: {
    category?: string;
    tag?: string;
    search?: string;
  };
}

export default function BlogCollection({
  posts,
  totalPosts,
  currentPage,
  totalPages,
  categories,
  tags,
  filters,
}: BlogCollectionProps) {
  const pageSize = 12;
  
  if (posts.length === 0) {
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
    const urlParams = new URLSearchParams();
    
    if (filters.category) urlParams.set("category", filters.category);
    if (filters.tag) urlParams.set("tag", filters.tag);
    if (filters.search) urlParams.set("search", filters.search);
    if (p > 1) urlParams.set("page", p.toString());
    
    return `/blog${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
  };
  
  return (
    <div className="w-full">
      {/* Collection header with total count and filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="mb-4 sm:mb-0 flex items-center">
          <p className="text-sm text-secondary-600 dark:text-secondary-400 mr-4">
            Showing <span className="font-medium text-secondary-900 dark:text-white">{posts.length}</span> of{" "}
            <span className="font-medium text-secondary-900 dark:text-white">{totalPosts}</span> articles
          </p>
          
          <BlogFilterModal 
            categories={categories}
            tags={tags}
            currentFilters={filters}
          />
        </div>
      </div>
      
      {/* Blog grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
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