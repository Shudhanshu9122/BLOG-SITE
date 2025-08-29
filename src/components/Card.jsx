import { memo } from 'react'
import { Link } from 'react-router-dom'
import { FALLBACK_COVER_IMAGE } from '../utils/constants'

function Card({ post, viewMode = 'grid' }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const readingTime = Math.ceil(post.content.split(' ').length / 200) // Rough estimate

  if (viewMode === 'list') {
    return (
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
        <div className="flex flex-col sm:flex-row">
          <Link to={`/post/${post.slug}`} className="block sm:w-80 flex-shrink-0">
            <div className="relative overflow-hidden">
              <img
                src={post.coverImage || FALLBACK_COVER_IMAGE}
                alt={post.title}
                className="w-full h-48 sm:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{formatDate(post.date)}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readingTime} min read
                </span>
              </div>
            </div>

            <Link to={`/post/${post.slug}`}>
              <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {post.title}
              </h2>
            </Link>

            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-lg leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full border border-blue-200 dark:border-blue-800"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>

              <Link
                to={`/post/${post.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors group"
              >
                Read more
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
    )
  }

  // Grid view (default)
  return (
    <article className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transform hover:-translate-y-3 hover:rotate-1 w-full">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <Link to={`/post/${post.slug}`} className="block relative z-10">
        <div className="relative overflow-hidden rounded-t-3xl">
          <img
            src={post.coverImage || FALLBACK_COVER_IMAGE}
            alt={post.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />

          {/* Enhanced overlay with multiple gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Enhanced reading time badge */}
          <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-lg border border-white/20 dark:border-gray-700/50 transform group-hover:scale-110 transition-all duration-300">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-blue-600 dark:text-blue-400 font-bold">{readingTime} min</span>
            </span>
          </div>

          {/* Category indicator */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md rounded-2xl px-3 py-1 text-xs font-bold text-white shadow-lg transform group-hover:scale-110 transition-all duration-300">
            📝 Featured
          </div>

          {/* Hover shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
      </Link>

      <div className="relative z-10 p-8">
        {/* Author and date with enhanced styling */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{post.author}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{formatDate(post.date)}</div>
            </div>
          </div>

          {/* Bookmark button */}
          <button className="group p-2 rounded-full bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-all duration-200">
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Enhanced title */}
        <Link to={`/post/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight">
            {post.title}
          </h2>
        </Link>

        {/* Enhanced excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed text-base">
          {post.excerpt}
        </p>

        {/* Enhanced footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full border border-blue-200/50 dark:border-blue-800/50 hover:shadow-md transition-all duration-200 hover:scale-105 backdrop-blur-sm"
              >
                <span className="flex items-center gap-1">
                  <span className="text-xs">
                    🏷️
                  </span>
                  #{tag}
                </span>
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="px-3 py-1.5 bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400 text-sm rounded-full border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm">
                +{post.tags.length - 2} more
              </span>
            )}
          </div>

          {/* Enhanced read button */}
          <Link
            to={`/post/${post.slug}`}
            className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span>Read Article</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default memo(Card)
