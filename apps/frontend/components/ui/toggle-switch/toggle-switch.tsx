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
      <div
        className="w-14 h-7 flex items-center bg-black rounded-full p-1 cursor-pointer"
        onClick={toggleSwitch}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
            isChecked ? 'translate-x-7' : ''
          }`}
        ></div>
      </div>
      <span className={`text-sm ${isChecked ? 'font-bold' : ''}`}>{rightLabel}</span>
    </div>
  );
}
