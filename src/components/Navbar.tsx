import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface MobileMenuProps {
  $isOpen: boolean;
}

const Nav = styled.nav`
  background-color: #0a0a0a;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: 'Inter', sans-serif;
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
  color: #fff;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 14px;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    color: #646cff;
  }
`;

const LanguageSelect = styled.select`
  background-color: #1f2937;
  color: #e5e7eb;
  border: 1px solid #374151;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const LoginButton = styled(Link)`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  &:hover {
    background-color: #2563eb;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #e5e7eb;
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
  width: 250px;
  height: 100vh;
  background-color: #0a0a0a;
  padding: 2rem;
  transform: translateX(${(props: MobileMenuProps) => props.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  color: #e5e7eb;
  text-decoration: none;
  padding: 1rem 0;
  font-size: 1.1rem;
  &:hover {
    color: #3b82f6;
  }
`;

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <LogoImage src="/logo.svg" alt="Logo" />
        </Logo>
        
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
          <LanguageSelect>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </LanguageSelect>
          <LoginButton to="/login">Login</LoginButton>
        </NavLinks>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </MobileMenuButton>

        <MobileMenu $isOpen={isMobileMenuOpen}>
          <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/showcase" onClick={() => setIsMobileMenuOpen(false)}>Showcase</MobileNavLink>
          <MobileNavLink to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</MobileNavLink>
          <MobileNavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
          <MobileNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</MobileNavLink>
          <LanguageSelect style={{ marginTop: '1rem' }}>
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