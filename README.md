# Blog Starter

A modern, responsive blog application built with React, Vite, and Tailwind CSS.

## Features

- 🏠 Homepage with responsive post grid
- 📄 Individual post pages with Markdown support
- 🔍 Search and tag filtering
- 🌙 Dark mode toggle
- 📱 Mobile-first responsive design
- ⚡ Fast development with Vite

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack

- React 18 + Vite
- React Router v6
- Tailwind CSS
- react-markdown with sanitization
- Dark mode with localStorage persistence

## Project Structure

```
/src
├── components/     # Reusable UI components
├── pages/         # Page components
├── utils/         # Utility functions
└── data/          # Sample posts data
```

## How to Extend

1. **Replace JSON with API**: Update `src/utils/fetcher.js` to use real API endpoints
2. **Add Pagination**: Implement pagination for large post collections
3. **Add Comments**: Integrate with Disqus or similar comment systems
4. **Add Authentication**: Implement user login/registration
5. **Connect to CMS**: Use Contentful, Strapi, or other headless CMS

## Deployment

Build and deploy to any static hosting service:

```bash
npm run build
```

The built files will be in the `dist` folder.
