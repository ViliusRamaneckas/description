import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  padding: 2rem 2rem 1.5rem 2rem;
  margin-top: auto;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Copyright = styled.div`
  color: #9ca3af;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const LegalLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const FooterLink = styled(Link)`
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #3b82f6;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          <p>© 2025 AI Image Description Generator. All rights reserved.</p>
        </Copyright>
        
        <LegalLinks>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
        </LegalLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 