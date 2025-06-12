// app/(public)/contact-us/page.tsx
import { Metadata } from "next";
import { 
  Phone, 
  Mail, 
  MapPin 
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "./_components/ContactForm";
import LocationMapContainer from "./_components/LocationMapContainer";

export const metadata: Metadata = {
  title: "Contact Us | 4MATIC Luxury Car Rental",
  description: "Get in touch with our luxury car rental specialists. We're here to help with bookings, inquiries, and personalized service.",
};

// Location data
const location = {
  id: "main-office",
  name: "Dubai Office",
  address: "Business Bay Marquise Square Tower Shop 04, Dubai, UAE",
  phone: "+971 56 970 0700",
  email: "info@4maticrental.com",
  hours: "Mon-Fri: 9am-8pm | Sat-Sun: 10am-6pm",
  coordinates: { lat: 25.186, lng: 55.280 } // Dubai Business Bay coordinates
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-secondary-900 dark:bg-secondary-950 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-800 via-secondary-900 to-black opacity-95"></div>
            
            {/* Pattern overlay */}
            <div 
              className="absolute inset-0 opacity-10" 
              style={{ 
                backgroundImage: "url('/grid-pattern.svg')", 
                backgroundSize: "30px 30px"
              }}
            ></div>
            
            {/* Gradient orbs */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-600/30 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-primary-700/20 rounded-full blur-[120px] -z-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Get in Touch With Our Team
              </h1>
              <p className="text-secondary-300 text-lg mb-8">
                We're here to answer any questions about our luxury vehicles and services. 
                Our dedicated team of specialists is ready to assist you.
              </p>
              
              {/* Quick Contact Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition-colors duration-300">
                  <div className="inline-flex items-center justify-center bg-primary-600/20 p-3 rounded-full mb-4">
                    <Phone className="h-6 w-6 text-primary-400" />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">Call Us</h3>
                  <p className="text-secondary-300 mb-3">Speak directly with our team</p>
                  <a href="tel:+971569700700" className="text-primary-400 font-medium hover:text-primary-300">
                    +971569700700
                  </a>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition-colors duration-300">
                  <div className="inline-flex items-center justify-center bg-primary-600/20 p-3 rounded-full mb-4">
                    <Mail className="h-6 w-6 text-primary-400" />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">Email Us</h3>
                  <p className="text-secondary-300 mb-3">Send us your inquiries</p>
                  <a href="mailto:info@4maticrental.com" className="text-primary-400 font-medium hover:text-primary-300">
                    info@4maticrental.com
                  </a>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition-colors duration-300">
                  <div className="inline-flex items-center justify-center bg-primary-600/20 p-3 rounded-full mb-4">
                    <MapPin className="h-6 w-6 text-primary-400" />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">Visit Us</h3>
                  <p className="text-secondary-300 mb-3">Our showroom location</p>
                  <p className="text-primary-400 font-medium">Business Bay Marquise Square Tower Shop 04, Dubai</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-16 bg-white dark:bg-secondary-900">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm p-8 border border-secondary-200 dark:border-secondary-700">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                  Send Us a Message
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 mb-8">
                  Please fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <ContactForm />
              </div>
              
              {/* Locations Info */}
              <div>
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                  Our Location
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 mb-8">
                  Visit our premium showroom to explore our fleet in person and speak with our specialists.
                </p>
                
                <div className="space-y-8">
                  <div 
                    className="bg-secondary-50 dark:bg-secondary-800 rounded-xl p-6 border border-secondary-200 dark:border-secondary-700"
                  >
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                      {location.name}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex">
                        <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0 mt-1" />
                        <span className="text-secondary-600 dark:text-secondary-300">
                          {location.address}
                        </span>
                      </div>
                      
                      <div className="flex">
                        <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0 mt-1" />
                        <a 
                          href={`tel:${location.phone.replace(/\D/g, '')}`}
                          className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {location.phone}
                        </a>
                      </div>
                      
                      <div className="flex">
                        <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0 mt-1" />
                        <a 
                          href={`mailto:${location.email}`}
                          className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {location.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-secondary-50 dark:bg-secondary-950">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
                Find Us
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400">
                Visit our showroom to see our collection of luxury vehicles in person.
              </p>
            </div>
            
            {/* Map Component */}
            <div className="bg-white dark:bg-secondary-800 rounded-xl overflow-hidden shadow-sm border border-secondary-200 dark:border-secondary-700 h-[500px]">
              <LocationMapContainer location={location} />
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-secondary-900">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400">
                Find answers to common questions about our rental process and services.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white font-medium">
                    What documents do I need to rent a car?
                    <span className="transition-transform duration-200 group-open:rotate-180">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-6 pt-0 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300">
                    <p>To rent a car, you'll need a valid driver's license, a credit card in your name, and a form of identification (passport or ID card). For luxury vehicles, additional documentation may be required, such as proof of insurance and a secondary form of ID.</p>
                  </div>
                </details>
              </div>
              
              <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white font-medium">
                    Can I have the vehicle delivered to my location?
                    <span className="transition-transform duration-200 group-open:rotate-180">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-6 pt-0 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300">
                    <p>Yes, we offer vehicle delivery and pickup services within the city and to select locations including airports, hotels, and residential addresses. This service is complimentary for premium rentals and available for an additional fee for other vehicles.</p>
                  </div>
                </details>
              </div>
              
              <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white font-medium">
                    What is your cancellation policy?
                    <span className="transition-transform duration-200 group-open:rotate-180">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-6 pt-0 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300">
                    <p>Reservations cancelled more than 48 hours prior to pickup receive a full refund. Cancellations between 24-48 hours incur a one-day rental fee. Cancellations with less than 24-hour notice may be charged the full rental amount. Special conditions apply for exotic and ultra-luxury vehicles.</p>
                  </div>
                </details>
              </div>
              
              <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white font-medium">
                    What is included in the rental price?
                    <span className="transition-transform duration-200 group-open:rotate-180">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-6 pt-0 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300">
                    <p>Our rental prices include comprehensive insurance, 24/7 roadside assistance, and a set number of miles per day (varies by vehicle). For luxury and exotic cars, we also include a detailed orientation of the vehicle's features and a full tank of premium fuel. Additional services like GPS, child seats, and unlimited mileage are available for an extra charge.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
