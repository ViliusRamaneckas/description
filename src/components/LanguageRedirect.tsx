import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'pt'];
const DEFAULT_LANGUAGE = 'en';

const LanguageRedirect: React.FC = () => {
  const location = useLocation();

  // Only redirect if we're at the root path
  if (location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }

  const detectUserLanguage = (): string => {
    // Check localStorage first (user preference)
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      return savedLanguage;
    }

    // Check browser language
    const browserLanguage = navigator.language.split('-')[0];
    if (SUPPORTED_LANGUAGES.includes(browserLanguage)) {
      return browserLanguage;
    }

    // Default to English
    return DEFAULT_LANGUAGE;
  };

  const targetLanguage = detectUserLanguage();
  const redirectPath = `/${targetLanguage}${location.search}${location.hash}`;

  return <Navigate to={redirectPath} replace />;
};

export default LanguageRedirect;
