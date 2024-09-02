import React, { useState, useRef } from 'react';
import { chatApi } from '../api/chat_Api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const AIChat: React.FC<AIChatProps> = ({ messages, setMessages }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await chatApi([...messages, userMessage]);
      const assistantMessage: Message = { role: 'assistant', content: aiResponse };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  // Function to detect code blocks (using triple backticks or other markers)
  const renderMessageContent = (content: string) => {
    const codeBlockRegex = /```([a-z]*)\n([\s\S]*?)```/g;

    const parts = [];
    let lastIndex = 0;

    let match;
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const [_fullMatch, language, code] = match;

      if (match.index > lastIndex) {
        parts.push(<span key={lastIndex}>{content.slice(lastIndex, match.index)}</span>);
      }

      parts.push(
        <pre key={match.index} className="bg-gray-800 text-white p-4 rounded-lg my-2 overflow-x-auto">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      );

      lastIndex = codeBlockRegex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(<span key={lastIndex}>{content.slice(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Chat</h2>
        <button
          className="px-4 py-2 bg-pink-700 rounded"
          onClick={handleClearChat}
        >
          Clear Chat
        </button>
      </div>
      <div
        className="flex-grow bg-white bg-opacity-10 p-4 rounded-lg mb-4 overflow-y-auto"
        ref={chatContainerRef}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg mb-2 ${
              message.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
            }`}
          >
            {renderMessageContent(message.content)}
          </div>
        ))}
        {isLoading && <div className="text-gray-500">Thinking...</div>}
      </div>
      <div className="flex">
        <input
          className="flex-grow p-2 bg-opacity-10 rounded-l-lg bg-gray-200"
          placeholder="What would you like to know..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        <button
          className="px-6 py-2 bg-purple-700 text-white rounded-r-lg"
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
