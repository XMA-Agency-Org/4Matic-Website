import { BlogPost } from '@/types/blog'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

interface BlogJsonLdProps {
  post: BlogPost
}

export default function BlogJsonLd({ post }: BlogJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      '@type': 'Organization',
      name: '4Matic Car Rental',
      url: 'https://4maticcarrental.com'
    },
    publisher: {
      '@type': 'Organization',
      name: '4Matic Car Rental',
      logo: {
        '@type': 'ImageObject',
        url: 'https://4maticcarrental.com/logo.jpg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://4maticcarrental.com/blog/${post.slug}`
    },
    wordCount: documentToPlainTextString(post.content).split(/\s+/).length,
    keywords: post.seoKeywords?.join(', ') || post.tags.map(tag => tag.name).join(', '),
    articleSection: post.categories.map(cat => cat.name).join(', '),
    inLanguage: 'en-US'
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}