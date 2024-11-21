export const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.15,
    },
  }),
  hover: {
    x: 10,
    transition: {
      duration: 0.2,
    },
  },
};
