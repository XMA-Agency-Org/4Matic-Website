"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import Button from "../ui/Button";
import {
  MBIcon,
  BentleyIcon,
  RollsRoyceIcon,
  LandroverIcon,
  LamborghiniIcon,
  FerrariLogo,
  AudiIcon,
  BMWIcon,
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
import BMW from "@/public/brands/bmw-logo-2020-white-download.png";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  const [brands, setBrands] = useState<Array<{ id: string; label: string }>>(
    [],
  );

  // Updated navigation items for a luxury car rental service
  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Our Fleet",
      href: "#",
      children: [
        { label: "Browse All", href: "/vehicles" },
        { label: "Luxury Sedans", href: "/vehicles?category=luxury" },
        { label: "Sports Cars", href: "/vehicles?category=sports" },
        { label: "Premium SUVs", href: "/vehicles?category=suv" },
        { label: "Economy Cars", href: "/vehicles?category=economy" },
      ],
    },
    {
      label: "Brands",
      href: "#",
      children: brands.map((brand) => ({
        label: brand.label,
        href: brand.id === "all" ? "/brands" : `/vehicles?brand=${brand.id}`,
      })),
    },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  // Fetch brands on mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands");
        const brandsData = await response.json();
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([{ id: "all", label: "All Brands" }]);
      }
    };
    fetchBrands();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    // Check the scroll position immediately when component mounts
    const checkInitialScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Run once on mount to set the correct initial state
    checkInitialScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile dropdown
  const toggleMobileDropdown = (label: string) => {
    setActiveMobileDropdown(activeMobileDropdown === label ? null : label);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-secondary-950/90 shadow-sm md:backdrop-blur-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="flex items-center">
              <Image
                src="/4MAticlogo.png"
                alt="4MATIC Logo"
                width={100}
                height={100}
                className="h-14 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center 
                      ${scrolled ? "text-secondary-900 dark:text-white" : "text-white"}
                      hover:text-primary-600 dark:hover:text-primary-400`}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                      ${scrolled ? "text-secondary-900 dark:text-white" : "text-white"}
                      hover:text-primary-600 dark:hover:text-primary-400`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown for desktop */}
                {item.children && item.label === "Brands" && (
                  <div className="absolute left-0 mt-1 w-80 origin-top-right rounded-md shadow-lg overflow-hidden bg-white dark:bg-secondary-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex flex-col items-center p-3 text-xs text-secondary-900 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-md transition-colors"
                          >
                            <div className="mb-1">
                              {getBrandIcon(child.href.split("brand=")[1])}
                            </div>
                            <span className="text-center leading-tight">
                              {child.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {/* Regular dropdown for other items */}
                {item.children && item.label !== "Brands" && (
                  <div className="absolute left-0 mt-1 w-56 origin-top-right rounded-md shadow-lg overflow-hidden bg-white dark:bg-secondary-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-secondary-900 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-800"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Button - Desktop */}
          <div className="hidden md:flex items-center">
            <Button
              variant="primary"
              size="sm"
              icon={<Phone className="h-4 w-4" />}
              asLink
              href="tel:+971563626000"
            >
              +971 56 362 6000
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-10 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X
                className={`h-6 w-6 ${scrolled ? "text-secondary-900 dark:text-white" : "text-white"}`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 ${scrolled ? "text-secondary-900 dark:text-white" : "text-white"}`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-secondary-800/95 backdrop-blur-sm z-40 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button - Fixed at top right */}
        <button
          onClick={closeMobileMenu}
          className="absolute top-6 right-6 p-2 text-white hover:text-primary-400 transition-colors"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col h-full pt-20 pb-6 px-6 overflow-auto">
          <nav className="space-y-1 mb-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="border-b border-secondary-700/30"
              >
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="flex items-center justify-between w-full py-4 text-white font-medium"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          activeMobileDropdown === item.label
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {activeMobileDropdown === item.label && (
                      <div className="ml-4 mb-4 border-l border-primary-600/30 pl-4 space-y-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center py-2 text-secondary-200 hover:text-white text-sm"
                            onClick={closeMobileMenu}
                          >
                            {getBrandIcon(child.href.split("brand=")[1])}
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-4 text-white font-medium"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Button - Mobile */}
          <div className="mt-auto">
            <Button
              variant="primary"
              fullWidth
              icon={<Phone className="h-5 w-5" />}
              asLink
              href="tel:+971563626000"
            >
              +971 56 362 6000
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper function to get brand icons for dropdown
function getBrandIcon(brandId: string) {
  const iconProps = {
    className: "mr-2 md:mr-0 text-3xl",
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
    bmw: <Image src={BMW} width={20} height={50} {...iconProps} />,
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

export default Header;
