import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Showcase from './components/Showcase';
import FeaturesSection from './components/FeaturesSection';
import FAQSection from './components/FAQSection';
import AdBanner from './components/AdBanner';
import { testAWSConnection } from './services/awsService';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0a0a0a;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
`;

const UploadContainer = styled.div`
  border: 2px dashed #444;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: border-color 0.3s;

  &:hover {
    border-color: #666;
  }
`;

const UploadBox = styled.div<{ $dragActive: boolean }>`
  border: ${({ $dragActive }) => ($dragActive ? '2px dashed #666' : '2px dashed #444')};
  padding: 2rem;
  border-radius: 8px;
  transition: border-color 0.3s;

  &:hover {
    border-color: #666;
  }
`;

const UploadIcon = styled.div`
  font-size: 4rem;
  color: #666;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 1rem;
`;

const UploadButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button<{ $isLoading: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${({ $isLoading }) => ($isLoading ? '#666' : '#007bff')};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: ${({ $isLoading }) => ($isLoading ? '#666' : '#0056b3')};
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ResultTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const ResultText = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 1rem;
`;

const CopyButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const DescriptionTypeSelect = styled.select`
  padding: 0.75rem 1.5rem;
  background-color: #1f2937;
  color: #e5e7eb;
  border: 1px solid #374151;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 300px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const HeroCard = styled.div`
  max-width: 900px;
  margin: 0 auto 2.5rem auto;
  background: #23272f;
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.18);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  color: #d1d5db;
  margin-bottom: 2rem;
  text-align: center;
`;

const DragDropArea = styled.div<{ $dragActive: boolean }>`
  border: 2.5px dashed ${({ $dragActive }) => ($dragActive ? '#3b82f6' : '#444b5a')};
  background: #23272f;
  border-radius: 12px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  transition: border-color 0.3s;
  margin-bottom: 1.5rem;
  width: 100%;
  cursor: pointer;
`;

const UploadIconLarge = styled.div`
  font-size: 3.5rem;
  color: #3b82f6;
  margin-bottom: 1rem;
`;

const UploadTextLarge = styled.p`
  font-size: 1.15rem;
  color: #b0b3b8;
  margin-bottom: 1rem;
`;

const UploadButtonLarge = styled.button`
  padding: 1rem 2.2rem;
  background-color: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: #2563eb;
  }
`;

const PreviewImageFrame = styled.div`
  background: #181a20;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  display: flex;
  justify-content: center;
`;

const ErrorMessageModern = styled.div`
  color: #fff;
  background: #ef4444;
  font-size: 1.08rem;
  margin-bottom: 1.2rem;
  padding: 0.9rem 1.2rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
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
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

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

  const handleTestConnection = async () => {
    const result = await testAWSConnection();
    setTestResult(result);
  };

  return (
    <>
      <Navbar />
      <MainContent>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroCard>
                  <HeroTitle>AI Image Description Generator</HeroTitle>
                  <HeroDescription>
                    Upload an image and let our AI generate a description for you.
                  </HeroDescription>
                  
                  <Button 
                    onClick={handleTestConnection}
                    style={{ marginBottom: '1rem', backgroundColor: '#4CAF50' }}
                    $isLoading={false}
                  >
                    Test AWS Connection
                  </Button>
                  
                  {testResult && (
                    <div style={{ 
                      marginBottom: '1rem',
                      padding: '1rem',
                      backgroundColor: testResult.success ? '#4CAF50' : '#f44336',
                      color: 'white',
                      borderRadius: '4px'
                    }}>
                      {testResult.message}
                    </div>
                  )}

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
                      <PreviewImageFrame>
                        <PreviewImage src={previewUrl} alt="Preview" />
                      </PreviewImageFrame>
                    ) : (
                      <>
                        <UploadIconLarge>📁</UploadIconLarge>
                        <UploadTextLarge>
                          Drag and drop your image here, or click to select
                        </UploadTextLarge>
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
                        <UploadButtonLarge>
                          Select Image
                        </UploadButtonLarge>
                      </>
                    )}
                  </DragDropArea>

                  {error && <ErrorMessageModern>{error}</ErrorMessageModern>}

                  {selectedFile && (
                    <DescriptionTypeSelect
                      value={descriptionType}
                      onChange={(e) => setDescriptionType(e.target.value)}
                    >
                      <option value="title">Product Title</option>
                      <option value="brief">Brief Description</option>
                      <option value="detailed">Detailed Description</option>
                    </DescriptionTypeSelect>
                  )}

                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedFile || isLoading}
                    $isLoading={isLoading}
                    style={{ width: '100%', marginTop: '1.2rem' }}
                  >
                    {isLoading ? 'Generating...' : 'Generate Description'}
                  </Button>

                  {generatedDescription && (
                    <ResultContainer>
                      <ResultTitle>Generated Description:</ResultTitle>
                      <ResultText>{generatedDescription}</ResultText>
                      <CopyButton onClick={handleCopy}>
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                      </CopyButton>
                    </ResultContainer>
                  )}
                </HeroCard>
                
                <Showcase />
                <FeaturesSection />
                <FAQSection />
              </>
            }
          />
        </Routes>
      </MainContent>
      <Footer />
    </>
  );
}

export default App;
