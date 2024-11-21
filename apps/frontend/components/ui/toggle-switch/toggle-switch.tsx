'use client';

import { useCallback, useState } from 'react';

interface ToggleSwitchProps {
  leftLabel: string;
  rightLabel: string;
  onChange?: (isChecked: boolean) => void;
}

export default function ToggleSwitch({ leftLabel, rightLabel, onChange }: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = useCallback(() => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  }, [isChecked, onChange]);

  return (
    <div className="flex items-center space-x-2">
      <span className={`text-sm ${!isChecked ? 'font-bold' : ''}`}>{leftLabel}</span>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={`Toggle between ${leftLabel} and ${rightLabel}`}
        className="w-14 h-7 flex items-center bg-black rounded-full p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={toggleSwitch}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSwitch();
          }
        }}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
            isChecked ? 'translate-x-7' : ''
          }`}
        ></div>
      </button>
      <span className={`text-sm ${isChecked ? 'font-bold' : ''}`}>{rightLabel}</span>
    </div>
  );
}
