import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isWaitingForResponse: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isWaitingForResponse }) => {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSendMessage = () => {
    if (message.trim() && !isWaitingForResponse) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isWaitingForResponse) {
        onSendMessage(message);
      }
    }
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle size={18} className="text-gray-600" />
        <h3 className="font-medium">Chat Input</h3>
      </div>
      {message && (
        <button
          onClick={() => setMessage('')}
          className="absolute top-[3.2rem] right-3 p-2 hover:text-gray-700 transition-colors"
          aria-label={t('clearButton')}
        >
          <X size={18} className="text-gray-500" />
        </button>
      )}
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('messagePlaceholder')}
        disabled={isWaitingForResponse}
        className={`w-full min-h-[80px] max-h-[200px] border border-gray-300 rounded-md px-3 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
          isWaitingForResponse ? 'bg-gray-100 text-gray-500' : ''
        }`}
      />
      <div className="absolute bottom-6 right-6 flex gap-2">
        <button
          onClick={handleSendMessage}
          disabled={!message.trim() || isWaitingForResponse}
          className={`p-2 rounded-full transition-colors ${
            !message.trim() || isWaitingForResponse
              ? 'bg-gray-200 text-gray-400'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          aria-label={t('sendMessage')}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;