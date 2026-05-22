#!/bin/bash
# Push Major Finance to GitHub
# Run this script to complete the deployment

echo "🚀 Pushing Major Finance to GitHub..."
echo ""
echo "Repository: https://github.com/davidfeehan/major-finance"
echo "Files ready: 248"
echo ""

# Check if gh CLI is available
if command -v gh &> /dev/null; then
    echo "✓ GitHub CLI detected"
    echo ""
    echo "Authenticating with GitHub..."
    gh auth status || gh auth login

    echo ""
    echo "Pushing to GitHub..."
    git push -u origin main

    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ SUCCESS! Your code is now on GitHub"
        echo ""
        echo "View at: https://github.com/davidfeehan/major-finance"
        echo ""
    else
        echo ""
        echo "❌ Push failed. Please check your authentication."
        exit 1
    fi
else
    echo "⚠️  GitHub CLI not found"
    echo ""
    echo "Please install it first:"
    echo "  macOS: brew install gh"
    echo "  Linux: sudo apt install gh"
    echo ""
    echo "Or push manually:"
    echo "  git push -u origin main"
    echo ""
    echo "You'll need a Personal Access Token from:"
    echo "  https://github.com/settings/tokens"
    exit 1
fi
