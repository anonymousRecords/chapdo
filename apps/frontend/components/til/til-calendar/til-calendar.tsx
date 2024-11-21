'use client';

import { NotionRenderer } from '@/components/layout/notion-renderer/notion-renderer';
import Chip from '@/components/ui/chip/chip';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Notion } from '@notionpresso/react';
import { useRef, useState } from 'react';
import { Drawer } from 'vaul';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TILEntry {
  date: Date;
  status?: 'completed';
  tags: Tag[];
  blocks: any[];
  title: string;
}

interface TILCalendarProps {
  tilEntries: TILEntry[];
}

export default function TILCalendar({ tilEntries }: TILCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedEntry, setSelectedEntry] = useState<TILEntry | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  function handleDateClick(entry: TILEntry) {
    if (entry.status === 'completed') {
      setSelectedEntry(entry);
      setIsDrawerOpen(true);
    }
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
        }
      }

      days.push(
        <div key={day} className={cellClass} onClick={() => tilEntry && handleDateClick(tilEntry)}>
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
        {/* 년 */}
        <div className="flex items-center space-x-2">
          <select
            value={currentDate.getFullYear()}
            onChange={handleYearChange}
            className="appearance-none bg-transparent text-xl font-bold focus:outline-none"
          >
            {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="h-2 w-2 text-gray-600" />
        </div>
        {/* 월 */}
        <div className="flex items-center space-x-2">
          <select
            value={currentDate.getMonth()}
            onChange={handleMonthChange}
            className="appearance-none bg-transparent text-xl font-bold focus:outline-none"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="h-2 w-2 text-gray-600" />
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

      {/* drawer */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-20" />
          <Drawer.Content className="w-full max-w-[600px] bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 z-30">
            <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
              {/* drawer 내용 */}
              <div className="max-w-md mx-auto">
                {/* 태그 */}
                <div className="flex gap-2 mb-4">
                  {selectedEntry?.tags?.map((tag) => <Chip key={tag.id} label={tag.name} />)}
                </div>

                {/* 제목 */}
                <Drawer.Title className="font-bold">{selectedEntry?.title}</Drawer.Title>

                {/* 날짜 */}
                <p className="text-sm text-gray-600">{selectedEntry?.date.toLocaleDateString()}</p>

                <div className="w-full border-[0.5px] border-gray-50 my-5"></div>

                {/* 본문 */}
                <NotionRenderer blocks={selectedEntry?.blocks || []} />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
