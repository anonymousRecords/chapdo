'use client'

import { motion } from 'motion/react';
import { MENU_LIST } from '@/constants/menu';
import { MenuItem } from './menu-item';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const MenuList = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {MENU_LIST.map((menu, index) => (
        <MenuItem key={menu.id} menu={menu} index={index} />
      ))}
    </motion.div>
  );
};
