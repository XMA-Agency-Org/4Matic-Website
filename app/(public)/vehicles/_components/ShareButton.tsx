// app/(public)/vehicles/_components/ShareButton.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Share2,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { Car } from "@/types/car";
import { formatBrandName } from "@/lib/formatters";

interface ShareButtonProps {
  car: Car;
}

export default function ShareButton({ car }: ShareButtonProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get the brand name
  const brandName = formatBrandName(car.brand);

  // Generate absolute URL for vehicle page
  const getVehicleUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/vehicles/${car.id}`;
  };

  // Handle main share button click
  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling

    // If Web Share API is available, use it directly
    if (isClient && typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `4MATIC Luxury: ${brandName} ${car.name}`,
          text: `Discover the exceptional ${brandName} ${car.name} starting at AED ${car.price}/day with 4MATIC Luxury Car Rental.`,
          url: getVehicleUrl(),
        });
      } catch (error) {
        // User may have canceled or sharing failed
        console.error("Error sharing:", error);
      }
    } else {
      // Otherwise, show custom share menu
      setShowShareOptions(!showShareOptions);
    }
  };

  // Share with specific platforms
  const shareWith = (platform: string) => {
    const url = getVehicleUrl();
    const title = `4MATIC Luxury: ${brandName} ${car.name}`;
    const text = `Discover the exceptional ${brandName} ${car.name} starting at AED ${car.price}/day with 4MATIC Luxury Car Rental.`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "copy":
        navigator.clipboard.writeText(`${title}\n${text}\n${url}`).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        });
        break;
    }

    setShowShareOptions(false);
  };

  // Close share menu when clicking outside
  const handleClickOutside = () => {
    setShowShareOptions(false);
  };

  // Add event listener to handle outside clicks
  if (typeof window !== "undefined" && showShareOptions) {
    window.addEventListener("click", handleClickOutside, { once: true });
  }

  return (
    <div className="relative">
      <button
        onClick={handleShareClick}
        className="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-500 dark:text-secondary-400"
        aria-label="Share vehicle"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {/* Share options dropdown */}
      {showShareOptions && (
        <div
          className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-secondary-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dropdown
        >
          <div className="py-1">
            <button
              onClick={() => shareWith("facebook")}
              className="w-full flex items-center px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
            >
              <Facebook className="mr-3 h-4 w-4 text-[#1877F2]" />
              Facebook
            </button>
            <button
              onClick={() => shareWith("twitter")}
              className="w-full flex items-center px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
            >
              <Twitter className="mr-3 h-4 w-4 text-[#1DA1F2]" />
              Twitter
            </button>
            <button
              onClick={() => shareWith("linkedin")}
              className="w-full flex items-center px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
            >
              <Linkedin className="mr-3 h-4 w-4 text-[#0A66C2]" />
              LinkedIn
            </button>
            <button
              onClick={() => shareWith("copy")}
              className="w-full flex items-center px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
            >
              {copySuccess ? (
                <>
                  <Check className="mr-3 h-4 w-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <LinkIcon className="mr-3 h-4 w-4" />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
