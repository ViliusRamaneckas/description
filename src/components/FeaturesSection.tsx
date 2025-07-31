import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  max-width: 1100px;
  margin: 3rem auto 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #f3f4f6;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #d1d5db;
  margin-bottom: 2.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: #23272f;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  padding: 2rem;
  text-align: left;
`;

const Icon = styled.div`
  font-size: 2.5rem;
  color: #3b82f6;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const FeatureDesc = styled.p`
  color: #b0b3b8;
`;

const features = [
  {
    icon: '📝',
    title: 'AI Describe Image For Summary And Overview',
    description: 'Summarize the content of the picture, then describe in detail the physical objects, emotions, and atmosphere within the picture, so you can understand the meaning of the picture in detail. Description combined with Text-To-Speech ability to help visually impaired people see the content of the picture. You can also choose to briefly describe image.'
  },
  {
    icon: '🔍',
    title: 'Extract Text From Image',
    description: 'Extracts text from images like OCR, but with the added benefit of AI capabilities that are more accurate and faster than OCR. When extracting text information from an image, the original alignment, line breaks, and other formatting information are maintained as much as possible.'
  },
  {
    icon: '🌟',
    title: 'AI Describe Image For Caption Or Title',
    description: 'Image Describer generates catchy captions for your images, accurately and cleverly describes the highlights of the image, and includes the right hashtag so you can share the image on social networks and get more exposure!'
  },
  {
    icon: '🎨',
    title: 'Image To Midjourney Prompt',
    description: 'When you like a picture and want to generate a picture with the same theme, Image Describer can understand the picture and help you generate a Midjourney prompt, then you can get a similar picture with the same theme when you type Midjourney.'
  },
  {
    icon: '📦',
    title: 'Batch Image Description',
    description: 'Upload and describe multiple images at once. Save time by generating descriptions for a whole set of images in a single operation.'
  },
  {
    icon: '⬇️',
    title: 'Download Descriptions',
    description: 'Easily download all your generated descriptions as a text file for use in your projects, documentation, or sharing with others.'
  }
];

const FeaturesSection: React.FC = () => (
  <Section>
    <Title>Features of Image Describer?</Title>
    <Subtitle>Image Describer can describe image for following uses, hope it can help your work and life:</Subtitle>
    <Grid>
      {features.map((f, i) => (
        <Card key={i}>
          <Icon>{f.icon}</Icon>
          <FeatureTitle>{f.title}</FeatureTitle>
          <FeatureDesc>{f.description}</FeatureDesc>
        </Card>
      ))}
    </Grid>
  </Section>
);

export default FeaturesSection; 