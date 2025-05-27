// app/(public)/vehicles/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VehicleDetails from "../_components/VehicleDetails";
import RelatedVehicles from "../_components/RelatedVehicles";
import ScrollToTop from "../_components/ScrollToTop";
import { getCar, getRelatedCars } from "../_actions/car-actions";

interface VehicleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: VehicleDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await getCar(id);

  if (!car) {
    return {
      title: "Vehicle Not Found | 4MATIC",
      description: "The requested vehicle could not be found.",
    };
  }

  return {
    title: `${car.name} | 4MATIC Luxury Car Rental`,
    description: `Rent the ${car.name}. ${car.passengers} passengers, ${car.doors} doors, ${car.transmission} transmission. Book now with 4MATIC Luxury Car Rental.`,
  };
}

export default async function VehicleDetailPage({
  params,
}: VehicleDetailPageProps) {
  const { id: carId } = await params;
  const car = await getCar(carId);

  if (!car) {
    notFound();
  }

  // Get related cars based on the current car's category
  const relatedCars = await getRelatedCars(carId, car.category);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-secondary-950">
      <ScrollToTop />
      <Header />

      <main className="pt-24">
        {/* Vehicle Details */}
        <VehicleDetails car={car} />

        {/* Related Vehicles */}
        <RelatedVehicles cars={relatedCars} currentCarId={carId} />
      </main>

      <Footer />
    </div>
  );
}
