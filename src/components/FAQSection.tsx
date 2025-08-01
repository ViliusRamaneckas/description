import React, { useState } from 'react';
import styled from 'styled-components';

const FAQContainer = styled.section`
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 2rem;
`;

const FAQTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  margin-bottom: 3rem;
`;

const FAQItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  text-align: left;
  padding: 1.5rem;
  background: #f8fafc;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const FAQAnswer = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: white;
`;

const FAQContent = styled.div`
  padding: 1.5rem;
  color: #374151;
  line-height: 1.6;
  
  p {
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    color: #1f2937;
    font-weight: 600;
  }
`;

const ToggleIcon = styled.span<{ $isOpen: boolean }>`
  font-size: 1.2rem;
  color: #5653fa;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const faqData = [
  {
    question: "Is this AI description generator really free?",
    answer: `Yes! Our AI description generator is completely free to use with no hidden costs, subscriptions, or usage limits. You can generate unlimited descriptions for your images without any charges.
    
    We believe in making AI technology accessible to everyone, whether you're a small business owner, content creator, or just someone who needs help describing images.`
  },
  {
    question: "How accurate are the AI-generated descriptions?",
    answer: `Our free AI description generator uses advanced artificial intelligence technology to analyze images with high accuracy. The AI can identify objects, people, colors, composition, and context with impressive precision.
    
    However, like any AI tool, accuracy can vary depending on image quality, complexity, and clarity. For best results, use high-quality images with good lighting and clear subjects.`
  },
  {
    question: "What image formats does the description generator support?",
    answer: `Our AI description generator supports the most common image formats:
    
    • **JPEG/JPG** - Most widely used format for photos
    • **PNG** - Great for images with transparency
    • **GIF** - Animated and static GIF files
    
    The maximum file size is 5MB, which covers most standard images you'll want to describe.`
  },
  {
    question: "What types of descriptions can this AI generator create?",
    answer: `Our free description generator offers three types of AI-generated descriptions:
    
    • **Product Title** - Concise, catchy titles perfect for e-commerce listings
    • **Brief Description** - One-paragraph summaries focusing on main elements
    • **Detailed Description** - Comprehensive descriptions including colors, composition, and context
    
    Each type is optimized for different use cases, from SEO content to accessibility alt text.`
  },
  {
    question: "Can I use this AI product description generator for e-commerce?",
    answer: `Absolutely! Our AI product description generator is perfect for e-commerce businesses. You can create compelling product descriptions that:
    
    • Boost search engine rankings with keyword-rich content
    • Improve conversion rates with detailed, accurate descriptions
    • Save time compared to writing descriptions manually
    • Maintain consistent quality across your product catalog
    
    Many online store owners use our tool to enhance their product listings and improve sales.`
  },
  {
    question: "How does this image describer protect my privacy?",
    answer: `We take privacy seriously with our AI description generator:
    
    • **Automatic Deletion** - All uploaded images are automatically deleted within 1 hour
    • **No Permanent Storage** - We never store your images permanently on our servers
    • **Secure Processing** - Images are processed securely and not shared with third parties
    • **No Account Required** - Use the tool anonymously without creating accounts
    
    Your privacy and data security are our top priorities.`
  },
  {
    question: "Can this description generator help with SEO and accessibility?",
    answer: `Yes! Our AI description generator is excellent for both SEO and accessibility:
    
    **For SEO:**
    • Creates keyword-rich descriptions that help search engines understand your images
    • Improves content quality and relevance
    • Enhances image search rankings
    
    **For Accessibility:**
    • Generates detailed alt text for screen readers
    • Makes content accessible to visually impaired users
    • Helps comply with web accessibility standards (WCAG)
    
    This makes our tool valuable for content creators, web developers, and business owners.`
  },
  {
    question: "How fast is the AI description generation process?",
    answer: `Our free AI description generator is designed for speed and efficiency:
    
    • **Upload** - Instant image upload via drag-and-drop or file selection
    • **Processing** - AI analysis typically takes 3-10 seconds
    • **Results** - Descriptions appear immediately after processing
    
    The exact speed depends on image size and server load, but most descriptions are generated within seconds. No waiting around for results!`
  },
  {
    question: "Can I edit or customize the AI-generated descriptions?",
    answer: `While our AI description generator provides high-quality descriptions, you can easily copy and edit them:
    
    • Use the "Copy to Clipboard" button to get the text
    • Paste into any text editor to make modifications
    • Adjust the descriptions to match your specific needs or brand voice
    • Combine with your own content for unique descriptions
    
    The AI-generated content serves as an excellent starting point that you can customize as needed.`
  },
  {
    question: "What makes this the best free description generator?",
    answer: `Our AI description generator stands out as the best free option because:
    
    • **Completely Free** - No subscriptions, limits, or hidden costs
    • **Advanced AI** - Uses cutting-edge artificial intelligence technology
    • **Multiple Formats** - Supports JPEG, PNG, and GIF files
    • **Various Description Types** - Title, brief, and detailed options
    • **Privacy Focused** - Automatic file deletion and secure processing
    • **No Registration** - Start using immediately without accounts
    • **Fast Processing** - Quick results in seconds
    • **Mobile Friendly** - Works on all devices and screen sizes
    
    We've designed this tool to be the most user-friendly and capable free AI description generator available.`
  }
];

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <FAQContainer>
      <FAQTitle>Frequently Asked Questions</FAQTitle>
      {faqData.map((item, index) => (
        <FAQItem key={index}>
          <FAQQuestion onClick={() => toggleItem(index)}>
            {item.question}
            <ToggleIcon $isOpen={openItems.includes(index)}>+</ToggleIcon>
          </FAQQuestion>
          <FAQAnswer $isOpen={openItems.includes(index)}>
            <FAQContent>
              {item.answer.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </FAQContent>
          </FAQAnswer>
        </FAQItem>
      ))}
    </FAQContainer>
  );
};

export default FAQSection; 