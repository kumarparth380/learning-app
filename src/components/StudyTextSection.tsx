'use client';

import { FC, Dispatch, SetStateAction } from 'react';

export interface StudyAreaProps {
  studyText: string;
  setStudyText: Dispatch<SetStateAction<string>>;
  handleStartStudying: () => Promise<void>;
  isLoading: boolean;
}

const StudyArea: FC<StudyAreaProps> = ({
  studyText,
  setStudyText,
  handleStartStudying,
  isLoading,
}) => {
  return (
    <div className="mt-4">
      <textarea
        placeholder="Or paste your study material here..."
        className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        value={studyText}
        onChange={(e) => setStudyText(e.target.value)}
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleStartStudying}
          disabled={isLoading}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
        >
          {isLoading ? 'Generating Quiz...' : 'Start Studying'}
        </button>
      </div>
    </div>
  );
};

export default StudyArea;