# Deployment Guide

This guide covers common deployment issues and solutions for the Vue.js Personal Portfolio application.

## Fixed Issues

### 1. Missing index.html Template
**Problem**: The application wasn't rendering because there was no `index.html` template in the `public` folder.

**Solution**: Created `public/index.html` with proper Vue.js SPA structure including:
- Meta tags for SEO
- Viewport configuration
- App mounting point (`<div id="app"></div>`)
- Script reference to main.ts

### 2. Asset Path Configuration
**Problem**: Absolute asset paths (`/assets/...`) may not work on all deployment platforms.

**Solution**: Updated `vite.config.ts` to use relative paths:
```javascript
export default defineConfig({
  base: './',
  // ... other config
})
```

## Deployment Checklist

### Before Deployment
1. ✅ Ensure `public/index.html` exists
2. ✅ Build configuration uses relative paths (`base: './'`)
3. ✅ Run `npm run build` successfully
4. ✅ Test production build locally with `npm run preview`
5. ✅ Verify all routes work in production build

### Server Configuration

#### For SPA Routing (History Mode)
Your server must be configured to serve `index.html` for all routes that don't match static files.

**Nginx Configuration** (already included in `nginx.conf`):
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Apache Configuration** (create `.htaccess` in dist folder):
```apache
RewriteEngine On
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Common Deployment Platforms

#### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Create `_redirects` file in `public` folder:
   ```
   /*    /index.html   200
   ```

#### Vercel
1. Build command: `npm run build`
2. Output directory: `dist`
3. Create `vercel.json` in root:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

#### GitHub Pages
1. Set `base: '/repository-name/'` in `vite.config.ts` if deploying to `username.github.io/repository-name`
2. Use GitHub Actions for automated deployment

#### Docker Deployment
1. Use the provided `Dockerfile` and `nginx.conf`
2. Build: `docker build -t portfolio .`
3. Run: `docker run -p 80:80 portfolio`

### Troubleshooting

#### White Screen / Blank Page
1. Check browser console for JavaScript errors
2. Verify asset paths are correct
3. Ensure server serves `index.html` for SPA routes
4. Check if `base` path in `vite.config.ts` matches deployment path

#### 404 Errors on Refresh
1. Configure server to fallback to `index.html`
2. Consider using hash mode routing if server configuration isn't possible

#### Assets Not Loading
1. Verify `base` path configuration
2. Check if assets are being served with correct MIME types
3. Ensure gzip compression is working

### Environment Variables
For different deployment environments, you can use:
```javascript
// vite.config.ts
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  // ... other config
})
```

### Performance Optimization
The current build configuration includes:
- Asset bundling and minification
- CSS extraction
- Gzip compression (via nginx)
- Cache headers for static assets

### Security Headers
The nginx configuration includes security headers:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

## Testing Deployment

1. **Local Production Test**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Docker Test**:
   ```bash
   docker build -t portfolio .
   docker run -p 8080:80 portfolio
   ```

3. **Static Server Test**:
   ```bash
   npx serve -s dist
   ```

If the application works in these tests but not in your deployment environment, the issue is likely with your server configuration or deployment platform settings.