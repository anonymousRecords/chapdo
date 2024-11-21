'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  HomeIcon,
  ChatBubbleBottomCenterTextIcon,
  PencilSquareIcon,
  Bars3Icon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  ChatBubbleBottomCenterTextIcon as ChatIconSolid,
  PencilSquareIcon as PencilIconSolid,
  Bars3Icon as Bars3IconSolid,
  SparklesIcon as SparklesIconSolid,
} from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  activeIcon: React.ElementType;
  label: string;
  isActive: boolean;
}

const MotionLink = motion.create(Link);

export function NavItem({
  href,
  icon: Icon,
  activeIcon: ActiveIcon,
  label,
  isActive,
}: NavItemProps) {
  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { rotate: 12, scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const labelVariants = {
    initial: { y: 0, fontWeight: 'normal' },
    hover: { y: -2, fontWeight: 'bold' },
  };

  return (
    <MotionLink
      href={href}
      className={`cursor-pointer flex flex-col items-center justify-center w-1/5 h-full 
        ${isActive ? 'text-black' : 'text-gray-300'}`}
      whileHover="hover"
      whileTap="tap"
      initial="initial"
    >
      <motion.div
        variants={iconVariants}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {isActive ? <ActiveIcon className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
      </motion.div>
      <motion.span
        variants={labelVariants}
        transition={{ type: 'spring', stiffness: 500 }}
        className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}
      >
        {label}
      </motion.span>
    </MotionLink>
  );
}

export default function BottomNavigation() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { href: '/menu', label: '메뉴', icon: Bars3Icon, activeIcon: Bars3IconSolid },
    {
      href: '/til',
      label: '오늘 배움',
      icon: ChatBubbleBottomCenterTextIcon,
      activeIcon: ChatIconSolid,
    },
    { href: '/', label: '홈', icon: HomeIcon, activeIcon: HomeIconSolid },
    { href: '/post', label: '끄적거림', icon: PencilSquareIcon, activeIcon: PencilIconSolid },
    { href: '/projects', label: '프로젝트', icon: SparklesIcon, activeIcon: SparklesIconSolid },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 w-full max-w-[600px] z-20 h-[66px] bg-white border-t border-gray-200 flex items-center justify-between px-2 sm:px-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {NAV_ITEMS.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          activeIcon={item.activeIcon}
          label={item.label}
          isActive={pathname === item.href}
        />
      ))}
    </motion.nav>
  );
}
