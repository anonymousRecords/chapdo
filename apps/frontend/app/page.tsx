const snsList = [
  { id: 1, name: 'Github', url: 'https://www.facebook.com/' },
  { id: 2, name: 'Twitter', url: 'https://www.twitter.com/' },
  { id: 3, name: 'LinkedIn', url: 'https://www.facebook.com/' },
  { id: 4, name: 'Instagram', url: 'https://www.facebook.com/' },
];

export default function Home() {
  return (
    <section className="h-full bg-fuchsia-200">
      <div className="flex flex-col justify-center items-center">
        <h1>CHAPDO</h1>
        {snsList.map((sns) => (
          <a
            key={sns.id}
            href={sns.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            {sns.name}
          </a>
        ))}
      </div>
    </section>
  );
}
