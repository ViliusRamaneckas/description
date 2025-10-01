import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  currentLang?: string;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  currentLang,
  title,
  description,
  keywords,
  ogImage = '/favicon.png'
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const language = currentLang || i18n.language || 'en';
  const baseUrl = 'https://www.freeimagedescriber.com';
  
  // Extract path without language prefix for hreflang generation
  const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}/, '') || '';
  
  // Default SEO values based on current language
  const defaultTitle = t('header.title');
  const defaultDescription = t('hero.description');
  const defaultKeywords = 'free image describer, image describer, AI image describer, free image description generator, image description tool, AI image description, free image analyzer, image to text describer, multilingual image describer';
  
  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  
  // Generate hreflang URLs for all supported languages
  const languages = ['en', 'es', 'fr', 'de', 'pt'];
  const hreflangs = languages.map(lang => ({
    lang,
    url: `${baseUrl}/${lang}${pathWithoutLang}${location.search}`
  }));

  // Current page URL
  const currentUrl = `${baseUrl}${location.pathname}${location.search}`;
  const ogImageUrl = `${baseUrl}${ogImage}`;
  
  // Language-specific locale codes for Open Graph
  const localeMap: { [key: string]: string } = {
    'en': 'en_US',
    'es': 'es_ES', 
    'fr': 'fr_FR',
    'de': 'de_DE',
    'pt': 'pt_PT'
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      
      {/* Canonical URL - points to current language version */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Hreflang Tags - critical for multilingual SEO */}
      {hreflangs.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      {/* x-default points to English version */}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en${pathWithoutLang}${location.search}`} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content={localeMap[language] || 'en_US'} />
      
      {/* Alternate locales for Open Graph */}
      {languages.filter(lang => lang !== language).map(lang => (
        <meta key={`og-alt-${lang}`} property="og:locale:alternate" content={localeMap[lang]} />
      ))}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="language" content={language} />
      <meta httpEquiv="content-language" content={language} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Structured Data for Language Versions */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": currentUrl,
          "inLanguage": language,
          "isPartOf": {
            "@type": "WebSite",
            "url": baseUrl,
            "name": "Free AI Description Generator"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;