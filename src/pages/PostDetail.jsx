import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { FALLBACK_COVER_IMAGE } from '../utils/constants'
import { fetchPosts, findPostBySlug } from '../utils/fetcher'

function PostDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true)
        const posts = await fetchPosts()
        const foundPost = findPostBySlug(posts, slug)

        if (!foundPost) {
          setError('Post not found')
          return
        }

        setPost(foundPost)
      } catch (err) {
        setError('Failed to load post')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const readingTime = post ? Math.ceil(post.content.split(' ').length / 200) : 0

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading amazing content...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.88-6.082-2.329M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Post not found'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Explore Articles
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <div className="h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${readingProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Navigation Spacer (for fixed navbar) */}
      <div className="h-20"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">

        {/* Back button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to all posts
          </Link>
        </div>

        {/* Article */}
        <article className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">

          {/* Article header */}
          <header className="relative">
            {/* Hero Image */}
            <div className="relative h-80 md:h-96 overflow-hidden">
              <img
                src={post.coverImage || FALLBACK_COVER_IMAGE}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => { 
                  e.target.src = FALLBACK_COVER_IMAGE;
                  if (e.target.src === FALLBACK_COVER_IMAGE) {
                    e.target.src = '/logo.png';
                    e.target.className = 'w-full h-full object-contain bg-gray-100 dark:bg-gray-800';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Reading time badge */}
              <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readingTime} min read
                </span>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center text-white/90 text-sm gap-3">
                  <span>{formatDate(post.date)}</span>
                  <span className="mx-2">•</span>
                  <span>By {post.author}</span>
                </div>
              </div>
            </div>

            {/* Content header */}
            <div className="p-8 md:p-12">
              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/?tag=${encodeURIComponent(tag)}`}
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full hover:shadow-md transition-all duration-200 hover:scale-105 border border-blue-200 dark:border-blue-800"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Excerpt */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 mb-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{post.excerpt}"
                </p>
              </div>
            </div>
          </header>

          {/* Article content */}
          <div className="px-8 md:px-12 pb-12">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400">
              <MarkdownRenderer content={post.content} />
            </div>
          </div>
        </article>

        {/* Article footer */}
        <footer className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Published on {formatDate(post.date)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">By {post.author}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to="/"
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Explore More
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Back to Top
              </button>
            </div>
          </div>
        </footer>

        {/* Related/Social Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
          <p className="mb-6 opacity-90">Share it with your friends and colleagues!</p>
          <div className="flex justify-center gap-4">
            <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200" aria-label="Share on Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200" aria-label="Share on LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
            <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200" aria-label="Copy link">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
