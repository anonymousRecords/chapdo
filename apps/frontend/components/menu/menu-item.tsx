'use client'

import { motion } from 'motion/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Menu } from '@/types/menu';
import { menuItemVariants } from '@/constants/animations';

interface MenuItemProps {
  menu: Menu;
  index: number;
}

export const MenuItem = ({ menu, index }: MenuItemProps) => {
  return (
    <motion.div
      variants={menuItemVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
    >
      <Link
        href={menu.href}
        className="w-full max-w-[600px] h-20 border-[1px] border-gray-100 pl-10 flex items-center font-bold cursor-pointer"
      >
        {menu.name}
        <ChevronRightIcon className="w-6 h-6 ml-auto mr-10" />
      </Link>
    </motion.div>
  );
};
