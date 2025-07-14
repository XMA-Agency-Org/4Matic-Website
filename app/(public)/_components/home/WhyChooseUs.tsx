"use client";
import { Briefcase, User, Car, Headset } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Audi from "@/public/Audi 1_1 - Edited.png";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function WhyChooseUs() {
  const features: Feature[] = [
    {
      icon: <Briefcase className="text-primary-400 h-6 w-6" />,
      title: "Best price guaranteed",
      description:
        "Find a lower price? We'll refund you 100% of the difference.",
    },
    {
      icon: <User className="text-primary-400 h-6 w-6" />,
      title: "Experience driver",
      description:
        "Don't have driver? Don't worry, we have many experienced driver for you.",
    },
    {
      icon: <Car className="text-primary-400 h-6 w-6" />,
      title: "24 hour car delivery",
      description:
        "Book your car anytime and we will deliver it directly to you.",
    },
    {
      icon: <Headset className="text-primary-400 h-6 w-6" />,
      title: "24/7 technical support",
      description:
        "Have a question? Contact Rentcars support any time when you have problem.",
    },
  ];

  // Ref for the section
  const sectionRef = useRef(null);

  // Using Framer Motion's useScroll hook to track scroll position
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Transform the scrollYProgress (0-1) to X translation (-100px to 200px)
  // Start with car slightly off-screen to the left (-100px) and move it right
  const carX = useTransform(scrollYProgress, [0, 1], ["-50%", "-5%"]);

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#0b102b] min-h-[600px] overflow-hidden"
    >
      {/* Car absolute positioned at bottom left with Framer Motion animation */}
      <div className="hidden lg:block absolute bottom-0 left-0 z-10">
        <motion.div style={{ x: carX }}>
          <Image
            src={Audi}
            alt="Luxury Car"
            priority
            className="object-contain w-[1000px] h-auto"
          />
        </motion.div>
      </div>

      {/* Diagonal background shape */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute bottom-0 left-0 w-full h-full"
          style={{
            clipPath: "polygon(0 30%, 40% 0, 40% 100%, 0% 100%)",
            background: "linear-gradient(135deg, #131c3f 0%, #0d1229 100%)",
            opacity: 0.8,
          }}
        ></div>
      </div>

      {/* Content container - positioned to the right */}
      <div className="max-w-7xl mx-auto px-4 py-24 relative z-20">
        <div className="flex justify-end">
          <div className="w-full lg:w-1/2 lg:pl-12">
            {/* Header */}
            <div className="mb-12">
              <div className="label">
                Why Choose Us
              </div>
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-8">
                We offer the best experience with our rental deals
              </h2>
            </div>

            {/* Features List */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-primary-100 dark:bg-primary-900/40 rounded-full aspect-square w-14 h-14 flex items-center justify-center mr-4" >
                    {feature.icon}
                  </div>
                  <div className="mt-3">
                    <h3 className="text-white text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
