import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Terminal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';

interface ResponseDisplayProps {
  response: string;
  isStreaming: boolean;
  rawData: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isStreaming, rawData }) => {
  const { t } = useLanguage();
  const [renderMarkdown, setRenderMarkdown] = useState(true);
  const responseRef = useRef<HTMLDivElement>(null);
  const rawDataRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomElementRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    if (responseRef.current && isStreaming) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response, isStreaming]);

  useEffect(() => {
    // 创建观察器
    observerRef.current = new IntersectionObserver(
      (entries) => {
        shouldScrollRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (rawDataRef.current && bottomElementRef.current && observerRef.current) {
      // 观察底部元素
      observerRef.current.observe(bottomElementRef.current);

      // 如果应该滚动，则滚动到底部
      if (shouldScrollRef.current) {
        rawDataRef.current.scrollTop = rawDataRef.current.scrollHeight;
      }
    }
  }, [rawData]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 overflow-hidden">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-gray-600" />
          <h3 className="font-medium mb-0">
            {isStreaming ? t('waitingForResponse') : 'DeepSeek AI'}
          </h3>
        </div>
        <div className="flex items-center">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={renderMarkdown}
              onChange={(e) => setRenderMarkdown(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            {t('renderMarkdown')}
          </label>
        </div>
      </div>
      <div
        ref={responseRef}
        className="p-4 mt-3 max-h-[400px] overflow-y-auto"
      >
        {response ? (
          renderMarkdown ? (
            <div className="prose max-w-none">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {response}
            </pre>
          )
        ) : (
          <div className="text-gray-500 italic">
            {isStreaming ? (
              <div className="flex items-center gap-2">
                <span>Streaming</span>
                <span className="inline-block w-1 h-1 bg-gray-500 rounded-full animate-pulse"></span>
                <span className="inline-block w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                <span className="inline-block w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-300"></span>
              </div>
            ) : (
              t('noResponseYet')
            )}
          </div>
        )}
      </div>
      {rawData && (
        <div 
          ref={rawDataRef}
          className="border-t border-gray-200 mt-3 max-h-[200px] overflow-y-auto"
        >
          <div className="p-3 border-b border-gray-200 flex items-center gap-2">
            <Terminal size={18} className="text-gray-600" />
            <h4 className="font-medium">
              {t('rawDataTitle')}
            </h4>
          </div>
          <pre className="p-3 text-xs font-mono whitespace-pre-wrap overflow-x-auto">
            {rawData}
            <div ref={bottomElementRef} style={{ height: '1px' }} />
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;