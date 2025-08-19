import React, { useState } from 'react';
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
`;

const ContactCard = styled.div`
  background: linear-gradient(135deg, #5653fa 0%, #4338ca 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
  text-align: center;
  box-shadow: 0 10px 25px rgba(86, 83, 250, 0.3);
`;

const EmailLink = styled.a`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #f0f9ff;
    transform: translateY(-2px);
  }
`;

const ContactInfo = styled.div`
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const InfoCard = styled.div`
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  text-align: center;
`;

const InfoTitle = styled.h3`
  color: #5653fa;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const CopyButton = styled.button`
  background: #5653fa;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: #4338ca;
  }
`;

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@freeimagedescriber.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageContainer>
      <h1>{t('contact.title')}</h1>
      
      <p>
        {t('contact.intro')}
      </p>

      <ContactCard>
        <h2 style={{ margin: '0 0 1rem 0', color: 'white' }}>{t('contact.getInTouch')}</h2>
        <EmailLink href="mailto:info@freeimagedescriber.com">
          📧 {t('contact.email')}
        </EmailLink>
        <CopyButton onClick={handleCopyEmail}>
          {copied ? t('contact.copied') : t('contact.copyEmail')}
        </CopyButton>
      </ContactCard>

      <h2>{t('contact.whatContact')}</h2>

      <InfoGrid>
        <InfoCard>
          <InfoTitle>🐛 {t('contact.support.title')}</InfoTitle>
          <p>{t('contact.support.description')}</p>
        </InfoCard>

        <InfoCard>
          <InfoTitle>💡 {t('contact.features.title')}</InfoTitle>
          <p>{t('contact.features.description')}</p>
        </InfoCard>

        <InfoCard>
          <InfoTitle>🤝 {t('contact.business.title')}</InfoTitle>
          <p>{t('contact.business.description')}</p>
        </InfoCard>

        <InfoCard>
          <InfoTitle>📝 {t('contact.feedback.title')}</InfoTitle>
          <p>{t('contact.feedback.description')}</p>
        </InfoCard>
      </InfoGrid>

      <ContactInfo>
        <h2>{t('contact.responseTime.title')}</h2>
        <p>
          {t('contact.responseTime.description')}
        </p>
        
        <h2>{t('contact.beforeContact.title')}</h2>
        <p>
          <strong>{t('contact.beforeContact.technical')}</strong>
        </p>
        
        <p>
          <strong>{t('contact.beforeContact.privacy')}</strong>
        </p>
        
        <p>
          <strong>{t('contact.beforeContact.general')}</strong>
        </p>
      </ContactInfo>

      <div style={{ 
        background: 'linear-gradient(120deg, rgba(86, 83, 250, 0.1) 0%, rgba(86, 83, 250, 0.2) 100%)', 
        padding: '1.5rem', 
        borderLeft: '4px solid #5653fa', 
        borderRadius: '8px', 
        margin: '2rem 0' 
      }}>
        <p><strong>Note:</strong> {t('contact.note')}</p>
      </div>
    </PageContainer>
  );
};

export default Contact;
