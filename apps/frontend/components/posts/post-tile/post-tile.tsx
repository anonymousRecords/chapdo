import Chip from '@/components/ui/chip/chip';
import Link from 'next/link';

interface PostTileProps {
  title: string;
  content?: string;
  tags: Tag[];
  maxContentLength?: number;
  slug: string;
}
interface Tag {
  id: string;
  name: string;
  color: string;
}

export default function PostTile({ title, content, tags, slug }: PostTileProps) {
  return (
    <Link href={`/post/${slug}`} className="w-full">
      <div className="h-full md:h-[300px] bg-white hover:bg-gray-50 border-[0.3px] border-black p-6 overflow-hidden flex flex-col justify-between">
        <div>
          <h2 className="md:text-xl text-sm font-bold mb-2 text-black">{title}</h2>
          <p className="text-gray-700">{content}</p>
        </div>
        <div className="flex flex-wrap gap-2 md:text-sm text-xs">
          {tags.map((tag) => (
            <Chip label={tag.name} key={`${title}-${tag}`} />
          ))}
        </div>
      </div>
    </Link>
  );
}
