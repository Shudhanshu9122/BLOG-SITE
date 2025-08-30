function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-lg overflow-hidden shadow">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none' }} />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Blog Starter</span>
          </div>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
