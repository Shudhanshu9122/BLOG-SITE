function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="h-16"></div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contact</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">Feel free to reach out.</p>
        </header>

        <div className="mb-8 overflow-hidden rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60">
          <img
            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1200&h=500&fit=crop&auto=format&q=70"
            alt="Contact"
            className="w-full h-56 md:h-64 object-cover"
            loading="lazy"
          />
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-8">
          <div className="space-y-6">
            <div>
              <div className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Name</div>
              <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">Shudhanshu Kumar</div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Email</div>
              <a href="mailto:shudhanshukumar112005@gmail.com" className="mt-1 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                shudhanshukumar112005@gmail.com
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
            I typically respond within 24–48 hours. Thanks!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact


