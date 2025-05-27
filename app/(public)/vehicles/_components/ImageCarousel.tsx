// app/(public)/vehicles/_components/ImageCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ImageCarouselProps {
  images: string[];
  altText: string;
}

export default function ImageCarousel({ images, altText }: ImageCarouselProps) {
  // Filter out empty/invalid images
  const validImages = images?.filter(img => img && img.trim() !== '') || [];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Function to handle going to previous image
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1,
    );
  };

  // Function to handle going to next image
  const handleNext = () => {
    setDirection(1);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === validImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentImageIndex, isFullscreen]);

  // Function to handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Variants for image animation
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  // Show placeholder if no valid images
  if (validImages.length === 0) {
    return (
      <div className="w-full h-96 bg-secondary-200 dark:bg-secondary-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-lg bg-secondary-300 dark:bg-secondary-700 flex items-center justify-center">
            <span className="text-4xl">🚗</span>
          </div>
          <p className="text-secondary-500 dark:text-secondary-400">
            No images available
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Carousel */}
      <div className="relative w-full h-96 md:h-[550px] rounded-lg overflow-hidden bg-secondary-100 dark:bg-secondary-900">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImageIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={validImages[currentImageIndex]}
                alt={`${altText} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={currentImageIndex === 0}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {validImages.length > 1 && (
          <div className="absolute z-50 inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
            <button
              onClick={handlePrevious}
            className="w-10 h-10 rounded-full bg-white/80 dark:bg-secondary-800/80 flex items-center justify-center text-secondary-700 dark:text-secondary-200 hover:bg-white dark:hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/80 dark:bg-secondary-800/80 flex items-center justify-center text-secondary-700 dark:text-secondary-200 hover:bg-white dark:hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          </div>
        )}

        {/* Fullscreen button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-secondary-800/80 flex items-center justify-center text-secondary-700 dark:text-secondary-200 hover:bg-white dark:hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 z-10"
          aria-label="View fullscreen"
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
          {currentImageIndex + 1} / {validImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative aspect-video rounded-md overflow-hidden border-2 transition-all ${
                currentImageIndex === index
                  ? "border-primary-500 dark:border-primary-400"
                  : "border-transparent hover:border-secondary-300 dark:hover:border-secondary-700"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${altText} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 10vw"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 focus:outline-none"
            aria-label="Exit fullscreen"
          >
            <Maximize2 className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentImageIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full max-w-6xl h-full max-h-[90vh]">
                  <Image
                    src={validImages[currentImageIndex]}
                    alt={`${altText} - Fullscreen ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Fullscreen Navigation */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
            <button
              onClick={handlePrevious}
              className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Image counter in fullscreen */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {validImages.length}
          </div>
        </div>
      )}
    </>
  );
}
