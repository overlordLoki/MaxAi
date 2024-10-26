import React, { useState } from "react";
import { generateImage } from "../api/Img_api";

interface AIImageProps {
  imageSrc: string | null;
  setImageSrc: (imageSrc: string | null) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  steps: number;
  setSteps: (steps: number) => void;
  batchSize: number;
  setBatchSize: (batchSize: number) => void;
  width: number;
  setWidth: (width: number) => void;
  height: number;
  setHeight: (height: number) => void;
  sampler: string;
  setSampler: (sampler: string) => void;
  isOnline: boolean; // New prop for AI status
  checkAiStatus: () => Promise<void>; // Function to check AI status
}

const AIImage: React.FC<AIImageProps> = ({
  imageSrc, setImageSrc, prompt, setPrompt, steps, setSteps, 
  batchSize, setBatchSize, width, setWidth, height, setHeight, 
  sampler, setSampler, isOnline, checkAiStatus
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const handleGenerateClick = async () => {
    if (!isOnline) {
      // If AI is offline, display error message
      setErrorMessage("AI is offline. Please check your connection.");
      return;
    }
    
    setIsLoading(true); // Start loading
    setErrorMessage(null); // Clear previous error message

    try {
      const newImageSrc = await generateImage(prompt, steps);
      setImageSrc(newImageSrc);
    } catch (error) {
      console.error("Failed to generate image:", error);
      setErrorMessage("Failed to generate image. Please try again."); // Set error message on failure
      await checkAiStatus(); // Check AI status again after failure
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg w-3/4 h-3/4 flex flex-row space-x-8">
      {/* Left Column: Text Prompt and Controls */}
      <div className="flex flex-col w-1/2">
        <h2 className="text-lg font-bold mb-4">Create an image from text prompt</h2>
        <textarea 
          className="flex-grow p-4 rounded-lg bg-opacity-10 bg-gray-200 mb-4"
          placeholder="Enter a prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <label>Sampler</label>
            <select 
              className="p-2 bg-gray-200 rounded-lg" 
              value={sampler} 
              onChange={(e) => setSampler(e.target.value)}
            >
              <option>Euler</option>
              <option>LMS</option>
              <option>DPM++</option>
              {/* Add other samplers as needed */}
            </select>
          </div>
          <div className="flex space-x-2">
            <label>Steps</label>
            <input 
              type="number" 
              className="p-2 w-16 bg-gray-200 rounded-lg" 
              value={steps} 
              onChange={(e) => setSteps(Number(e.target.value))} 
            />
          </div>
          <div className="flex space-x-2">
            <label>Batch</label>
            <input 
              type="number" 
              className="p-2 w-16 bg-gray-200 rounded-lg" 
              value={batchSize} 
              onChange={(e) => setBatchSize(Number(e.target.value))} 
            />
          </div>
          <div className="flex space-x-2">
            <label>Width</label>
            <input 
              type="number" 
              className="p-2 w-16 bg-gray-200 rounded-lg" 
              value={width} 
              onChange={(e) => setWidth(Number(e.target.value))} 
            />
          </div>
          <div className="flex space-x-2">
            <label>Height</label>
            <input 
              type="number" 
              className="p-2 w-16 bg-gray-200 rounded-lg" 
              value={height} 
              onChange={(e) => setHeight(Number(e.target.value))} 
            />
          </div>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
        <button 
          className="px-6 py-2 bg-purple-700 text-white rounded-lg"
          onClick={handleGenerateClick}
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* Right Column: Image Display */}
      <div className="flex items-center justify-center w-1/2 bg-opacity-10 bg-gray-200 rounded-lg"> 
        {isLoading ? (
          <div className="spinner border-t-4 border-purple-700 rounded-full w-16 h-16 animate-spin"></div> // Loading spinner
        ) : imageSrc ? (
          <img src={imageSrc} alt="Generated AI Image" className="max-w-full max-h-full" />
        ) : (
          <p className="text-gray-500">No image generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default AIImage;
