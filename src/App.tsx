import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from './components/Footer';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Showcase from './components/Showcase';
import FAQSection from './components/FAQSection';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
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
  margin-bottom: 1rem;
  line-height: 1.2;
  font-family: 'Syne', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.125rem;
  color: #374151;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
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
`;

const InfoSubtitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 2rem 0 1rem 0;
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
      <MainContent>
        <Routes>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route
            path="/"
            element={
              <>
                <HeroSection>
                  <Logo src="/logo.svg" alt="Free AI Description Generator Logo" />
                  <HeroTitle>Free AI Description Generator</HeroTitle>
                  <HeroDescription>
                    This Free AI Description Generator lets you upload any photo or image and instantly receive a detailed description. Unlike other services, it requires no login or email, is completely free to use, and works quickly and easily.
                  </HeroDescription>
                  
                  <InstructionsContainer>
                    <InstructionsTitle>How to use this tool:</InstructionsTitle>
                    
                    <InstructionStep>
                      <StepNumber>1</StepNumber>
                      <StepText>
                        Click the "Select Image" button and choose up to 1 image you wish to describe. You can also drag files to the drop area to start uploading.
                      </StepText>
                    </InstructionStep>
                    
                    <InstructionStep>
                      <StepNumber>2</StepNumber>
                      <StepText>
                        Choose your description type: Product Title, Brief Description, or Detailed Description based on your needs.
                      </StepText>
                    </InstructionStep>
                    
                    <InstructionStep>
                      <StepNumber>3</StepNumber>
                      <StepText>
                        Click "Generate Description" and let our AI analyze your image and create an accurate description for you.
                      </StepText>
                    </InstructionStep>
                    
                    <InstructionStep>
                      <StepNumber>4</StepNumber>
                      <StepText>
                        Copy the generated description to your clipboard and use it for your content, marketing, or accessibility needs.
                      </StepText>
                    </InstructionStep>
                    
                    <InstructionStep>
                      <StepNumber>5</StepNumber>
                      <StepText>
                        Want to analyze another image? Click "Upload New Image" to start over with a fresh photo and generate a new description.
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
                        <ResultTitle>
                          Generated Description
                        </ResultTitle>
                        <ResultText>{generatedDescription}</ResultText>
                        <CopyButton onClick={handleCopy}>
                          {copied ? 'Copied!' : 'Copy to Clipboard'}
                        </CopyButton>
                        <NewImageButton
                          onClick={handleUploadNewImage}
                          disabled={isLoading}
                        >
                          Upload New Image
                        </NewImageButton>
                      </ResultSection>
                    )}
                  </UploadCard>
                </UploadSection>

                <InfoSection>
                  <InfoCard>
                    <InfoTitle>Free AI Description Generator</InfoTitle>
                    
                    <InfoText>
                      Our free AI description generator transforms any image into detailed, professional descriptions in seconds. Whether you need product descriptions for e-commerce, image descriptions for accessibility, or content for marketing materials, this powerful image describer tool has you covered.
                    </InfoText>
                    
                    <InfoText>
                      This free description generator uses advanced artificial intelligence to analyze uploaded images and create accurate, detailed descriptions. From product photos to complex scenes, our AI description generator provides clear, readable summaries perfect for any use case.
                    </InfoText>
                    
                    <Divider />
                    
                    <InfoSubtitle>Why use our free AI description generator?</InfoSubtitle>
                    
                    <InfoText>
                      As a free description generator, this tool helps content creators, marketers, and business owners save time while improving their content quality. Product descriptions boost e-commerce sales, while detailed image descriptions improve SEO and make content accessible to visually impaired users.
                    </InfoText>
                    
                    <InfoText>
                      Our AI product description generator is perfect for e-commerce businesses looking to create compelling product descriptions quickly. The tool also serves as an image describer for organizing photo libraries, creating alt text, and supporting educational materials.
                    </InfoText>
                    
                    <InfoText>
                      Whether you're running an online store, managing social media, or creating accessible content, this free AI description generator streamlines your workflow while maintaining professional quality standards.
                    </InfoText>
                    
                    <Divider />
                    
                    <InfoSubtitle>How to use this free description generator</InfoSubtitle>
                    
                    <InfoText>
                      Using our AI description generator is simple: upload your image using the "Select Image" button or drag and drop your files. You can upload up to one file at once, and our description generator will process it instantly.
                    </InfoText>
                    
                    <InfoText>
                      Once uploaded, our AI description generator scans each image and produces a detailed written description. The generated description appears below your image preview, ready to copy to your clipboard or use directly in your projects.
                    </InfoText>
                    
                    <InfoText>
                      For multiple images, simply repeat the process. This free description generator has no usage limits, making it perfect for businesses and individuals who need consistent, high-quality descriptions.
                    </InfoText>
                    
                    <Divider />
                    
                    <InfoSubtitle>Is this description generator really free and secure?</InfoSubtitle>
                    
                    <InfoText>
                      Yes! Our AI description generator is completely free to use with no hidden costs or subscription requirements. Your images and generated descriptions remain private and secure, with all uploaded files automatically deleted within one hour.
                    </InfoText>
                    
                    <InfoText>
                      This free description generator ensures your data privacy while delivering professional-quality results, making it a trusted choice for businesses and individuals alike.
                    </InfoText>
                  </InfoCard>
                </InfoSection>
                
                {/* Benefits Section for Better SEO and User Understanding */}
                <InfoSection>
                  <InfoCard>
                    <InfoTitle>Powerful AI Image Description Features</InfoTitle>
                    
                    <InfoText>
                      <strong>Multiple Description Types:</strong> Choose from Product Title (concise branding), Brief Description (one-paragraph overview), or Detailed Description (comprehensive analysis) to match your specific needs.
                    </InfoText>
                    
                    <InfoText>
                      <strong>Advanced AI Technology:</strong> Our free AI description generator uses GPT-4 Vision technology to identify objects, people, colors, composition, and context with remarkable accuracy. Perfect for e-commerce product descriptions, accessibility alt text, and content creation.
                    </InfoText>
                    
                    <InfoText>
                      <strong>Instant Results:</strong> Upload any JPEG, PNG, or GIF image up to 5MB and receive professional descriptions in seconds. No waiting, no queues - just immediate, accurate descriptions for your images.
                    </InfoText>
                    
                    <InfoText>
                      <strong>SEO-Optimized Descriptions:</strong> Generated descriptions are naturally keyword-rich and perfect for improving your content's search engine visibility. Ideal for e-commerce websites, blog posts, and social media content.
                    </InfoText>
                    
                    <InfoText>
                      <strong>Privacy & Security:</strong> All uploaded images are automatically deleted within 1 hour. We never store your images permanently or share them with third parties, ensuring complete privacy protection.
                    </InfoText>
                    
                    <InfoText>
                      <strong>100% Free & Unlimited:</strong> No registration required, no hidden costs, no usage limits. Our AI image describer remains completely free for personal and commercial use, making it accessible to everyone.
                    </InfoText>
                    
                    <Divider />
                    
                    <InfoSubtitle>Who Benefits from Our AI Description Generator?</InfoSubtitle>
                    
                    <InfoText>
                      <strong>E-commerce Businesses:</strong> Create compelling product descriptions that boost conversion rates and improve SEO rankings. Our AI product description generator helps online stores save time while maintaining professional quality. <Link to="/blog/ecommerce-product-descriptions" style={{color: '#5653fa', textDecoration: 'none'}}>Learn more about e-commerce optimization →</Link>
                    </InfoText>
                    
                    <InfoText>
                      <strong>Content Creators & Marketers:</strong> Generate engaging descriptions for social media posts, blog content, and marketing materials. Perfect for creating accessible content that reaches wider audiences. <Link to="/blog/social-media-content-strategy" style={{color: '#5653fa', textDecoration: 'none'}}>Discover social media strategies →</Link>
                    </InfoText>
                    
                    <InfoText>
                      <strong>Web Developers & Designers:</strong> Quickly generate alt text for images to improve website accessibility and SEO. Essential for creating ADA-compliant websites that serve all users effectively. <Link to="/blog/accessibility-in-digital-content" style={{color: '#5653fa', textDecoration: 'none'}}>Read accessibility best practices →</Link>
                    </InfoText>
                    
                    <InfoText>
                      <strong>Educational Professionals:</strong> Create detailed image descriptions for educational materials, making content accessible to students with visual impairments while enhancing learning experiences.
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
