import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LogOut, Bird, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user, logout, token } = useAuth();
    const { t } = useLanguage();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (user && token) {
            fetchHistory();
        }
    }, [user, token]);

    const fetchHistory = async () => {
        try {
            const response = await axios.get('/api/history');
            setHistory(response.data);
        } catch (err) {
            console.error('Error fetching history:', err);
        }
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 lg:hidden transition-opacity duration-300"
                    onClick={toggleSidebar}
                />
            )}

            <aside className={`fixed top-0 left-0 h-full bg-white/70 backdrop-blur-xl border-r border-white/40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 transition-transform duration-300 w-80 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
                <div className="flex flex-col h-full relative">
                    {/* Decorative blurred blob */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>

                    {/* Header */}
                    <div className="p-8 pb-4 relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20">
                                <Bird className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-800 tracking-tight">IberBirds</h1>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-emerald-500" />
                            <h2 className="text-xl font-extrabold tracking-tight text-gray-900 font-sans">
                                {t('sidebar_recent')}
                            </h2>
                        </div>
                        <p className="text-xs text-gray-500 font-medium pl-6">{t('sidebar_subtitle')}</p>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 relative z-10 scrollbar-hide">
                        {!user ? (
                            <div className="mx-2 p-6 bg-white/50 border border-white/60 rounded-3xl text-center shadow-sm backdrop-blur-sm">
                                <p className="text-sm text-gray-600 mb-4 font-medium leading-relaxed">
                                    {t('sidebar_join')}
                                </p>
                                <Link 
                                    to="/login"
                                    className="inline-flex w-full justify-center items-center bg-gray-900 text-white text-sm font-bold py-3 rounded-xl hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
                                >
                                    {t('nav_login_access')}
                                </Link>
                            </div>
                        ) : history.length === 0 ? (
                            <div className="text-center py-12 opacity-60">
                                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-sm text-gray-400 font-medium">{t('sidebar_empty')}</p>
                            </div>
                        ) : (
                            history.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/share/${item.id}`}
                                    className="flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-white/40 border-l-[3px] border-transparent hover:border-emerald-400 hover:shadow-[0_4px_20px_-4px_rgba(16,185,129,0.1)] group relative overflow-hidden"
                                    onClick={toggleSidebar}
                                >
                                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-white/50 bg-gray-50">
                                        <img 
                                            src={`${item.image_url}`} 
                                            alt="Bird" 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-800 truncate leading-tight group-hover:text-emerald-700 transition-colors">
                                            {item.detections[0]?.class_name?.replace(/_/g, ' ') || t('sidebar_unidentified')}
                                        </p>
                                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-1">
                                            {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {user && (
                        <div className="p-6 relative z-10">
                            <button 
                                onClick={logout}
                                className="group flex items-center gap-3 w-full p-3 rounded-xl text-red-500 font-semibold hover:bg-gradient-to-r hover:from-red-50/80 hover:to-transparent transition-all duration-300 hover:pl-5"
                            >
                                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                {t('nav_logout')}
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;