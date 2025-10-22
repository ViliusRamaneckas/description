import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SEOHead from './components/SEOHead';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Showcase from './components/Showcase';
import FAQSection from './components/FAQSection';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import { API_BASE_URL } from './config/api';

// All the existing styled components from App.tsx
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
`;

const HeroSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem 1rem 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem 1rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 1rem 0.5rem 1rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }
`;

const IntroDescription = styled.p`
  font-size: 1.125rem;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }
`;

const InstructionsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 1rem auto;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 1rem 0;
  
  @media (max-width: 768px) {
    padding: 0.75rem 0;
    margin: 0 1rem 1rem 1rem;
  }
`;

const InstructionsTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  text-align: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const InstructionStep = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    padding: 0 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 0;
    margin-bottom: 0.5rem;
  }
`;

const StepNumber = styled.div`
  background: #5653fa;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 0.75rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
  
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
    margin-right: 0.5rem;
  }
`;

const StepText = styled.div`
  color: #374151;
  font-size: 0.9rem;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const UploadSection = styled.div`
  max-width: 600px;
  margin: 0 auto 1.5rem auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    margin: 0 auto 1rem auto;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
    margin: 0 auto 0.75rem auto;
  }
`;

const UploadArea = styled.div<{ $isDragOver: boolean }>`
  border: 2px dashed ${props => props.$isDragOver ? '#5653fa' : '#d1d5db'};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  background: ${props => props.$isDragOver ? '#f8fafc' : '#f9fafb'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #5653fa;
    background: #f8fafc;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #9ca3af;
`;

const UploadText = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const UploadSubtext = styled.p`
  color: #9ca3af;
  font-size: 0.875rem;
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const SelectButton = styled.button`
  background: #5653fa;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
  
  &:hover {
    background: #4338ca;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const PreviewSection = styled.div`
  max-width: 600px;
  margin: 0 auto 1.5rem auto;
  padding: 0 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    margin: 0 auto 1rem auto;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
    margin: 0 auto 0.75rem auto;
  }
`;

const PreviewImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin: 0 auto 1rem auto;
  
  @media (max-width: 768px) {
    max-height: 300px;
  }
  
  @media (max-width: 480px) {
    max-height: 250px;
  }
`;

const OptionsSection = styled.div`
  max-width: 600px;
  margin: 0 auto 1.5rem auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    margin: 0 auto 1rem auto;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
    margin: 0 auto 0.75rem auto;
  }
`;

const OptionGroup = styled.div`
  margin-bottom: 1rem;
`;

const OptionLabel = styled.label`
  display: block;
  color: #374151;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const OptionSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #5653fa;
    box-shadow: 0 0 0 3px rgba(86, 83, 250, 0.1);
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const ActionSection = styled.div`
  max-width: 600px;
  margin: 0 auto 2rem auto;
  padding: 0 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    margin: 0 auto 1.5rem auto;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
    margin: 0 auto 1rem auto;
  }
`;

const GenerateButton = styled.button<{ disabled: boolean }>`
  background: ${props => props.disabled ? '#d1d5db' : '#5653fa'};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s;
  margin-right: 1rem;
  
  &:hover {
    background: ${props => props.disabled ? '#d1d5db' : '#4338ca'};
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
    margin-right: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    margin-right: 0;
    margin-bottom: 0.5rem;
    width: 100%;
  }
`;

const UploadNewButton = styled.button`
  background: transparent;
  color: #5653fa;
  border: 2px solid #5653fa;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #5653fa;
    color: white;
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    width: 100%;
  }
`;

const ResultSection = styled.div`
  max-width: 800px;
  margin: 0 auto 2rem auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    margin: 0 auto 1.5rem auto;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
    margin: 0 auto 1rem auto;
  }
`;

const ResultContainer = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.25rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const ResultTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const AILabel = styled.span`
  background: #5653fa;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
`;

const ResultText = styled.p`
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 1rem;
  white-space: pre-wrap;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const CopyButton = styled.button<{ $copied: boolean }>`
  background: ${props => props.$copied ? '#10b981' : '#5653fa'};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background: ${props => props.$copied ? '#059669' : '#4338ca'};
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem auto;
  max-width: 600px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  border: 3px solid #f3f4f6;
  border-top: 3px solid #5653fa;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const InfoSection = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0 auto;
  padding: 3rem 2rem;
  background: #f9fafb;
  border-radius: 16px;
  
  @media (max-width: 768px) {
    margin: 3rem auto 0 auto;
    padding: 2rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    margin: 2rem auto 0 auto;
    padding: 1.5rem 1rem;
  }
`;

const InfoTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const InfoSubtitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 2rem 0 1rem 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const InfoText = styled.p`
  color: #374151;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;



const AppContent: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [descriptionType, setDescriptionType] = useState<string>('detailed');
  const [generatedDescription, setGeneratedDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleFileSelect = (file: File) => {
    // Clear previous errors
      setError('');
      setGeneratedDescription('');
      setCopied(false);
    
    if (!file) {
      setError(t('errors.fileRequired'));
      return;
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
    const fileType = file.type.toLowerCase();
    
    if (!allowedTypes.includes(fileType)) {
      setError(`${t('errors.invalidFileType')} (${file.type || 'unknown type'})`);
      return;
    }
    
    // Check file size (20MB limit)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      const fileSizeMB = Math.round(file.size / 1024 / 1024 * 100) / 100;
      setError(`${t('errors.fileTooLarge')} File size: ${fileSizeMB}MB`);
      return;
    }
    
    // File is valid
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError(t('errors.fileRequired'));
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedDescription('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('type', descriptionType);

      // Add performance timing
      const startTime = Date.now();

      const response = await fetch(`${API_BASE_URL}/api/describe`, {
        method: 'POST',
        body: formData,
        // Add timeout for better error handling
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle specific error codes from server
        if (errorData.code === 'INVALID_FILE_TYPE') {
          throw new Error(errorData.message || t('errors.invalidFileType'));
        } else if (errorData.code === 'FILE_TOO_LARGE') {
          throw new Error(errorData.message || t('errors.fileTooLarge'));
        } else {
          throw new Error(errorData.message || 'Failed to generate description');
        }
      }

      const data = await response.json();
      const endTime = Date.now();
      const clientTime = endTime - startTime;
      
      console.log(`Description generation completed in ${clientTime}ms (client-side total)`);
      if (data.processingTime) {
        console.log(`Server processing time: ${data.processingTime}ms`);
      }
      
      setGeneratedDescription(data.description);
    } catch (err) {
      console.error('Error generating description:', err);
      const errorMessage = err instanceof Error ? err.message : t('errors.generationFailed');
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedDescription) {
      navigator.clipboard.writeText(generatedDescription);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUploadNewImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setGeneratedDescription('');
    setError('');
    setCopied(false);
    setDescriptionType('detailed');
    
    document.getElementById('image-upload')?.click();
  };

  return (
    <AppContainer>
      <SEOHead currentLang={lang} />
      <Navbar />
      <MainContent>
        <Routes>
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:postId" element={<BlogPost />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route
            path=""
            element={
              <>
                <HeroSection>
                  <HeroTitle>{t('hero.title')}</HeroTitle>
                  <IntroDescription>
                    {t('hero.intro')}
                  </IntroDescription>
                  
                  <InstructionsContainer>
                    <InstructionsTitle>{t('hero.instructions.title')}</InstructionsTitle>
                    
                    <InstructionStep>
                      <StepNumber>1</StepNumber>
                      <StepText>
                        {t('hero.instructions.step1')}
                      </StepText>
                    </InstructionStep>
                    
                    <InstructionStep>
                      <StepNumber>2</StepNumber>
                      <StepText>
                        {t('hero.instructions.step2')}
                      </StepText>
                    </InstructionStep>
                    
                    <InstructionStep>
                      <StepNumber>3</StepNumber>
                      <StepText>
                        {t('hero.instructions.step3')}
                      </StepText>
                    </InstructionStep>
                    
                    <InstructionStep>
                      <StepNumber>4</StepNumber>
                      <StepText>
                        {t('hero.instructions.step4')}
                      </StepText>
                    </InstructionStep>
                    
                    <InstructionStep>
                      <StepNumber>5</StepNumber>
                      <StepText>
                        {t('hero.instructions.step5')}
                      </StepText>
                    </InstructionStep>
                  </InstructionsContainer>
                </HeroSection>

                {!previewUrl && (
                  <UploadSection>
                    <UploadArea
                      $isDragOver={isDragOver}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <UploadIcon>📷</UploadIcon>
                      <UploadText>{t('upload.dragDrop')}</UploadText>
                      <UploadSubtext>{t('upload.fileTypes')}</UploadSubtext>
                      <SelectButton type="button">
                        {t('upload.selectImage')}
                      </SelectButton>
                    </UploadArea>
                    <FileInput
                      id="image-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif"
                      onChange={handleFileInputChange}
                    />
                  </UploadSection>
                )}

                {previewUrl && (
                  <PreviewSection>
                    <PreviewImage src={previewUrl} alt="Preview" />
                  </PreviewSection>
                )}

                {selectedFile && (
                  <OptionsSection>
                    <OptionGroup>
                      <OptionLabel htmlFor="description-type">
                        {t('descriptionType.label')}
                      </OptionLabel>
                      <OptionSelect
                        id="description-type"
                        value={descriptionType}
                        onChange={(e) => setDescriptionType(e.target.value)}
                      >
                        <option value="productTitle">{t('descriptionType.productTitle')}</option>
                        <option value="brief">{t('descriptionType.brief')}</option>
                        <option value="detailed">{t('descriptionType.detailed')}</option>
                      </OptionSelect>
                    </OptionGroup>
                  </OptionsSection>
                )}

                {selectedFile && (
                  <ActionSection>
                    <GenerateButton
                      disabled={isLoading}
                      onClick={handleGenerate}
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner /> {t('generate.generating')}
                        </>
                      ) : (
                        t('generate.button')
                      )}
                    </GenerateButton>
                    
                    <UploadNewButton onClick={handleUploadNewImage}>
                      {t('generate.uploadNew')}
                    </UploadNewButton>
                  </ActionSection>
                )}

                {error && <ErrorMessage>{error}</ErrorMessage>}

                {generatedDescription && (
                  <ResultSection>
                    <ResultContainer>
                      <ResultTitle>
                        {t('result.title')}
                        <AILabel>AI</AILabel>
                      </ResultTitle>
                      <ResultText>{generatedDescription}</ResultText>
                      <CopyButton $copied={copied} onClick={handleCopy}>
                        {copied ? t('result.copied') : t('result.copy')}
                      </CopyButton>
                    </ResultContainer>
                  </ResultSection>
                )}

                <InfoSection>
                  <InfoTitle>{t('info.title')}</InfoTitle>
                  <InfoText>{t('info.description1')}</InfoText>
                  <InfoText>{t('info.description2')}</InfoText>
                  
                  <InfoSubtitle>{t('info.whyUse.title')}</InfoSubtitle>
                  <InfoText>{t('info.whyUse.description1')}</InfoText>
                  <InfoText>{t('info.whyUse.description2')}</InfoText>
                  <InfoText>{t('info.whyUse.description3')}</InfoText>
                  
                  <InfoSubtitle>{t('info.howToUse.title')}</InfoSubtitle>
                  <InfoText>{t('info.howToUse.description1')}</InfoText>
                  <InfoText>{t('info.howToUse.description2')}</InfoText>
                  <InfoText>{t('info.howToUse.description3')}</InfoText>
                  
                  <InfoSubtitle>{t('info.security.title')}</InfoSubtitle>
                  <InfoText>{t('info.security.description1')}</InfoText>
                  <InfoText>{t('info.security.description2')}</InfoText>
                  
                  <InfoSubtitle>{t('info.features.title')}</InfoSubtitle>
                  <InfoText>{t('info.features.types')}</InfoText>
                  <InfoText>{t('info.features.technology')}</InfoText>
                  <InfoText>{t('info.features.instant')}</InfoText>
                  <InfoText>{t('info.features.seo')}</InfoText>
                  <InfoText>{t('info.features.privacy')}</InfoText>
                  <InfoText>{t('info.features.free')}</InfoText>
                  
                  <InfoSubtitle>{t('info.benefits.title')}</InfoSubtitle>
                  <InfoText>{t('info.benefits.ecommerce')}</InfoText>
                  <InfoText>{t('info.benefits.creators')}</InfoText>
                  <InfoText>{t('info.benefits.developers')}</InfoText>
                  <InfoText>{t('info.benefits.educators')}</InfoText>
                </InfoSection>

                <Showcase />
                <FAQSection />
              </>
            }
          />
        </Routes>
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

export default AppContent;
