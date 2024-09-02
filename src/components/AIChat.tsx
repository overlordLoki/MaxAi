// src/components/AIChat.tsx
import React, { useState } from 'react';
import { chatApi } from '../api/chat_Api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add the user's message to the chat history
    const userMessage: Message = { role: 'user', content: inputValue };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send the full conversation history to the API and get the AI's response
      const aiResponse = await chatApi(updatedMessages);
      const assistantMessage: Message = { role: 'assistant', content: aiResponse };

      // Add the AI's response to the chat history
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

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg w-3/4 h-3/4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Chat</h2>
        <button 
          className="px-4 py-2 bg-pink-700 rounded" 
          onClick={handleClearChat}
        >
          Clear Chat
        </button>
      </div>
      <div className="flex-grow bg-white bg-opacity-10 p-4 rounded-lg mb-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg mb-2 ${
              message.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
            }`}
          >
            {message.content}
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
