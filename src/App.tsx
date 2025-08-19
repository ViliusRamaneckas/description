import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SEOHead from './components/SEOHead';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Showcase from './components/Showcase';
import FAQSection from './components/FAQSection';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import { API_BASE_URL } from './config/api';

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

const Logo = styled.img`
  height: 60px;
  width: auto;
  margin-bottom: 1rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  
  @media (max-width: 768px) {
    height: 50px;
    margin-bottom: 0.75rem;
  }
  
  @media (max-width: 480px) {
    height: 40px;
    margin-bottom: 0.5rem;
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
  gap: 0.75rem;
`;

const StepNumber = styled.div`
  background: #3b82f6;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 0.125rem;
`;

const StepText = styled.p`
  color: rgb(0, 0, 0);
  font-size: 17px;
  line-height: 24px;
  margin: 0;
  font-weight: 400;
`;



const UploadSection = styled.div`
  max-width: 800px;
  margin: 0 auto 2rem auto;
  padding: 0 2rem;
`;

const UploadCard = styled.div`
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
`;

const DataNotice = styled.div`
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #1e40af;
`;

const DragDropArea = styled.div<{ $dragActive: boolean }>`
  border: 2px dashed ${({ $dragActive }) => ($dragActive ? '#3b82f6' : '#d1d5db')};
  background: ${({ $dragActive }) => ($dragActive ? '#eff6ff' : '#f9fafb')};
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 1.5rem;
  
  &:hover {
    border-color: #9ca3af;
    background: #f3f4f6;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: #9ca3af;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  font-size: 1.1rem;
  color: #374151;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const UploadSubtext = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

const SelectFileButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #2563eb;
  }
`;

const PreviewSection = styled.div`
  background: transparent;
  border-radius: 0;
  padding: 1.5rem 0;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const OptionsSection = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  max-width: 300px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  color: #374151;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const GenerateButton = styled.button<{ $isLoading: boolean; disabled: boolean }>`
  width: 100%;
  background: ${({ $isLoading, disabled }) => 
    disabled ? '#d1d5db' : $isLoading ? '#9ca3af' : '#3b82f6'};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s;
  
  &:hover {
    background: ${({ $isLoading, disabled }) => 
      disabled ? '#d1d5db' : $isLoading ? '#9ca3af' : '#2563eb'};
  }
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ResultSection = styled.div`
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
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
  font-weight: 500;
`;

const ResultText = styled.div`
  font-size: 1rem;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  white-space: pre-wrap;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem;
  border-left: 3px solid #5653fa;
`;

const CopyButton = styled.button`
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  
  &:hover {
    background: #4b5563;
  }
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 0.75rem;
    width: 100%;
  }
`;

const NewImageButton = styled.button`
  background: #5653fa;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #4338ca;
  }
  
  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

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
  }

  h2 {
    color: #1f2937;
    margin: 2rem 0 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 1rem;
  }
`;

const TermsPage: React.FC = () => (
  <PageContainer>
    <h1>Terms of Service</h1>
    <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
    
    <h2>1. Acceptance of Terms</h2>
    <p>By using our AI Image Description Generator service, you agree to these Terms of Service.</p>
    
    <h2>2. Service Description</h2>
    <p>Our service provides AI-generated descriptions of uploaded images for legitimate purposes including content creation, marketing, and accessibility.</p>
    
    <h2>3. Data Usage</h2>
    <p>All uploaded images and generated descriptions are automatically deleted after 1 hour. We do not permanently store your data.</p>
    
    <h2>4. Acceptable Use</h2>
    <p>You may not upload illegal, harmful, or inappropriate content. Our service is intended for legitimate business and personal use only.</p>
    
    <h2>5. Limitation of Liability</h2>
    <p>Our service is provided "as is" without warranties. We are not liable for any damages arising from use of our service.</p>
    
    <h2>6. Changes to Terms</h2>
    <p>We may update these terms at any time. Continued use constitutes acceptance of updated terms.</p>
  </PageContainer>
);

