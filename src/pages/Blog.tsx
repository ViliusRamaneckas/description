import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  font-family: 'Syne', sans-serif;
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
  font-family: 'Syne', sans-serif;
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
  return (
    <BlogContainer>
      <BlogHeader>
        <BlogTitle>Blog</BlogTitle>
        <BlogSubtitle>
          Insights, tips, and best practices for creating compelling image descriptions 
          and making your content more accessible and engaging.
        </BlogSubtitle>
      </BlogHeader>
      
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
    </BlogContainer>
  );
};

export default Blog; 