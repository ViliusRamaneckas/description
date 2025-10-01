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

  .contact-form {
    background: #f8fafc;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    margin: 2rem 0;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
  }

  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    
    &:focus {
      outline: none;
      border-color: #5653fa;
      box-shadow: 0 0 0 3px rgba(86, 83, 250, 0.1);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  .submit-button {
    background: #5653fa;
    color: white;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    
    &:hover {
      background: #4338ca;
    }
  }

  .contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .info-card {
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    text-align: center;
  }

  .info-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .info-title {
    font-weight: 600;
    color: #5653fa;
    margin-bottom: 0.5rem;
  }

  .highlight {
    background: linear-gradient(120deg, rgba(86, 83, 250, 0.1) 0%, rgba(86, 83, 250, 0.2) 100%);
    padding: 1.5rem;
    border-left: 4px solid #5653fa;
    border-radius: 8px;
    margin: 2rem 0;
  }
`;

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <h1>{t('contact.title')}</h1>
      
      <p>
        {t('contact.intro')}
      </p>

      <div className="highlight">
        <p><strong>{t('contact.responseTime')}</strong></p>
      </div>

      <div className="contact-info">
        <div className="info-card">
          <div className="info-icon">📧</div>
          <div className="info-title">{t('contact.email.title')}</div>
          <p>info@freeimagedescriber.com</p>
        </div>
        
        <div className="info-card">
          <div className="info-icon">💬</div>
          <div className="info-title">{t('contact.chat.title')}</div>
          <p>{t('contact.chat.description')}</p>
        </div>
        
        <div className="info-card">
          <div className="info-icon">🌍</div>
          <div className="info-title">{t('contact.global.title')}</div>
          <p>{t('contact.global.description')}</p>
        </div>
      </div>

      <h2>{t('contact.form.title')}</h2>
      
      <div className="contact-form">
        <form>
          <div className="form-group">
            <label htmlFor="name">{t('contact.form.name')}</label>
            <input type="text" id="name" name="name" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">{t('contact.form.email')}</label>
            <input type="email" id="email" name="email" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">{t('contact.form.subject')}</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">{t('contact.form.message')}</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          
          <button type="submit" className="submit-button">
            {t('contact.form.submit')}
          </button>
        </form>
      </div>

      <h2>{t('contact.faq.title')}</h2>
      <p>
        {t('contact.faq.description')}
      </p>
    </PageContainer>
  );
};

export default Contact;