const PrivacyPage: React.FC = () => (
  <PageContainer>
    <h1>Privacy Policy</h1>
    <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
    
    <h2>1. Information We Collect</h2>
    <p>We only collect the images you upload for processing. No personal information is required or stored.</p>
    
    <h2>2. How We Use Your Information</h2>
    <p>Uploaded images are used solely to generate AI descriptions and are automatically deleted after 1 hour.</p>
    
    <h2>3. Data Storage and Security</h2>
    <p>Images are temporarily stored in secure servers during processing. All data is automatically deleted after 1 hour.</p>
    
    <h2>4. Data Sharing</h2>
    <p>We do not share, sell, or transfer your images or data to any third parties.</p>
    
    <h2>5. Cookies</h2>
    <p>We use minimal cookies for basic website functionality. No tracking or analytics cookies are used.</p>
    
    <h2>6. Your Rights</h2>
    <p>Since we automatically delete all data after 1 hour, no personal data is retained that would require deletion requests.</p>
    
    <h2>7. Contact</h2>
    <p>For privacy-related questions, you can contact us through our website.</p>
  </PageContainer>
);

const InfoSection = styled.div`
  max-width: 800px;
  margin: 0 auto 4rem auto;
  padding: 0 2rem;
`;

const InfoCard = styled.div`
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 2.5rem 0;
  box-shadow: none;
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
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
`;

