import { contentfulClient } from "@/lib/contentful";

export async function getBrands() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'carRentalBrand',
    });
    
    const brands = response.items.map((item: any) => ({
      id: item.fields.urlSlug,
      label: item.fields.brandName,
    }));
    
    // Sort brands alphabetically by label
    brands.sort((a, b) => a.label.localeCompare(b.label));
    
    return [{ id: "all", label: "All Brands" }, ...brands];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [{ id: "all", label: "All Brands" }];
  }
}