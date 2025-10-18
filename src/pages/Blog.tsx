import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Ezoic global declarations
declare global {
  interface Window {
    ezstandalone: {
      cmd: Array<() => void>;
      showAds: (...ids: number[]) => void;
    };
  }
}

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #5653fa;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: #4338ca;
    color: white;
  }
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const BlogSubtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.6;
`;

const BlogGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const BlogPost = styled.article`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  }
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const PostExcerpt = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #9ca3af;
`;

const ReadMoreLink = styled(Link)`
  color: #5653fa;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: #4338ca;
  }
`;

const blogPosts = [
  {
    id: 'seo-optimization-ai-image-descriptions',
    title: 'Complete Guide to SEO Optimization with AI-Generated Image Descriptions',
    excerpt: 'Master the art of search engine optimization using AI-powered image descriptions. Learn how to improve rankings, drive organic traffic, and dominate search results.',
    date: 'January 28, 2025',
    readTime: '12 min read'
  },
  {
    id: 'future-of-ai-accessibility-2025',
    title: 'The Future of AI-Powered Accessibility: Trends and Innovations in 2025',
    excerpt: 'Discover the latest developments in AI accessibility technology and how they are transforming digital inclusion for millions of users worldwide.',
    date: 'January 23, 2025',
    readTime: '8 min read'
  },
  {
    id: 'multilingual-ai-descriptions',
    title: 'Breaking Language Barriers: AI Descriptions in Multiple Languages',
    excerpt: 'Explore how multilingual AI image descriptions can help you reach global audiences and make your content accessible worldwide.',
    date: 'January 20, 2025',
    readTime: '6 min read'
  },
  {
    id: 'ai-image-description-tips',
    title: '10 Tips for Writing Better AI-Generated Image Descriptions',
    excerpt: 'Learn how to get the most out of AI image description tools and create compelling, accurate descriptions for your content.',
    date: 'January 15, 2025',
    readTime: '5 min read'
  },
  {
    id: 'accessibility-in-digital-content',
    title: 'Making Digital Content Accessible: The Power of Image Descriptions',
    excerpt: 'Discover how proper image descriptions can make your digital content more accessible to users with visual impairments.',
    date: 'January 10, 2025',
    readTime: '4 min read'
  },
  {
    id: 'ecommerce-product-descriptions',
    title: 'Boost Your E-commerce Sales with AI-Generated Product Descriptions',
    excerpt: 'How AI-powered image descriptions can help increase conversion rates and improve the shopping experience for your customers.',
    date: 'January 5, 2025',
    readTime: '6 min read'
  },
  {
    id: 'social-media-content-strategy',
    title: 'Social Media Content Strategy: Using AI Descriptions for Better Engagement',
    excerpt: 'Strategies for using AI-generated descriptions to improve your social media content and increase engagement.',
    date: 'December 30, 2024',
    readTime: '7 min read'
  }
];

const Blog: React.FC = () => {
  // Initialize Ezoic ads on component mount
  React.useEffect(() => {
    const initializeAds = () => {
      if (window.ezstandalone && window.ezstandalone.cmd) {
        window.ezstandalone.cmd.push(function () {
          window.ezstandalone.showAds(109, 112);
        });
      } else {
        setTimeout(initializeAds, 100);
      }
    };
    
    initializeAds();
  }, []);

  return (
    <BlogContainer>
      <HomeButton to="/">
        ← Back to Home
      </HomeButton>
      <BlogHeader>
        <BlogTitle>Blog</BlogTitle>
        <BlogSubtitle>
          Insights, tips, and best practices for creating compelling image descriptions 
          and making your content more accessible and engaging.
        </BlogSubtitle>
      </BlogHeader>
      
      {/* Ezoic Ad Placement - under_first_paragraph (ID: 109) */}
      <div id="ezoic-pub-ad-placeholder-109"></div>
      
      <BlogGrid>
        {blogPosts.map((post) => (
          <BlogPost key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostExcerpt>{post.excerpt}</PostExcerpt>
            <PostMeta>
              <span>{post.date} • {post.readTime}</span>
              <ReadMoreLink to={`/blog/${post.id}`}>
                Read More →
              </ReadMoreLink>
            </PostMeta>
          </BlogPost>
        ))}
      </BlogGrid>
      
      {/* Ezoic Ad Placement - long_content (ID: 112) */}
      <div id="ezoic-pub-ad-placeholder-112"></div>
    </BlogContainer>
  );
};

export default Blog; 