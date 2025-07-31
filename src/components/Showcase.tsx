import React from 'react';
import styled from 'styled-components';

const ShowcaseContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Section = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 2rem;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ShowcaseImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const ShowcaseText = styled.div`
  flex: 1;
  color: #222;
  font-size: 1.1rem;
  background: #f7f7fa;
  border-radius: 8px;
  padding: 1.2rem 1.5rem;
`;

const ShowcaseTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ShowcaseSubtitle = styled.p`
  color: #6b7280;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const showcaseData = [
  {
    image: '/showcase/earth.jpg',
    description: `The picture shows a view of Earth from space, taken from a spacecraft.

The Earth's curvature is visible, and a large portion of the planet's surface is covered in swirling white clouds. The clouds cast shadows on the ocean below, creating a pattern of light and dark blue. The ocean takes up most of the frame, with a smaller portion of land visible in the distance.

Part of the spacecraft is visible in the foreground, including a robotic arm and some of the spacecraft's body. The spacecraft is silhouetted against the blackness of space, which fills the top portion of the image.`
  },
  {
    image: '/showcase/cars.jpg',
    description: `The picture captures two race cars drifting around a corner on a track.

A black BMW is in the foreground, angled sharply to the left as it slides through the turn. A green Nissan is close behind, also drifting and kicking up a cloud of white tire smoke. Both cars are heavily modified with racing decals and aftermarket parts such as spoilers and diffusers. The track is a dark grey asphalt and lined with concrete barriers.`
  },
  {
    image: '/showcase/fox.jpg',
    description: `The picture is a close-up portrait of a red fox standing in the snow.

The fox is the central focus of the image, its vibrant orange fur illuminated by the golden light of sunrise or sunset. It stands alert, with its ears perked and its gaze directed off-camera. The snow around the fox is pristine and white, with a bluish tint reflecting the cool colors of the sky. The background is a soft blur of blue and grey, creating a sense of depth and emphasizing the fox as the primary subject.`
  }
];

const Showcase: React.FC = () => (
  <ShowcaseContainer>
    <ShowcaseTitle>Showcase of Image Describer</ShowcaseTitle>
    <ShowcaseSubtitle>See how Image Describer understands images or photos</ShowcaseSubtitle>
    {showcaseData.map((item, idx) => (
      <Section key={idx}>
        <ShowcaseImage src={item.image} alt={`Showcase ${idx + 1}`} />
        <ShowcaseText>
          {item.description.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </ShowcaseText>
      </Section>
    ))}
  </ShowcaseContainer>
);

export default Showcase; 