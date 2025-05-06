import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

function Home() {
  const [loading, setLoading] = useState(true);
  const [recentGames, setRecentGames] = useState([]);
  
  // Mock data for demonstration
  const mockRecentGames = [
    { id: '1', opponent: 'Player456', result: 'win', score: '10-6', date: '2 hours ago' },
    { id: '2', opponent: 'DotMaster', result: 'loss', score: '7-12', date: 'yesterday' },
    { id: '3', opponent: 'ConnectPro', result: 'win', score: '15-2', date: '3 days ago' },
  ];
  
  useEffect(() => {
    // Simulate loading recent games
    const timer = setTimeout(() => {
      setRecentGames(mockRecentGames);
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  const InfoIcon = getIcon('Info');
  const TrophyIcon = getIcon('Trophy');
  const CalendarIcon = getIcon('Calendar');
  const UserIcon = getIcon('User');
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          DotNexus
        </h1>
        <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300">
          Connect the dots, claim boxes, win the game!
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <MainFeature />
        </div>
        
        <div className="lg:col-span-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Recent Games</h3>
              <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
            
            <AnimatePresence>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="dot-pulse">
                    <div className="dot-pulse__dot"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentGames.map((game) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg flex items-center justify-between border ${
                        game.result === 'win'
                          ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20'
                          : 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <UserIcon className="w-4 h-4 text-surface-500" />
                        <span className="font-medium">{game.opponent}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-sm font-semibold ${
                          game.result === 'win' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {game.score}
                        </span>
                        <span className="text-xs text-surface-500">{game.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">How to Play</h3>
              <InfoIcon className="w-5 h-5 text-primary" />
            </div>
            <ul className="space-y-2 text-surface-700 dark:text-surface-300">
              <li className="flex items-start space-x-2">
                <span className="inline-block w-4 h-4 rounded-full bg-primary mt-1 flex-shrink-0"></span>
                <span>Players take turns drawing lines between dots</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="inline-block w-4 h-4 rounded-full bg-secondary mt-1 flex-shrink-0"></span>
                <span>Complete a box to claim it and earn a point</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="inline-block w-4 h-4 rounded-full bg-accent mt-1 flex-shrink-0"></span>
                <span>After completing a box, you get another turn</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="inline-block w-4 h-4 rounded-full bg-green-500 mt-1 flex-shrink-0"></span>
                <span>Player with the most boxes when the board is full wins</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Leaderboard</h3>
              <TrophyIcon className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 flex justify-between items-center">
                <span className="font-medium">DotWizard</span>
                <span className="font-bold">1248 pts</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 flex justify-between items-center">
                <span className="font-medium">BoxMaster</span>
                <span className="font-bold">965 pts</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 flex justify-between items-center">
                <span className="font-medium">LineDrawer</span>
                <span className="font-bold">843 pts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;