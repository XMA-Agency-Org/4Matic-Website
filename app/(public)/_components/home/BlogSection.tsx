import Link from 'next/link'
import { getFeaturedPosts } from '@/lib/contentful-blog-api'
import BlogCard from '../../blog/_components/BlogCard'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

export default async function BlogSection() {
  const featuredPosts = await getFeaturedPosts(3)
  
  if (featuredPosts.length === 0) {
    return null
  }
  
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <SectionHeader
          title="Latest from Our Blog"
          subtitle="Expert insights, driving tips, and Dubai travel guides"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        <div className="text-center">
          <Button asLink href="/blog" size="lg" variant="outline">
            View All Articles
            <span className="ml-2" aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  )
}