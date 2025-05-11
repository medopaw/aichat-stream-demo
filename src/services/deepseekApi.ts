// DeepSeek API service (v3)
export interface DeepSeekRequestParams {
  apiKey: string;
  prompt: string;
  maxTokens: number;
  temperature: number;
}

export interface StreamCallback {
  onChunk: (chunk: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
  onRawData: (data: string) => void;
}

// Function to stream responses from DeepSeek API
export const streamDeepSeekResponse = async (
  params: DeepSeekRequestParams,
  callbacks: StreamCallback
): Promise<void> => {
  const { apiKey, prompt, maxTokens, temperature } = params;
  const { onChunk, onComplete, onError, onRawData } = callbacks;

  let buffer = '';

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: maxTokens,
        temperature: temperature,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    
    // Process the stream
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        onComplete();
        break;
      }
      
      // Decode the chunk
      const chunk = decoder.decode(value);
      
      // Process SSE format - each line starts with "data: "
      const lines = chunk.split('\n');
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('data: ')) {
          const jsonData = trimmedLine.substring(6);
          onRawData(line);
          
          // Handle the special "[DONE]" message that signals the end of the stream
          if (jsonData.trim() === '[DONE]') {
            continue;
          }
          
          try {
            // Accumulate JSON data until we have a complete object
            buffer += jsonData;
            try {
              const data = JSON.parse(buffer);
              if (data.choices && data.choices[0].delta.content) {
                onChunk(data.choices[0].delta.content);
              }
              buffer = ''; // Reset buffer after successful parse
            } catch (e) {
              // Incomplete JSON, continue accumulating
            }
          } catch (e) {
            console.warn('Error processing SSE data:', e);
          }
        }
      }
    }
  } catch (error) {
    onError(error instanceof Error ? error : new Error('Unknown error'));
  }
};