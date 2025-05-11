import React, { useState } from 'react';
import { Key, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Key size={18} className="text-gray-600" />
        <label htmlFor="apiKey" className="font-medium">
          {t('apiKeyLabel')}
        </label>
      </div>
      <div className="flex gap-2">
        <input
          id="apiKey"
          type="password"
          onChange={(e) => onApiKeyChange(e.target.value.trim())}
          placeholder={t('apiKeyPlaceholder')}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}

export default ApiKeyInput;