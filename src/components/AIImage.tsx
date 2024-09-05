import React from "react";
import { generateImage } from "../api/Img_api";

interface AIImageProps {
  imageSrc: string | null;
  setImageSrc: (imageSrc: string | null) => void;
}

const AIImage: React.FC<AIImageProps> = ({ imageSrc, setImageSrc }) => {
  const handleGenerateClick = async () => {
    console.log("Generating image...");
    const promptElement = document.querySelector("textarea") as HTMLTextAreaElement | null;
    const stepsElement = document.querySelector("input[type='number']") as HTMLInputElement | null;
    
    const prompt = promptElement?.value || "";
    const steps = parseInt(stepsElement?.value || "4");

    try {
      const newImageSrc = await generateImage(prompt, steps);
      setImageSrc(newImageSrc);
    } catch (error) {
      console.error("Failed to generate image:", error);
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
        <button 
          className="px-6 py-2 bg-purple-700 text-white rounded-lg"
          onClick={handleGenerateClick}
        >
          Generate
        </button>
      </div>

      {/* Right Column: Image Display */}
      <div className="flex items-center justify-center w-1/2 bg-gray-100 rounded-lg">
        {imageSrc ? (
          <img src={imageSrc} alt="Generated AI Image" className="max-w-full max-h-full" />
        ) : (
          <p className="text-gray-500">No image generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default AIImage;
