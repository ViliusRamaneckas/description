#!/bin/bash

echo "🚀 Preparing to commit and push changes..."

# Add all changes
echo "📁 Adding all files..."
git add .

# Commit with descriptive message
echo "💾 Committing changes..."
git commit -m "✨ Add comprehensive blog section with SEO-optimized content

- Add blog main page with 4 detailed articles
- Add individual blog post pages with full content
- Add blog link to footer navigation
- Update sitemap.xml with new blog URLs
- Update robots.txt with correct domain
- Focus on target keywords: AI image describer, image description generator, free AI image generation
- Enhanced content length and SEO optimization
- Improve accessibility and user experience"

# Push to remote repository
echo "🚀 Pushing to remote repository..."
git push

echo "✅ Successfully pushed all changes!"
echo ""
echo "📋 Next steps for Search Console:"
echo "1. Go to Google Search Console"
echo "2. Select your property (freeimagedescriber.com)"
echo "3. Go to 'Sitemaps' in the left menu"
echo "4. Submit the updated sitemap: https://www.freeimagedescriber.com/sitemap.xml"
echo "5. Monitor indexing progress in the 'Coverage' report"
echo ""
echo "🎉 Your blog is now live and optimized for search engines!" 