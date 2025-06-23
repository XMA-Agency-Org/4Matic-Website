import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getRelatedPosts } from '@/lib/contentful-blog-api'
import BlogPostContent from '../_components/BlogPostContent'
import RelatedPosts from '../_components/RelatedPosts'
import BlogJsonLd from '../_components/BlogJsonLd'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | 4Matic Car Rental',
      description: 'The requested blog post could not be found.'
    }
  }
  
  const title = post.seoTitle || `${post.title} | 4Matic Car Rental Blog`
  const description = post.seoDescription || post.excerpt
  const keywords = post.seoKeywords?.join(', ') || ''
  const url = `https://4maticcarrental.com/blog/${post.slug}`
  
  return {
    title,
    description,
    keywords,
    authors: [{ name: '4Matic Car Rental' }],
    openGraph: {
      title,
      description,
      url,
      siteName: '4Matic Car Rental',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishDate,
      images: [
        {
          url: post.ogImage || post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.ogImage || post.featuredImage]
    },
    alternates: {
      canonical: url
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  // Fetch related posts
  const relatedPosts = await getRelatedPosts(
    post.id,
    post.categories,
    post.tags,
    3
  )
  
  return (
    <>
      <BlogJsonLd post={post} />
      <div className="min-h-screen bg-white dark:bg-secondary-950">
        <Header />
        <main className="pt-24">
          <BlogPostContent post={post} />
          {relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} currentPostId={post.id} />
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}