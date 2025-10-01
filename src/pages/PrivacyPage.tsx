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

const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <h1>{t('privacy.title')}</h1>
      
      <div className="last-updated">
        {t('privacy.lastUpdated')}: January 1, 2025
      </div>

      <div className="highlight">
        <p><strong>{t('privacy.intro')}</strong></p>
      </div>

      <h2>{t('privacy.collection.title')}</h2>
      <p>
        {t('privacy.collection.description')}
      </p>

      <h3>{t('privacy.collection.types.title')}</h3>
      <ul>
        <li>{t('privacy.collection.types.images')}</li>
        <li>{t('privacy.collection.types.usage')}</li>
        <li>{t('privacy.collection.types.technical')}</li>
        <li>{t('privacy.collection.types.contact')}</li>
      </ul>

      <h2>{t('privacy.usage.title')}</h2>
      <p>
        {t('privacy.usage.description')}
      </p>

      <h3>{t('privacy.usage.purposes.title')}</h3>
      <ul>
        <li>{t('privacy.usage.purposes.service')}</li>
        <li>{t('privacy.usage.purposes.improvement')}</li>
        <li>{t('privacy.usage.purposes.support')}</li>
        <li>{t('privacy.usage.purposes.communication')}</li>
      </ul>

      <h2>{t('privacy.storage.title')}</h2>
      <p>
        {t('privacy.storage.description')}
      </p>

      <h2>{t('privacy.sharing.title')}</h2>
      <p>
        {t('privacy.sharing.description')}
      </p>

      <h3>{t('privacy.sharing.exceptions.title')}</h3>
      <ul>
        <li>{t('privacy.sharing.exceptions.legal')}</li>
        <li>{t('privacy.sharing.exceptions.safety')}</li>
        <li>{t('privacy.sharing.exceptions.business')}</li>
      </ul>

      <h2>{t('privacy.security.title')}</h2>
      <p>
        {t('privacy.security.description')}
      </p>

      <h2>{t('privacy.rights.title')}</h2>
      <p>
        {t('privacy.rights.description')}
      </p>

      <h3>{t('privacy.rights.list.title')}</h3>
      <ul>
        <li>{t('privacy.rights.list.access')}</li>
        <li>{t('privacy.rights.list.correction')}</li>
        <li>{t('privacy.rights.list.deletion')}</li>
        <li>{t('privacy.rights.list.portability')}</li>
        <li>{t('privacy.rights.list.objection')}</li>
      </ul>

      <h2>{t('privacy.cookies.title')}</h2>
      <p>
        {t('privacy.cookies.description')}
      </p>

      <h2>{t('privacy.children.title')}</h2>
      <p>
        {t('privacy.children.description')}
      </p>

      <h2>{t('privacy.changes.title')}</h2>
      <p>
        {t('privacy.changes.description')}
      </p>

      <h2>{t('privacy.contact.title')}</h2>
      <p>
        {t('privacy.contact.description')} support@imagealt.ai
      </p>
    </PageContainer>
  );
};

export default PrivacyPage;
