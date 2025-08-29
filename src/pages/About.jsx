import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="h-16"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About Blog Starter</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">A fast, beautiful, and secure platform to publish and explore content.</p>
        </header>

        <div className="mb-8 overflow-hidden rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60">
          <img
            src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&h=500&fit=crop&auto=format&q=70"
            alt="Workspace"
            className="w-full h-64 md:h-72 object-cover"
            loading="lazy"
          />
        </div>

        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What is Blog Starter?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Blog Starter is a lightweight blogging platform template. Create posts in Markdown, organize with tags, search instantly, and delight readers with a responsive, accessible UI and dark mode. It’s optimized for speed, security, and easy customization.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200/60 dark:border-gray-700/60">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Platform Features</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Markdown posts with safe HTML rendering</li>
                <li>Client-side search and tag filtering</li>
                <li>Dark mode with local preference</li>
                <li>Fast Vite dev/build pipeline</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200/60 dark:border-gray-700/60">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">For Creators</h3>
              <p className="text-gray-700 dark:text-gray-300">Write in Markdown, add cover images, manage tags, and share your stories. The platform is simple to extend—add pages, data sources, or styles to match your brand.</p>
              <Link to="/" className="inline-flex mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition">Start Reading</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About


