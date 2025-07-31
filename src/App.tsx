import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from './components/Footer';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Showcase from './components/Showcase';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
`;

const HeroSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 3rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.75rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const UploadSection = styled.div`
  max-width: 800px;
  margin: 0 auto 4rem auto;
  padding: 0 2rem;
`;

const UploadCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
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
    disabled ? '#d1d5db' : $isLoading ? '#9ca3af' : '#10b981'};
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
      disabled ? '#d1d5db' : $isLoading ? '#9ca3af' : '#059669'};
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
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
`;

const ResultTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 1rem;
`;

const ResultText = styled.p`
  font-size: 1rem;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
  white-space: pre-wrap;
`;

const CopyButton = styled.button`
  background: #059669;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #047857;
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

function App() {
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
      formData.append('descriptionType', descriptionType);

      console.log('Sending request to backend...');
      const response = await fetch('http://localhost:5050/api/describe', {
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

  return (
    <AppContainer>
      <MainContent>
        <Routes>
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route
            path="/"
            element={
              <>
                <HeroSection>
                  <HeroTitle>AI Image Description Generator</HeroTitle>
                  <HeroSubtitle>
                    Upload an image and let our AI generate detailed, accurate descriptions for you. 
                    Perfect for content creators, marketers, and anyone needing image descriptions.
                  </HeroSubtitle>
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
                          <PreviewImage src={previewUrl} alt="Preview" />
                        </PreviewSection>
                      ) : (
                        <>
                          <UploadIcon>📁</UploadIcon>
                          <UploadText>Drop your image here, or click to select</UploadText>
                          <UploadSubtext>Support for PNG, JPG, GIF up to 5MB</UploadSubtext>
                          <SelectFileButton type="button">
                            Select Image
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
                        <Label htmlFor="description-type">Description Type:</Label>
                        <Select
                          id="description-type"
                          value={descriptionType}
                          onChange={(e) => setDescriptionType(e.target.value)}
                        >
                          <option value="title">Product Title</option>
                          <option value="brief">Brief Description</option>
                          <option value="detailed">Detailed Description</option>
                        </Select>
                      </OptionsSection>
                    )}

                    <GenerateButton
                      onClick={handleSubmit}
                      disabled={!selectedFile || isLoading}
                      $isLoading={isLoading}
                    >
                      {isLoading ? 'Generating Description...' : 'Generate Description'}
                    </GenerateButton>

                    {generatedDescription && (
                      <ResultSection>
                        <ResultTitle>Generated Description:</ResultTitle>
                        <ResultText>{generatedDescription}</ResultText>
                        <CopyButton onClick={handleCopy}>
                          {copied ? 'Copied!' : 'Copy to Clipboard'}
                        </CopyButton>
                      </ResultSection>
                    )}
                  </UploadCard>
                </UploadSection>
                
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
