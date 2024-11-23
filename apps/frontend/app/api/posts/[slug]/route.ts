import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const filePath = path.join(process.cwd(), 'data/posts', `${params.slug}.json`);
    const content = await fs.readFile(filePath, 'utf8');
    const post = JSON.parse(content);

    return NextResponse.json({
      ...post,
      slug: params.slug,
    });
  } catch (error) {
    console.error('Failed to load post:', error);
    return new NextResponse('Post not found', { status: 404 });
  }
}
