import React, { useState } from 'react';
import { AlertCircle, Sliders } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ApiParametersProps {
  maxTokens: number;
  temperature: number;
  onMaxTokensChange: (value: number) => void;
  onTemperatureChange: (value: number) => void;
  onInvalid: (message: string) => void;
}

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  onInvalid: (message: string) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, min, max, step = 1, onInvalid }) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const [prevValue, setPrevValue] = useState(value);

  const validateAndUpdate = (newValue: string) => {
    const num = Number(newValue);
    if (isNaN(num) || num < min || num > max) {
      onInvalid(`Value must be between ${min} and ${max}`);
      setInputValue(prevValue.toString());
      return;
    }
    setPrevValue(num);
    onChange(num);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={() => validateAndUpdate(inputValue)}
      className="w-16 px-2 py-1 border border-gray-300 rounded text-center ml-3"
    />
  );
};

const ApiParameters: React.FC<ApiParametersProps> = ({
  maxTokens,
  temperature,
  onMaxTokensChange,
  onTemperatureChange,
  onInvalid,
}) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Sliders size={18} className="text-gray-600" />
        <h3 className="font-medium">API Parameters</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-700 mb-1">
            {t('maxTokensLabel')}:
            <NumberInput
              value={maxTokens}
              onChange={onMaxTokensChange}
              min={512}
              max={4096}
              onInvalid={onInvalid}
            />
          </label>
          <input
            id="maxTokens"
            type="range"
            min="512"
            max="4096"
            value={maxTokens}
            onChange={(e) => onMaxTokensChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>512</span>
            <span>4096</span>
          </div>
        </div>
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">
            {t('temperatureLabel')}:
            <NumberInput
              value={temperature}
              onChange={onTemperatureChange}
              min={0}
              max={1}
              step={0.1}
              onInvalid={onInvalid}
            />
          </label>
          <input
            id="temperature"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => onTemperatureChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.0</span>
            <span>1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiParameters;
