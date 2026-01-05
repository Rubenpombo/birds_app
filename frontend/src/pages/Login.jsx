import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import { Feather, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await axios.post('/api/token', formData);
      login(response.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-sand flex items-center justify-center p-4 relative font-sans">
      <Link to="/" className="absolute top-6 left-6 p-2 rounded-full bg-white/50 hover:bg-white transition-colors text-earth-dark">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="absolute top-6 right-6">
        <LanguageSwitcher className="text-earth-dark/60 hover:text-earth-dark hover:bg-white/50" />
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/40 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-nature-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-earth-accent/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-8">
             <div className="bg-earth-dark p-4 rounded-2xl shadow-lg rotate-3">
                <Feather className="w-8 h-8 text-earth-sand" />
             </div>
          </div>
          
          <h2 className="text-3xl font-black text-center text-earth-dark mb-2">{t('login_title')}</h2>
          <p className="text-center text-gray-500 mb-8">{t('login_subtitle')}</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4" />
                {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{t('form_username')}</label>
              <input
                type="text"
                className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-earth-teal focus:ring-0 focus:bg-white transition-all outline-none font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{t('form_password')}</label>
              <input
                type="password"
                className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-earth-teal focus:ring-0 focus:bg-white transition-all outline-none font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-earth-dark text-white font-bold py-4 rounded-xl hover:bg-earth-dark/90 transition-all transform active:scale-95 shadow-lg shadow-earth-dark/20 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('login_btn')}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            {t('login_no_account')} <Link to="/register" className="text-earth-teal font-bold hover:underline">{t('login_register_link')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;