// types/car.ts
import { Asset } from 'contentful'

// Contentful content type interfaces
export interface ContentfulBrand {
  name: string;
  slug: string;
  logo?: Asset;
  description?: string;
}

export interface ContentfulCategory {
  name: string;
  slug: string;
  description?: string;
}

export interface ContentfulCarSpecs {
  engine?: string;
  power?: string;
  torque?: string;
  acceleration?: string;
  topSpeed?: string;
  fuelType?: string;
  fuelConsumption?: string;
  driveTrain?: string;
  features?: string[];
}

export interface ContentfulVehicle {
  name: string;
  slug: string;
  description?: any; // Rich text from Contentful
  price: number;
  brand?: ContentfulBrand;
  category?: ContentfulCategory;
  specifications?: ContentfulCarSpecs;
  passengers?: number;
  doors?: number;
  transmission?: string;
  airConditioning?: boolean;
  rating?: number;
  reviews?: number;
  mainImage?: Asset;
  gallery?: Asset[];
  featured?: boolean;
  available?: boolean;
}

// Legacy interfaces for backward compatibility
export interface CarSpecs {
  engine: string;
  power: string;
  torque: string;
  acceleration: string;
  topSpeed: string;
  fuelType: string;
  fuelConsumption?: string;
  range?: string; // For electric vehicles
  driveTrain: string;
  features: string[];
}

export interface Car {
  id: string; // Changed from number to string for meaningful IDs
  name: string;
  image: string;
  images?: string[]; // Array of image URLs for the car gallery
  rating: number;
  reviews: number;
  passengers: number;
  airConditioning: boolean;
  doors: number;
  transmission: string;
  price: number;
  category: string;
  brand: string;
  description?: string;
  specs?: CarSpecs;
}

export interface CarFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  passengers?: number;
  sort?: 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc';
  page?: number;
  pageSize?: number;
}
