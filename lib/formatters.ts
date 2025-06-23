// lib/formatters.ts

/**
 * Formats the brand name for display
 */
export function formatBrandName(brand: string): string {
  switch (brand) {
    case "mercedes":
      return "Mercedes-Benz";
    case "range-rover":
      return "Range Rover";
    case "rolls-royce":
      return "Rolls-Royce";
    case "bmw":
      return "BMW";
    case "mini":
      return "MINI";
    case "gmc":
      return "GMC";
    default:
      return brand.charAt(0).toUpperCase() + brand.slice(1);
  }
}

/**
 * Gets the CSS classes for brand badge styling
 */
export function getBrandStyle(brand: string): string {
  switch (brand) {
    case "mercedes":
      return "bg-secondary-100 text-secondary-800";
    case "bentley":
      return "bg-green-50 text-green-800";
    case "rolls-royce":
      return "bg-purple-50 text-purple-800";
    case "range-rover":
      return "bg-green-50 text-green-800";
    case "porsche":
      return "bg-red-50 text-red-800";
    case "ferrari":
      return "bg-red-50 text-red-800";
    case "lamborghini":
      return "bg-yellow-50 text-yellow-800";
    case "bmw":
      return "bg-blue-50 text-blue-800";
    case "audi":
      return "bg-gray-100 text-gray-800";
    case "cadillac":
      return "bg-secondary-100 text-secondary-800";
    case "mini":
      return "bg-red-50 text-red-800";
    case "gmc":
      return "bg-orange-50 text-orange-800";
    default:
      return "bg-blue-50 text-blue-800";
  }
}

/**
 * Formats currency value
 */
export function formatCurrency(
  amount: number,
  currency: string = "AED",
  showDecimal: boolean = false,
): string {
  const formatter = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  });

  return formatter.format(amount);
}

/**
 * Formats date for blog posts
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}
