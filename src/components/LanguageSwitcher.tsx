import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const LanguageSwitcherContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const LanguageButton = styled.button`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #5653fa;
    background: #f8fafc;
  }
  
  &:focus {
    outline: none;
    border-color: #5653fa;
    box-shadow: 0 0 0 3px rgba(86, 83, 250, 0.1);
  }
`;

const LanguageDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 50;
  min-width: 180px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  margin-top: 0.25rem;
`;

const LanguageOption = styled.button<{ $isActive: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: #374151;
  background: ${props => props.$isActive ? '#f8fafc' : 'transparent'};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #f8fafc;
  }
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const LanguageFlag = styled.span`
  font-size: 1.2rem;
  width: 20px;
`;

const ChevronIcon = styled.span<{ $isOpen: boolean }>`
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
  font-size: 0.8rem;
  color: #9ca3af;
`;

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  const handleLanguageChange = (languageCode: string) => {
    // Extract current path without language prefix
    const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}/, '') || '';
    
    // Navigate to new language URL
    const newPath = `/${languageCode}${pathWithoutLang}${location.search}${location.hash}`;
    navigate(newPath);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-language-switcher]')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <LanguageSwitcherContainer data-language-switcher>
      <LanguageButton onClick={() => setIsOpen(!isOpen)}>
        <LanguageFlag>{currentLanguage.flag}</LanguageFlag>
        {currentLanguage.name}
        <ChevronIcon $isOpen={isOpen}>▼</ChevronIcon>
      </LanguageButton>
      
      <LanguageDropdown $isOpen={isOpen}>
        {languages.map((language) => (
          <LanguageOption
            key={language.code}
            $isActive={language.code === i18n.language}
            onClick={() => handleLanguageChange(language.code)}
          >
            <LanguageFlag>{language.flag}</LanguageFlag>
            {language.name}
          </LanguageOption>
        ))}
      </LanguageDropdown>
    </LanguageSwitcherContainer>
  );
};

export default LanguageSwitcher;

