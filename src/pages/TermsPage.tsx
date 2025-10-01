import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  line-height: 1.6;
  color: #374151;

  h1 {
    color: #1f2937;
    margin-bottom: 2rem;
    font-size: 2.25rem;
    font-weight: 600;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  h2 {
    color: #1f2937;
    margin: 2rem 0 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  h3 {
    color: #374151;
    margin: 1.5rem 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .highlight {
    background: linear-gradient(120deg, rgba(86, 83, 250, 0.1) 0%, rgba(86, 83, 250, 0.2) 100%);
    padding: 1.5rem;
    border-left: 4px solid #5653fa;
    border-radius: 8px;
    margin: 2rem 0;
  }

  .last-updated {
    font-style: italic;
    color: #6b7280;
    margin-bottom: 2rem;
  }
`;

const TermsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <h1>{t('terms.title')}</h1>
      
      <div className="last-updated">
        {t('terms.lastUpdated')}: January 1, 2025
      </div>

      <div className="highlight">
        <p><strong>{t('terms.intro')}</strong></p>
      </div>

      <h2>{t('terms.acceptance.title')}</h2>
      <p>
        {t('terms.acceptance.description')}
      </p>

      <h2>{t('terms.service.title')}</h2>
      <p>
        {t('terms.service.description')}
      </p>

      <h3>{t('terms.service.features.title')}</h3>
      <ul>
        <li>{t('terms.service.features.aiDescriptions')}</li>
        <li>{t('terms.service.features.multiLanguage')}</li>
        <li>{t('terms.service.features.accessibility')}</li>
        <li>{t('terms.service.features.integration')}</li>
      </ul>

      <h2>{t('terms.usage.title')}</h2>
      <p>
        {t('terms.usage.description')}
      </p>

      <h3>{t('terms.usage.prohibited.title')}</h3>
      <ul>
        <li>{t('terms.usage.prohibited.illegal')}</li>
        <li>{t('terms.usage.prohibited.harmful')}</li>
        <li>{t('terms.usage.prohibited.spam')}</li>
        <li>{t('terms.usage.prohibited.reverse')}</li>
      </ul>

      <h2>{t('terms.privacy.title')}</h2>
      <p>
        {t('terms.privacy.description')}
      </p>

      <h2>{t('terms.intellectual.title')}</h2>
      <p>
        {t('terms.intellectual.description')}
      </p>

      <h2>{t('terms.limitation.title')}</h2>
      <p>
        {t('terms.limitation.description')}
      </p>

      <h2>{t('terms.termination.title')}</h2>
      <p>
        {t('terms.termination.description')}
      </p>

      <h2>{t('terms.changes.title')}</h2>
      <p>
        {t('terms.changes.description')}
      </p>

      <h2>{t('terms.contact.title')}</h2>
      <p>
        {t('terms.contact.description')} support@imagealt.ai
      </p>
    </PageContainer>
  );
};

export default TermsPage;
