import React, { useState, useEffect } from 'react';
import TabBar from './components/TabBar';
import AIChat from './components/AIChat';
import AIImage from './components/AIImage';
import { isAiOnline } from './api/Img_api'; // Import the API function

import backgroundImage from './assets/background.png';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [chatWidth, setChatWidth] = useState<number>(800);
  const [chatHeight, setChatHeight] = useState<number>(600);
  const [imagePrompt, setImagePrompt] = useState<string>(''); 
  const [steps, setSteps] = useState<number>(4); 
  const [batchSize, setBatchSize] = useState<number>(1); 
  const [width, setWidth] = useState<number>(1024); 
  const [height, setHeight] = useState<number>(1024); 
  const [sampler, setSampler] = useState<string>('Euler'); 
  const [isOnline, setIsOnline] = useState<boolean>(false); // State for AI status

  // Function to check AI online status
  const checkAiStatus = async () => {
    try {
      const status = await isAiOnline();
      setIsOnline(status);
    } catch (error) {
      console.error("Error checking AI status:", error);
      setIsOnline(false); // Set to offline if there's an error
    }
  };
  // Initial check for AI status
  useEffect(() => {
    checkAiStatus();
  }, []);

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
      <TabBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOnline={isOnline} 
        checkAiStatus={checkAiStatus} // Pass the check function directly
      />

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
          <AIImage 
            imageSrc={imageSrc} 
            setImageSrc={setImageSrc}
            prompt={imagePrompt} 
            setPrompt={setImagePrompt}
            steps={steps}
            setSteps={setSteps}
            batchSize={batchSize}
            setBatchSize={setBatchSize}
            width={width}
            setWidth={setWidth}
            height={height}
            setHeight={setHeight}
            sampler={sampler}
            setSampler={setSampler}
            isOnline={isOnline} // Pass AI status
            checkAiStatus={checkAiStatus} // Pass check function
          />
        )}
      </div>
    </div>
  );
};

export default App;
