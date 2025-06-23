// app/(public)/vehicles/_utils/shareUtils.ts
import { Car } from "@/types/car";

/**
 * Generates the absolute URL for a vehicle detail page
 */
export function getVehicleUrl(carId: number, baseUrl: string = typeof window !== 'undefined' ? window.location.origin : ''): string {
  return `${baseUrl}/vehicles/${carId}`;
}

/**
 * Handles sharing a vehicle via the Web Share API or fallback methods
 */
export async function shareVehicle(car: Car, baseUrl: string = ''): Promise<boolean> {
  const url = getVehicleUrl(car.id, baseUrl);
  const title = `4MATIC: ${car.name}`;
  const text = `Check out the ${car.name} for $${car.price}/day on 4MATIC Car Rental!`;
  
  // Try using the Web Share API if available
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url
      });
      return true;
    } catch (error) {
      // User may have canceled or sharing failed
      console.error('Error sharing:', error);
      return false;
    }
  } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
    // Fallback to copying to clipboard
    try {
      await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      return false;
    }
  }
  
  return false;
}
