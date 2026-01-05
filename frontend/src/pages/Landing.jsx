import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpeciesShowcase from '../components/SpeciesShowcase';
import HowItWorks from '../components/HowItWorks';
import landingBg from '../assets/landing_bg.png';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Landing = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-earth-sand font-sans">
        {/* Custom Hero Section for Landing */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                src={landingBg} 
                alt="Iberian Nature" 
                className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-earth-dark/40 backdrop-blur-[2px]"></div>
            </div>
            
            {/* Language Switcher Overlay */}
            <div className="absolute top-6 right-6 z-50">
                <LanguageSwitcher className="text-white bg-white/10 backdrop-blur-md hover:bg-white/20 border-white/20" />
            </div>

            {/* Glassmorphism Content */}
            <div className="relative z-10 px-4 w-full max-w-4xl text-center">
                <div className="bg-earth-dark/30 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-glass text-white transform hover:scale-[1.01] transition-transform duration-500 animate-in fade-in zoom-in-95 duration-700">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                    {t('hero_title_1')} <br/>
                    <span className="text-earth-sand">{t('hero_title_2')}</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
                    {t('hero_desc')} 
                    <span className="font-semibold text-white"> {t('hero_desc_highlight')} </span> 
                    {t('hero_desc_end')}
                </p>

                <Link 
                    to="/app"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-earth-sand text-earth-dark font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {t('hero_cta')}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </Link>
                </div>
            </div>
        </section>

        <SpeciesShowcase />
        <HowItWorks />

        <footer className="bg-earth-dark py-12 text-center text-earth-sand/40 border-t border-white/5">
            <p>© 2026 IberBirds Project. {t('footer_text')}</p>
        </footer>
    </div>
  );
};

export default Landing;