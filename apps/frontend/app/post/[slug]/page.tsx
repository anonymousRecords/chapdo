import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NotionRenderer } from '@/components/layout/notion-renderer/notion-renderer';

interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Post {
  id: string;
  title: string;
  created_time: string;
  blocks: any[];
  properties: {
    Tags: {
      type: 'multi_select';
      multi_select: Tag[];
    };
    Name: {
      type: 'title';
      title: Array<{
        plain_text: string;
      }>;
    };
    Created: {
      type: 'date';
      date: {
        start: string;
    }
  };
  yearMonth?: string;
  slug?: string;
}}

async function getPost(slug:string): Promise<Post> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/posts/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  return res.json();
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-4 pt-4 pb-36">
        {/* 뒤로 가기 버튼 */}
        <Link
          href="/post"
          className="inline-flex items-center text-gray-600 hover:text-black mb-6"
        >
          ←
        </Link>

        <article>
          {/* 제목 */}
          <h1 className="text-3xl font-bold mb-4">{post.properties.Name.title[0].plain_text}</h1>

          {/* 날짜 */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            {post.properties.Created.date.start}
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.properties.Tags.multi_select.map((tag) => (
              <span key={tag.id} className="bg-black text-white rounded-full px-3 py-1 text-sm">
                {tag.name}
              </span>
            ))}
          </div>

          {/* 컨텐츠 */}
          <div className="prose max-w-none">
            <NotionRenderer blocks={post.blocks} />
          </div>
        </article>
      </main>
    </div>
  );
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `${params.slug} - Blog Post`,
    description: 'Post detail page',
  };
}
