// app/(public)/vehicles/_actions/car-actions.ts
"use server";

import { getFilteredVehicles, getVehicleBySlug, getAllVehicles } from "@/lib/contentful-api";
import { MAX_PRICE } from "./car-config";

interface GetCarsParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  passengers?: number;
  minYear?: number;
  maxYear?: number;
  sort?: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export async function getCars(params: GetCarsParams) {
  const { 
    category, 
    brand, 
    minPrice = 0, 
    maxPrice = MAX_PRICE,
    passengers,
    minYear,
    maxYear,
    sort = "recommended", 
    page = 1, 
    pageSize = 9,
    searchQuery
  } = params;
  
  // Use Contentful API with filtering
  return await getFilteredVehicles({
    category,
    brand,
    minPrice,
    maxPrice: maxPrice,
    passengers,
    minYear,
    maxYear,
    sort,
    page,
    pageSize,
    searchQuery
  });
}

// Get a specific car by ID (slug)
export async function getCar(id: string) {
  return await getVehicleBySlug(id);
}

// Get related cars based on category
export async function getRelatedCars(currentCarId: string, category: string, limit: number = 4) {
  // Get all vehicles and filter client-side for related cars
  const allVehicles = await getAllVehicles();
  
  // Find cars in the same category, excluding the current car
  const relatedCars = allVehicles
    .filter(car => car.category === category && car.id !== currentCarId)
    .sort(() => Math.random() - 0.5) // Simple random sorting
    .slice(0, limit);
  
  return relatedCars;
}
