import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical = '/',
  ogImage = '/favicon.png'
}) => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  
  // Default SEO values based on current language
  const defaultTitle = t('hero.title');
  const defaultDescription = t('hero.description');
  const defaultKeywords = 'AI description generator, free description generator, AI product description generator, image describer, description generator, product description tool, image to text';
  
  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  
  // Base URL - this should be configurable
  const baseUrl = 'https://YOUR-DOMAIN.com';
  const canonicalUrl = `${baseUrl}${canonical}`;
  const ogImageUrl = `${baseUrl}${ogImage}`;
  
  // Language alternates for hreflang
  const languages = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ru', 'ja', 'ko', 'zh'];
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLanguage} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang tags for multilingual SEO */}
      {languages.map(lang => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${baseUrl}?lang=${lang}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content={currentLanguage === 'en' ? 'en_US' : `${currentLanguage}_${currentLanguage.toUpperCase()}`} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Additional language-specific meta tags */}
      <meta name="language" content={currentLanguage} />
      <meta httpEquiv="content-language" content={currentLanguage} />
    </Helmet>
  );
};

export default SEOHead;
