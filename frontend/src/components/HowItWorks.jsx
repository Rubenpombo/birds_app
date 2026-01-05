import React from 'react';
import { Camera, Cpu, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Camera,
      title: t('hiw_step1_title'),
      description: t('hiw_step1_desc')
    },
    {
      icon: Cpu,
      title: t('hiw_step2_title'),
      description: t('hiw_step2_desc')
    },
    {
      icon: FileText,
      title: t('hiw_step3_title'),
      description: t('hiw_step3_desc')
    }
  ];

  return (
    <section className="py-24 bg-earth-dark text-earth-sand px-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-nature-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-earth-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('hiw_title')}</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t('hiw_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-earth-dark border-2 border-nature-500/30 rounded-full flex items-center justify-center mb-8 group-hover:border-nature-400 group-hover:bg-nature-900/50 transition-all duration-500 shadow-[0_0_30px_rgba(77,136,122,0.2)]">
                <step.icon className="w-10 h-10 text-nature-300 group-hover:scale-110 transition-transform" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
              <p className="text-white/60 leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;