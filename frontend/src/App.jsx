import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Detector from './pages/Detector';
import Landing from './pages/Landing';
import { AuthProviderWrapper as LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Detector />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
    </LanguageProvider>
  );
}

export default App;