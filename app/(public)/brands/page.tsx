import { getBrands } from "@/app/(public)/vehicles/_actions/brand-actions";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  MBIcon,
  BentleyIcon,
  RollsRoyceIcon,
  LandroverIcon,
  LamborghiniIcon,
  FerrariLogo,
  AudiIcon,
  BMWLogoHorizontal,
  PorscheIcon,
  ToyotaIcon,
  KiaIcon,
  HyundaiIcon,
  NissanLogo,
  MitsubishiIcon,
  ChevroletLogo,
  CadillacIcon,
  FiatIcon,
  MiniIcon,
  MazdaIcon,
  GMCLogo,
} from "@cardog-icons/react";
import Image from "next/image";
import BMW from "@/public/brands/bmw-logo-2020-white-download.png"

interface Brand {
  id: string;
  label: string;
}

export default async function BrandsPage() {
  const brands = await getBrands();
  // Filter out "All Brands" option for the display page
  const displayBrands = brands.filter((brand) => brand.id !== "all");

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-secondary-950 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
              Our Premium Brands
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
              Discover our collection of luxury and premium automotive brands,
              each offering exceptional quality and performance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayBrands.map((brand: Brand) => (
              <Link
                key={brand.id}
                href={`/vehicles?brand=${brand.id}`}
                className="group bg-white dark:bg-secondary-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-secondary-100 dark:border-secondary-800 hover:border-primary-200 dark:hover:border-primary-700"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center">
                    {getBrandIcon(brand.id)}
                  </div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {brand.label}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Helper function to map brand IDs to cardog icons
function getBrandIcon(brandId: string) {
  const iconProps = {
    className:
      "group-hover:scale-110 text-[100px] transition-transform duration-300",
  };

  const brandIconMap: Record<string, JSX.Element> = {
    mercedes: <MBIcon style={{ filter: "invert(1)" }} {...iconProps} />,
    "mercedes-benz": <MBIcon style={{ filter: "invert(1)" }} {...iconProps} />,
    bentley: <BentleyIcon {...iconProps} />,
    "rolls-royce": (
      <RollsRoyceIcon style={{ filter: "invert(1)" }} {...iconProps} />
    ),
    "land-rover": <LandroverIcon {...iconProps} />,
    "range-rover": <LandroverIcon {...iconProps} />,
    lamborghini: <LamborghiniIcon {...iconProps} />,
    ferrari: <FerrariLogo {...iconProps} />,
    audi: <AudiIcon style={{ filter: "invert(1)" }} {...iconProps} />,
    bmw: <Image src={BMW} {...iconProps} />,
    porsche: <PorscheIcon {...iconProps} />,
    toyota: <ToyotaIcon {...iconProps} />,
    kia: <KiaIcon style={{ filter: "invert(1)" }} {...iconProps} />,
    hyundai: <HyundaiIcon {...iconProps} />,
    nissan: <NissanLogo style={{ filter: "invert(1)" }} {...iconProps} />,
    mitsubishi: <MitsubishiIcon {...iconProps} />,
    chevrolet: <ChevroletLogo style={{ filter: "invert(1)" }} {...iconProps} />,
    cadillac: <CadillacIcon {...iconProps} />,
    gmc: <GMCLogo style={{ filter: "invert(1)" }} {...iconProps} />,
    fiat: <FiatIcon {...iconProps} />,
    mini: <MiniIcon style={{ filter: "invert(1)" }} {...iconProps} />,
    mazda: <MazdaIcon {...iconProps} />,
  };

  return brandIconMap[brandId] || null;
}

