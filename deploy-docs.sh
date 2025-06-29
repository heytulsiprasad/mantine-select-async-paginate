#!/bin/bash

echo "Deploying documentation to Vercel..."

# Navigate to docs directory
cd docs

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the documentation
echo "Building documentation..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Documentation deployment complete!"
echo "Visit your documentation at: https://mantine-select-async-paginate-docs.vercel.app/"