# Deploy Checklist

## Vercel
- `npm install`
- `npm run build`
- push/import project to Vercel
- set `GEMINI_API_KEY`
- confirm routes `/jobs`, `/jobs/1`, `/process`, `/about` open directly

## cPanel / LiteSpeed / Apache
- `npm install`
- `npm run build`
- upload all files from `dist/`
- confirm `.htaccess` exists in deployed root
- open `/jobs`, `/jobs/1`, `/process`, `/about` directly

## QA after deploy
- homepage loads without console crash
- chat button opens
- form submits only when auth is ready
- images load
- footer links to `javico.vn` and `javico.vn/lao-dong-nga`
- refresh on nested route does not return 404
