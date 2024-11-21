import PostTile from '@/components/posts/post-tile/post-tile';
import { Suspense } from 'react';

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
  };
  yearMonth?: string;
  slug?: string;
}

async function getPosts(): Promise<Post[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/posts`, {
    cache: 'force-cache',
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export default async function PostPage() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* TODO : 검색창 추가 */}
      <section className="grid grid-cols-2 w-full h-full">
        <Suspense fallback={<div>에베베베 로딩딩딩</div>}>
          {posts.map((post) => (
            <PostTile
              key={post.id}
              title={post.properties.Name.title[0].plain_text}
              tags={post.properties.Tags.multi_select}
              slug={post.slug || ''}
            />
          ))}
        </Suspense>
      </section>
    </div>
  );
}
