'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { BlogPost } from '@/types/blog'
import { formatDate } from '@/lib/formatters'
import Button from '@/components/ui/Button'
import ShareButton from './ShareButton'

interface BlogPostContentProps {
  post: BlogPost
}

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="px-1 py-0.5 rounded bg-muted text-sm font-mono">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
      <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
      <h4 className="text-lg md:text-xl font-bold mt-6 mb-3">{children}</h4>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
      <li className="ml-4">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 italic">
        {children}
      </blockquote>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields
      return (
        <div className="my-8">
          <Image
            src={`https:${file.url}`}
            alt={title || 'Blog image'}
            width={file.details.image.width}
            height={file.details.image.height}
            className="rounded-lg w-full"
          />
        </div>
      )
    },
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {children}
      </a>
    ),
  },
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="py-8 md:py-16">
      <div className="container">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug}`}
                  className="inline-block px-3 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishDate}>
                {formatDate(post.publishDate)}
              </time>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>
            
            <ShareButton
              title={post.title}
              url={`https://4maticcarrental.com/blog/${post.slug}`}
            />
          </div>
        </header>
        
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="max-w-6xl mx-auto mb-12">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1536px) 100vw, 1536px"
              />
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {documentToReactComponents(post.content, richTextOptions)}
          </div>
          
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="w-5 h-5 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* CTA Section */}
          <div className="mt-16 p-8 bg-muted rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience Luxury?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Choose from our premium collection of luxury vehicles and make your Dubai journey unforgettable.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asLink href="/vehicles" size="lg">
                Browse Vehicles
              </Button>
              <Button asLink href="/contact-us" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}