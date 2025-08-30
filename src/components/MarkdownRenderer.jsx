import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

function MarkdownRenderer({ content }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          img: ({node, ...props}) => (
            <img 
              {...props} 
              loading="lazy" 
              className={`rounded-xl shadow ${props.className || ''}`}
              onError={(e) => { 
                e.target.style.display = 'none';
                console.warn('Failed to load image:', e.target.src);
              }} 
            />
          ),
          // Custom styling for code blocks
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            )
          },
          // Custom styling for links
          a({ children, href, ...props }) {
            return (
              <a
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            )
          },
          // Custom styling for headings
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>,
          // Custom styling for lists
          ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
          // Custom styling for paragraphs
          p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
