import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Card from '../components/Card'
import { fetchPosts, filterPostsBySearch, filterPostsByTag, getAllTags } from '../utils/fetcher'

function Home() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedTag, setSelectedTag] = useState('')
  const [viewMode, setViewMode] = useState('grid') // grid or list

  const searchQuery = searchParams.get('q') || ''

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        const fetchedPosts = await fetchPosts()
        setPosts(fetchedPosts)
        setFilteredPosts(fetchedPosts)
      } catch (err) {
        setError('Failed to load posts')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  useEffect(() => {
    let filtered = posts

    // Apply search filter
    if (searchQuery) {
      filtered = filterPostsBySearch(filtered, searchQuery)
    }

    // Apply tag filter
    if (selectedTag) {
      filtered = filterPostsByTag(filtered, selectedTag)
    }

    setFilteredPosts(filtered)
  }, [posts, searchQuery, selectedTag])

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag('')
    } else {
      setSelectedTag(tag)
    }
  }

  const clearFilters = () => {
    setSelectedTag('')
    setSearchParams({})
  }

  const allTags = getAllTags(posts)
  const displayedTags = useMemo(() => allTags.slice(0, 8), [allTags])

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops!</h2>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden w-full">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">

        {/* Hero Section */}
        <div className="text-center mb-20 animate-slide-up">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-8 animate-float">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-sm">
                🏏🎬 Premium Content Platform
              </span>
            </div>
          </div>

          {/* Main Title with Enhanced Animation */}
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent animate-fade-in leading-tight">
              Blog
              <br />
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-bounce-in" style={{ animationDelay: '0.5s' }}>
                  Starter
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-fade-in" style={{ animationDelay: '1s' }}></div>
              </span>
            </h1>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-8 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '1.5s' }}>📝</div>
            <div className="absolute -bottom-4 -right-8 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '2s' }}>✨</div>
          </div>

          {/* Enhanced Description */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in font-medium" style={{ animationDelay: '0.7s' }}>
            A modern, fast and beautiful starter for your next blog. Write in Markdown, search and filter instantly, switch dark mode, and ship quickly.
          </p>

          {/* Interactive Stats Cards */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-4xl font-black text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200">6</div>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">Articles</div>
              <div className="w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>

            <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-4xl font-black text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-200">15+</div>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">Topics</div>
              <div className="w-full h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>

            <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-4xl font-black text-green-600 dark:text-green-400 animate-pulse-slow group-hover:scale-110 transition-transform duration-200">∞</div>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">Possibilities</div>
              <div className="w-full h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '1.1s' }}>
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-3">
                Explore Articles
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <button className="group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg text-gray-700 dark:text-gray-300 font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                Watch Highlights
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-16 animate-fade-in relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

          <div className="relative z-10">
            {/* Header with Enhanced Design */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Discover Amazing Content
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore our latest articles and guides
                </p>
              </div>

              {/* Enhanced View Mode Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-800 shadow-lg text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  aria-label="Grid view"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className="font-medium">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-800 shadow-lg text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                  aria-label="List view"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="font-medium">List</span>
                </button>
              </div>
            </div>

            {/* Enhanced Tag Filters */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Filter by Topics</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">{displayedTags.length} topics</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {displayedTags.map((tag, index) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`group relative px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      selectedTag === tag
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105'
                        : 'bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-600/50'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">🏷️</span>
                      #{tag}
                    </span>

                    {/* Hover effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      selectedTag === tag ? 'opacity-100' : ''
                    }`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Active Filters */}
            {(searchQuery || selectedTag) && (
              <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50 mb-6 animate-slide-up">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707l-6.414-6.414A1 1 0 013 6.586V4z" />
                    </svg>
                    <span className="font-semibold text-gray-900 dark:text-white">Active Filters:</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {searchQuery && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 dark:bg-blue-800/80 backdrop-blur-sm text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full border border-blue-200/50 dark:border-blue-700/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        "{searchQuery}"
                      </span>
                    )}

                    {selectedTag && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100/80 dark:bg-purple-800/80 backdrop-blur-sm text-purple-800 dark:text-purple-200 text-sm font-medium rounded-full border border-purple-200/50 dark:border-purple-700/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {selectedTag}
                      </span>
                    )}

                    <button
                      onClick={clearFilters}
                      className="group inline-flex items-center gap-2 px-4 py-2 bg-red-100/80 dark:bg-red-900/20 hover:bg-red-200/80 dark:hover:bg-red-900/30 backdrop-blur-sm text-red-600 dark:text-red-400 text-sm font-medium rounded-full border border-red-200/50 dark:border-red-800/50 transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                {filteredPosts.length === posts.length
                  ? `Showing all ${posts.length} articles`
                  : `Showing ${filteredPosts.length} of ${posts.length} articles`}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                {viewMode === 'grid' ? 'Grid view' : 'List view'}
              </div>
            </div>
          </div>

          {/* Posts Grid/List */}
          {filteredPosts.length > 0 ? (
            <div className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }`}>
              {filteredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card post={post} viewMode={viewMode} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Clear Filters & Show All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
