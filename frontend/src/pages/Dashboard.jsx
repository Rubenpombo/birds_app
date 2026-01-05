import React, { useState } from 'react';
import { Upload, Feather, Loader2, AlertCircle, Download, Share2, Menu, LogIn, Camera, Image as ImageIcon, Home as HomeIcon } from 'lucide-react';
import clsx from 'clsx';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Sidebar from '../components/Sidebar';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [sharing, setSharing] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleIdentify = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/detect', formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(t('tool_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result || !result.image_base64) return;
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${result.image_base64}`;
    link.download = 'iberbirds_result.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!result) return;
    if (!user) {
        alert(t('tool_login_share'));
        return;
    }

    setSharing(true);
    try {
        const response = await axios.post('/api/share', {
            image_base64: result.image_base64,
            detections: result.detections
        });
        const shareId = response.data.id;
        const shareUrl = `${window.location.origin}/share/${shareId}`;
        await navigator.clipboard.writeText(shareUrl);
        alert(`${t('tool_share_success')}: ${shareUrl}`);
    } catch (e) {
        console.error(e);
        alert("Error al compartir.");
    } finally {
        setSharing(false);
    }
  };

  return (
    <div className="flex h-screen bg-nature-50 overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-y-auto scroll-smooth relative">
        {/* App Header */}
        <header className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-md border-b border-nature-100 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                 <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 hover:bg-nature-100 rounded-lg transition-colors text-nature-700"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <Link to="/" className="text-earth-dark font-bold flex items-center gap-2 hover:opacity-70 transition-opacity">
                    <HomeIcon className="w-5 h-5 mb-0.5" />
                    <span className="hidden sm:inline">{t('nav_landing')}</span>
                </Link>
            </div>
         
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher className="text-earth-dark/60 hover:text-earth-dark hover:bg-nature-100" />
            
            {!user ? (
              <Link 
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-earth-dark text-white rounded-lg hover:bg-earth-dark/90 transition-colors font-medium shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('nav_signin')}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-nature-100 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-nature-700 font-medium text-sm">
                      <span className="font-bold">{user.username}</span>
                  </span>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-6xl">
                 <div className="text-center mb-8 animate-in slide-in-from-top-4">
                    <h1 className="text-3xl font-black text-earth-dark mb-2">{t('tool_title')}</h1>
                    <p className="text-nature-600">{t('tool_subtitle')}</p>
                </div>

                 <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-nature-200/50 border border-nature-100 min-h-[600px] flex flex-col relative overflow-hidden">
                        
                        {/* SPLIT VIEW (When Result Exists) */}
                        <div className="flex-1 flex flex-col lg:flex-row gap-8 items-start relative">
                            
                            {/* LEFT SIDE: UPLOAD / SOURCE */}
                            <div className={clsx(
                                "w-full transition-all duration-500 ease-out",
                                result ? "lg:w-1/3 order-2 lg:order-1" : "lg:w-full"
                            )}>
                                {/* Source Thumbnail (Active when result exists) */}
                                {result && preview && (
                                    <div className="mb-4 animate-in fade-in">
                                        <p className="text-xs font-bold uppercase tracking-wider text-nature-600 mb-2">{t('tool_original')}</p>
                                        <div className="relative group rounded-2xl overflow-hidden border-2 border-nature-200 aspect-video bg-gray-100">
                                            <img src={preview} alt="Source" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            <button 
                                                onClick={() => document.getElementById('file-upload').click()}
                                                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all text-white font-medium"
                                            >
                                                {t('tool_change')}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Main Dropzone (Hidden or minimized when result exists) */}
                                <div 
                                    className={clsx(
                                        "relative border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden bg-white shadow-sm hover:shadow-md",
                                        result ? "hidden" : "h-[450px]",
                                        dragActive ? "border-earth-teal bg-nature-50 scale-[1.01]" : "border-nature-200 hover:border-earth-teal",
                                        preview && !result ? "border-solid" : ""
                                    )}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => !loading && document.getElementById('file-upload').click()}
                                >
                                    <input 
                                        type="file" 
                                        id="file-upload" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    
                                    {preview && !result ? (
                                        <div className="w-full h-full relative group flex items-center justify-center bg-gray-50">
                                            <img 
                                                src={preview} 
                                                alt="Preview" 
                                                className="max-h-full max-w-full object-contain p-4" 
                                            />
                                            {!loading && (
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold backdrop-blur-sm">
                                                    {t('tool_change')}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        !result && (
                                            <div className="flex flex-col items-center pointer-events-none p-8 text-center">
                                                <div className="p-5 bg-nature-50 rounded-full mb-4 text-earth-teal animate-bounce">
                                                    <Upload className="w-8 h-8" />
                                                </div>
                                                <p className="text-xl font-bold text-earth-dark mb-1">{t('tool_drag')}</p>
                                                <p className="text-gray-400 text-sm">{t('tool_browse')}</p>
                                            </div>
                                        )
                                    )}
                                </div>
                                
                                {/* Error Message */}
                                {error && (
                                    <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100 animate-in fade-in">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <p className="font-medium text-sm">{error}</p>
                                    </div>
                                )}

                                {/* Identify Button (Only visible when file selected & no result yet) */}
                                {selectedFile && !result && (
                                   <button 
                                        onClick={handleIdentify}
                                        disabled={loading}
                                        className="w-full mt-6 bg-earth-dark hover:bg-earth-dark/90 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
                                     >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Feather className="w-5 h-5" />}
                                        {loading ? t('tool_analyzing') : t('tool_identify')}
                                     </button>
                                )}
                            </div>

                            {/* RIGHT SIDE: RESULTS STAGE (Only visible when result exists) */}
                            {result && (
                                <div className="w-full lg:w-2/3 lg:order-2 flex flex-col h-full animate-in slide-in-from-right-8 duration-500">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-earth-dark flex items-center gap-2">
                                            <ImageIcon className="w-5 h-5 text-earth-teal" />
                                            {t('tool_result')}
                                        </h3>
                                        <div className="flex gap-2">
                                            <button onClick={handleDownload} className="p-2 hover:bg-nature-100 rounded-full text-earth-dark transition-colors" title={t('tool_download')}>
                                                <Download className="w-5 h-5" />
                                            </button>
                                            <button onClick={handleShare} disabled={!user} className={clsx("p-2 rounded-full transition-colors", user ? "hover:bg-nature-100 text-earth-dark" : "text-gray-300 cursor-not-allowed")} title={t('tool_share')}>
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Main Result Image */}
                                    <div className="flex-1 bg-gray-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center relative min-h-[500px]">
                                        <img 
                                            src={`data:image/jpeg;base64,${result.image_base64}`} 
                                            alt="Analyzed" 
                                            className="w-full h-full object-contain max-h-[600px]"
                                        />
                                        {/* Overlay Confidence Tags */}
                                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                            {result.detections.map((det, idx) => (
                                                <div key={idx} className="bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/20 text-xs font-mono flex items-center gap-2 shadow-lg">
                                                    <span className="font-bold text-earth-sand">{det.class_name.replace(/_/g, ' ')}</span>
                                                    <span className={clsx("px-1.5 py-0.5 rounded", det.confidence > 0.8 ? "bg-green-500/80" : "bg-yellow-500/80")}>
                                                        {(det.confidence * 100).toFixed(0)}%
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="mt-6 flex justify-end">
                                        <button 
                                            onClick={() => {setResult(null); setSelectedFile(null); setPreview(null);}}
                                            className="bg-earth-sand hover:bg-earth-sand/80 text-earth-dark font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
                                        >
                                            <Upload className="w-4 h-4" />
                                            {t('tool_process_another')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
            </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
