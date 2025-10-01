import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
  $isOpen: boolean;
}

const Nav = styled.nav`
  background-color: #ffffff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #3b82f6;
  }
`;

const LogoImage = styled.img`
  height: 32px;
  margin-right: 8px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 0.95rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;

  &:hover {
    color: #3b82f6;
  }
`;





const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #374151;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<MobileMenuProps>`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background-color: #ffffff;
  border-left: 1px solid #e5e7eb;
  padding: 2rem;
  transform: translateX(${(props: MobileMenuProps) => props.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  box-shadow: -4px 0 6px -1px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  color: #374151;
  text-decoration: none;
  padding: 1rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  border-bottom: 1px solid #f3f4f6;
  
  &:hover {
    color: #3b82f6;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
`;

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get current language for navigation links
  const currentLang = lang || 'en';
  
  // Helper function to create language-aware links
  const createLink = (path: string) => `/${currentLang}${path}`;

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <LogoImage src="/IMAGE (1) (1).svg" alt="Free Image Describer" />
        </Logo>
        
        <NavLinks>
          <NavLink to={createLink('')}>{t('header.nav.home')}</NavLink>
          <NavLink to={createLink('/about')}>{t('header.nav.about')}</NavLink>
          <NavLink to={createLink('/contact')}>{t('header.nav.contact')}</NavLink>
          <LanguageSwitcher />
        </NavLinks>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </MobileMenuButton>

        <MobileMenu $isOpen={isMobileMenuOpen}>
          <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
            ×
          </CloseButton>
          <MobileNavLink to={createLink('')} onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.home')}</MobileNavLink>
          <MobileNavLink to={createLink('/about')} onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.about')}</MobileNavLink>
          <MobileNavLink to={createLink('/contact')} onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.contact')}</MobileNavLink>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <LanguageSwitcher />
          </div>
        </MobileMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 