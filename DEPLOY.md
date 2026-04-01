# Deploy Guide

## Current status
- `npm install`: pass
- `npm run build`: pass
- `npm run lint`: pass

## Recommended target
- `Vercel` if you want the fastest path to a live preview and production URL
- `Static hosting / cPanel / LiteSpeed / Apache` if you want to upload `dist/` manually

## Before deploy
```bash
npm install
npm run build
```

## Environment variables
If you want the AI chatbox to work, set:
- `GEMINI_API_KEY`

If you only need the landing page without AI chat, the page can still render without using the chatbox.

## Vercel
1. Import this folder into Vercel.
2. Framework preset: `Vite`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:
   - `GEMINI_API_KEY`
6. Deploy.

Files already prepared:
- `vercel.json`: rewrites all SPA routes back to `index.html`

This means URLs like:
- `/`
- `/jobs`
- `/jobs/1`
- `/process`
- `/about`

will all work directly after deploy.

## Netlify
This repo also includes:
- `public/_redirects`

After build, Netlify will copy it into `dist/` automatically and handle SPA history fallback.

## Apache / cPanel / LiteSpeed
This repo also includes:
- `public/.htaccess`

After build, copy the contents of `dist/` to your hosting document root or subfolder.

Important:
- the generated `.htaccess` enables SPA fallback
- unknown routes rewrite to `index.html`
- existing files still load normally

## Manual static hosting flow
1. Run `npm run build`
2. Open the generated `dist/` folder
3. Upload all files inside `dist/` to your target hosting
4. If deploying to a subdomain or subfolder, ensure SPA fallback is supported
5. Set `GEMINI_API_KEY` only if the chat feature is needed

## Notes
- Main bundle has been reduced by route splitting and vendor chunk separation.
- `@google/genai` now loads on demand when the chatbox is opened.
- `firebase` remains the heaviest vendor chunk, but it is now separated from the page shell.
