"use client";
import React from "react";

interface CopyButtonProps {
  value: string;
  // Add other props as needed
}

const CopyButton: React.FC<CopyButtonProps> = ({ value }) => {
  const copyToClipboard = () => {
    "use client";
    if (value) navigator.clipboard.writeText(value);
    // Optionally, add feedback to the user (e.g., tooltip, toast notification)
  };

  return (
    <div className="copybutton">
      <button
        onClick={copyToClipboard}
        className="text-xs p-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        <svg
          className="h-4 w-4 text-gray-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
      </button>
    </div>
  );
};

export default CopyButton;
