// components/cars/CarCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Star, Users, Fuel, Gauge, DoorOpen, ArrowRight } from "lucide-react";
import { Car } from "@/types/car";
import { formatBrandName, getBrandStyle } from "@/lib/formatters";

interface CarCardProps {
  car: Car;
  showFeatures?: boolean;
}

export default function CarCard({ car, showFeatures = true }: CarCardProps) {
  // Get the brand name and badge styling
  const brandName = formatBrandName(car.brand);
  const brandBadgeStyle = getBrandStyle(car.brand);
  const detailUrl = `/vehicles/${car.id}`;

  return (
    <div className="group relative bg-white dark:bg-secondary-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      {/* Accent top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>

      {/* Car Image - Clickable with larger size */}
      <Link
        href={detailUrl}
        className="block relative h-64 overflow-hidden bg-gradient-to-b from-secondary-100 to-white dark:from-secondary-700 dark:to-secondary-800"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary-500/10 transition-opacity duration-300"></div>
        {car.image ? (
          <Image
            src={car.image}
            alt={car.name}
            height={100}
            width={500}
            className="object-cover p-0 w-full h-full transform group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={car.id.includes("mercedes") || car.id.includes("bentley")}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary-200 to-secondary-300 dark:from-secondary-600 dark:to-secondary-700 flex items-center justify-center">
            <div className="text-secondary-500 dark:text-secondary-400 text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-secondary-300 dark:bg-secondary-600 flex items-center justify-center">
                <span className="text-2xl">🚗</span>
              </div>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}

        {/* Rating badge */}
        <div className="absolute top-3 left-3 flex items-center bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm px-2.5 py-1.5 rounded-md shadow-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1.5" />
          <span className="text-secondary-900 dark:text-white text-sm font-medium">
            {car.rating.toFixed(1)}
          </span>
          <span className="text-secondary-500 text-xs ml-1.5">
            ({car.reviews})
          </span>
        </div>

        {/* Brand badge */}
        <div
          className={`absolute top-3 right-3 ${brandBadgeStyle} px-2.5 py-1.5 rounded-md text-sm font-medium`}
        >
          {brandName}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Car Name - Clickable */}
        <Link href={detailUrl} className="block">
          <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {car.name}
          </h3>
        </Link>

        {/* Car Features - Optional */}
        {showFeatures && (
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-3 mb-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 text-secondary-500 dark:text-secondary-400 mr-2 flex-shrink-0" />
              <span className="text-secondary-700 dark:text-secondary-300 text-sm">
                {car.passengers} Seats
              </span>
            </div>
            <div className="flex items-center">
              <DoorOpen className="w-4 h-4 text-secondary-500 dark:text-secondary-400 mr-2 flex-shrink-0" />
              <span className="text-secondary-700 dark:text-secondary-300 text-sm">
                {car.doors} Doors
              </span>
            </div>
            <div className="flex items-center">
              <Gauge className="w-4 h-4 text-secondary-500 dark:text-secondary-400 mr-2 flex-shrink-0" />
              <span className="text-secondary-700 dark:text-secondary-300 text-sm">
                {car.transmission}
              </span>
            </div>
            <div className="flex items-center">
              <Fuel className="w-4 h-4 text-secondary-500 dark:text-secondary-400 mr-2 flex-shrink-0" />
              <span className="text-secondary-700 dark:text-secondary-300 text-sm">
                {car.specs?.fuelType || "A/C"}
              </span>
            </div>
          </div>
        )}

        {/* Category tag */}
        <div className="mb-4">
          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300">
            {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Price and Action */}
        <div className="flex justify-between items-center pt-4 mt-2 border-t border-secondary-200 dark:border-secondary-800">
          <div>
            <span className="block text-2xl font-bold text-secondary-900 dark:text-white">
              AED {car.price}
            </span>
            <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
              per day
            </span>
          </div>
          <Link
            href={detailUrl}
            className="inline-flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium px-3 py-2 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
          >
            View details
            <ArrowRight className="ml-1.5 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
