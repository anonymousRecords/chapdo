import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tilDirectory = path.join(process.cwd(), 'data/posts');
    const files = await fs.readdir(tilDirectory);

    const allPosts = await Promise.all(
      files
        .filter((file) => file.endsWith('.json'))
        .map(async (file) => {
          const filePath = path.join(tilDirectory, file);
          const content = await fs.readFile(filePath, 'utf8');
          const post = JSON.parse(content);

          const date = new Date(post.properties.Created.date.start);
          const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

          return {
            ...post,
            slug: file.replace('.json', ''),
            // yearMonth,
          };
        }),
    );

    // 날짜순 정렬
    allPosts.sort(
      (a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime(),
    );

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('Failed to load posts:', error);
    return new NextResponse('Failed to load posts', { status: 500 });
  }
}
