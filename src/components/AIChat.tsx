import React from 'react';

const AIChat: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg w-3/4 h-3/4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Chat</h2>
        <button className="px-4 py-2 bg-pink-700 rounded">Clear Chat</button>
      </div>
      <div className="flex-grow bg-white bg-opacity-10 p-4 rounded-lg mb-4"></div>
      <div className="flex">
        <input 
          className="flex-grow p-2 bg-opacity-10 rounded-l-lg bg-gray-200"
          placeholder="What would you like to know..."
        />
        <button className="px-6 py-2 bg-purple-700 text-white rounded-r-lg">Send</button>
      </div>
    </div>
  );
};

export default AIChat;
