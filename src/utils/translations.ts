export type Locale = 'en' | 'zh';

export type TranslationKey =
  | 'appTitle'
  | 'appDescription'
  | 'chatInputTitle'
  | 'apiKeyLabel'
  | 'apiKeyPlaceholder'
  | 'saveApiKey'
  | 'apiKeySaved'
  | 'messagePlaceholder'
  | 'clearButton'
  | 'maxTokensLabel'
  | 'temperatureLabel'
  | 'toggleMarkdown'
  | 'rawMode'
  | 'renderMarkdown'
  | 'waitingForResponse'
  | 'sendMessage'
  | 'languageToggle'
  | 'noResponseYet'
  | 'invalidMaxTokens'
  | 'invalidTemperature'
  | 'rawDataTitle';

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    appTitle: 'DeepSeek API Streaming Demo',
    appDescription: 'This demo shows how streaming works with DeepSeek API v3',
    chatInputTitle: 'Chat Input',
    apiKeyLabel: 'DeepSeek API Key',
    apiKeyPlaceholder: 'Enter your DeepSeek API key',
    saveApiKey: 'Save',
    apiKeySaved: 'API Key saved',
    messagePlaceholder: 'Type your message here (Enter to send, Shift+Enter for new line)',
    clearButton: 'Clear',
    maxTokensLabel: 'Max Tokens',
    temperatureLabel: 'Temperature',
    toggleMarkdown: 'Toggle Markdown',
    renderMarkdown: 'Render Markdown',
    waitingForResponse: 'Waiting for response...',
    sendMessage: 'Send',
    languageToggle: '中文',
    noResponseYet: 'No response yet',
    invalidMaxTokens: 'Max tokens must be between 1024 and 4096',
    invalidTemperature: 'Temperature must be between 0 and 1',
    rawDataTitle: 'Raw API Response Data',
  },
  zh: {
    appTitle: 'DeepSeek API 流式传输演示',
    appDescription: '此演示展示了 DeepSeek API v3 的流式传输工作方式',
    chatInputTitle: '聊天输入',
    apiKeyLabel: 'DeepSeek API 密钥',
    apiKeyPlaceholder: '输入你的 DeepSeek API 密钥',
    saveApiKey: '保存',
    apiKeySaved: 'API 密钥已保存',
    messagePlaceholder: '在此输入消息（回车发送，Shift+回车换行）',
    clearButton: '清空',
    maxTokensLabel: '最大令牌数',
    temperatureLabel: '温度',
    toggleMarkdown: '切换 Markdown',
    renderMarkdown: '渲染 Markdown',
    waitingForResponse: '等待响应中...',
    sendMessage: '发送',
    languageToggle: 'English',
    noResponseYet: '暂无回复',
    invalidMaxTokens: '最大令牌数必须在1024到4096之间',
    invalidTemperature: '温度必须在0到1之间',
    rawDataTitle: '原始 API 响应数据',
  },
};