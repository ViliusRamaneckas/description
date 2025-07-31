import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #0a0a0a;
  color: #e5e7eb;
  padding: 3rem 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: #3b82f6;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: #e5e7eb;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #3b82f6;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: #e5e7eb;
  font-size: 1.5rem;
  transition: color 0.2s;
  &:hover {
    color: #3b82f6;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #1f2937;
  color: #9ca3af;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Product</FooterTitle>
          <FooterLink to="/features">Features</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/updates">Updates</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Company</FooterTitle>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/press">Press</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink to="/documentation">Documentation</FooterLink>
          <FooterLink to="/help">Help Center</FooterLink>
          <FooterLink to="/guides">Guides</FooterLink>
          <FooterLink to="/api">API</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/cookies">Cookie Policy</FooterLink>
          <FooterLink to="/licenses">Licenses</FooterLink>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>© 2024 AI Image Describer. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 