import { Asset, Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

// Contentful Blog Category
export interface ContentfulBlogCategory {
  name: string
  slug: string
  description?: string
}

// Contentful Blog Tag
export interface ContentfulBlogTag {
  name: string
  slug: string
}

// Contentful Blog Post
export interface ContentfulBlogPost {
  title: string
  slug: string
  excerpt: string
  content: Document // Rich text content
  featuredImage: Asset
  categories?: Entry<ContentfulBlogCategory>[]
  tags?: Entry<ContentfulBlogTag>[]
  publishDate: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  ogImage?: Asset
}

// Transformed Blog Types for Frontend
export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: Document
  featuredImage: string
  categories: BlogCategory[]
  tags: BlogTag[]
  publishDate: string
  readingTime?: number
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  ogImage?: string
}

export interface BlogFilters {
  category?: string
  tag?: string
  search?: string
  page?: number
  pageSize?: number
}

export interface PaginatedBlogPosts {
  posts: BlogPost[]
  totalPosts: number
  currentPage: number
  totalPages: number
}