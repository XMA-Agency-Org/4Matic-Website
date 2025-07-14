// app/(public)/_components/home/Hero.tsx
"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import VehicleSearch from "@/app/(public)/vehicles/_components/VehicleSearch";

export default function Hero() {
  return (
    <div className="relative pt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5 z-50" 
          style={{ 
            backgroundImage: "url('/grid-pattern.svg')", 
            backgroundSize: "30px",
          }}
        ></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-600/30 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-primary-700/20 rounded-full blur-[120px] -z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start py-12 md:py-20 lg:py-28">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left mb-12 lg:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-900/30 border border-primary-700/40 text-primary-300 text-sm mb-3">
              <span className="bg-primary-500 rounded-full w-2 h-2 mr-2"></span>
              Premium Car Rental Service
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Find And Book Your <span className="text-primary-400 relative">
                Perfect Car
                <svg className="absolute bottom-0 left-0 w-full h-3 text-primary-500/30" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C32 2.5 62 1 153.5 5.5C245 10 283 10.5 299 8.5" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-secondary-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
              Experience the freedom of the road with our premium selection of vehicles. 
              Quick booking, transparent pricing, no hidden fees.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link href="/vehicles">
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<ArrowRight />}
                >
                  Browse Vehicles
                </Button>
              </Link>
            </div>
            
            {/* <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8"> */}
            {/*   <div className="flex items-center"> */}
            {/*     <div className="bg-primary-900/50 p-2 rounded-full mr-3"> */}
            {/*       <Clock className="h-5 w-5 text-primary-300" /> */}
            {/*     </div> */}
            {/*     <div> */}
            {/*       <p className="text-white font-medium">24/7 Support</p> */}
            {/*       <p className="text-secondary-400 text-sm">Always available</p> */}
            {/*     </div> */}
            {/*   </div> */}
            {/*    */}
            {/*   <div className="flex items-center"> */}
            {/*     <div className="bg-primary-900/50 p-2 rounded-full mr-3"> */}
            {/*       <MapPinIcon className="h-5 w-5 text-primary-300" /> */}
            {/*     </div> */}
            {/*     <div> */}
            {/*       <p className="text-white font-medium">100+ Locations</p> */}
            {/*       <p className="text-secondary-400 text-sm">Across the country</p> */}
            {/*     </div> */}
            {/*   </div> */}
            {/* </div> */}
          </div>
          
          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-72 sm:h-96 md:h-[500px] w-full">
              <Image
                src="/car-blue-porsche.avif"
                alt="Luxury Sports Car"
                fill
                priority
                className="object-contain z-10"
              />
              
              {/* Circular background for the car */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-gradient-to-r from-primary-900/20 to-primary-700/20 blur-lg"></div>
              
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative pb-16 z-20">
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-xl p-6 backdrop-blur-sm">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                Find Your Perfect Vehicle
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Search our premium fleet by name, brand, or category
              </p>
            </div>
            <div className="mx-auto max-w-lg">
              <VehicleSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
