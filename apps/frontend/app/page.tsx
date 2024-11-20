import Carousel from '@/components/ui/carousel/carousel';

const SNSLIST = [
  { id: 1, name: 'Github', url: 'https://www.facebook.com/' },
  { id: 2, name: 'Twitter', url: 'https://www.twitter.com/' },
  { id: 3, name: 'LinkedIn', url: 'https://www.facebook.com/' },
  { id: 4, name: 'Instagram', url: 'https://www.facebook.com/' },
] as const;

export default function Home() {
  return (
    <main className="h-full bg-fuchsia-200">
      <section className="flex flex-col justify-center items-center">
        <Carousel />
        <h1>안녕하세요. 찹도입니다.</h1>
        <nav>
          {SNSLIST.map((sns) => (
            <li key={sns.id}>
              <a
                key={sns.id}
                href={sns.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                {sns.name}
              </a>
            </li>
          ))}
        </nav>
      </section>
    </main>
  );
}
