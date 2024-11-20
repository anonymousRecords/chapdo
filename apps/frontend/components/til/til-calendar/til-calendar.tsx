'use client';

import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

interface TILEntry {
  date: Date;
  status?: 'completed' | 'new';
}

interface TILCalendarProps {
  tilEntries: TILEntry[];
  onDateClick?: (date: Date) => void;
}

export default function TILCalendar({ tilEntries, onDateClick }: TILCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  function handleYearChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentDate(new Date(parseInt(e.target.value), currentDate.getMonth(), 1));
  }

  function handleMonthChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value), 1));
  }

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 w-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const tilEntry = tilEntries.find(
        (entry) => entry.date.toDateString() === date.toDateString(),
      );

      let cellClass = 'relative h-12 w-12 flex items-center justify-center text-sm';
      let statusElement = null;

      if (tilEntry) {
        if (tilEntry.status === 'completed') {
          cellClass += ' bg-green-100 rounded-full';
          statusElement = (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
              ✓
            </div>
          );
        } else if (tilEntry.status === 'new') {
          cellClass += ' bg-blue-100 rounded-full';
          statusElement = (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
              N
            </div>
          );
        }
      }

      days.push(
        <div key={day} className={cellClass} onClick={() => onDateClick && onDateClick(date)}>
          {day}
          {statusElement}
        </div>,
      );
    }

    return days;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <select
            value={currentDate.getFullYear()}
            onChange={handleYearChange}
            className="appearance-none bg-transparent text-2xl font-bold"
          >
            {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="h-5 w-5 text-gray-600" />
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={currentDate.getMonth()}
            onChange={handleMonthChange}
            className="appearance-none bg-transparent text-2xl font-bold"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="h-5 w-5 text-gray-600" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 p-4">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="text-center font-semibold text-sm text-gray-500">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
}
