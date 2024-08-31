import React from 'react';

const AIImage: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg w-3/4 h-3/4 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Create an image from text prompt</h2>
      <textarea 
        className="flex-grow p-4 rounded-lg bg-opacity-10 bg-gray-200 mb-4"
        placeholder="Enter a prompt..."
      />
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <label>Sampler</label>
          <select className="p-2 bg-gray-200 rounded-lg">
            <option>Euler</option>
            {/* Add other samplers as needed */}
          </select>
        </div>
        <div className="flex space-x-2">
          <label>Steps</label>
          <input type="number" className="p-2 w-16 bg-gray-200 rounded-lg" defaultValue={4} />
        </div>
        <div className="flex space-x-2">
          <label>Batch</label>
          <input type="number" className="p-2 w-16 bg-gray-200 rounded-lg" defaultValue={1} />
        </div>
        <div className="flex space-x-2">
          <label>Width</label>
          <input type="number" className="p-2 w-16 bg-gray-200 rounded-lg" defaultValue={1024} />
        </div>
        <div className="flex space-x-2">
          <label>Height</label>
          <input type="number" className="p-2 w-16 bg-gray-200 rounded-lg" defaultValue={1024} />
        </div>
      </div>
      <button className="px-6 py-2 bg-purple-700 text-white rounded-lg">Generate</button>
    </div>
  );
};

export default AIImage;
