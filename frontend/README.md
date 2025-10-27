# Anwar-ul-Uloom College - Frontend

Frontend application built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide icons
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **HTTP Client**: Axios

## Project Structure

```
src/
├── app/              # Next.js app directory (pages)
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── globals.css  # Global styles
├── components/       # Reusable React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ...
└── lib/             # Utilities and helpers
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Features

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized
- ✅ Accessibility features
- ✅ Smooth animations
- ✅ Dark mode ready
- ✅ Form validation
- ✅ Image optimization

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on Vercel
3. Set environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Node.js (Railway, Render, DigitalOcean, etc.).

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
