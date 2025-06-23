// app/(public)/blog/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import { getBlogPosts, getAllCategories, getAllTags } from "@/lib/contentful-blog-api";
import BlogCollection from "./_components/BlogCollection";
import CollectionHeader from "./_components/CollectionHeader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Loading from "./_components/Loading";

export const metadata: Metadata = {
  title: "4MATIC | Our Blog - Insights & Stories",
  description: "Read our latest articles about luxury car rentals, driving tips, and Dubai travel guides. Stay updated with 4Matic Car Rental insights.",
  keywords: "Dubai car rental blog, luxury car articles, driving tips Dubai, travel guides Dubai, 4Matic blog",
  openGraph: {
    title: "Blog | 4Matic Car Rental Dubai",
    description: "Read our latest articles about luxury car rentals, driving tips, and Dubai travel guides.",
    url: "https://4maticcarrental.com/blog",
    siteName: "4Matic Car Rental",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | 4Matic Car Rental Dubai",
    description: "Read our latest articles about luxury car rentals, driving tips, and Dubai travel guides.",
  },
  alternates: {
    canonical: "https://4maticcarrental.com/blog",
  },
};

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
    tag?: string;
    search?: string;
  };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-secondary-950">
      <Header />
      <main className="pt-24">
        {/* Page Header */}
        <CollectionHeader />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {/* Blog Collection */}
          <Suspense fallback={<Loading />}>
            <BlogCollectionWrapper searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Separate component to handle async data fetching
async function BlogCollectionWrapper({ searchParams }: { searchParams: BlogPageProps['searchParams'] }) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 12;
  
  // Fetch blog posts with filters
  const { posts, totalPosts, totalPages } = await getBlogPosts({
    page,
    pageSize,
    category: searchParams.category,
    tag: searchParams.tag,
    search: searchParams.search,
  });
  
  // Fetch categories and tags for filters
  const [categories, tags] = await Promise.all([
    getAllCategories(),
    getAllTags(),
  ]);
  
  return (
    <BlogCollection
      posts={posts}
      totalPosts={totalPosts}
      currentPage={page}
      totalPages={totalPages}
      categories={categories}
      tags={tags}
      filters={{
        category: searchParams.category,
        tag: searchParams.tag,
        search: searchParams.search,
      }}
    />
  );
}