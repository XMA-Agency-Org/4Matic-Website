"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowDownAZ, ArrowUpAZ, ChevronDown, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";

interface SortOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SortDropdownProps {
  currentSort: string;
}

export default function SortDropdown({ currentSort }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Sort options
  const sortOptions: SortOption[] = [
    { id: "recommended", label: "Recommended", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "price-asc", label: "Price: Low to High", icon: <ArrowUpAZ className="h-4 w-4" /> },
    { id: "price-desc", label: "Price: High to Low", icon: <ArrowDownAZ className="h-4 w-4" /> },
    { id: "rating-desc", label: "Highest Rated", icon: <ArrowDownAZ className="h-4 w-4" /> },
  ];
  
  // Find the current sort option
  const currentSortOption = sortOptions.find(option => option.id === currentSort) || sortOptions[0];
  
  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle sort selection
  const handleSortChange = (sortId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (sortId === "recommended") {
      params.delete("sort");
    } else {
      params.set("sort", sortId);
    }
    
    // Reset to page 1 when sorting changes
    params.delete("page");
    
    router.push(`/vehicles?${params.toString()}`);
    setIsOpen(false);
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Sort vehicles"
        variant="outline"
        icon={currentSortOption.icon}
        size="sm"
      >
        Sort: {currentSortOption.label}
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-60 rounded-md bg-white dark:bg-secondary-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSortChange(option.id)}
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  currentSort === option.id
                    ? "bg-secondary-100 dark:bg-secondary-700 text-primary-600 dark:text-primary-400 font-medium"
                    : "text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700"
                }`}
              >
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
