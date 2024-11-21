import BlogCarousel, { Post } from '@/components/home/blog-carousel';
import TagRecommendations from '@/components/home/tag-recommendations';

export default function Home() {
  const posts: Post[] = [
    {
      id: '1456a1ef-3afb-8095-a4ae-c715d9af63e8',
      title: '나는 왜 개발자를 꿈꾸게 되었을까?',
      description:
        '찐문과생이었던 내가 개발에 푹 빠지게 된 이유와 코딩에 몰입하는 순간이 좋아 개발자가 되기로 한 이야기',
      image: '/images/image_1.jpeg',
      category: '회고',
      readingTime: 10,
      tags: ['다짐', '개발', '프론트엔드'],
      publishDate: '2024-11-21',
      href: '/post/22-08-08',
    },
    {
      id: '1456a1ef-3afb-815c-a4e5-d6c86cf3854c',
      title: '삶의 지도',
      description: '서포터즈에서 개발자로, 내가 걸어온 길과 앞으로 걸어갈 길에 대한 이야기',
      image: '/images/image_2.jpeg',
      category: '에세이',
      readingTime: 8,
      tags: ['일 잘 하는 방식', '성장', '개발'],
      publishDate: '2024-06-03',
      href: '/post/24-07-03',
    },
  ];

  return (
    <main className="h-full bg-white pb-56">
      <BlogCarousel posts={posts} />
      <section className="mt-8 p-4">
        <TagRecommendations posts={posts} />
      </section>
    </main>
  );
}
