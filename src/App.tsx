import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LanguageRedirect from './components/LanguageRedirect';
import LanguageWrapper from './components/LanguageWrapper';
import AppContent from './AppContent';
import './App.css';

const App: React.FC = () => {
  return (
        <Routes>
      {/* Root path redirects to user's preferred language */}
      <Route path="/" element={<LanguageRedirect />} />
      
      {/* Language-based routes */}
      <Route path="/:lang" element={<LanguageWrapper />}>
        <Route path="*" element={<AppContent />} />
      </Route>
        </Routes>
  );
};

export default App;