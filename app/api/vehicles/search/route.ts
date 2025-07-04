import { NextRequest, NextResponse } from "next/server";
import { getAllVehicles } from "@/lib/contentful-api";
import Fuse from "fuse.js";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const limit = parseInt(searchParams.get("limit") || "8", 10);

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ vehicles: [], brands: [], categories: [] });
    }

    const searchTerm = query.toLowerCase().trim();

    // Get all vehicles
    const allVehicles = await getAllVehicles();

    // Configure Fuse.js for fuzzy search
    const fuseOptions = {
      keys: [
        { name: 'name', weight: 0.4 },
        { name: 'brand', weight: 0.3 },
        { name: 'category', weight: 0.2 },
        { name: 'description', weight: 0.1 },
        { name: 'transmission', weight: 0.05 },
        { name: 'specs.features', weight: 0.1 }
      ],
      threshold: 0.3, // Fuzzy matching threshold (0 = exact, 1 = matches anything)
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
      findAllMatches: true
    };

    // Create Fuse instance and search
    const fuse = new Fuse(allVehicles, fuseOptions);
    const fuseResults = fuse.search(searchTerm).slice(0, limit);
    
    // Extract vehicles from Fuse results
    const matchingVehicles = fuseResults.map(result => ({
      ...result.item,
      searchScore: result.score,
      matchedFields: result.matches?.map(match => match.key) || []
    }));

    // Extract unique brands and categories using Fuse for better matching
    const brandFuse = new Fuse(allVehicles.map(v => ({ brand: v.brand })), {
      keys: ['brand'],
      threshold: 0.4
    });
    const categoryFuse = new Fuse(allVehicles.map(v => ({ category: v.category })), {
      keys: ['category'],
      threshold: 0.4
    });

    const brandMatches = brandFuse.search(searchTerm).map(result => result.item.brand);
    const categoryMatches = categoryFuse.search(searchTerm).map(result => result.item.category);
    
    const brands = new Set(brandMatches);
    const categories = new Set(categoryMatches);

    // Add some common brand/category names for better suggestions
    const commonBrands = ["Mercedes", "BMW", "Audi", "Lamborghini", "Ferrari", "Porsche", "Bentley", "Rolls Royce"];
    const commonCategories = ["Luxury", "Sports", "SUV", "Economy"];

    commonBrands.forEach(brand => {
      if (brand.toLowerCase().includes(searchTerm)) {
        brands.add(brand);
      }
    });

    commonCategories.forEach(category => {
      if (category.toLowerCase().includes(searchTerm)) {
        categories.add(category);
      }
    });

    return NextResponse.json({
      vehicles: matchingVehicles.map(vehicle => ({
        id: vehicle.id,
        name: vehicle.name,
        category: vehicle.category,
        brand: vehicle.brand,
        price: vehicle.price,
        rating: vehicle.rating,
        image: vehicle.image,
        searchScore: vehicle.searchScore,
        matchedFields: vehicle.matchedFields
      })),
      brands: Array.from(brands).slice(0, 3),
      categories: Array.from(categories).slice(0, 2)
    });

  } catch (error) {
    console.error("Error in search API:", error);
    return NextResponse.json(
      { error: "Failed to search vehicles" },
      { status: 500 }
    );
  }
}