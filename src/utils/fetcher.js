// Utility function to fetch posts data
export const fetchPosts = async () => {
  try {
    const response = await fetch('/data/posts.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const posts = await response.json()
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

// Utility function to find a post by slug
export const findPostBySlug = (posts, slug) => {
  return posts.find(post => post.slug === slug)
}

// Utility function to filter posts by search query
export const filterPostsBySearch = (posts, searchQuery) => {
  if (!searchQuery.trim()) return posts
  
  const query = searchQuery.toLowerCase()
  return posts.filter(post => 
    post.title.toLowerCase().includes(query) ||
    post.excerpt.toLowerCase().includes(query) ||
    post.tags.some(tag => tag.toLowerCase().includes(query))
  )
}

// Utility function to filter posts by tag
export const filterPostsByTag = (posts, tag) => {
  if (!tag) return posts
  
  return posts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  )
}

// Utility function to get all unique tags from posts
export const getAllTags = (posts) => {
  const tags = new Set()
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}
