import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Feather, Loader2, AlertCircle, Calendar, ArrowLeft } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function SharedResult() {
    const { id } = useParams();
    const { t } = useLanguage();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            if (id) {
                const response = await axios.get(`/api/share/${id}`);
                setResult(response.data);
            }
        } catch (err) {
        };
        fetchData();
    }, [id, t]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-earth-sand">
                <Loader2 className="w-10 h-10 animate-spin text-earth-teal" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-earth-sand p-4">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl flex flex-col items-center max-w-md w-full border border-red-100">
                    <div className="bg-red-50 p-4 rounded-full mb-4">
                        <AlertCircle className="w-12 h-12 text-red-600" />
                    </div>
                    <p className="text-xl font-bold text-gray-800 mb-6">{error}</p>
                    <Link to="/" className="bg-earth-dark text-white px-8 py-3 rounded-full font-bold hover:bg-earth-dark/90 transition-colors shadow-lg">
                        {t('shared_return')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4 lg:p-12 font-sans bg-earth-sand text-earth-dark relative">
             <div className="absolute top-6 right-6">
                <LanguageSwitcher className="text-earth-dark/60 hover:text-earth-dark hover:bg-white/50" />
             </div>

             <header className="mb-12 text-center">
                <Link to="/" className="flex flex-col items-center group">
                    <div className="bg-earth-dark p-3 rounded-2xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform mb-4">
                        <Feather className="w-10 h-10 text-earth-sand" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-earth-dark">IberBirds</h1>
                </Link>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-earth-teal/10 text-earth-teal rounded-full text-sm font-bold uppercase tracking-wider">
                    {t('shared_badge')}
                </div>
            </header>

            <main className="w-full max-w-4xl bg-white/50 backdrop-blur-md p-6 md:p-10 rounded-[3rem] shadow-glass border border-white/20 animate-in fade-in zoom-in-95 duration-500">
                                 <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                                     <img 
                                         src={`${result.image_url}`} 
                                         alt="Shared Bird" 
                                         className="w-full h-64 object-cover rounded-lg mb-4"
                                     />
                                     <h2 className="text-3xl font-bold text-green-800 mb-2">{result.species_name}</h2>
                
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        {data.detections.map((det, idx) => (
                            <div key={idx} className="flex justify-between items-center p-5 bg-white rounded-2xl border border-earth-dark/5 shadow-sm">
                                <div>
                                    <span className="text-lg font-bold text-earth-dark block">
                                        {det.class_name.replace(/_/g, ' ')}
                                    </span>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-32 bg-nature-100 rounded-full h-2">
                                            <div 
                                                className="bg-earth-teal h-2 rounded-full transition-all duration-1000" 
                                                style={{ width: `${det.confidence * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-mono font-bold text-earth-teal">{(det.confidence * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-earth-dark/5 gap-6">
                    <div className="flex items-center gap-3 text-earth-dark/40 text-sm font-medium">
                        <Calendar className="w-5 h-5" />
                        {new Date(data.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </div>
                    <div className="flex gap-4">
                        <Link 
                            to="/"
                            className="bg-earth-sand text-earth-dark border border-earth-dark/10 font-bold py-3.5 px-8 rounded-full transition-all hover:bg-white flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            {t('shared_back')}
                        </Link>
                        <Link 
                            to="/app"
                            className="bg-earth-dark hover:bg-earth-dark/90 text-white font-bold py-3.5 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5 rotate-180" />
                            {t('shared_try')}
                        </Link>
                    </div>
                </div>
            </main>
             <footer className="mt-16 text-earth-dark/20 text-sm font-medium">
                <p>© 2026 IberBirds Project</p>
            </footer>
        </div>
    );
}

export default SharedResult;
