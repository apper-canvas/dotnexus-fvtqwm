import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
    >
      <motion.div
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        className="mb-6 p-6 rounded-full bg-surface-100 dark:bg-surface-800 neu-light dark:neu-dark"
      >
        <AlertTriangleIcon className="w-16 h-16 text-secondary" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-surface-800 dark:text-surface-100"
      >
        404
      </motion.h1>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl md:text-2xl mb-2 text-surface-700 dark:text-surface-300"
      >
        Page Not Found
      </motion.p>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-surface-600 dark:text-surface-400 max-w-md mb-8"
      >
        The dots didn't connect to the page you were looking for. Let's get you back to the game.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link to="/" className="btn btn-primary group">
          <HomeIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          Back to Home
        </Link>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full filter blur-3xl -z-10"
        animate={{ 
          x: [0, 10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute top-20 right-20 w-40 h-40 bg-secondary/20 rounded-full filter blur-3xl -z-10"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
}

export default NotFound;