import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0 }, // Tiny fade to smooth out the content swap
  animate: { 
    opacity: 1, 
    transition: { delay: 0.4, duration: 0.1 } // Appear only after wipe covers
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.4 } // Disappear as wipe covers
  }
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
