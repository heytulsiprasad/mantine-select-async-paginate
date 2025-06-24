# Deployment Setup Instructions

This project is configured for automatic deployment to Vercel. The Storybook is currently deployed at:
https://mantine-select-async-paginate-tulsi-prasads-projects.vercel.app/

## GitHub Secrets Required

To enable automatic deployments via GitHub Actions, you need to add the following secrets to your GitHub repository:

1. **Go to your repository on GitHub**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Add the following secrets:**

### VERCEL_TOKEN
- Go to https://vercel.com/account/tokens
- Click "Create Token"
- Give it a name (e.g., "GitHub Actions")
- Copy the token and add it as a secret

### VERCEL_ORG_ID
```
team_UF4kXugIfOo52wyiHsd3bElI
```

### VERCEL_PROJECT_ID
```
prj_MNlGEMAu2Aws6CSbOmN0VgLYL5U5
```

## Manual Deployment

You can also deploy manually using the Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

## Current Deployment Configuration

- **Build Command**: `npm run build-storybook`
- **Output Directory**: `storybook-static`
- **Framework**: Vite
- **Install Command**: `npm install`

The deployment is configured in `vercel.json` and will automatically detect these settings.