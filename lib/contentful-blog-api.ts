import { contentfulClient } from './contentful'
import { Entry } from 'contentful'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import {
  ContentfulBlogPost,
  ContentfulBlogCategory,
  ContentfulBlogTag,
  BlogPost,
  BlogCategory,
  BlogTag,
  BlogFilters,
  PaginatedBlogPosts
} from '@/types/blog'

// Helper to calculate reading time (average 200 words per minute)
function calculateReadingTime(content: any): number {
  const text = documentToPlainTextString(content)
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / 200)
}

// Transform Contentful category to frontend format
function transformCategory(category: Entry<ContentfulBlogCategory>): BlogCategory {
  return {
    id: category.sys.id,
    name: category.fields.name,
    slug: category.fields.slug,
    description: category.fields.description
  }
}

// Transform Contentful tag to frontend format
function transformTag(tag: Entry<ContentfulBlogTag>): BlogTag {
  return {
    id: tag.sys.id,
    name: tag.fields.name,
    slug: tag.fields.slug
  }
}

// Transform Contentful blog post to frontend format
function transformBlogPost(post: Entry<ContentfulBlogPost>): BlogPost {
  const fields = post.fields
  
  return {
    id: post.sys.id,
    title: fields.title,
    slug: fields.slug,
    excerpt: fields.excerpt,
    content: fields.content,
    featuredImage: fields.featuredImage?.fields?.file?.url 
      ? `https:${fields.featuredImage.fields.file.url}` 
      : '',
    categories: fields.categories?.map(cat => transformCategory(cat)) || [],
    tags: fields.tags?.map(tag => transformTag(tag)) || [],
    publishDate: fields.publishDate,
    readingTime: calculateReadingTime(fields.content),
    seoTitle: fields.seoTitle,
    seoDescription: fields.seoDescription,
    seoKeywords: fields.seoKeywords,
    ogImage: fields.ogImage?.fields?.file?.url 
      ? `https:${fields.ogImage.fields.file.url}` 
      : fields.featuredImage?.fields?.file?.url 
        ? `https:${fields.featuredImage.fields.file.url}` 
        : ''
  }
}

// Get all blog posts with filtering and pagination
export async function getBlogPosts(filters: BlogFilters = {}): Promise<PaginatedBlogPosts> {
  try {
    const { page = 1, pageSize = 12, category, tag, search } = filters
    
    // Build query
    const query: any = {
      content_type: 'blogPost',
      include: 2,
      order: '-fields.publishDate',
      'fields.publishDate[lte]': new Date().toISOString()
    }
    
    // Add category filter
    if (category) {
      query['fields.categories.fields.slug[match]'] = category
      query['fields.categories.sys.contentType.sys.id'] = 'blogCategory'
    }
    
    // Add tag filter
    if (tag) {
      query['fields.tags.fields.slug[match]'] = tag
      query['fields.tags.sys.contentType.sys.id'] = 'blogTag'
    }
    
    // Add search filter
    if (search) {
      query['query'] = search
    }
    
    // Add pagination
    query.skip = (page - 1) * pageSize
    query.limit = pageSize
    
    const response = await contentfulClient.getEntries<ContentfulBlogPost>(query)
    
    const posts = response.items.map(transformBlogPost)
    const totalPosts = response.total
    const totalPages = Math.ceil(totalPosts / pageSize)
    
    return {
      posts,
      totalPosts,
      currentPage: page,
      totalPages
    }
  } catch (error) {
    // If blog content types don't exist yet, return empty result instead of crashing
    if (error instanceof Error && error.message.includes('unknownContentType')) {
      console.warn('Blog content types not set up in Contentful yet. Run setup-blog-contentful.ts script.')
      return {
        posts: [],
        totalPosts: 0,
        currentPage: 1,
        totalPages: 0
      }
    }
    console.error('Error fetching blog posts:', error)
    return {
      posts: [],
      totalPosts: 0,
      currentPage: 1,
      totalPages: 0
    }
  }
}

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await contentfulClient.getEntries<ContentfulBlogPost>({
      content_type: 'blogPost',
      'fields.slug': slug,
      include: 2,
      limit: 1
    })
    
    if (response.items.length === 0) {
      return null
    }
    
    return transformBlogPost(response.items[0])
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

