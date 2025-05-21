import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setError(''); // Clear any previous errors
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const apiUrl = process.env.REACT_APP_API_URL || 'https://description-908s.onrender.com';
      console.log('Sending request to:', apiUrl);
      
      const response = await fetch(`${apiUrl}/api/describe`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate description');
      }

      setDescription(data.description);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setDescription('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>AI Image Description Generator</h1>
        
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>

        {previewUrl && (
          <div className="preview-section">
            <h2>Preview</h2>
            <img src={previewUrl} alt="Preview" className="preview-image" />
          </div>
        )}

        <button 
          onClick={handleSubmit}
          disabled={!selectedImage || isLoading}
          className="generate-button"
        >
          {isLoading ? 'Generating...' : 'Generate Description'}
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {description && (
          <div className="description-section">
            <h2>Generated Description</h2>
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
