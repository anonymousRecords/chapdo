import PostTile from '@/components/posts/post-tile/post-tile';
import { Suspense } from 'react';

const dummyPosts = [
  {
    id: 1,
    title: 'Hello, World!',
    content: 'This is my first post!',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 2,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 3,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 4,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 5,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 6,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 7,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 8,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 9,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 10,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 11,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 12,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 13,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 14,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 15,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 16,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 17,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
  {
    id: 18,
    title: 'Hello, World!',
    content: 'This',
    tag: ['React', 'TypeScript'],
  },
];

export default function PostPage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Suspense fallback={<div>Loading...</div>} >
        {dummyPosts.map((post) => (
          <PostTile key={post.id} title={post.title} content={post.content} tags={post.tag} />
        ))}
      </Suspense>
    </section>
  );
}
