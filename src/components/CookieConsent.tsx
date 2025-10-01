import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const ConsentBanner = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(31, 41, 55, 0.98);
  backdrop-filter: blur(10px);
  color: white;
  padding: 1.5rem;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ConsentContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const ConsentText = styled.div`
  flex: 1;
  line-height: 1.5;
  
  p {
    margin: 0 0 0.5rem 0;
    font-size: 0.95rem;
  }
  
  a {
    color: #93c5fd;
    text-decoration: underline;
    
    &:hover {
      color: #dbeafe;
    }
  }
`;

const ConsentButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ConsentButton = styled.button<{ $variant: 'accept' | 'decline' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  
  ${props => props.$variant === 'accept' ? `
    background: #5653fa;
    color: white;
    
    &:hover {
      background: #4338ca;
      transform: translateY(-1px);
    }
  ` : `
    background: transparent;
    color: #d1d5db;
    border: 1px solid #6b7280;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }
  `}
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'en';

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
    
    // Enable analytics and other cookies here if needed
    console.log('🍪 Cookies accepted - Analytics enabled');
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
    
    // Disable non-essential cookies
    console.log('🍪 Cookies declined - Only essential cookies active');
  };

  if (!isVisible) return null;

  return (
    <ConsentBanner $isVisible={isVisible}>
      <ConsentContent>
        <ConsentText>
          <p>
            <strong>🍪 We use cookies to improve your experience</strong>
          </p>
          <p>
            We use essential cookies for website functionality and optional cookies for analytics. 
            By clicking "Accept", you consent to our use of cookies. You can manage your preferences anytime.{' '}
            <Link to={`/${currentLang}/privacy`}>Learn more in our Privacy Policy</Link>
          </p>
        </ConsentText>
        
        <ConsentButtons>
          <ConsentButton $variant="decline" onClick={handleDecline}>
            Decline Optional
          </ConsentButton>
          <ConsentButton $variant="accept" onClick={handleAccept}>
            Accept All Cookies
          </ConsentButton>
        </ConsentButtons>
      </ConsentContent>
    </ConsentBanner>
  );
};

export default CookieConsent;


