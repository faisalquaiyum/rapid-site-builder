# Rapid Site Builder

Full-stack web app for generating, managing, and sharing website projects.

## Features

- AI-powered site generation from prompts
- Project management (create, save, preview, publish)
- Public community gallery
- Auth with Better Auth
- Stripe billing hooks

## Project Structure

- client/ - Vite + React frontend
- server/ - Node.js + Express backend

## Tech Stack

### Client

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Better Auth UI
- Radix UI
- lucide-react
- Sonner (toasts)
- next-themes

### Server

- Node.js
- Express
- TypeScript
- Prisma
- Better Auth
- Stripe
- OpenAI SDK
- dotenv
- cors

### Database

- PostgreSQL (via Prisma)

### Deployment

- Vercel (client)
- Render (server)

## Requirements

- Node.js (LTS recommended)
- npm
- PostgreSQL database (local or hosted)
- Stripe account (optional)
- AI provider API key

## Local Development

### 1) Client

```bash
cd client
npm install
npm run dev
```

### 2) Server

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### 3) Open the app

- Frontend: http://localhost:5173
- API: http://localhost:3000

## Environment Variables

### client/.env

- VITE_BASEURL - API base URL (example: http://localhost:3000)

### server/.env

- TRUSTED_ORIGINS - Comma-separated list of allowed origins (example: http://localhost:5173)
- DATABASE_URL - PostgreSQL connection string
- BETTER_AUTH_SECRET - Secret key for Better Auth
- BETTER_AUTH_URL - Public base URL of the API (example: http://localhost:3000)
- NODE_ENV - development or production
- AI_API_KEY - API key for AI provider
- STRIPE_SECRET_KEY - Stripe secret key
- STRIPE_WEBHOOK_SECRET - Stripe webhook signing secret

Do not commit real secrets to version control. Use local .env files or platform env vars.

## Scripts

### client

- npm run dev - Start Vite dev server
- npm run build - Type-check and build production bundle
- npm run preview - Preview production build
- npm run lint - Run ESLint

### server

- npm run dev - Start dev server with hot reload
- npm run build - TypeScript build
- npm run start - Run production build

## Deployment

### Vercel (client)

- Root Directory: client
- Build Command: npm run build
- Output Directory: dist
- Env: VITE_BASEURL=https://your-api.onrender.com

### Render (server)

- Root Directory: server
- Build Command:
  ```bash
  npm ci --include=dev && npx prisma generate && npm run build && npx prisma migrate deploy
  ```
- Start Command: npm run start
- Env: TRUSTED_ORIGINS should include your Vercel origin

## Troubleshooting

- CORS errors: ensure TRUSTED_ORIGINS includes the exact frontend origin (no trailing slash).
- Prisma errors: verify DATABASE_URL and that migrations ran.

Md Faisal Quaiyum
