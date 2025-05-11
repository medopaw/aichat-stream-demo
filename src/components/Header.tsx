import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t, toggleLocale } = useLanguage();

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{t('appTitle')}</h1>
        <p className="text-sm text-gray-600">{t('appDescription')}</p>
      </div>
      <button
        onClick={toggleLocale}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle language"
      >
        <Globe size={18} />
        <span>{t('languageToggle')}</span>
      </button>
    </header>
  );
};

export default Header;