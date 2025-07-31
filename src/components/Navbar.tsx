import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const LanguageSelect = styled.select`
  background-color: #f9fafb;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const LoginButton = styled(Link)`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563eb;
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          AI Description
        </Logo>
        
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <LanguageSelect>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </LanguageSelect>
          <LoginButton to="/login">Sign In</LoginButton>
        </NavLinks>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </MobileMenuButton>

        <MobileMenu $isOpen={isMobileMenuOpen}>
          <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
            ×
          </CloseButton>
          <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
          <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
          <MobileNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</MobileNavLink>
          <LanguageSelect style={{ marginTop: '1rem', width: '100%' }}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </LanguageSelect>
        </MobileMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 