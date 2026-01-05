import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <button 
      onClick={() => setLanguage()}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all border border-transparent hover:border-current ${className}`}
      title="Switch Language"
    >
      <Globe className="w-3.5 h-3.5 opacity-70" />
      <span className={language === 'en' ? 'opacity-100' : 'opacity-50'}>EN</span>
      <span className="opacity-30">/</span>
      <span className={language === 'es' ? 'opacity-100' : 'opacity-50'}>ES</span>
    </button>
  );
};

export default LanguageSwitcher;
