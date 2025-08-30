import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import SearchBar from './SearchBar'
import DarkToggle from './DarkToggle'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const currentSearch = searchParams.get('q') || ''

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/?q=${encodeURIComponent(query)}`)
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'About', path: '/about', icon: 'ℹ️' },
    { name: 'Contact', path: '/contact', icon: '📧' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50'
        : 'bg-white dark:bg-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Enhanced Logo */}
          <Link
            to="/"
            className="flex items-center space-x-4 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              {/* Logo with multiple layers */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:rotate-12">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" loading="eager" onError={(e) => { e.target.style.display = 'none' }} />
              </div>

              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-1 rounded-xl border border-purple-400/20 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>

              {/* Status indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="hidden sm:block">
              <div className="relative">
                <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-300">
                  Blog Starter
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                Premium Content Platform
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar
              initialValue={currentSearch}
              onSearch={handleSearch}
              placeholder="Search articles..."
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <DarkToggle />
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <DarkToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group relative p-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              aria-label="Toggle mobile menu"
            >
              {/* Animated hamburger icon */}
              <div className="relative w-6 h-6">
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 rounded-full ${
                  isMobileMenuOpen ? 'rotate-45 top-3 shadow-lg' : 'top-1'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 rounded-full ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'top-3 shadow-sm'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 rounded-full ${
                  isMobileMenuOpen ? '-rotate-45 top-3 shadow-lg' : 'top-5'
                }`}></span>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </div>

              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-2xl bg-blue-400/10 scale-0 group-active:scale-100 transition-transform duration-150"></div>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar
            initialValue={currentSearch}
            onSearch={handleSearch}
            placeholder="Search articles..."
          />
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-4'
        }`}>
          <div className="py-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-b from-white/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-lg">
            <div className="px-4 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-white/20'
                      : 'bg-gray-100/50 dark:bg-gray-700/50 group-hover:bg-blue-100/50 dark:group-hover:bg-blue-900/20'
                  }`}>
                    <span className={`text-xl transition-transform duration-200 group-hover:scale-110 ${
                      location.pathname === item.path ? 'text-white' : ''
                    }`}>
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold">{item.name}</span>
                    {item.path === '/' && (
                      <div className="text-xs opacity-75 mt-0.5">Home & Articles</div>
                    )}
                    {item.path === '/about' && (
                      <div className="text-xs opacity-75 mt-0.5">About Our Platform</div>
                    )}
                    {item.path === '/contact' && (
                      <div className="text-xs opacity-75 mt-0.5">Get In Touch</div>
                    )}
                  </div>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${
                    location.pathname === item.path ? 'text-white' : 'text-gray-400 group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}

              {/* Social Links in Mobile Menu */}
              <div className="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex justify-center space-x-6">
                  <a href="#" className="flex items-center justify-center w-10 h-10 bg-gray-100/50 dark:bg-gray-700/50 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-center w-10 h-10 bg-gray-100/50 dark:bg-gray-700/50 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-center w-10 h-10 bg-gray-100/50 dark:bg-gray-700/50 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm4.562 8.161c-1.102 0-2.006.352-2.528 1.563-.522 1.211-.156 3.161.852 4.568.606.706 1.706.951 2.58.951 1.102 0 2.006-.352 2.528-1.563.522-1.211.156-3.161-.852-4.568-.606-.706-1.706-.951-2.58-.951zm-6.562 0c-1.102 0-2.006.352-2.528 1.563-.522 1.211-.156 3.161.852 4.568.606.706 1.706.951 2.58.951 1.102 0 2.006-.352 2.528-1.563.522-1.211.156-3.161-.852-4.568-.606-.706-1.706-.951-2.58-.951z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
