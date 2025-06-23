import Link from 'next/link'
import { BlogPost } from '@/types/blog'
import BlogCard from './BlogCard'

interface RelatedPostsProps {
  posts: BlogPost[]
  currentPostId: string
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              View All Articles
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}