// app/(public)/vehicles/_actions/car-database.ts
import { Car } from "@/types/car";

const convertToAED = (usdPrice: number): number => {
  return Math.round(usdPrice/10 * 2) * 10;
};

// Updated car database featuring cars from the client's collection
export const carsDatabase: Car[] = [
  // Mercedes-Benz Vehicles
  {
    id: "mercedes-s-class",
    name: "Mercedes-Benz S-Class 4MATIC 2021",
    image: "/car-real/mercedes-s-class-4matic-black.JPG",
    images: [
      "/car-real/mercedes-s-class-4matic-black.JPG",
    ],
    rating: 4.9,
    reviews: 186,
    passengers: 5,
    airConditioning: true,
    doors: 4,
    transmission: "Auto",
    price: 1200, // Updated from PDF: 1200 AED daily (2021/2022 models)
    category: "luxury",
    brand: "mercedes",
    description: "The Mercedes-Benz S-Class 4MATIC represents the pinnacle of luxury and technology in the automotive world. With its opulent interior, cutting-edge features, and exceptional comfort, it delivers an unmatched premium experience with the added capability of all-wheel drive.",
    specs: {
      engine: "3.0L Inline-6 with EQ Boost",
      power: "429 hp",
      torque: "520 Nm",
      acceleration: "4.9 sec (0-100 km/h)",
      topSpeed: "250 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "8.2 L/100km",
      driveTrain: "AWD (4MATIC)",
      features: [
        "MBUX with augmented reality",
        "Burmester 4D surround sound",
        "Active ambient lighting",
        "E-Active body control",
        "Rear-wheel steering",
        "Digital Light headlights",
        "Executive rear seats",
        "Interior assistant"
      ]
    }
  },
  {
    id: "mercedes-e-class",
    name: "Mercedes-Benz E-Class 2022",
    image: "/car-real/mercedes-e-class-black.JPG",
    images: [
      "/car-real/mercedes-e-class-black.JPG",
    ],
    rating: 4.7,
    reviews: 155,
    passengers: 5,
    airConditioning: true,
    doors: 4,
    transmission: "Auto",
    price: 500, // Updated from PDF: 500 AED daily (2022 Black model)
    category: "luxury",
    brand: "mercedes",
    description: "The Mercedes-Benz E-Class exemplifies sophisticated executive luxury with its elegant design and advanced technology. Offering a perfect balance of comfort, performance, and prestige, it delivers a refined driving experience that makes every journey a pleasure.",
    specs: {
      engine: "2.0L Turbocharged Inline-4",
      power: "255 hp",
      torque: "370 Nm",
      acceleration: "6.1 sec (0-100 km/h)",
      topSpeed: "240 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "7.4 L/100km",
      driveTrain: "RWD",
      features: [
        "MBUX infotainment system",
        "Wireless smartphone integration",
        "Active Brake Assist",
        "Adaptive high beam assist",
        "64-color ambient lighting",
        "Parking package with 360° camera",
        "Multicontour front seats with massage",
        "Energizing comfort control"
      ]
    }
  },
  {
    id: "mercedes-gle-53-amg",
    name: "Mercedes-AMG GLE 53 2022",
    image: "/car-real/mercedes-gle-53-amg.JPG",
    images: [
      "/car-real/mercedes-gle-53-amg.JPG",
    ],
    rating: 4.7,
    reviews: 132,
    passengers: 5,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 1000, // Updated from PDF: 1000 AED daily (2022 Grey model)
    category: "suv",
    brand: "mercedes",
    description: "The Mercedes-AMG GLE 53 combines SUV practicality with AMG performance DNA. Its electrified powertrain, sophisticated suspension, and distinctive styling create a compelling vehicle that excels in both everyday use and dynamic driving scenarios.",
    specs: {
      engine: "3.0L Inline-6 Turbo with EQ Boost",
      power: "429 hp",
      torque: "520 Nm",
      acceleration: "5.2 sec (0-100 km/h)",
      topSpeed: "250 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "9.3 L/100km",
      driveTrain: "AWD (4MATIC+)",
      features: [
        "AMG Performance 4MATIC+",
        "AMG RIDE CONTROL air suspension",
        "AMG Dynamic Select driving modes",
        "AMG-specific grille and bodywork",
        "Burmester surround sound system",
        "Widescreen cockpit with MBUX",
        "AMG sports seats",
        "Active Parking Assist"
      ]
    }
  },
  {
    id: "mercedes-amg-g63",
    name: "Mercedes-AMG G63 2025",
    image: "/car-real/mercedes-amg-g63-mate-black.JPG",
    images: [
      "/car-real/mercedes-amg-g63-mate-black.JPG",
      "/car-real/mercedes-amg-g63-black.JPG",
      "/car-real/mercedes-amg-g63-blue.JPG",
    ],
    rating: 4.8,
    reviews: 142,
    passengers: 5,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 2300, // Updated from PDF: 2300 AED daily (2025 Black/White/Blue model)
    category: "luxury",
    brand: "mercedes",
    description: "The Mercedes-AMG G63 is an iconic luxury SUV that combines rugged off-road capability with exceptional performance and prestige. This legendary G-Class offers a handcrafted AMG engine, sophisticated luxury, and unmistakable design that makes a powerful statement wherever you go.",
    specs: {
      engine: "4.0L V8 Biturbo",
      power: "577 hp",
      torque: "850 Nm",
      acceleration: "4.5 sec (0-100 km/h)",
      topSpeed: "220 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "13.1 L/100km",
      driveTrain: "AWD",
      features: [
        "AMG DYNAMIC SELECT",
        "Burmester surround sound system",
        "Adaptive suspension",
        "Nappa leather upholstery",
        "AMG performance exhaust",
        "MBUX infotainment system",
        "Heated and ventilated seats",
        "360° camera"
      ]
    }
  },
  {
    id: "mercedes-maybach-gls",
    name: "Mercedes-Maybach GLS 600 2022",
    image: "/car-real/mercedes-maybach-gls.JPG",
    images: [
      "/car-real/mercedes-maybach-gls.JPG",
    ],
    rating: 4.9,
    reviews: 68,
    passengers: 4,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 2200, // Updated from PDF: 2200 AED daily (2022 Black model)
    category: "luxury",
    brand: "mercedes",
    description: "The Mercedes-Maybach GLS represents the ultimate luxury SUV experience. It combines the commanding presence and capability of the GLS with the exceptional refinement and exclusivity of Maybach to create a vehicle that delivers first-class comfort with the versatility of an SUV.",
    specs: {
      engine: "4.0L V8 Biturbo",
      power: "550 hp",
      torque: "730 Nm",
      acceleration: "4.9 sec (0-100 km/h)",
      topSpeed: "250 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "11.7 L/100km",
      driveTrain: "AWD",
      features: [
        "Maybach Executive Rear Seats",
        "Folding tables in rear",
        "Champagne flutes and refrigerator",
        "E-ACTIVE BODY CONTROL suspension",
        "Burmester® High-End 3D Surround Sound",
        "MBUX Rear Tablet",
        "Night View Assist Plus",
        "Maybach Exclusive nappa leather"
      ]
    }
  },

  // BMW Vehicles
  {
    id: "bmw-7-series",
    name: "BMW 735 2023",
    image: "/car-real/bmw-7-series.JPG",
    images: [
      "/car-real/bmw-7-series.JPG",
    ],
    rating: 4.8,
    reviews: 145,
    passengers: 5,
    airConditioning: true,
    doors: 4,
    transmission: "Auto",
    price: 1400, // Updated from PDF: 1400 AED daily (2023 Grey model)
    category: "luxury",
    brand: "bmw",
    description: "The BMW 7 Series defines luxury with its blend of sophisticated design, cutting-edge technology, and dynamic performance. This flagship sedan delivers an exceptional driving experience with its powerful engine options, while pampering occupants with its opulent interior and advanced comfort features.",
    specs: {
      engine: "3.0L TwinPower Turbo Inline-6",
      power: "335 hp",
      torque: "450 Nm",
      acceleration: "5.3 sec (0-100 km/h)",
      topSpeed: "250 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "7.9 L/100km",
      driveTrain: "RWD",
      features: [
        "BMW Curved Display",
        "Executive Lounge seating",
        "Interior Light & Sky Lounge Panoramic roof",
        "Bowers & Wilkins Diamond Surround Sound",
        "BMW Digital Key Plus",
        "Power rear sunshades",
        "Active air suspension",
        "Driving Assistant Professional"
      ]
    }
  },

  // Rolls Royce Vehicles
  {
    id: "rolls-royce-cullinan",
    name: "Rolls-Royce Cullinan 2023",
    image: "/car-real/rolls-royce-cullinan-white.JPG",
    images: [
      "/car-real/rolls-royce-cullinan-white.JPG",
    ],
    rating: 4.9,
    reviews: 78,
    passengers: 5,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 3700, // Updated from PDF: 3700 AED daily (2023 White model)
    category: "luxury",
    brand: "rolls-royce",
    description: "The Rolls-Royce Cullinan is the first all-terrain SUV from Rolls-Royce, delivering effortless luxury everywhere. Named after the largest diamond ever discovered, the Cullinan offers uncompromised comfort with exceptional performance on any terrain, embodying the ultimate in automotive elegance.",
    specs: {
      engine: "6.75L Twin-Turbo V12",
      power: "563 hp",
      torque: "850 Nm",
      acceleration: "5.2 sec (0-100 km/h)",
      topSpeed: "250 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "15.0 L/100km",
      driveTrain: "AWD",
      features: [
        "Bespoke leather interior",
        "Starlight headliner",
        "Viewing suite",
        "Adaptive air suspension",
        "Night vision with pedestrian recognition",
        "Picnic tables",
        "Champagne cooler",
        "Custom-crafted audio system"
      ]
    }
  },


  // Range Rover Vehicles
  {
    id: "range-rover-sport-sv",
    name: "Range Rover Sport SV 2024",
    image: "/car-real/range-rover-sport-sv.JPG",
    images: [
      "/car-real/range-rover-sport-sv.JPG",
      "/car-real/range-rover-sport-black.JPG",
    ],
    rating: 4.7,
    reviews: 135,
    passengers: 5,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 2000, // Updated from PDF: 2000 AED daily (2024 Golden model)
    category: "suv",
    brand: "range-rover",
    description: "The Range Rover Sport SV delivers extraordinary performance combined with Range Rover's legendary capability and refinement. This high-performance SUV features exclusive SV enhancements, bespoke design elements, and track-inspired dynamics while maintaining the luxury and versatility expected from Range Rover.",
    specs: {
      engine: "4.4L Twin-Turbo V8",
      power: "626 hp",
      torque: "750 Nm",
      acceleration: "3.8 sec (0-100 km/h)",
      topSpeed: "290 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "11.7 L/100km",
      driveTrain: "AWD",
      features: [
        "SV Performance seats",
        "Carbon fiber trim",
        "Meridian™ Signature Sound System",
        "SV-tuned Dynamic Air Suspension",
        "Carbon ceramic brakes",
        "All-terrain Response 3",
        "Active electronic differential",
        "Adaptive Dynamics"
      ]
    }
  },
  {
    id: "range-rover-vogue-hse",
    name: "Range Rover Vogue 2024",
    image: "/car-real/range-rover-vogue-hse-black.JPG",
    images: [
      "/car-real/range-rover-vogue-hse-black.JPG",
      "/car-real/range-rover-vogue-hse-white-2.JPG",
    ],
    rating: 4.8,
    reviews: 156,
    passengers: 5,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 1800, // Updated from PDF: 1800 AED daily (2024 Black/Grey model)
    category: "suv",
    brand: "range-rover",
    description: "The Range Rover Vogue HSE embodies luxury, sophistication, and capability in a full-size SUV package. With its distinctive design, advanced technology, and refined driving dynamics, it offers an exceptional experience whether traversing urban landscapes or venturing off-road.",
    specs: {
      engine: "3.0L P400 Inline-6 MHEV",
      power: "395 hp",
      torque: "550 Nm",
      acceleration: "5.8 sec (0-100 km/h)",
      topSpeed: "242 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "9.4 L/100km",
      driveTrain: "AWD",
      features: [
        "Semi-aniline leather seats",
        "Meridian™ 3D Surround Sound",
        "Executive Class Comfort-Plus rear seats",
        "Terrain Response 2",
        "Pixel LED headlights",
        "Active Noise Cancellation",
        "Cabin Air Purification Pro",
        "Advanced Driver Assistance"
      ]
    }
  },
  
  // Audi Vehicles
  {
    id: "audi-q7-quattro",
    name: "Audi Q7 quattro 2022",
    image: "/car-real/audi-q7-quattro.JPG",
    images: [
      "/car-real/audi-q7-quattro.JPG",
    ],
    rating: 4.6,
    reviews: 128,
    passengers: 7,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 700, // Updated from PDF: 700 AED daily (2022 Grey/White model)
    category: "suv",
    brand: "audi",
    description: "The Audi Q7 quattro combines sophisticated luxury with versatile utility in a premium seven-seater SUV. Its refined interior, advanced technology, and quattro all-wheel drive capability deliver a composed and confident driving experience, making it ideal for both family adventures and executive transportation.",
    specs: {
      engine: "3.0L V6 TFSI",
      power: "340 hp",
      torque: "500 Nm",
      acceleration: "5.9 sec (0-100 km/h)",
      topSpeed: "250 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "9.1 L/100km",
      driveTrain: "AWD (quattro)",
      features: [
        "Audi Virtual Cockpit Plus",
        "MMI Navigation plus with MMI touch",
        "Bang & Olufsen 3D Premium Sound System",
        "Adaptive air suspension",
        "Panoramic sunroof",
        "Four-zone automatic climate control",
        "Matrix LED headlights",
        "Audi pre sense safety technologies"
      ]
    }
  },

  // Porsche Vehicles
  {
    id: "porsche-911-carrera-gts",
    name: "Porsche 911 Carrera GTS 2023",
    image: "/car-real/porsche-911-carrera-gts-blue.JPG",
    images: [
      "/car-real/porsche-911-carrera-gts-blue.JPG",
    ],
    rating: 4.8,
    reviews: 142,
    passengers: 2,
    airConditioning: true,
    doors: 2,
    transmission: "Auto",
    price: 1700, // Updated from PDF: 1700 AED daily (2023 Blue model)
    category: "sports",
    brand: "porsche",
    description: "The Porsche 911 Carrera GTS bridges the gap between the standard Carrera and the track-focused GT3. With enhanced power, bespoke styling cues, and performance-focused equipment, it offers driving enthusiasts the perfect balance of everyday usability and thrilling performance.",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      power: "473 hp",
      torque: "570 Nm",
      acceleration: "3.4 sec (0-100 km/h)",
      topSpeed: "312 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "10.7 L/100km",
      driveTrain: "RWD",
      features: [
        "Sport Chrono Package",
        "PASM sport suspension",
        "Sports exhaust system",
        "Race-Tex interior trim",
        "Porsche Dynamic Light System Plus",
        "Porsche Torque Vectoring",
        "20/21-inch RS Spyder Design wheels",
        "Bose surround sound system"
      ]
    }
  },
  {
    id: "porsche-911-targa",
    name: "Porsche 911 Targa 2022",
    image: "/car-real/porsche-911-targa-black.JPG",
    images: [
      "/car-real/porsche-911-targa-black.JPG",
      "/car-real/porsche-911-targa-green.JPG",
    ],
    rating: 4.8,
    reviews: 128,
    passengers: 2,
    airConditioning: true,
    doors: 2,
    transmission: "Auto",
    price: 1700, // Updated from PDF: 1700 AED daily (2022/2024 models)
    category: "sports",
    brand: "porsche",
    description: "The Porsche 911 Targa offers a unique open-top driving experience with its innovative roof system that pays homage to the original 1967 Targa design. It combines the exhilaration of a convertible with the refinement of a coupe, all while delivering the legendary Porsche performance and precision.",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      power: "443 hp",
      torque: "530 Nm",
      acceleration: "3.8 sec (0-100 km/h)",
      topSpeed: "304 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "10.4 L/100km",
      driveTrain: "AWD",
      features: [
        "Automatic Targa roof system",
        "Sport Chrono Package",
        "Porsche Active Suspension Management",
        "LED headlights with Porsche Dynamic Light System",
        "14-way power sport seats",
        "Bose surround sound system",
        "Porsche Communication Management",
        "Lane Change Assist"
      ]
    }
  },

  // Lamborghini Vehicles
  {
    id: "lamborghini-urus",
    name: "Lamborghini Urus MY20 2022",
    image: "/car-real/lamborghini-urus-gray.JPG",
    images: [
      "/car-real/lamborghini-urus-gray.JPG",
    ],
    rating: 4.8,
    reviews: 112,
    passengers: 5,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 2700, // Updated from PDF: 2700 AED daily (2021/2022 models)
    category: "suv",
    brand: "lamborghini",
    description: "The Lamborghini Urus is the world's first Super Sport Utility Vehicle. It combines the soul of a super sports car with the functionality of an SUV, creating a vehicle that's as comfortable on the racetrack as it is on rough terrain or urban streets.",
    specs: {
      engine: "4.0L Twin-Turbo V8",
      power: "650 hp",
      torque: "850 Nm",
      acceleration: "3.6 sec (0-100 km/h)",
      topSpeed: "305 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "12.7 L/100km",
      driveTrain: "AWD",
      features: [
        "ANIMA Selector with 6 driving modes",
        "Adaptive air suspension",
        "Carbon ceramic brakes",
        "Active roll stabilization",
        "B&O 3D advanced sound system",
        "Alcantara and leather interior",
        "Lamborghini Infotainment System III",
        "Rear-wheel steering"
      ]
    }
  },

  // Cadillac Vehicles
  {
    id: "cadillac-escalade-v",
    name: "Cadillac Escalade V8 2023",
    image: "/car-real/cadillac-escalade-v.JPG",
    images: [
      "/car-real/cadillac-escalade-v.JPG",
    ],
    rating: 4.6,
    reviews: 87,
    passengers: 7,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 1500, // Updated from PDF: 1500 AED daily (2023 Grey model)
    category: "suv",
    brand: "cadillac",
    description: "The Cadillac Escalade V is the first-ever high-performance full-size luxury SUV from Cadillac's V-Series. It combines the Escalade's iconic presence and luxury with supercharged performance, distinctive sound, and extraordinary driving dynamics to create a truly unique vehicle.",
    specs: {
      engine: "6.2L Supercharged V8",
      power: "682 hp",
      torque: "885 Nm",
      acceleration: "4.4 sec (0-100 km/h)",
      topSpeed: "200 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "16.8 L/100km",
      driveTrain: "AWD",
      features: [
        "AKG Studio Reference 36-speaker audio",
        "38-inch curved OLED display",
        "V-Mode personalized performance settings",
        "Magnetic Ride Control 4.0",
        "Semi-aniline leather seats",
        "Super Cruise hands-free driving",
        "Night Vision",
        "Adjustable air suspension"
      ]
    }
  },

  // GMC Vehicles
  {
    id: "gmc-yukon-denali",
    name: "GMC Yukon 2022",
    image: "/car-real/gmc-yukon-black.JPG",
    images: [
      "/car-real/gmc-yukon-black.JPG",
      "/car-real/gmc-yukon-white.JPG",
    ],
    rating: 4.5,
    reviews: 94,
    passengers: 7,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 450, // Updated from PDF: 450 AED daily (2022 Black/White/Grey model)
    category: "suv",
    brand: "gmc",
    description: "The GMC Yukon Denali represents the pinnacle of GMC's full-size SUV lineup. With its distinctive styling, premium materials, and advanced technology, it delivers exceptional comfort and capability for passengers and cargo, making it ideal for both luxury travel and practical needs.",
    specs: {
      engine: "6.2L V8",
      power: "420 hp",
      torque: "624 Nm",
      acceleration: "6.0 sec (0-100 km/h)",
      topSpeed: "180 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "14.7 L/100km",
      driveTrain: "4WD",
      features: [
        "Denali-exclusive interior trim",
        "10.2-inch premium infotainment system",
        "Multicolor Head-Up Display",
        "Magnetic Ride Control",
        "Power-retractable assist steps",
        "Adaptive air suspension",
        "Bose Performance Series 14-speaker audio",
        "Rear-seat media system"
      ]
    }
  },

  // Nissan Vehicles
  {
    id: "nissan-patrol-platinum",
    name: "Nissan Patrol 2025",
    image: "/car-real/nissan-patrol-platinum.JPG",
    images: [
      "/car-real/nissan-patrol-platinum.JPG",
    ],
    rating: 4.5,
    reviews: 125,
    passengers: 7,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 1100, // Updated from PDF: 1100 AED daily (2025 Grey/White model)
    category: "suv",
    brand: "nissan",
    description: "The Nissan Patrol Platinum is a flagship SUV that combines legendary off-road capability with premium luxury. Popular in the Middle East for its desert prowess and spacious comfort, it offers a sophisticated driving experience with powerful performance and advanced technology.",
    specs: {
      engine: "5.6L V8",
      power: "400 hp",
      torque: "560 Nm",
      acceleration: "6.6 sec (0-100 km/h)",
      topSpeed: "210 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "14.5 L/100km",
      driveTrain: "4WD",
      features: [
        "Hydraulic Body Motion Control",
        "Premium leather seating with quilted stitching",
        "Climate-controlled front seats",
        "Dual 8-inch rear entertainment screens",
        "13-speaker Bose premium audio",
        "All-terrain monitoring system",
        "Intelligent rear view mirror",
        "Intelligent Around View Monitor"
      ]
    }
  },

  // Mini Vehicles
  {
    id: "mini-cooper-john-cooper-works",
    name: "MINI Cooper John Cooper Works 2022",
    image: "/car-real/mini-cooper-john-cooper-works.JPG",
    images: [
      "/car-real/mini-cooper-john-cooper-works.JPG",
    ],
    rating: 4.6,
    reviews: 98,
    passengers: 4,
    airConditioning: true,
    doors: 3,
    transmission: "Auto",
    price: 350, // Updated from PDF: 350 AED daily (2022 Red model)
    category: "sports",
    brand: "mini",
    description: "The MINI John Cooper Works is the high-performance variant of the iconic MINI Cooper, offering track-inspired thrills in a compact package. With its powerful engine, sport-tuned suspension, and distinctive styling, it delivers an exhilarating driving experience with the unmistakable MINI character.",
    specs: {
      engine: "2.0L TwinPower Turbo",
      power: "231 hp",
      torque: "320 Nm",
      acceleration: "6.1 sec (0-100 km/h)",
      topSpeed: "246 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "7.1 L/100km",
      driveTrain: "FWD",
      features: [
        "Sport suspension with frequency-selective damping",
        "John Cooper Works sport seats",
        "Sport exhaust system",
        "Performance Control",
        "18-inch John Cooper Works alloy wheels",
        "Aerodynamic body kit",
        "Brembo sport brakes",
        "MINI Connected infotainment"
      ]
    }
  },

  // Chevrolet Vehicles
  {
    id: "chevrolet-corvette-stingray",
    name: "Chevrolet Corvette 2022",
    image: "/car-real/chevrolet-corvette-stingray.JPG",
    images: [
      "/car-real/chevrolet-corvette-stingray.JPG",
    ],
    rating: 4.7,
    reviews: 132,
    passengers: 2,
    airConditioning: true,
    doors: 2,
    transmission: "Auto",
    price: 1000, // Updated from PDF: 1000 AED daily (2022 Grey model)
    category: "sports",
    brand: "chevrolet",
    description: "The Chevrolet Corvette Stingray represents a revolution in the iconic American sports car's history. With its mid-engine configuration, aggressive styling, and track-capable performance, it delivers an exhilarating driving experience that rivals exotic supercars at a fraction of the price.",
    specs: {
      engine: "6.2L V8",
      power: "495 hp",
      torque: "637 Nm",
      acceleration: "2.9 sec (0-100 km/h)",
      topSpeed: "312 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "12.0 L/100km",
      driveTrain: "RWD",
      features: [
        "8-speed dual-clutch transmission",
        "Magnetic Ride Control 4.0",
        "Performance data recorder",
        "Head-up display",
        "Bose Performance Series audio",
        "Front lift system",
        "Z51 Performance Package option",
        "Driver mode selector with 12 settings"
      ]
    }
  },
  {
    id: "chevrolet-tahoe",
    name: "Chevrolet Tahoe 2022",
    image: "/car-real/chevrolet-tahoe.JPG",
    images: [
      "/car-real/chevrolet-tahoe.JPG",
    ],
    rating: 4.4,
    reviews: 105,
    passengers: 8,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 450, // Updated from PDF: 450 AED daily (2022 Black/White model)
    category: "suv",
    brand: "chevrolet",
    description: "The Chevrolet Tahoe delivers full-size SUV capability with modern design and technology. Its spacious interior provides comfortable seating for up to eight passengers, while its robust power and towing capacity make it versatile for everything from family road trips to demanding utility needs.",
    specs: {
      engine: "5.3L EcoTec3 V8",
      power: "355 hp",
      torque: "519 Nm",
      acceleration: "7.2 sec (0-100 km/h)",
      topSpeed: "180 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "12.4 L/100km",
      driveTrain: "4WD",
      features: [
        "10.2-inch infotainment touchscreen",
        "Independent rear suspension",
        "Magnetic Ride Control (available)",
        "Power-folding third row",
        "Panoramic sunroof",
        "Hands-free power liftgate",
        "Wireless Apple CarPlay and Android Auto",
        "Advanced trailering features"
      ]
    }
  },

  // Economy Vehicles
  {
    id: "kia-cerato",
    name: "Kia Cerato 2022",
    image: "/car-real/kia-cerato.JPG",
    images: [
      "/car-real/kia-cerato.JPG",
    ],
    rating: 4.2,
    reviews: 156,
    passengers: 5,
    airConditioning: true,
    doors: 4,
    transmission: "Auto",
    price: 160, // Updated from PDF: 160 AED daily (2022 Blue model)
    category: "economy",
    brand: "kia",
    description: "The Kia Cerato offers a compelling blend of style, technology, and value in the compact sedan segment. With its modern design, comfortable interior, and comprehensive suite of features, it provides an elevated driving experience without the premium price tag.",
    specs: {
      engine: "2.0L Inline-4",
      power: "147 hp",
      torque: "179 Nm",
      acceleration: "9.8 sec (0-100 km/h)",
      topSpeed: "195 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "6.7 L/100km",
      driveTrain: "FWD",
      features: [
        "8-inch touchscreen infotainment",
        "Wireless Apple CarPlay & Android Auto",
        "Smart key with push-button start",
        "Advanced driver assistance systems",
        "Dual-zone automatic climate control",
        "Synthetic leather seating surfaces",
        "60/40 split-folding rear seats",
        "LED headlights and taillights"
      ]
    }
  },
  {
    id: "fiat-500",
    name: "Fiat 500 2023",
    image: "/car-real/fiat-500.JPG",
    images: [
      "/car-real/fiat-500.JPG",
    ],
    rating: 4.1,
    reviews: 124,
    passengers: 4,
    airConditioning: true,
    doors: 3,
    transmission: "Auto",
    price: 200, // Updated from PDF: 200 AED daily (2023 White/Blue model)
    category: "economy",
    brand: "fiat",
    description: "The Fiat 500 combines Italian style with city-friendly dimensions in a charming package. Its retro-inspired design, nimble handling, and efficient performance make it perfect for urban environments, while its distinctive personality ensures it stands out from the crowd.",
    specs: {
      engine: "1.0L Inline-3 Hybrid",
      power: "70 hp",
      torque: "92 Nm",
      acceleration: "12.8 sec (0-100 km/h)",
      topSpeed: "167 km/h",
      fuelType: "Gasoline Hybrid",
      fuelConsumption: "4.6 L/100km",
      driveTrain: "FWD",
      features: [
        "7-inch touchscreen display",
        "Apple CarPlay & Android Auto",
        "Panoramic glass roof option",
        "Uconnect infotainment system",
        "City driving mode",
        "Rear parking sensors",
        "15-inch alloy wheels",
        "6-speaker audio system"
      ]
    }
  },
  {
    id: "mitsubishi-attrage",
    name: "Mitsubishi Attrage 2023",
    image: "/car-real/mitsubishi-attrage.JPG",
    images: [
      "/car-real/mitsubishi-attrage.JPG",
    ],
    rating: 4.0,
    reviews: 142,
    passengers: 5,
    airConditioning: true,
    doors: 4,
    transmission: "Auto",
    price: 90, // Updated from PDF: 90 AED daily (2023 Black/White/Grey model)
    category: "economy",
    brand: "mitsubishi",
    description: "The Mitsubishi Attrage is a compact sedan that offers remarkable efficiency and practicality. With its spacious interior despite compact dimensions, excellent fuel economy, and affordable price point, it's an ideal choice for budget-conscious urban drivers seeking reliable transportation.",
    specs: {
      engine: "1.2L MIVEC Inline-3",
      power: "78 hp",
      torque: "100 Nm",
      acceleration: "13.5 sec (0-100 km/h)",
      topSpeed: "170 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "4.9 L/100km",
      driveTrain: "FWD",
      features: [
        "7-inch smartphone-link display audio",
        "Automatic climate control",
        "Keyless entry with push-button start",
        "Rearview camera",
        "LED positioning lights",
        "Hill start assist",
        "Bluetooth connectivity",
        "Stability and traction control"
      ]
    }
  },

  // Minivan/Crossover Vehicles
  {
    id: "mitsubishi-outlander",
    name: "Mitsubishi Outlander 2024",
    image: "/car-real/mitsubishi-outlander.JPG",
    images: [
      "/car-real/mitsubishi-outlander.JPG",
    ],
    rating: 4.3,
    reviews: 112,
    passengers: 7,
    airConditioning: true,
    doors: 5,
    transmission: "Auto",
    price: 250, // Updated from PDF: 250 AED daily (2024/2025 models)
    category: "suv",
    brand: "mitsubishi",
    description: "The Mitsubishi Outlander offers versatile seven-seat capability in a stylish crossover package. With its bold design, comfortable interior, and advanced all-wheel control system, it provides practical family transportation with the capability to handle various driving conditions and adventures.",
    specs: {
      engine: "2.5L Inline-4",
      power: "181 hp",
      torque: "245 Nm",
      acceleration: "9.7 sec (0-100 km/h)",
      topSpeed: "190 km/h",
      fuelType: "Gasoline",
      fuelConsumption: "8.1 L/100km",
      driveTrain: "AWD",
      features: [
        "Super All-Wheel Control (S-AWC)",
        "9-inch smartphone-link display audio",
        "Tri-zone automatic climate control",
        "Power panoramic sunroof",
        "12.3-inch digital driver display",
        "MI-PILOT Assist",
        "10-speaker Bose premium sound system",
        "Drive mode selector"
      ]
    }
  }
];
