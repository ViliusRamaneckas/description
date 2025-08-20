import React, { useEffect } from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'pt'];

const LanguageWrapper: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
      // Change language if it's different from current
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      // Save to localStorage for future visits
      localStorage.setItem('i18nextLng', lang);
    }
  }, [lang, i18n]);

  // If language is not supported, redirect to English
  if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
    return <Navigate to="/en" replace />;
  }

  return <Outlet />;
};

export default LanguageWrapper;
