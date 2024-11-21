import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

interface TILEntry {
  date: string;
  status: 'completed';
  title: string;
  blocks: any[];
  tags: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

export async function GET() {
  try {
    const tilDirectory = path.join(process.cwd(), 'data/til');
    const files = fs.readdirSync(tilDirectory);

    const calendarEntries: TILEntry[] = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const filePath = path.join(tilDirectory, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const post = JSON.parse(fileContent);

        return {
          date: post.created_time,
          status: 'completed' as const,
          tags: post.properties.Tags.multi_select || [],
          blocks: post.blocks || [],
          title: post.properties.Name.title[0].plain_text,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ entries: calendarEntries });
  } catch (error) {
    console.error('Error loading TIL entries:', error);
    return NextResponse.json({ error: 'Failed to load TIL entries' }, { status: 500 });
  }
}
