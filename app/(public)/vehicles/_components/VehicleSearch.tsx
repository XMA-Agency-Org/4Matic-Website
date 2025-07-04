"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Clock, TrendingUp, X, ArrowRight, Car, Tag, Building2, Zap, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchSuggestion {
  id: string;
  text: string;
  type: "vehicle" | "brand" | "category";
  category?: string;
  price?: number;
  rating?: number;
  image?: string;
  searchScore?: number;
  matchedFields?: string[];
}

interface QuickFilter {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

interface VehicleSearchProps {
  className?: string;
}

const POPULAR_SEARCHES = [
  "Rolls-Royce Cullinan",
  "Lamborghini Urus",
  "Mercedes-AMG G63",
  "Range Rover Vogue",
  "Bentley",
  "Ferrari Roma",
  "BMW X4",
  "Porsche 911",
  "Luxury SUV",
  "Sports Car"
];

export default function VehicleSearch({ className }: VehicleSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("vehicle-search-history");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Get initial query from URL
  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        // Fetch vehicle suggestions from API
        const response = await fetch(`/api/vehicles/search?q=${encodeURIComponent(query)}&limit=8`);
        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data = await response.json();
        const { vehicles, brands, categories } = data;

        const vehicleSuggestions = vehicles.map((vehicle: { 
          id: string; 
          name: string; 
          category: string;
          price?: number;
          rating?: number;
          searchScore?: number;
          matchedFields?: string[];
        }) => ({
          id: vehicle.id,
          text: vehicle.name,
          type: "vehicle" as const,
          category: vehicle.category,
          price: vehicle.price,
          rating: vehicle.rating,
          searchScore: vehicle.searchScore,
          matchedFields: vehicle.matchedFields
        }));

        const brandSuggestions = brands.map((brand: string) => ({
          id: brand.toLowerCase(),
          text: brand,
          type: "brand" as const
        }));

        const categorySuggestions = categories.map((category: string) => ({
          id: category.toLowerCase(),
          text: category,
          type: "category" as const
        }));

        setSuggestions([...vehicleSuggestions, ...brandSuggestions, ...categorySuggestions]);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        
        // Fallback to basic suggestions if API fails
        const basicSuggestions = POPULAR_SEARCHES
          .filter(item => item.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 4)
          .map(item => ({
            id: item.toLowerCase().replace(/\s+/g, "-"),
            text: item,
            type: (["Luxury", "Sports", "SUV", "Economy"].includes(item) ? "category" : "vehicle") as const
          }));
        
        setSuggestions(basicSuggestions);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Add to search history
    const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem("vehicle-search-history", JSON.stringify(newHistory));

    // Navigate with search query
    const params = new URLSearchParams(searchParams);
    params.set("q", searchQuery);
    params.delete("page"); // Reset to first page
    router.push(`/vehicles?${params.toString()}`);
    
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    
    if (suggestion.type === "brand") {
      const params = new URLSearchParams(searchParams);
      params.set("brand", suggestion.text);
      params.delete("q");
      params.delete("page");
      router.push(`/vehicles?${params.toString()}`);
    } else if (suggestion.type === "category") {
      const params = new URLSearchParams(searchParams);
      params.set("category", suggestion.text);
      params.delete("q");
      params.delete("page");
      router.push(`/vehicles?${params.toString()}`);
    } else {
      handleSearch(suggestion.text);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("vehicle-search-history");
  };

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const totalItems = suggestions.length + (query.length === 0 ? POPULAR_SEARCHES.length + searchHistory.length : 0);
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalItems);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          // Handle selection based on current state
          if (query.length === 0) {
            if (selectedIndex < POPULAR_SEARCHES.length) {
              const popular = POPULAR_SEARCHES[selectedIndex];
              setQuery(popular);
              handleSearch(popular);
            } else if (selectedIndex < POPULAR_SEARCHES.length + searchHistory.length) {
              const historyIndex = selectedIndex - POPULAR_SEARCHES.length;
              const historyItem = searchHistory[historyIndex];
              setQuery(historyItem);
              handleSearch(historyItem);
            }
          } else if (suggestions[selectedIndex]) {
            handleSuggestionClick(suggestions[selectedIndex]);
          }
        } else {
          handleSearch(query);
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  }, [isOpen, selectedIndex, suggestions, query, searchHistory]);

  // Quick filters for common actions
  const quickFilters: QuickFilter[] = [
    {
      id: "luxury",
      label: "Luxury Cars",
      icon: Car,
      action: () => {
        const params = new URLSearchParams(searchParams);
        params.set("category", "luxury");
        params.delete("q");
        router.push(`/vehicles?${params.toString()}`);
        setIsOpen(false);
      }
    },
    {
      id: "sports",
      label: "Sports Cars",
      icon: Zap,
      action: () => {
        const params = new URLSearchParams(searchParams);
        params.set("category", "sports");
        params.delete("q");
        router.push(`/vehicles?${params.toString()}`);
        setIsOpen(false);
      }
    },
    {
      id: "suv",
      label: "SUVs",
      icon: Car,
      action: () => {
        const params = new URLSearchParams(searchParams);
        params.set("category", "suv");
        params.delete("q");
        router.push(`/vehicles?${params.toString()}`);
        setIsOpen(false);
      }
    }
  ];

  // Enhanced suggestion highlighting
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return <mark key={index} className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded px-0.5">{part}</mark>;
      }
      return part;
    });
  };

  // Analytics tracking
  const trackSearchEvent = (eventType: string, searchTerm: string) => {
    // In a real Fortune 500 app, this would integrate with analytics
    console.log(`Search Event: ${eventType}`, { searchTerm, timestamp: new Date().toISOString() });
  };

  const showDropdown = isOpen && (suggestions.length > 0 || searchHistory.length > 0 || query.length === 0);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  // Enhanced search function with analytics
  const enhancedHandleSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;

    trackSearchEvent("search_performed", searchQuery);
    handleSearch(searchQuery);
  }, []);

  return (
    <div className={cn("relative w-full max-w-lg", className)}>
      {/* Search Analytics - Hidden but tracked */}
      {hasInteracted && (
        <div className="sr-only" aria-live="polite">
          {isLoading ? "Searching..." : `${suggestions.length} suggestions available`}
        </div>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-secondary-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by car name, brand, or features..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
            if (!hasInteracted) setHasInteracted(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            if (!hasInteracted) setHasInteracted(true);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          className="w-full pl-10 pr-12 py-3 bg-white dark:bg-secondary-900 border-2 border-secondary-200 dark:border-secondary-700 rounded-xl text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-base"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setSelectedIndex(-1);
                trackSearchEvent("search_cleared", query);
                
                // Remove search filter from URL
                const params = new URLSearchParams(searchParams);
                params.delete("q");
                router.push(`/vehicles?${params.toString()}`);
              }}
              className="p-1 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {!query && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded transition-colors"
              aria-label="Search filters"
            >
              <Filter className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-xl shadow-2xl z-[9999] max-h-[500px] overflow-y-auto backdrop-blur-sm"
        >
          {/* Quick Filters - shown when input is empty */}
          {query.length === 0 && (
            <div className="p-4 border-b border-secondary-200 dark:border-secondary-700">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-secondary-500" />
                <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                  Quick Filters
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {quickFilters.map((filter, index) => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.id}
                      onClick={filter.action}
                      className={cn(
                        "flex items-center gap-3 p-3 text-left rounded-lg transition-all duration-200 group",
                        selectedIndex === index
                          ? "bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
                          : "hover:bg-secondary-50 dark:hover:bg-secondary-800 border border-transparent"
                      )}
                    >
                      <div className="flex-shrink-0 p-2 bg-secondary-100 dark:bg-secondary-800 rounded-lg group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                        <Icon className="h-4 w-4 text-secondary-600 dark:text-secondary-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-secondary-900 dark:text-white">
                          {filter.label}
                        </div>
                        <div className="text-xs text-secondary-500">
                          Browse {filter.label.toLowerCase()}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-secondary-400 group-hover:text-primary-500 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Popular Searches - shown when input is empty */}
          {query.length === 0 && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-secondary-500" />
                <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                  Trending Searches
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((popular, index) => (
                  <button
                    key={popular}
                    onClick={() => {
                      setQuery(popular);
                      handleSearch(popular);
                      trackSearchEvent("popular_search_clicked", popular);
                    }}
                    className={cn(
                      "px-3 py-2 text-sm rounded-full transition-all duration-200 border",
                      selectedIndex === quickFilters.length + index
                        ? "bg-primary-100 dark:bg-primary-900/30 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300"
                        : "bg-secondary-50 dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600"
                    )}
                  >
                    {popular}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search History - shown when input is empty and history exists */}
          {query.length === 0 && searchHistory.length > 0 && (
            <div className="border-t border-secondary-200 dark:border-secondary-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary-500" />
                  <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                    Recent Searches
                  </span>
                </div>
                <button
                  onClick={() => {
                    clearHistory();
                    trackSearchEvent("search_history_cleared", "");
                  }}
                  className="text-xs text-secondary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-1">
                {searchHistory.map((historyItem, index) => {
                  const historyIndex = quickFilters.length + POPULAR_SEARCHES.length + index;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(historyItem);
                        handleSearch(historyItem);
                        trackSearchEvent("history_search_clicked", historyItem);
                      }}
                      className={cn(
                        "w-full text-left p-3 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 group",
                        selectedIndex === historyIndex
                          ? "bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
                          : "hover:bg-secondary-50 dark:hover:bg-secondary-800 border border-transparent"
                      )}
                    >
                      <Clock className="h-4 w-4 text-secondary-400 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                      <span className="text-secondary-700 dark:text-secondary-300 group-hover:text-secondary-900 dark:group-hover:text-white transition-colors">
                        {historyItem}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search Suggestions - shown when typing */}
          {query.length > 0 && (
            <div className="p-4">
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-500 border-t-transparent"></div>
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">Searching vehicles...</span>
                  </div>
                </div>
              ) : suggestions.length > 0 ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="h-4 w-4 text-secondary-500" />
                    <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                      Search Results
                    </span>
                    <span className="text-xs text-secondary-500 bg-secondary-100 dark:bg-secondary-800 px-2 py-1 rounded-full">
                      {suggestions.length}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {suggestions.map((suggestion, index) => {
                      const IconComponent = suggestion.type === "vehicle" ? Car : suggestion.type === "brand" ? Building2 : Tag;
                      return (
                        <button
                          key={suggestion.id}
                          onClick={() => {
                            handleSuggestionClick(suggestion);
                            trackSearchEvent("suggestion_clicked", suggestion.text);
                          }}
                          className={cn(
                            "w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 group",
                            selectedIndex === index
                              ? "bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
                              : "hover:bg-secondary-50 dark:hover:bg-secondary-800 border border-transparent"
                          )}
                        >
                          <div className="flex-shrink-0 p-2 bg-secondary-100 dark:bg-secondary-800 rounded-lg group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                            <IconComponent className="h-4 w-4 text-secondary-600 dark:text-secondary-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-secondary-900 dark:text-white truncate">
                              {highlightMatch(suggestion.text, query)}
                            </div>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              {suggestion.type === "vehicle" && suggestion.category && (
                                <span className="text-xs text-secondary-500 bg-secondary-100 dark:bg-secondary-800 px-2 py-0.5 rounded-full">
                                  {suggestion.category}
                                </span>
                              )}
                              {suggestion.type === "brand" && (
                                <span className="text-xs text-secondary-500 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                  Brand
                                </span>
                              )}
                              {suggestion.type === "category" && (
                                <span className="text-xs text-secondary-500 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                                  Category
                                </span>
                              )}
                              {suggestion.price && (
                                <span className="text-xs text-secondary-500">
                                  AED {suggestion.price}/day
                                </span>
                              )}
                              {suggestion.rating && suggestion.rating > 0 && (
                                <span className="text-xs text-secondary-500 flex items-center gap-1">
                                  ⭐ {suggestion.rating}
                                </span>
                              )}
                              {suggestion.matchedFields && suggestion.matchedFields.length > 0 && (
                                <span className="text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full">
                                  Matched: {suggestion.matchedFields[0]}
                                </span>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-secondary-400 group-hover:text-primary-500 transition-colors opacity-0 group-hover:opacity-100" />
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-secondary-400" />
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                    No vehicles found for &quot;{query}&quot;
                  </p>
                  <p className="text-xs text-secondary-500">
                    Try searching for a different brand, model, or category
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
