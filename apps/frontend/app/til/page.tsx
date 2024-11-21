'use client';

import { useEffect, useState } from 'react';
import TILCalendar from '@/components/til/til-calendar/til-calendar';

interface TILEntry {
  date: Date;
  status: 'completed';
  title: string;
  blocks: any[];
  tags: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

export default function TilPage() {
  const [tilEntries, setTilEntries] = useState<TILEntry[]>([]);

  useEffect(() => {
    fetch('/api/til')
      .then(res => res.json())
      .then(data => {
        const entriesWithDates = data.entries.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setTilEntries(entriesWithDates);
      })
      .catch(error => console.error('Error fetching TIL entries:', error));
  }, []);

  return (
    <div className='pt-10 md:pt-20'>
      <TILCalendar tilEntries={tilEntries} />
    </div>
  );
}