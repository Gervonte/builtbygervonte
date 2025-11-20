#!/bin/bash

# Vercel Setup Script for GitHub Actions
# This script helps you get the required Vercel credentials for GitHub Actions

echo "🚀 Vercel Setup for GitHub Actions"
echo "=================================="
echo ""

echo "To set up Vercel deployment with GitHub Actions, you need:"
echo ""

echo "1. VERCEL_TOKEN"
echo "   - Go to: https://vercel.com/account/tokens"
echo "   - Click 'Create Token'"
echo "   - Name it 'GitHub Actions'"
echo "   - Copy the token"
echo ""

echo "2. VERCEL_ORG_ID"
echo "   - Go to: https://vercel.com/account"
echo "   - Copy your Team ID from the URL or API"
echo "   - Or run: vercel teams list"
echo ""

echo "3. VERCEL_PROJECT_ID"
echo "   - Go to your project in Vercel dashboard"
echo "   - Go to Settings > General"
echo "   - Copy the Project ID"
echo ""

echo "4. Add these as GitHub Secrets:"
echo "   - Go to your GitHub repo"
echo "   - Settings > Secrets and variables > Actions"
echo "   - Add each secret with the exact names above"
echo ""

echo "5. Test the setup:"
echo "   - Push to the 'preview' branch"
echo "   - Check the Actions tab for deployment"
echo ""

echo "Need help? Check the .github/GITHUB_ACTIONS.md file for detailed instructions."
