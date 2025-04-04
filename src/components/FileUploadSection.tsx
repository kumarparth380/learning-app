import { FC, Dispatch, SetStateAction, useState } from 'react';

export interface FileUploadSectionProps {
  fileToUpload: File | null;
  setFileToUpload: Dispatch<SetStateAction<File | null>>;
}

const FileUploadSection: FC<FileUploadSectionProps> = ({
  fileToUpload,
  setFileToUpload,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileToUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileToUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`border-2 ${fileToUpload ? 'border-blue-500' : 'border-gray-300'
        } border-dashed rounded-lg p-8 mb-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${isDragging ? 'bg-blue-50 border-blue-500' : ''
        }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => document.getElementById('fileUpload')?.click()}
    >
      <input
        id="fileUpload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 p-2 bg-blue-50 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>

        <div className="flex items-center mb-2">
          {fileToUpload ? (
            <span className="text-gray-700 font-medium">{fileToUpload.name}</span>
          ) : (
            <span className="text-blue-500 font-medium">Click to Upload or Drag & Drop</span>
          )}
        </div>
        <p className="text-sm text-gray-500">(Max. File size: 25 MB)</p>
      </div>

      <div className="w-full mt-4">
        <div className="flex items-center border border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
          <div className="flex-shrink-0 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-gray-500"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Paste URL here"
            className="border-0 flex-grow focus:outline-none focus:ring-0 focus:ring-offset-0 py-2"
          />
          <button
            className={`mr-2 text-blue-500 px-3 py-1 text-sm rounded hover:bg-gray-50 font-medium`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;
