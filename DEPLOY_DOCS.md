# Deploying Documentation to Vercel

## Quick Deploy

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy the documentation**:
   ```bash
   cd docs
   vercel
   ```

3. **Follow the prompts**:
   - Login to Vercel (if not already)
   - Select your scope
   - Link to existing project or create new
   - Use default settings

## Production Deploy

For production deployment with custom domain:

```bash
cd docs
vercel --prod
```

## Automatic Deployment

The documentation will automatically deploy when you push to the main branch if you:

1. Go to [Vercel Dashboard](https://vercel.com)
2. Import the GitHub repository
3. Set the root directory to `docs`
4. Deploy

## Environment Setup

No environment variables are required for the documentation site.

## Custom Domain

To add a custom domain:

1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Update the DNS records as instructed

## Local Development

To run the documentation locally:

```bash
cd docs
npm install
npm run dev
```

Visit http://localhost:3000