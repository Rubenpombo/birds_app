import React from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Import all bird images
import ciconiaCiconiaImg from '../assets/birds/ciconia_ciconia.png';
import ciconiaNigraImg from '../assets/birds/ciconia_nigra.png';
import aegypiusMonachusImg from '../assets/birds/Aegypius_monachus.png';
import gypsFulvusImg from '../assets/birds/Gyps_Fulvus.png';
import milvusMilvusImg from '../assets/birds/Milvus_Milvus.png';
import milvusMigransImg from '../assets/birds/Milvus_Migrans.png';
import neophronPercnopterusImg from '../assets/birds/Neophron_Pernocterus.png';
import falcoPeregrinusImg from '../assets/birds/Falco_Peregrinus.png';
import aquilaChrysaetosImg from '../assets/birds/Aquila_chrysaetos.png';
import aquilaAdalbertiImg from '../assets/birds/Aquila_adalberti.png';

const getSpeciesData = (t) => [
  {
    id: 1,
    scientific: "Ciconia ciconia",
    common: t('bird_1_common'),
    fact: t('bird_1_fact'),
    image: ciconiaCiconiaImg
  },
  {
    id: 2,
    scientific: "Ciconia nigra",
    common: t('bird_2_common'),
    fact: t('bird_2_fact'),
    image: ciconiaNigraImg
  },
  {
    id: 3,
    scientific: "Aegypius monachus",
    common: t('bird_3_common'),
    fact: t('bird_3_fact'),
    image: aegypiusMonachusImg
  },
  {
    id: 4,
    scientific: "Gyps fulvus",
    common: t('bird_4_common'),
    fact: t('bird_4_fact'),
    image: gypsFulvusImg
  },
  {
    id: 5,
    scientific: "Milvus milvus",
    common: t('bird_5_common'),
    fact: t('bird_5_fact'),
    image: milvusMilvusImg
  },
  {
    id: 6,
    scientific: "Milvus migrans",
    common: t('bird_6_common'),
    fact: t('bird_6_fact'),
    image: milvusMigransImg
  },
  {
    id: 7,
    scientific: "Neophron percnopterus",
    common: t('bird_7_common'),
    fact: t('bird_7_fact'),
    image: neophronPercnopterusImg
  },
  {
    id: 8,
    scientific: "Falco peregrinus",
    common: t('bird_8_common'),
    fact: t('bird_8_fact'),
    image: falcoPeregrinusImg
  },
  {
    id: 9,
    scientific: "Aquila chrysaetos",
    common: t('bird_9_common'),
    fact: t('bird_9_fact'),
    image: aquilaChrysaetosImg
  },
  {
    id: 10,
    scientific: "Aquila adalberti",
    common: t('bird_10_common'),
    fact: t('bird_10_fact'),
    image: aquilaAdalbertiImg
  }
];

const SpeciesShowcase = () => {
  const { t } = useLanguage();
  const speciesData = getSpeciesData(t);

  return (
    <section id="species-showcase" className="py-20 bg-earth-sand px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-earth-dark mb-4 tracking-tight">{t('species_title')}</h2>
          <p className="text-earth-dark/70 max-w-2xl mx-auto font-light">
            {t('species_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {speciesData.map((bird) => (
            <div 
              key={bird.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-earth-dark/5 flex flex-col h-full"
            >
              {/* Illustration Header */}
              <div className="relative aspect-square overflow-hidden bg-nature-50">
                <img 
                  src={bird.image} 
                  alt={bird.common} 
                  className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 text-[10px] font-mono font-bold bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-earth-dark shadow-sm">
                  ID: 0{bird.id}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-earth-dark mb-1 group-hover:text-earth-teal transition-colors">{bird.common}</h3>
                <p className="text-[11px] font-mono text-earth-teal/60 italic mb-4 uppercase tracking-wider">{bird.scientific}</p>
                
                <div className="mt-auto pt-4 border-t border-earth-sand">
                  <p className="text-xs text-earth-dark/60 leading-relaxed flex gap-2">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-earth-teal" />
                    {bird.fact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeciesShowcase;
