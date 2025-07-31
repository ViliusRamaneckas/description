import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  max-width: 900px;
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

const FAQItem = styled.div`
  background: #23272f;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 1.5rem 2rem;
`;

const Question = styled.div`
  font-weight: 600;
  font-size: 1.15rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;

const Answer = styled.div`
  margin-top: 1rem;
  color: #b0b3b8;
`;

const faqs = [
  {
    question: 'What is Image Describer?',
    answer: 'Image Describer is a tool that describes images with AI. It understands the content of the images you submit and outputs a description of the image according to your claims. Tools like Image Describer usually have other related aliases or keywords, such as: photo describer, picture describer, ai image describer, online image describer, describe image tool, describe image ai, ai describe image, image caption generator, describe picture tool, describe picture ai.'
  },
  {
    question: 'How Image Describer is technically implemented?',
    answer: 'Image Describer is backed by multimodal big models that have the ability to understand images very well. It accepts both image and text commands and ensures that the output matches our expected image description.'
  },
  {
    question: 'How does Image Describer protect privacy?',
    answer: 'Image Describer will not record your images and descriptions without your consent. If you submit a share, then the image and the description of the image in response will be recorded and presented in other sections of the site.'
  },
  {
    question: 'How do I submit usage feedback to Image Describer?',
    answer: 'You can submit feedback via the contact form on the site or by emailing our support team. We value your input and use it to improve the service.'
  }
];

const FAQSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section>
      <Title>Frequently Asked</Title>
      <Subtitle>FAQs</Subtitle>
      {faqs.map((faq, i) => (
        <FAQItem key={i}>
          <Question onClick={() => setOpen(open === i ? null : i)}>
            {faq.question}
            <span style={{ fontSize: '1.5rem', color: '#3b82f6' }}>{open === i ? '−' : '+'}</span>
          </Question>
          {open === i && <Answer>{faq.answer}</Answer>}
        </FAQItem>
      ))}
    </Section>
  );
};

export default FAQSection; 