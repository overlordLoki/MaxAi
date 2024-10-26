import React from 'react';

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOnline: boolean; // Prop for AI status
  checkAiStatus: () => Promise<void>; // Function to check AI status
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab, isOnline, checkAiStatus }) => {
  return (
    <div className="flex justify-center space-x-4 p-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-10">
      <button
        className={`px-6 py-2 rounded transition-colors duration-300 ease-in-out 
          ${activeTab === 'chat' ? 'bg-pink-700 hover:bg-pink-600' : 'bg-purple-800 hover:bg-purple-700'} 
          focus:outline-none 
          active:scale-95`} // Remove focus ring effect
        onClick={() => setActiveTab('chat')}
      >
        AI Chat
      </button>
      <button
        className={`px-6 py-2 rounded transition-colors duration-300 ease-in-out 
          ${activeTab === 'image' ? 'bg-pink-700 hover:bg-pink-600' : 'bg-purple-800 hover:bg-purple-700'} 
          focus:outline-none 
          active:scale-95`} // Remove focus ring effect
        onClick={() => setActiveTab('image')}
      >
        AI Image
      </button>
      {/* AI Online Status Button */}
      <button
        className={`flex items-center space-x-2 px-6 py-2 rounded transition-colors duration-300 ease-in-out transform 
          ${isOnline ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} 
          focus:outline-none 
          active:scale-95`} // Remove focus ring effect
        onClick={checkAiStatus} // Call the function to check status on click
      >
        <span>{isOnline ? '✓' : '✗'}</span> {/* Tick or Cross */}
        <span className="font-semibold">Is AI Online?</span>
      </button>
    </div>
  );
};

export default TabBar;
