import { contentfulClient } from './contentful'
import { Car, CarSpecs } from '@/types/car'
import { Entry } from 'contentful'

// Contentful field interfaces matching the actual content types
interface ContentfulRentalVehicle {
  vehicleName: string;
  urlSlug: string;
  description?: any;
  dailyPrice: number;
  brand?: {
    fields: {
      brandName: string;
      urlSlug: string;
    }
  };
  category?: {
    fields: {
      categoryName: string;
      urlSlug: string;
    }
  };
  accelerationTime?: string;
  fuelConsumption?: string;
  features?: string;
  passengerCount?: number;
  doorCount?: number;
  transmissionType?: string;
  airConditioning?: boolean;
  rating?: number;
  reviewCount?: number;
  mainImage?: any;
  imageGallery?: any[];
  featuredFlag?: boolean;
  availabilityStatus?: boolean;
}

// Extract year from vehicle name
function extractYearFromName(name: string): number | undefined {
  const yearMatch = name.match(/\b(19|20)\d{2}\b/)
  return yearMatch ? parseInt(yearMatch[0]) : undefined
}

// Transform Contentful vehicle data to legacy Car interface
function transformVehicleToLegacyCar(vehicle: Entry<ContentfulRentalVehicle>): Car {
  const fields = vehicle.fields
  
  // Get car data for fallback images
  const carData = getCarDataBySlug(fields.urlSlug)
  
  return {
    id: fields.urlSlug,
    name: fields.vehicleName,
    image: fields.mainImage?.fields?.file?.url ? `https:${fields.mainImage.fields.file.url}` : carData?.image || '',
    images: fields.imageGallery?.map(img => img?.fields?.file?.url ? `https:${img.fields.file.url}` : '').filter(Boolean) || carData?.images || [],
    rating: fields.rating || 0,
    reviews: fields.reviewCount || 0,
    passengers: fields.passengerCount || 0,
    airConditioning: fields.airConditioning || false,
    doors: fields.doorCount || 0,
    transmission: fields.transmissionType || '',
    price: fields.dailyPrice,
    category: fields.category?.fields.urlSlug || '',
    brand: fields.brand?.fields.urlSlug || '',
    description: extractTextFromRichText(fields.description) || '',
    year: extractYearFromName(fields.vehicleName),
    specs: {
      acceleration: fields.accelerationTime || '',
      fuelConsumption: fields.fuelConsumption || '',
      features: Array.isArray(fields.features) ? fields.features : (fields.features?.split('\n') || [])
    } as CarSpecs
  }
}

// Helper to get car data for fallback images
function getCarDataBySlug(slug: string) {
  // Import car database dynamically to avoid circular dependency
  try {
    const { carsDatabase } = require('../app/(public)/vehicles/_actions/car-database')
    return carsDatabase.find((car: any) => car.id === slug)
  } catch {
    return null
  }
}

// Helper function to extract text from Contentful rich text
function extractTextFromRichText(richText: any): string {
  if (!richText || !richText.content) return ''
  
  return richText.content
    .map((node: any) => {
      if (node.nodeType === 'paragraph' && node.content) {
        return node.content
          .map((textNode: any) => textNode.value || '')
          .join('')
      }
      return ''
    })
    .join('\n')
}

export async function getAllVehicles(): Promise<Car[]> {
  try {
    const response = await contentfulClient.getEntries<ContentfulRentalVehicle>({
      content_type: 'rentalVehicle',
      include: 2, // Include linked entries (brand, category, specs)
      limit: 1000, // Increase limit to ensure all vehicles are fetched
      order: '-sys.createdAt', // Order by creation date to ensure consistent results
    })
    
    return response.items.map(transformVehicleToLegacyCar)
  } catch (error) {
    console.error('Error fetching vehicles from Contentful:', error)
    return []
  }
}

