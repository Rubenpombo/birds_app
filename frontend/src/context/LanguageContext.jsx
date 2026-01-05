import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Hero
    hero_title_1: "The Digital Eye of",
    hero_title_2: "Iberian Ornithology",
    hero_desc: "Bridging Artificial Intelligence and Biodiversity. We identify and document the",
    hero_desc_highlight: "10 key species",
    hero_desc_end: "of the Iberian Peninsula to promote conservation and scientific awareness.",
    hero_cta: "Enter Application",
    
    // Species Showcase
    species_title: "Supported Species",
    species_desc: "Our specialized model is trained to recognize these 10 distinct species, helping you catalog the biodiversity of the Iberian skies.",
    
    // Birds Common Names & Facts
    bird_1_common: "White Stork",
    bird_1_fact: "Sign of good luck and new beginnings.",
    bird_2_common: "Black Stork",
    bird_2_fact: "Elusive forest dweller, unlike its urban cousin.",
    bird_3_common: "Cinereous Vulture",
    bird_3_fact: "Largest Old World vulture with a 3m wingspan.",
    bird_4_common: "Griffon Vulture",
    bird_4_fact: "Colonial nester on steep cliffs and gorges.",
    bird_5_common: "Red Kite",
    bird_5_fact: "Distinctive forked tail and graceful flight.",
    bird_6_common: "Black Kite",
    bird_6_fact: "The world's most abundant bird of prey.",
    bird_7_common: "Egyptian Vulture",
    bird_7_fact: "Tool-user: breaks eggs with stones.",
    bird_8_common: "Peregrine Falcon",
    bird_8_fact: "Fastest animal, diving at over 240mph.",
    bird_9_common: "Golden Eagle",
    bird_9_fact: "Revered national symbol across the globe.",
    bird_10_common: "Spanish Imperial Eagle",
    bird_10_fact: "Endemic to Iberia, known for white 'epaulettes'.",

    // How It Works
    hiw_title: "How It Works",
    hiw_subtitle: "From the field to the cloud in three simple steps.",
    hiw_step1_title: "Capture",
    hiw_step1_desc: "Upload a clear photo from your field trips. Our system accepts various formats and optimizes them for analysis.",
    hiw_step2_title: "Analyze",
    hiw_step2_desc: "Our custom-trained YOLO11 model identifies morphology and patterns to classify the species with high precision.",
    hiw_step3_title: "Document",
    hiw_step3_desc: "Save your findings to your personal history and contribute to the local sighting database for conservation efforts.",

    // Dashboard & Tool
    tool_title: "Identification Tool",
    tool_subtitle: "Upload your sighting to classify the species",
    tool_drag: "Drag & Drop Image",
    tool_browse: "or click to browse files",
    tool_original: "Original Source",
    tool_change: "Change Image",
    tool_analyzing: "Analyzing...",
    tool_identify: "Identify Species",
    tool_result: "Analysis Result",
    tool_process_another: "Process another image",
    tool_download: "Download",
    tool_share: "Share",
    tool_error: "Failed to identify bird. Please try again.",
    tool_login_share: "You must login to share and save to history.",
    tool_share_success: "Link copied to clipboard!",
    
    // Auth & Navigation
    nav_landing: "Landing",
    nav_signin: "Sign In",
    nav_logout: "Sign Out",
    nav_login_access: "Login Access",
    nav_welcome: "Hello",
    login_title: "Welcome Back",
    login_subtitle: "Enter your credentials to access your account",
    login_btn: "Sign In",
    login_no_account: "Don't have an account?",
    login_register_link: "Register for free",
    register_title: "Create Account",
    register_subtitle: "Join the community of naturalists",
    register_btn: "Create Account",
    register_have_account: "Already have an account?",
    register_login_link: "Sign in",
    form_username: "Username",
    form_password: "Password",
    
    // Sidebar
    sidebar_recent: "Recent Sightings",
    sidebar_subtitle: "Your collection from the field",
    sidebar_join: "Join the community to track your avian discoveries.",
    sidebar_empty: "No sightings recorded yet.",
    sidebar_unidentified: "Unidentified",

    // Shared Result
    shared_badge: "Shared Discovery",
    shared_return: "Return Home",
    shared_back: "Back",
    shared_try: "Try it Yourself",
    shared_not_found: "Shared result not found.",
    
    // Footer
    footer_text: "Preserving biodiversity through technology."
  },
  es: {
    // Hero
    hero_title_1: "El Ojo Digital de la",
    hero_title_2: "Ornitología Ibérica",
    hero_desc: "Uniendo Inteligencia Artificial y Biodiversidad. Identificamos y documentamos las",
    hero_desc_highlight: "10 especies clave",
    hero_desc_end: "de la Península Ibérica para promover la conservación y conciencia científica.",
    hero_cta: "Entrar a la Aplicación",
    
    // Species Showcase
    species_title: "Especies Soportadas",
    species_desc: "Nuestro modelo especializado está entrenado para reconocer estas 10 especies distintas, ayudándote a catalogar la biodiversidad de los cielos ibéricos.",
    
    // Birds Common Names & Facts
    bird_1_common: "Cigüeña Blanca",
    bird_1_fact: "Símbolo de buena suerte y nuevos comienzos.",
    bird_2_common: "Cigüeña Negra",
    bird_2_fact: "Huidiza habitante del bosque, a diferencia de su prima urbana.",
    bird_3_common: "Buitre Negro",
    bird_3_fact: "El buitre más grande del Viejo Mundo con 3m de envergadura.",
    bird_4_common: "Buitre Leonado",
    bird_4_fact: "Anida en colonias en acantilados y desfiladeros escarpados.",
    bird_5_common: "Milano Real",
    bird_5_fact: "Distintiva cola ahorquillada y vuelo elegante.",
    bird_6_common: "Milano Negro",
    bird_6_fact: "El ave de presa más abundante del mundo.",
    bird_7_common: "Alimoche",
    bird_7_fact: "Usa herramientas: rompe huevos con piedras.",
    bird_8_common: "Halcón Peregrino",
    bird_8_fact: "El animal más rápido, picando a más de 380 km/h.",
    bird_9_common: "Águila Real",
    bird_9_fact: "Venerado símbolo nacional en todo el mundo.",
    bird_10_common: "Águila Imperial Ibérica",
    bird_10_fact: "Endémica de la península, conocida por sus 'hombreras' blancas.",

    // How It Works
    hiw_title: "Cómo Funciona",
    hiw_subtitle: "Del campo a la nube en tres simples pasos.",
    hiw_step1_title: "Captura",
    hiw_step1_desc: "Sube una foto clara de tus salidas de campo. Nuestro sistema acepta varios formatos y los optimiza para el análisis.",
    hiw_step2_title: "Analiza",
    hiw_step2_desc: "Nuestro modelo YOLO11 identifica morfología y patrones para clasificar la especie con alta precisión.",
    hiw_step3_title: "Documenta",
    hiw_step3_desc: "Guarda tus hallazgos en tu historial personal y contribuye a la base de datos local para esfuerzos de conservación.",

    // Dashboard & Tool
    tool_title: "Herramienta de Identificación",
    tool_subtitle: "Sube tu avistamiento para clasificar la especie",
    tool_drag: "Arrastra y Suelta",
    tool_browse: "o click para buscar",
    tool_original: "Fuente Original",
    tool_change: "Cambiar Imagen",
    tool_analyzing: "Analizando...",
    tool_identify: "Identificar Especie",
    tool_result: "Resultado del Análisis",
    tool_process_another: "Procesar otra imagen",
    tool_download: "Descargar",
    tool_share: "Compartir",
    tool_error: "Fallo al identificar el ave. Inténtalo de nuevo.",
    tool_login_share: "Debes iniciar sesión para compartir y guardar.",
    tool_share_success: "¡Enlace copiado al portapapeles!",
    
    // Auth & Navigation
    nav_landing: "Inicio",
    nav_signin: "Iniciar Sesión",
    nav_logout: "Cerrar Sesión",
    nav_login_access: "Acceso Login",
    nav_welcome: "Hola",
    login_title: "Bienvenido de nuevo",
    login_subtitle: "Introduce tus credenciales para acceder",
    login_btn: "Entrar",
    login_no_account: "¿No tienes cuenta?",
    login_register_link: "Regístrate gratis",
    register_title: "Crear Cuenta",
    register_subtitle: "Únete a la comunidad de naturalistas",
    register_btn: "Crear Cuenta",
    register_have_account: "¿Ya tienes cuenta?",
    register_login_link: "Inicia sesión",
    form_username: "Usuario",
    form_password: "Contraseña",
    
    // Sidebar
    sidebar_recent: "Avistamientos Recientes",
    sidebar_subtitle: "Tu colección de campo",
    sidebar_join: "Únete a la comunidad para rastrear tus descubrimientos.",
    sidebar_empty: "Sin avistamientos registrados.",
    sidebar_unidentified: "No identificado",

    // Shared Result
    shared_badge: "Descubrimiento Compartido",
    shared_return: "Volver al Inicio",
    shared_back: "Volver",
    shared_try: "Pruébalo tú mismo",
    shared_not_found: "Resultado compartido no encontrado.",
    
    // Footer
    footer_text: "Preservando la biodiversidad a través de la tecnología."
  }
};

export const AuthProviderWrapper = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = (lang) => {
    if (lang) {
        setLanguage(lang);
    } else {
        setLanguage(prev => prev === 'en' ? 'es' : 'en');
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
