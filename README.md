# sample-nextjs

A clean, minimal **Next.js 15+** starter template (App Router + TypeScript) to help you start building faster.

Bootstrapped with `create-next-app`, but slightly tuned for quick iteration.

## Features

- Next.js App Router
- TypeScript
- Tailwind CSS (via `components.json` - ready for shadcn/ui)
- ESLint (flat config)
- Optimized fonts with `next/font` (Geist)
- PostCSS + modern config
- Ready for shadcn/ui components

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/a144z/sample-nextjs.git my-project
cd my-project
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Start editing by modifying `src/app/page.tsx`. The page auto-updates as you save.

## Project Structure

```bash
├── public/             # Static assets
├── src/
│   └── app/            # App Router pages, layouts, etc.
│       └── page.tsx
├── components.json     # shadcn/ui configuration
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── package.json
```

## Recommended Next Steps (Build Faster)

Add shadcn/ui (highly recommended):

```bash
npx shadcn@latest init
npx shadcn@latest add button card input
```

Add useful packages quickly:

```bash
npm install lucide-react               # icons
npm install zod                        # validation
npm install @tanstack/react-query      # data fetching
# or use server actions + fetch for simplicity
```

Useful commands:

```bash
npm run build   # Production build
npm run lint    # Run ESLint
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [shadcn/ui](https://ui.shadcn.com) - component library for fast building
- [Geist Font](https://vercel.com/font)

## Deploy on Vercel (Recommended)

The fastest way:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or check the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

Made for speed. Fork it, break it, ship it.
