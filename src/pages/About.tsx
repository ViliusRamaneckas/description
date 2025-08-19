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

  p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .highlight {
    background: linear-gradient(120deg, rgba(86, 83, 250, 0.1) 0%, rgba(86, 83, 250, 0.2) 100%);
    padding: 1.5rem;
    border-left: 4px solid #5653fa;
    border-radius: 8px;
    margin: 2rem 0;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .feature-card {
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  .feature-title {
    font-weight: 600;
    color: #5653fa;
    margin-bottom: 0.5rem;
  }
`;

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <h1>{t('about.title')}</h1>
      
      <div className="highlight">
        <p><strong>Mission:</strong> {t('about.mission')}</p>
      </div>
      
      <h2>{t('about.whatWeDo.title')}</h2>
      <p>
        {t('about.whatWeDo.description1')}
      </p>
      
      <p>
        {t('about.whatWeDo.description2')}
      </p>

      <h2>{t('about.technology.title')}</h2>
      <p>
        {t('about.technology.description')}
      </p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-title">🧠 {t('about.technology.features.ai.title')}</div>
          <p>{t('about.technology.features.ai.description')}</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-title">🌍 {t('about.technology.features.multilingual.title')}</div>
          <p>{t('about.technology.features.multilingual.description')}</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-title">🔒 {t('about.technology.features.privacy.title')}</div>
          <p>{t('about.technology.features.privacy.description')}</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-title">💯 {t('about.technology.features.free.title')}</div>
          <p>{t('about.technology.features.free.description')}</p>
        </div>
      </div>

      <h2>{t('about.perfectFor.title')}</h2>
      <p>
        {t('about.perfectFor.ecommerce')}
      </p>
      
      <p>
        {t('about.perfectFor.creators')}
      </p>
      
      <p>
        {t('about.perfectFor.developers')}
      </p>
      
      <p>
        {t('about.perfectFor.educators')}
      </p>

      <h2>{t('about.commitment.title')}</h2>
      <p>
        {t('about.commitment.description1')}
      </p>
      
      <p>
        {t('about.commitment.description2')}
      </p>

      <div className="highlight">
        <p><strong>{t('about.commitment.cta')}</strong></p>
      </div>
    </PageContainer>
  );
};

export default About;
