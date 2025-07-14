// app/(public)/_components/home/PopularDeals.tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CarCard from "@/components/cars/CarCard";
import Button from "@/components/ui/Button";
import { Car } from "@/types/car";

type CategoryType = "all" | "luxury" | "suv" | "sports" | "economy" | "minivan";

export default function PopularDeals() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [popularCars, setPopularCars] = useState<Car[]>([]);
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  
  const itemsPerPage = 4;
  const totalPages = Math.ceil(popularCars.length / itemsPerPage);

  // Categories for the filter buttons
  const categories = [
    { id: "all", label: "All Vehicles" },
    { id: "luxury", label: "Luxury" },
    { id: "suv", label: "SUVs" },
    { id: "sports", label: "Sports" },
    { id: "economy", label: "Economy" },
  ];

  // Initial load of cars from API
  useEffect(() => {
    async function loadCars() {
      setLoading(true);
      try {
        const [featuredRes, allRes] = await Promise.all([
          fetch('/api/vehicles?type=featured'),
          fetch('/api/vehicles')
        ]);
        
        const [featured, all] = await Promise.all([
          featuredRes.json(),
          allRes.json()
        ]);
        
        // Use featured cars if available, otherwise use top-rated cars from all
        setAllCars(all);
        if (featured.length > 0) {
          setPopularCars(featured.slice(0, 8));
        } else {
          // Fallback to highest rated cars
          setPopularCars(
            all.sort((a: Car, b: Car) => b.rating - a.rating).slice(0, 8)
          );
        }
      } catch (error) {
        console.error("Error loading cars:", error);
        setPopularCars([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadCars();
  }, []);

  // Effect to filter cars based on selected category
  useEffect(() => {
    if (allCars.length === 0) return;
    
    let filtered = allCars;
    
    if (activeCategory !== "all") {
      filtered = allCars.filter(car => car.category === activeCategory);
    }
    
    // Sort by rating and limit to 8 cars
    setPopularCars(
      filtered
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8)
    );
    setCurrentPage(0); // Reset to first page when category changes
  }, [activeCategory, allCars]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentCars = popularCars.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-24 bg-white dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="label">
            Featured Vehicles
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-6">
            Our Premium Fleet Selection
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">
            Experience the epitome of luxury and performance with our carefully curated vehicle collection
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
          <div className="inline-flex bg-secondary-100 dark:bg-secondary-800 p-1 rounded-lg shadow-sm">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as CategoryType)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white shadow-sm"
                    : "text-secondary-700 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Car Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-secondary-800 rounded-lg p-4 animate-pulse">
                <div className="bg-secondary-200 dark:bg-secondary-700 h-48 rounded-lg mb-4"></div>
                <div className="bg-secondary-200 dark:bg-secondary-700 h-4 rounded mb-2"></div>
                <div className="bg-secondary-200 dark:bg-secondary-700 h-4 rounded w-3/4"></div>
              </div>
            ))
          ) : currentCars.length > 0 ? (
            currentCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))
          ) : (
            <div className="col-span-full text-center text-secondary-500 dark:text-secondary-400 py-12">
              No vehicles found for this category.
            </div>
          )}
        </div>

        {/* Controls and CTA */}
        <div className="flex justify-between items-center">
          {/* Pagination */}
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={handlePrevPage}
              disabled={totalPages <= 1}
              className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-500 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNextPage}
              disabled={totalPages <= 1}
              className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-500 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* View all button */}
          <div className="mx-auto md:mx-0">
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight />}
              iconPosition="right"
              asLink
              href="/vehicles"
            >
              Explore Complete Fleet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
