// app/(public)/blog/_components/BlogCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/formatters";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const detailUrl = `/blog/${post.slug}`;

  return (
    <article className="group relative bg-white dark:bg-secondary-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      {/* Accent top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>

      {/* Featured Image - Clickable */}
      <Link
        href={detailUrl}
        className="block relative h-48 overflow-hidden bg-gradient-to-b from-secondary-100 to-white dark:from-secondary-700 dark:to-secondary-800"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary-500/10 transition-opacity duration-300"></div>
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            height={200}
            width={400}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary-200 to-secondary-300 dark:from-secondary-600 dark:to-secondary-700 flex items-center justify-center">
            <div className="text-secondary-500 dark:text-secondary-400 text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-secondary-300 dark:bg-secondary-600 flex items-center justify-center">
                <span className="text-2xl">📰</span>
              </div>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Category badge */}
        {post.categories.length > 0 && (
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-primary-600 rounded-md shadow-sm">
              {post.categories[0].name}
            </span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Article Title */}
        <Link href={detailUrl}>
          <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Meta information */}
        <div className="flex items-center justify-between text-xs text-secondary-500 dark:text-secondary-500 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.publishDate}>
                {formatDate(post.publishDate)}
              </time>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="inline-block px-2 py-1 text-xs text-secondary-600 dark:text-secondary-400 bg-secondary-100 dark:bg-secondary-700 rounded-md"
              >
                {tag.name}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs text-secondary-500 dark:text-secondary-500">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Read More Link */}
        <Link
          href={detailUrl}
          className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group/link"
        >
          Read Article
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}