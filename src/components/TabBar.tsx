import React from 'react';

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center space-x-4 p-4 bg-gradient-to-r from-purple-600 to-pink-600">
      <button
        className={`px-6 py-2 rounded ${activeTab === 'chat' ? 'bg-purple-800' : 'bg-pink-700'}`}
        onClick={() => setActiveTab('chat')}
      >
        AI Chat
      </button>
      <button
        className={`px-6 py-2 rounded ${activeTab === 'image' ? 'bg-purple-800' : 'bg-pink-700'}`}
        onClick={() => setActiveTab('image')}
      >
        AI Image
      </button>
    </div>
  );
};

export default TabBar;
