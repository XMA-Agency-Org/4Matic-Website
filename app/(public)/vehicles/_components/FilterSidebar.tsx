// app/(public)/vehicles/_components/FilterSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/Slider";
import { 
  ChevronDown, 
  ChevronUp, 
  X,
  SlidersHorizontal,
  FilterX
} from "lucide-react";
import Button from "@/components/ui/Button";

// Updated filter categories and options
const categories = [
  { id: "all", label: "All Vehicles" },
  { id: "luxury", label: "Luxury" },
  { id: "sports", label: "Sports" },
  { id: "suv", label: "SUVs" },
  { id: "economy", label: "Economy" },
  { id: "minivan", label: "Minivans" },
];

// Brands will be fetched from Contentful

const passengerOptions = [
  { value: "2", label: "2 Passengers" },
  { value: "4", label: "4 Passengers" },
  { value: "5", label: "5 Passengers" },
  { value: "6", label: "6+ Passengers" },
];

// Increased maximum price to 5000 AED
const MAX_PRICE = 5000;

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

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Track which filter sections are open
  const [openSections, setOpenSections] = useState({
    category: false,
    brand: false,
    price: false,
    year: false,
    passengers: false,
  });
  
  // For mobile filter visibility
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  
  // Brands state
  const [brands, setBrands] = useState([{ id: "all", label: "All Brands" }]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  
  // Get current filter values from URL
  const currentCategory = searchParams.get("category") || "all";
  const currentBrand = searchParams.get("brand") || "all";
  const currentMinPrice = Number(searchParams.get("minPrice") || "0");
  const currentMaxPrice = Number(searchParams.get("maxPrice") || MAX_PRICE.toString());
  const currentMinYear = Number(searchParams.get("minYear") || "2020");
  const currentMaxYear = Number(searchParams.get("maxYear") || "2025");
  const currentPassengers = searchParams.get("passengers") || "";
  
  // State for price range slider
  const [priceRange, setPriceRange] = useState([currentMinPrice, currentMaxPrice]);
  // State for year range slider
  const [yearRange, setYearRange] = useState([currentMinYear, currentMaxYear]);

  // Fetch brands via API route
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/brands');
        const fetchedBrands = await response.json();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setBrandsLoading(false);
      }
    };
    
    fetchBrands();
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterVisible(!isMobileFilterVisible);
  };

  // Update URL with new filter params
  const applyFilters = (newParams: Record<string, string | null>) => {
    // Create new URLSearchParams object from current params
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or delete params based on new values
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === 'all') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    
    // Reset to page 1 when filtering
    params.delete('page');
    
    // Navigate to new URL
    router.push(`/vehicles?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    router.push('/vehicles');
    setPriceRange([0, MAX_PRICE]);
    setYearRange([2020, 2025]);
  };

  // Handler for category selection
  const handleCategoryChange = (category: string) => {
    applyFilters({ category: category === "all" ? null : category });
  };

  // Handler for brand selection
  const handleBrandChange = (brand: string) => {
    applyFilters({ brand: brand === "all" ? null : brand });
  };

  // Handler for price range change
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  // Apply price filter on slider change end
  const handlePriceChangeEnd = (values: number[]) => {
    applyFilters({
      minPrice: values[0] === 0 ? null : values[0].toString(),
      maxPrice: values[1] === MAX_PRICE ? null : values[1].toString(),
    });
  };

  // Handler for year range change
  const handleYearChange = (values: number[]) => {
    setYearRange(values);
  };

  // Apply year filter on slider change end
  const handleYearChangeEnd = (values: number[]) => {
    applyFilters({
      minYear: values[0] === 2020 ? null : values[0].toString(),
      maxYear: values[1] === 2025 ? null : values[1].toString(),
    });
  };

  // Handler for passenger selection
  const handlePassengerChange = (passengers: string) => {
    applyFilters({ passengers: passengers || null });
  };

  // Helper function to format price with AED
  const formatPrice = (price: number): string => {
    return `AED ${price}`;
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-6 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<SlidersHorizontal className="h-4 w-4" />}
          onClick={toggleMobileFilter}
        >
          Filters
        </Button>
        
        {/* Show "Clear Filters" button on mobile if any filters are applied */}
        {(currentCategory !== "all" || 
          currentBrand !== "all" || 
          currentMinPrice > 0 || 
          currentMaxPrice < MAX_PRICE || 
          currentMinYear > 2020 || 
          currentMaxYear < 2025 || 
          currentPassengers) && (
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<FilterX className="h-4 w-4" />}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Mobile Filter Sidebar (Overlay) */}
      <div
        className={`lg:hidden fixed inset-0 bg-secondary-900/80 z-50 transition-opacity duration-300 ${
          isMobileFilterVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileFilter}
      />

      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white dark:bg-secondary-900 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileFilterVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="sticky top-0 z-10 bg-white dark:bg-secondary-900 p-4 border-b border-secondary-200 dark:border-secondary-700 flex justify-between items-center">
          <h2 className="font-bold text-lg text-secondary-900 dark:text-white">Filters</h2>
          <button
            onClick={toggleMobileFilter}
            className="p-2 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-800"
          >
            <X className="h-5 w-5 text-secondary-500" />
          </button>
        </div>

        <div className="p-4">
          {/* Mobile Filter Content - Same as desktop but with mobile-specific UI */}
          <FilterSection
            title="Vehicle Type"
            isOpen={openSections.category}
            onToggle={() => toggleSection("category")}
          >
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    id={`mobile-category-${category.id}`}
                    name="mobile-category"
                    className="w-4 h-4 text-primary-600 dark:text-primary-400 border-secondary-300 dark:border-secondary-700 rounded focus:ring-primary-500 dark:focus:ring-primary-400"
                    checked={currentCategory === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <label
                    htmlFor={`mobile-category-${category.id}`}
                    className="ml-2 text-secondary-700 dark:text-secondary-300"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Brand"
            isOpen={openSections.brand}
            onToggle={() => toggleSection("brand")}
          >
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center">
                  <input
                    type="radio"
                    id={`mobile-brand-${brand.id}`}
                    name="mobile-brand"
                    className="w-4 h-4 text-primary-600 dark:text-primary-400 border-secondary-300 dark:border-secondary-700 rounded focus:ring-primary-500 dark:focus:ring-primary-400"
                    checked={currentBrand === brand.id}
                    onChange={() => handleBrandChange(brand.id)}
                  />
                  <label
                    htmlFor={`mobile-brand-${brand.id}`}
                    className="ml-2 text-secondary-700 dark:text-secondary-300"
                  >
                    {brand.label}
                  </label>
                </div>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Price Range (per day)"
            isOpen={openSections.price}
            onToggle={() => toggleSection("price")}
          >
            <div className="px-2 pt-6 pb-2">
              <Slider
                min={0}
                max={MAX_PRICE}
                step={100}
                value={priceRange}
                onChange={handlePriceChange}
                onChangeEnd={handlePriceChangeEnd}
              />
              <div className="flex justify-between mt-2 text-sm text-secondary-600 dark:text-secondary-400">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}+</span>
              </div>
            </div>
          </FilterSection>

          <FilterSection
            title="Year Range"
            isOpen={openSections.year}
            onToggle={() => toggleSection("year")}
          >
            <div className="px-2 pt-6 pb-2">
              <Slider
                min={2020}
                max={2025}
                step={1}
                value={yearRange}
                onChange={handleYearChange}
                onChangeEnd={handleYearChangeEnd}
              />
              <div className="flex justify-between mt-2 text-sm text-secondary-600 dark:text-secondary-400">
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
              </div>
            </div>
          </FilterSection>

          <FilterSection
            title="Passengers"
            isOpen={openSections.passengers}
            onToggle={() => toggleSection("passengers")}
          >
            <div className="space-y-2">
              {passengerOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`mobile-passengers-${option.value}`}
                    name="mobile-passengers"
                    className="w-4 h-4 text-primary-600 dark:text-primary-400 border-secondary-300 dark:border-secondary-700 rounded focus:ring-primary-500 dark:focus:ring-primary-400"
                    checked={currentPassengers === option.value}
                    onChange={() => handlePassengerChange(option.value)}
                  />
                  <label
                    htmlFor={`mobile-passengers-${option.value}`}
                    className="ml-2 text-secondary-700 dark:text-secondary-300"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </FilterSection>

          <div className="mt-6 flex space-x-3">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={clearFilters}
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={toggleMobileFilter}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block sticky top-24 bg-white dark:bg-secondary-900 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg text-secondary-900 dark:text-white">Filters</h2>
          {/* Show clear button if any filters are applied */}
          {(currentCategory !== "all" || 
            currentBrand !== "all" || 
            currentMinPrice > 0 || 
            currentMaxPrice < MAX_PRICE || 
            currentMinYear > 2020 || 
            currentMaxYear < 2025 || 
            currentPassengers) && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<FilterX className="h-4 w-4" />}
              onClick={clearFilters}
            >
              Clear All
            </Button>
          )}
        </div>

        <FilterSection
          title="Vehicle Type"
          isOpen={openSections.category}
          onToggle={() => toggleSection("category")}
        >
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="radio"
                  id={`category-${category.id}`}
                  name="category"
                  className="w-4 h-4 text-primary-600 dark:text-primary-400 border-secondary-300 dark:border-secondary-700 rounded focus:ring-primary-500 dark:focus:ring-primary-400"
                  checked={currentCategory === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="ml-2 text-secondary-700 dark:text-secondary-300"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Brand"
          isOpen={openSections.brand}
          onToggle={() => toggleSection("brand")}
        >
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center">
                <input
                  type="radio"
                  id={`brand-${brand.id}`}
                  name="brand"
                  className="w-4 h-4 text-primary-600 dark:text-primary-400 border-secondary-300 dark:border-secondary-700 rounded focus:ring-primary-500 dark:focus:ring-primary-400"
                  checked={currentBrand === brand.id}
                  onChange={() => handleBrandChange(brand.id)}
                />
                <label
                  htmlFor={`brand-${brand.id}`}
                  className="ml-2 text-secondary-700 dark:text-secondary-300"
                >
                  {brand.label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Price Range (per day)"
          isOpen={openSections.price}
          onToggle={() => toggleSection("price")}
        >
          <div className="px-2 pt-6 pb-2">
            <Slider
              min={0}
              max={MAX_PRICE}
              step={100}
              value={priceRange}
              onChange={handlePriceChange}
              onChangeEnd={handlePriceChangeEnd}
            />
            <div className="flex justify-between mt-2 text-sm text-secondary-600 dark:text-secondary-400">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}+</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection
          title="Year Range"
          isOpen={openSections.year}
          onToggle={() => toggleSection("year")}
        >
          <div className="px-2 pt-6 pb-2">
            <Slider
              min={2020}
              max={2025}
              step={1}
              value={yearRange}
              onChange={handleYearChange}
              onChangeEnd={handleYearChangeEnd}
            />
            <div className="flex justify-between mt-2 text-sm text-secondary-600 dark:text-secondary-400">
              <span>{yearRange[0]}</span>
              <span>{yearRange[1]}</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection
          title="Passengers"
          isOpen={openSections.passengers}
          onToggle={() => toggleSection("passengers")}
        >
          <div className="space-y-2">
            {passengerOptions.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`passengers-${option.value}`}
                  name="passengers"
                  className="w-4 h-4 text-primary-600 dark:text-primary-400 border-secondary-300 dark:border-secondary-700 rounded focus:ring-primary-500 dark:focus:ring-primary-400"
                  checked={currentPassengers === option.value}
                  onChange={() => handlePassengerChange(option.value)}
                />
                <label
                  htmlFor={`passengers-${option.value}`}
                  className="ml-2 text-secondary-700 dark:text-secondary-300"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      </div>
    </>
  );
}
