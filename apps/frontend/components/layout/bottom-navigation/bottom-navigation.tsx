'use client';

import Link from 'next/link';
import {
  HomeIcon,
  ChatBubbleBottomCenterTextIcon,
  PencilSquareIcon,
  UserIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  ChatBubbleBottomCenterTextIcon as ChatIconSolid,
  PencilSquareIcon as PencilIconSolid,
  UserIcon as UserIconSolid,
  Bars3Icon as Bars3IconSolid,
} from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  activeIcon: React.ElementType;
  label: string;
  isActive: boolean;
}

export function NavItem({
  href,
  icon: Icon,
  activeIcon: ActiveIcon,
  label,
  isActive,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`cursor-pointer flex flex-col items-center justify-center w-1/5 h-full ${isActive ? 'text-black' : 'text-gray-300'}`}
    >
      {isActive ? <ActiveIcon className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
      <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}>{label}</span>
    </Link>
  );
}

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/menu', label: '메뉴', icon: Bars3Icon, activeIcon: Bars3IconSolid },
    {
      href: '/til',
      label: '오늘 배움',
      icon: ChatBubbleBottomCenterTextIcon,
      activeIcon: ChatIconSolid,
    },
    { href: '/', label: '홈', icon: HomeIcon, activeIcon: HomeIconSolid },
    { href: '/post', label: '끄적거림', icon: PencilSquareIcon, activeIcon: PencilIconSolid },
    { href: '/login', label: '찹도 페이지', icon: UserIcon, activeIcon: UserIconSolid },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-[600px] z-20 h-[66px] bg-white border-t border-gray-200 flex items-center justify-between px-2 sm:px-4 transition-all duration-300 ease-in-out">      {navItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          activeIcon={item.activeIcon}
          label={item.label}
          isActive={pathname === item.href}
        />
      ))}
    </nav>
  );
}