// Get related blog posts
export async function getRelatedPosts(
  postId: string,
  categories: BlogCategory[],
  tags: BlogTag[],
  limit: number = 3
): Promise<BlogPost[]> {
  try {
    // Try to find posts with same categories first
    const categoryIds = categories.map(cat => cat.id)
    
    const query: any = {
      content_type: 'blogPost',
      include: 2,
      limit: limit + 1, // Get one extra to exclude current post
      'sys.id[ne]': postId,
      'fields.publishDate[lte]': new Date().toISOString()
    }
    
    // Add category filter if available
    if (categoryIds.length > 0) {
      query['fields.categories.sys.id[in]'] = categoryIds.join(',')
    }
    
    const response = await contentfulClient.getEntries<ContentfulBlogPost>(query)
    let posts = response.items.map(transformBlogPost)
    
    // If not enough posts found, try with tags
    if (posts.length < limit && tags.length > 0) {
      const tagIds = tags.map(tag => tag.id)
      const tagQuery: any = {
        content_type: 'blogPost',
        include: 2,
        limit: limit - posts.length + 1,
        'sys.id[nin]': [postId, ...posts.map(p => p.id)].join(','),
        'fields.tags.sys.id[in]': tagIds.join(','),
        'fields.publishDate[lte]': new Date().toISOString()
      }
      
      const tagResponse = await contentfulClient.getEntries<ContentfulBlogPost>(tagQuery)
      const tagPosts = tagResponse.items.map(transformBlogPost)
      posts = [...posts, ...tagPosts]
    }
    
    // Return only requested number of posts
    return posts.slice(0, limit)
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

// Get all categories
export async function getAllCategories(): Promise<BlogCategory[]> {
  try {
    const response = await contentfulClient.getEntries<ContentfulBlogCategory>({
      content_type: 'blogCategory',
      order: 'fields.name'
    })
    
    return response.items.map(transformCategory)
  } catch (error) {
    // If blog content types don't exist yet, return empty array instead of crashing
    if (error instanceof Error && error.message.includes('unknownContentType')) {
      console.warn('Blog content types not set up in Contentful yet. Run setup-blog-contentful.ts script.')
      return []
    }
    console.error('Error fetching categories:', error)
    return []
  }
}

// Get all tags
export async function getAllTags(): Promise<BlogTag[]> {
  try {
    const response = await contentfulClient.getEntries<ContentfulBlogTag>({
      content_type: 'blogTag',
      order: 'fields.name'
    })
    
    return response.items.map(transformTag)
  } catch (error) {
    // If blog content types don't exist yet, return empty array instead of crashing
    if (error instanceof Error && error.message.includes('unknownContentType')) {
      console.warn('Blog content types not set up in Contentful yet. Run setup-blog-contentful.ts script.')
      return []
    }
    console.error('Error fetching tags:', error)
    return []
  }
}

// Get featured/recent posts for homepage
export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  try {
    const response = await contentfulClient.getEntries<ContentfulBlogPost>({
      content_type: 'blogPost',
      include: 2,
      limit,
      order: '-fields.publishDate',
      'fields.publishDate[lte]': new Date().toISOString()
    })
    
    return response.items.map(transformBlogPost)
  } catch (error) {
    // If blog content types don't exist yet, return empty array instead of crashing
    if (error instanceof Error && error.message.includes('unknownContentType')) {
      console.warn('Blog content types not set up in Contentful yet. Run setup-blog-contentful.ts script.')
      return []
    }
    console.error('Error fetching featured posts:', error)
    return []
  }
}