export async function getVehicleBySlug(slug: string): Promise<Car | null> {
  try {
    const response = await contentfulClient.getEntries<ContentfulRentalVehicle>({
      content_type: 'rentalVehicle',
      'fields.urlSlug': slug,
      include: 2,
      limit: 1,
    })
    
    if (response.items.length === 0) {
      return null
    }
    
    return transformVehicleToLegacyCar(response.items[0])
  } catch (error) {
    console.error('Error fetching vehicle by slug:', error)
    return null
  }
}

export async function getFeaturedVehicles(): Promise<Car[]> {
  try {
    const response = await contentfulClient.getEntries<ContentfulRentalVehicle>({
      content_type: 'rentalVehicle',
      'fields.featuredFlag': true,
      include: 2,
    })
    
    return response.items.map(transformVehicleToLegacyCar)
  } catch (error) {
    console.error('Error fetching featured vehicles:', error)
    return []
  }
}

// Get vehicles with filtering and pagination (for car-actions.ts)
export async function getFilteredVehicles(params: {
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
}): Promise<{ cars: Car[], totalCars: number }> {
  try {
    // Build Contentful query
    const query: any = {
      content_type: 'rentalVehicle',
      include: 2,
      limit: 1000, // Ensure we fetch all vehicles
    }

    // Add category filter
    if (params.category && params.category !== 'all') {
      query['fields.category.fields.urlSlug'] = params.category
      query['fields.category.sys.contentType.sys.id'] = 'vehicleCategory'
    }

    // Add brand filter  
    if (params.brand && params.brand !== 'all') {
      query['fields.brand.fields.urlSlug'] = params.brand
      query['fields.brand.sys.contentType.sys.id'] = 'carRentalBrand'
    }

    // Add price range filter
    if (params.minPrice !== undefined) {
      query['fields.dailyPrice[gte]'] = params.minPrice
    }
    if (params.maxPrice !== undefined) {
      query['fields.dailyPrice[lte]'] = params.maxPrice
    }

    // Add passenger filter
    if (params.passengers) {
      if (params.passengers === 6) {
        query['fields.passengerCount[gte]'] = 6
      } else {
        query['fields.passengerCount'] = params.passengers
      }
    }

    // Get all matching vehicles first
    const response = await contentfulClient.getEntries<ContentfulRentalVehicle>(query)
    let cars = response.items.map(transformVehicleToLegacyCar)

    // Apply year filtering (client-side since we extract year from names)
    if (params.minYear !== undefined) {
      cars = cars.filter(car => car.year && car.year >= params.minYear!)
    }
    if (params.maxYear !== undefined) {
      cars = cars.filter(car => car.year && car.year <= params.maxYear!)
    }

    // Apply sorting (client-side since Contentful sorting is limited)
    const { sort = 'recommended', page = 1, pageSize = 9 } = params
    
    cars.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating-desc':
          return b.rating - a.rating
        default:
          // Recommended sort - balanced algorithm that showcases both value and premium options
          // First, prioritize by rating (primary factor)
          const ratingDiff = b.rating - a.rating
          
          // If ratings are very close (within 0.1), use a mix of factors
          if (Math.abs(ratingDiff) < 0.1) {
            // For cars with similar ratings, create variety by mixing price ranges
            // This ensures premium cars appear alongside value options
            const isPremiumA = a.price > 5000
            const isPremiumB = b.price > 5000
            
            // If one is premium and one isn't, alternate them for variety
            if (isPremiumA !== isPremiumB) {
              // This creates a mixed display of premium and value cars
              return isPremiumB ? 1 : -1
            }
            
            // If both are in same category, sort by reviews count as tiebreaker
            return b.reviews - a.reviews
          }
          
          return ratingDiff
      }
    })

    const totalCars = cars.length

    // Apply pagination
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedCars = cars.slice(start, end)

    return {
      cars: paginatedCars,
      totalCars
    }
  } catch (error) {
    console.error('Error fetching filtered vehicles:', error)
    return { cars: [], totalCars: 0 }
  }
}