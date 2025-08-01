import React from 'react';
import styled from 'styled-components';

const ShowcaseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background-color: #ffffff;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const ShowcaseHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ShowcaseTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const ShowcaseSubtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ShowcaseCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: #f8fafc;
`;

const ShowcaseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ShowcaseCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const DescriptionText = styled.div`
  color: #374151;
  font-size: 0.95rem;
  line-height: 1.6;
  
  p {
    margin-bottom: 0.75rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Badge = styled.span`
  display: inline-block;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
`;

const showcaseData = [
  {
    image: '/showcase/earth.jpg',
    description: `The picture shows a view of Earth from space, taken from a spacecraft.

The Earth's curvature is visible, and a large portion of the planet's surface is covered in swirling white clouds. The clouds cast shadows on the ocean below, creating a pattern of light and dark blue. The ocean takes up most of the frame, with a smaller portion of land visible in the distance.

Part of the spacecraft is visible in the foreground, including a robotic arm and some of the spacecraft's body. The spacecraft is silhouetted against the blackness of space, which fills the top portion of the image.`,
    altText: "AI generated description example - Earth from space with spacecraft visible"
  },
  {
    image: '/showcase/cars.jpg',
    description: `The picture captures two race cars drifting around a corner on a track.

A black BMW is in the foreground, angled sharply to the left as it slides through the turn. A green Nissan is close behind, also drifting and kicking up a cloud of white tire smoke. Both cars are heavily modified with racing decals and aftermarket parts such as spoilers and diffusers. The track is a dark grey asphalt and lined with concrete barriers.`,
    altText: "AI generated description example - Racing cars drifting on track"
  },
  {
    image: '/showcase/fox.jpg',
    description: `The picture is a close-up portrait of a red fox standing in the snow.

The fox is the central focus of the image, its vibrant orange fur illuminated by the golden light of sunrise or sunset. It stands alert, with its ears perked and its gaze directed off-camera. The snow around the fox is pristine and white, with a bluish tint reflecting the cool colors of the sky. The background is a soft blur of blue and grey, creating a sense of depth and emphasizing the fox as the primary subject.`,
    altText: "AI generated description example - Red fox in winter snow"
  }
];

const Showcase: React.FC = () => (
  <ShowcaseContainer>
    <ShowcaseHeader>
      <ShowcaseTitle>AI Description Examples</ShowcaseTitle>
      <ShowcaseSubtitle>
        See how our AI generates detailed, accurate descriptions for different types of images
      </ShowcaseSubtitle>
    </ShowcaseHeader>
    
    <GridContainer>
      {showcaseData.map((item, idx) => (
        <ShowcaseCard key={idx}>
          <ImageContainer>
            <ShowcaseImage src={item.image} alt={item.altText} />
          </ImageContainer>
          <CardContent>
            <Badge>AI Generated</Badge>
            <DescriptionText>
              {item.description.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </DescriptionText>
          </CardContent>
        </ShowcaseCard>
      ))}
    </GridContainer>
  </ShowcaseContainer>
);

export default Showcase; 