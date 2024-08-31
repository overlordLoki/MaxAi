import React, { useState } from 'react';
import TabBar from './components/TabBar';
import AIChat from './components/AIChat';
import AIImage from './components/AIImage';

import backgroundImage from './assets/background.png';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Use imported image
    >
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow flex justify-center items-center">
        {activeTab === 'chat' ? <AIChat /> : <AIImage />}
      </div>
    </div>
  );
};

export default App;

