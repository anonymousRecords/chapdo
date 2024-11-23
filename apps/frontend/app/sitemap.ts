import type { MetadataRoute } from 'next';
import type { Post } from './post/page';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = ['/', '/post', '/til', '/projects', '/menu'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }),
  );

  const posts = await fetch(`${baseUrl}/api/posts`).then((res) => res.json() as Promise<Post[]>);

  const postsSitemap: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: post.created_time,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...routes, ...postsSitemap];
}
