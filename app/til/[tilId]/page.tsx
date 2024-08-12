import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostByName, getTILs } from "@/lib/githubApi";

export const revalidate = 86400;

type Props = {
  params: {
    tilId: string;
  };
};

export async function generateStaticParams() {
  const tils = await getTILs();

  if (!tils) return [];

  return tils.map((til) => ({
    tilId: til.meta.id.replace(/^TIL\//, ""),
  }));
}

export async function generateMetadata({ params: { tilId } }: Props) {
  const til = await getPostByName(`TIL/${tilId}.mdx`);

  if (!til) {
    return {
      title: "TIL Not Found",
    };
  }

  return {
    title: til.meta.title,
  };
}

export default async function Til({ params: { tilId } }: Props) {
  const til = await getPostByName(`TIL/${tilId}.mdx`);

  if (!til) notFound();

  const { meta, content } = til;

  return (
    <article className="mx-auto max-w-2xl mt-8 prose prose-slate dark:prose-invert">
      <h1 className="mb-2">{meta.title}</h1>
      <p className="mt-0 text-sm text-gray-500">{meta.date}</p>
      {content}
      <p className="mt-8">
        <Link href="/til" className="text-blue-500 hover:underline">
          ← Back to TILs
        </Link>
      </p>
    </article>
  );
}
