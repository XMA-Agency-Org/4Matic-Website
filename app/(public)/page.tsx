// app/(public)/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "./_components/home/Hero";
import HowItWorks from "./_components/home/HowItWorks";
import WhyChooseUs from "./_components/home/WhyChooseUs";
import PopularDeals from "./_components/home/PopularDeals";
import Testimonials from "./_components/home/Testimonials";
import BlogSection from "./_components/home/BlogSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-secondary-950">
      <Header />
      <main>
        <Hero />
        <PopularDeals />
        <WhyChooseUs />
        <HowItWorks />
        <BlogSection />
        {/* <Testimonials /> */}
      </main>
      <Footer />
    </div>
  );
}
