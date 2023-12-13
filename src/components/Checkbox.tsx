// Checkbox.tsx
import React, { useState } from 'react';

interface CheckboxProps {
  handleCheckboxChange: () => void;
  isChecked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ handleCheckboxChange, isChecked }) => {
  return (
    <>
    <div className="flex-shrink-0 w-72">
      {isChecked ? (
        <h1 className="text-4xl font-bold mb-0 text-white">Show NFTs</h1>
      ) : (
        <h1 className="text-4xl font-bold mb-0 text-white">Show Perks</h1>
      )}
    </div>
      <div className="flex-1 p-4 flex items-center">          
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          className="sr-only peer"
          value=""
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div
          className={`group peer ring-aqua-500 ring-4 bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 rounded-full outline-none duration-1000 after:duration-300 w-24 h-12 shadow-md peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39] peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)] after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 peer-checked:after:translate-x-12 peer-hover:after:scale-125`}
        ></div>
      </label>
    </div>
    </>
  );
};

export default Checkbox;
