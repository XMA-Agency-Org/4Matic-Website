// app/(public)/vehicles/_actions/car-config.ts

// Maximum price for car rentals (in AED)
export const MAX_PRICE = 20000; // Updated to include luxury vehicles like Lamborghini Revuelto

// Currency code
export const CURRENCY_CODE = 'AED';

// Helper function to format price with currency
export const formatPrice = (price: number, showPlus = false): string => {
  return `${CURRENCY_CODE} ${price}${showPlus ? '+' : ''}`;
};

// Function to convert USD to AED (or any other price conversion)
export const convertToAED = (usdPrice: number): number => {
  return Math.round(usdPrice/10 * 2) * 10;
};
