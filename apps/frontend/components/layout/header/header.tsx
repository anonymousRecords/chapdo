import { ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  isDefault?: boolean;
  title?: string;
}

export default function Header({ isDefault = true, title = 'CHAPDO' }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full max-w-[600px] z-10 h-[48px] flex items-center justify-between px-4 py-2 bg-white shadow-sm">
      {isDefault ? (
        <h1 className="text-xl font-bold">{title}</h1>
      ) : (
        <>
          <button className="p-2" aria-label="Go back">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{title}</h1>
          <button className="p-2" aria-label="Share">
            <ShareIcon className="w-6 h-6" />
          </button>
        </>
      )}
    </header>
  );
}