function App() {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [generatedDescription, setGeneratedDescription] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [descriptionType, setDescriptionType] = useState<string>('detailed');

  const handleImageUpload = (file: File) => {
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    // Check file type
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      setError('Only JPEG, PNG and GIF images are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setSelectedFile(file);
      setError(''); // Clear any previous errors
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      console.log('Sending request to backend...');
      const response = await fetch(`${API_BASE_URL}/api/describe?descriptionType=${descriptionType}`, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate description');
      }

      if (!data.description) {
        throw new Error('No description received from server');
      }

      setGeneratedDescription(data.description);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate description. Please try again.');
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
    // Reset all states to initial values
    setSelectedFile(null);
    setPreviewUrl('');
    setGeneratedDescription('');
    setError('');
    setCopied(false);
    setDescriptionType('detailed');
    
    // Trigger file input dialog
    document.getElementById('image-upload')?.click();
  };

  return (
    <AppContainer>
      <SEOHead />
      <Navbar />
      <MainContent>
        <Routes>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route
            path="/"
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

                <UploadSection>
                  <UploadCard>
                    <DataNotice>
                      🔒 All uploaded data is deleted after 1 hour
                    </DataNotice>

                    <DragDropArea
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleImageUpload(e.dataTransfer.files[0]);
                        }
                      }}
                      $dragActive={dragActive}
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      {previewUrl ? (
                        <PreviewSection>
                          <PreviewImage src={previewUrl} alt="Uploaded image preview for AI description generation" />
                        </PreviewSection>
                      ) : (
                        <>
                          <UploadIcon>📁</UploadIcon>
                          <UploadText>{t('upload.dragDrop')}</UploadText>
                          <UploadSubtext>{t('upload.fileTypes')}</UploadSubtext>
                          <SelectFileButton type="button">
                            {t('upload.selectImage')}
                          </SelectFileButton>
                        </>
                      )}
                    </DragDropArea>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0]);
                        }
                      }}
                      style={{ display: 'none' }}
                      id="image-upload"
                    />

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    {selectedFile && (
                      <OptionsSection>
                        <Label htmlFor="description-type">{t('descriptionType.label')}:</Label>
                        <Select
                          id="description-type"
                          value={descriptionType}
                          onChange={(e) => setDescriptionType(e.target.value)}
                        >
                          <option value="title">{t('descriptionType.productTitle')}</option>
                          <option value="brief">{t('descriptionType.brief')}</option>
                          <option value="detailed">{t('descriptionType.detailed')}</option>
                        </Select>
                      </OptionsSection>
                    )}

                    <GenerateButton
                      onClick={handleSubmit}
                      disabled={!selectedFile || isLoading}
                      $isLoading={isLoading}
                    >
                      {isLoading ? t('generate.generating') : t('generate.button')}
                    </GenerateButton>

                    {generatedDescription && (
                      <ResultSection>
                        <ResultTitle>
                          {t('result.title')}
                        </ResultTitle>
                        <ResultText>{generatedDescription}</ResultText>
                        <CopyButton onClick={handleCopy}>
                          {copied ? t('result.copied') : t('result.copy')}
                        </CopyButton>
                        <NewImageButton
                          onClick={handleUploadNewImage}
                          disabled={isLoading}
                        >
                          {t('generate.uploadNew')}
                        </NewImageButton>
                      </ResultSection>
                    )}
                  </UploadCard>
                </UploadSection>

                <InfoSection>
                  <InfoCard>
                    <InfoTitle>{t('info.title')}</InfoTitle>
                    
                    <InfoText>
                      {t('info.description1')}
                    </InfoText>
                    
                    <InfoText>
                      {t('info.description2')}
                    </InfoText>
                    
                    <Divider />
                    
                    <InfoSubtitle>{t('info.whyUse.title')}</InfoSubtitle>
                    
                    <InfoText>
                      {t('info.whyUse.description1')}
                    </InfoText>
                    
                    <InfoText>
                      {t('info.whyUse.description2')}
                    </InfoText>
                    
                    <InfoText>
                      {t('info.whyUse.description3')}
                    </InfoText>
                    
                    <Divider />
                    
                    <InfoSubtitle>{t('info.howToUse.title')}</InfoSubtitle>
                    
                    <InfoText>
                      {t('info.howToUse.description1')}
                    </InfoText>
                    
                    <InfoText>
                      {t('info.howToUse.description2')}
                    </InfoText>
                    
                    <InfoText>
                      {t('info.howToUse.description3')}
                    </InfoText>
                    
                    <Divider />
                    
                    <InfoSubtitle>{t('info.security.title')}</InfoSubtitle>
                    
                    <InfoText>
                      {t('info.security.description1')}
                    </InfoText>
                    
                    <InfoText>
                      {t('info.security.description2')}
                    </InfoText>
                  </InfoCard>
                </InfoSection>
                
                {/* Benefits Section for Better SEO and User Understanding */}
                <InfoSection>
                  <InfoCard>
                    <InfoTitle>{t('info.features.title')}</InfoTitle>
                    
                    <InfoText>
                      <strong>Multiple Description Types:</strong> {t('info.features.types')}
                    </InfoText>
                    
                    <InfoText>
                      <strong>Advanced AI Technology:</strong> {t('info.features.technology')}
                    </InfoText>
                    
                    <InfoText>
                      <strong>Instant Results:</strong> {t('info.features.instant')}
                    </InfoText>
                    
                    <InfoText>
                      <strong>SEO-Optimized Descriptions:</strong> {t('info.features.seo')}
                    </InfoText>
                    
                    <InfoText>
                      <strong>Privacy & Security:</strong> {t('info.features.privacy')}
                    </InfoText>
                    
                    <InfoText>
                      <strong>100% Free & Unlimited:</strong> {t('info.features.free')}
                    </InfoText>
                    
                    <Divider />
                    
                    <InfoSubtitle>{t('info.benefits.title')}</InfoSubtitle>
                    
                    <InfoText>
                      <strong>E-commerce Businesses:</strong> {t('info.benefits.ecommerce')} <Link to="/blog/ecommerce-product-descriptions" style={{color: '#5653fa', textDecoration: 'none'}}>Learn more about e-commerce optimization →</Link>
                    </InfoText>
                    
                    <InfoText>
                      <strong>Content Creators & Marketers:</strong> {t('info.benefits.creators')} <Link to="/blog/social-media-content-strategy" style={{color: '#5653fa', textDecoration: 'none'}}>Discover social media strategies →</Link>
                    </InfoText>
                    
                    <InfoText>
                      <strong>Web Developers & Designers:</strong> {t('info.benefits.developers')} <Link to="/blog/accessibility-in-digital-content" style={{color: '#5653fa', textDecoration: 'none'}}>Read accessibility best practices →</Link>
                    </InfoText>
                    
                    <InfoText>
                      <strong>Educational Professionals:</strong> {t('info.benefits.educators')}
                    </InfoText>
                  </InfoCard>
                </InfoSection>

                <FAQSection />
                <Showcase />
              </>
            }
          />
        </Routes>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;
