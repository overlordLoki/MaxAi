import React, { useState } from 'react';
import TabBar from './components/TabBar';
import AIChat from './components/AIChat';
import AIImage from './components/AIImage';

import backgroundImage from './assets/background.png';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');
  
  // Global state for chat and image
  const [messages, setMessages] = useState<Message[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [chatWidth, setChatWidth] = useState<number>(800); // Default width
  const [chatHeight, setChatHeight] = useState<number>(600); // Default height

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = chatWidth + (e.clientX - startX);
      const newHeight = chatHeight + (e.clientY - startY);
      setChatWidth(newWidth);
      setChatHeight(newHeight);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow flex justify-center items-center relative">
        {activeTab === 'chat' ? (
          <div
            className="relative"
            style={{ width: chatWidth, height: chatHeight }}
          >
            <AIChat messages={messages} setMessages={setMessages} />
            <div
              className="absolute right-0 bottom-0 bg-gray-700 cursor-se-resize"
              style={{ width: '20px', height: '20px' }}
              onMouseDown={handleMouseDown}
            ></div>
          </div>
        ) : (
          <AIImage imageSrc={imageSrc} setImageSrc={setImageSrc} />
        )}
      </div>
    </div>
  );
};

export default App;
