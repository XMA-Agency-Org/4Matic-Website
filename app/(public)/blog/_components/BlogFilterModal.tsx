// app/(public)/blog/_components/BlogFilterModal.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ChevronDown, 
  ChevronUp, 
  X,
  SlidersHorizontal,
  FilterX,
  Check,
  Search
} from "lucide-react";
import Button from "@/components/ui/Button";
import { BlogCategory, BlogTag } from "@/types/blog";

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection = ({ title, isOpen, onToggle, children }: FilterSectionProps) => (
  <div className="border-b border-secondary-200 dark:border-secondary-700 py-4">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left font-medium text-secondary-900 dark:text-white"
    >
      {title}
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-secondary-500" />
      ) : (
        <ChevronDown className="h-5 w-5 text-secondary-500" />
      )}
    </button>
    {isOpen && <div className="mt-4">{children}</div>}
  </div>
);

interface BlogFilterModalProps {
  categories: BlogCategory[];
  tags: BlogTag[];
  currentFilters: {
    category?: string;
    tag?: string;
    search?: string;
  };
}

export default function BlogFilterModal({ categories, tags, currentFilters }: BlogFilterModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for modal visibility
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Track which filter sections are open
  const [openSections, setOpenSections] = useState({
    search: true,
    category: true,
    tags: true,
  });
  
  // State for temporary filter values (before applying)
  const [tempFilters, setTempFilters] = useState({
    search: currentFilters.search || "",
    category: currentFilters.category || "all",
    tag: currentFilters.tag || "",
  });

  // Reset temp filters whenever the modal opens
  useEffect(() => {
    if (isFilterModalOpen) {
      setTempFilters({
        search: currentFilters.search || "",
        category: currentFilters.category || "all",
        tag: currentFilters.tag || "",
      });
    }
  }, [isFilterModalOpen, currentFilters]);

  // Handle outside clicks to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isFilterModalOpen && !target.closest('.filter-modal-content') && !target.closest('.filter-toggle-btn')) {
        setIsFilterModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent scrolling when modal is open
    if (isFilterModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isFilterModalOpen]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  // Update URL with new filter params
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Search
    if (tempFilters.search.trim()) {
      params.set("search", tempFilters.search.trim());
    } else {
      params.delete("search");
    }
    
    // Category
    if (tempFilters.category === "all") {
      params.delete("category");
    } else {
      params.set("category", tempFilters.category);
    }
    
    // Tag
    if (!tempFilters.tag) {
      params.delete("tag");
    } else {
      params.set("tag", tempFilters.tag);
    }
    
    // Reset to page 1 when filtering
    params.delete('page');
    
    // Navigate to new URL
    router.push(`/blog?${params.toString()}`);
    
    // Close modal after applying filters
    setIsFilterModalOpen(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setTempFilters({
      search: "",
      category: "all",
      tag: "",
    });
  };

  // Apply clear filters on button click and close modal
  const applyClearFilters = () => {
    router.push('/blog');
    setIsFilterModalOpen(false);
  };

  // Handler for search input
  const handleSearchChange = (search: string) => {
    setTempFilters(prev => ({
      ...prev,
      search
    }));
  };

  // Handler for category selection
  const handleCategoryChange = (category: string) => {
    setTempFilters(prev => ({
      ...prev,
      category
    }));
  };

  // Handler for tag selection
  const handleTagChange = (tag: string) => {
    setTempFilters(prev => ({
      ...prev,
      tag: prev.tag === tag ? "" : tag
    }));
  };
  
  // Count active filters
  const countActiveFilters = (): number => {
    let count = 0;
    
    if (currentFilters.search) count++;
    if (currentFilters.category) count++;
    if (currentFilters.tag) count++;
    
    return count;
  };
  
  const activeFilterCount = countActiveFilters();

  return (
    <>
      {/* Filter Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        leftIcon={<SlidersHorizontal className="h-4 w-4" />}
        onClick={toggleFilterModal}
        className="filter-toggle-btn"
      >
        Filters
        {activeFilterCount > 0 && (
          <span className="ml-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </Button>
      
      {/* Show "Clear Filters" button if any filters are applied */}
      {activeFilterCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<FilterX className="h-4 w-4" />}
          onClick={applyClearFilters}
          className="ml-2"
        >
          Clear Filters
        </Button>
      )}
      
      {/* Filter Modal Overlay */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-secondary-900/60 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          {/* Modal Content */}
          <div 
            className="filter-modal-content bg-white dark:bg-secondary-900 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto"
          >
            <div className="sticky top-0 z-10 bg-white dark:bg-secondary-900 p-4 border-b border-secondary-200 dark:border-secondary-700 flex justify-between items-center">
              <h2 className="font-bold text-xl text-secondary-900 dark:text-white">Filter Articles</h2>
              <button
                onClick={toggleFilterModal}
                className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-800"
                aria-label="Close filters"
              >
                <X className="h-5 w-5 text-secondary-500" />
              </button>
            </div>

            <div className="p-4">
              <FilterSection
                title="Search"
                isOpen={openSections.search}
                onToggle={() => toggleSection("search")}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-500" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={tempFilters.search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-secondary-200 dark:border-secondary-700 rounded-md bg-transparent text-secondary-900 dark:text-white placeholder:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </FilterSection>

              <FilterSection
                title="Categories"
                isOpen={openSections.category}
                onToggle={() => toggleSection("category")}
              >
                <div className="space-y-2">
                  <div
                    onClick={() => handleCategoryChange("all")}
                    className={`cursor-pointer border rounded-lg p-3 transition-colors ${
                      tempFilters.category === "all"
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                        : "border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-secondary-900 dark:text-white">
                        All Categories
                      </span>
                      {tempFilters.category === "all" && (
                        <Check className="h-4 w-4 text-primary-500" />
                      )}
                    </div>
                  </div>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`cursor-pointer border rounded-lg p-3 transition-colors ${
                        tempFilters.category === category.slug
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                          : "border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-secondary-900 dark:text-white">
                          {category.name}
                        </span>
                        {tempFilters.category === category.slug && (
                          <Check className="h-4 w-4 text-primary-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Tags"
                isOpen={openSections.tags}
                onToggle={() => toggleSection("tags")}
              >
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => handleTagChange(tag.slug)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        tempFilters.tag === tag.slug
                          ? "bg-primary-600 text-white"
                          : "bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <div className="mt-6 flex space-x-3 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}