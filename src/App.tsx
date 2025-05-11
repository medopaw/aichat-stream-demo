import React, { useState } from 'react';
import Header from './components/Header';
import ApiKeyInput from './components/ApiKeyInput';
import ApiParameters from './components/ApiParameters';
import ChatInput from './components/ChatInput';
import ResponseDisplay from './components/ResponseDisplay';
import { LanguageProvider } from './contexts/LanguageContext';
import Notification, { NotificationType } from './components/Notification';
import { streamDeepSeekResponse } from './services/deepseekApi';

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [maxTokens, setMaxTokens] = useState<number>(1024);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [response, setResponse] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [rawData, setRawData] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type });
  };

  const handleSendMessage = async (message: string) => {
    if (!apiKey) {
      showNotification('Please enter your DeepSeek API key first.', 'error');
      return;
    }

    setIsStreaming(true);
    setResponse('');
    setRawData('');

    await streamDeepSeekResponse(
      {
        apiKey,
        prompt: message,
        maxTokens,
        temperature,
      },
      {
        onRawData: (data) => {
          setRawData((prev) => prev + data + '\n');
        },
        onChunk: (chunk) => {
          setResponse((prev) => prev + chunk);
        },
        onComplete: () => {
          setIsStreaming(false);
        },
        onError: (error) => {
          showNotification(error.message, 'error');
          setIsStreaming(false);
        },
      }
    );
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <ApiKeyInput onApiKeyChange={setApiKey} />
          
          <ApiParameters
            maxTokens={maxTokens}
            temperature={temperature}
            onMaxTokensChange={setMaxTokens}
            onTemperatureChange={setTemperature}
            onInvalid={(message) => showNotification(message, 'error')}
          />
          
          <ChatInput
            onSendMessage={handleSendMessage}
            isWaitingForResponse={isStreaming}
          />
          
          <ResponseDisplay 
            response={response}
            isStreaming={isStreaming}
            rawData={rawData}
          />

          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;