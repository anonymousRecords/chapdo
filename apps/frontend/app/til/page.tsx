'use client';
import TILCalendar from '@/components/til/til-calendar/til-calendar';

const tilEntries = [
  { date: new Date(2024, 10, 15), status: 'completed' },
  { date: new Date(2024, 10, 20), status: 'new' },
  { date: new Date(2024, 10, 25) },
];

export default function TilPage() {
  function handleDateClick(date: Date) {
    console.log('Clicked date:', date);
    // 여기에서 선택된 날짜에 대한 추가 작업을 수행할 수 있습니다.
  }

  return <TILCalendar tilEntries={tilEntries} onDateClick={handleDateClick} />;
}
