import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature() {
  // Game states
  const [gameStarted, setGameStarted] = useState(false);
  const [boardSize, setBoardSize] = useState(4); // Default to 4x4 grid
  const [currentPlayer, setCurrentPlayer] = useState(1); // Player 1 starts
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [winner, setWinner] = useState(null);
  
  // Board state
  const [dots, setDots] = useState([]); // 2D array of dot positions
  const [horizontalLines, setHorizontalLines] = useState([]); // 2D array of horizontal lines
  const [verticalLines, setVerticalLines] = useState([]); // 2D array of vertical lines
  const [boxes, setBoxes] = useState([]); // 2D array of boxes
  
  // UI states
  const [hoverLine, setHoverLine] = useState({ type: null, row: null, col: null });
  
  // Icons
  const RefreshIcon = getIcon('RefreshCw');
  const PlayIcon = getIcon('Play');
  const UserIcon = getIcon('User');
  const UsersIcon = getIcon('Users');
  const TrophyIcon = getIcon('Trophy');
  const SettingsIcon = getIcon('Settings');
  
  // Initialize or reset the game
  const initializeGame = () => {
    // Create the dots grid
    const newDots = Array(boardSize + 1).fill().map(() => Array(boardSize + 1).fill(true));
    
    // Initialize horizontal lines (rows × cols+1)
    const newHLines = Array(boardSize + 1).fill().map(() => 
      Array(boardSize).fill(null)
    );
    
    // Initialize vertical lines (rows+1 × cols)
    const newVLines = Array(boardSize).fill().map(() => 
      Array(boardSize + 1).fill(null)
    );
    
    // Initialize boxes
    const newBoxes = Array(boardSize).fill().map(() => 
      Array(boardSize).fill(null)
    );
    
    setDots(newDots);
    setHorizontalLines(newHLines);
    setVerticalLines(newVLines);
    setBoxes(newBoxes);
    setCurrentPlayer(1);
    setScores({ player1: 0, player2: 0 });
    setWinner(null);
    setGameStarted(true);
    
    toast.info("Game started! Player 1's turn", {
      icon: "🎮"
    });
  };
  
  // Handle line clicks
  const handleLineClick = (type, row, col) => {
    if (!gameStarted || winner) return;
    
    // Check if line is already drawn
    if (type === 'horizontal' && horizontalLines[row][col] !== null) return;
    if (type === 'vertical' && verticalLines[row][col] !== null) return;
    
    // Draw the line
    let boxCompleted = false;
    
    if (type === 'horizontal') {
      const newHLines = [...horizontalLines];
      newHLines[row][col] = currentPlayer;
      setHorizontalLines(newHLines);
      
      // Check if box is completed
      boxCompleted = checkBoxCompletion(type, row, col);
    } else {
      const newVLines = [...verticalLines];
      newVLines[row][col] = currentPlayer;
      setVerticalLines(newVLines);
      
      // Check if box is completed
      boxCompleted = checkBoxCompletion(type, row, col);
    }
    
    // If no box completed, switch player
    if (!boxCompleted) {
      const nextPlayer = currentPlayer === 1 ? 2 : 1;
      setCurrentPlayer(nextPlayer);
      toast.info(`Player ${nextPlayer}'s turn`, { autoClose: 1500 });
    } else {
      // Box completed, check if game is over
      checkGameOver();
    }
  };
  
  // Check if a box is completed
  const checkBoxCompletion = (type, row, col) => {
    let boxesCompleted = false;
    const newBoxes = [...boxes];
    const newScores = { ...scores };
    
    if (type === 'horizontal') {
      // Check box above the line
      if (row > 0) {
        const boxRow = row - 1;
        const boxCol = col;
        
        if (
          horizontalLines[boxRow][boxCol] !== null && // top
          horizontalLines[boxRow + 1][boxCol] !== null && // bottom (current line)
          verticalLines[boxRow][boxCol] !== null && // left
          verticalLines[boxRow][boxCol + 1] !== null // right
        ) {
          newBoxes[boxRow][boxCol] = currentPlayer;
          
          // Update score
          if (currentPlayer === 1) {
            newScores.player1 += 1;
          } else {
            newScores.player2 += 1;
          }
          boxesCompleted = true;
          
          // Show toast for completing a box
          toast.success(`Player ${currentPlayer} completed a box!`, { autoClose: 1500 });
        }
      }
      
      // Check box below the line
      if (row < boardSize) {
        const boxRow = row;
        const boxCol = col;
        
        if (
          horizontalLines[boxRow][boxCol] !== null && // top (current line)
          horizontalLines[boxRow + 1][boxCol] !== null && // bottom
          verticalLines[boxRow][boxCol] !== null && // left
          verticalLines[boxRow][boxCol + 1] !== null // right
        ) {
          newBoxes[boxRow][boxCol] = currentPlayer;
          
          // Update score
          if (currentPlayer === 1) {
            newScores.player1 += 1;
          } else {
            newScores.player2 += 1;
          }
          boxesCompleted = true;
          
          // Show toast for completing a box
          toast.success(`Player ${currentPlayer} completed a box!`, { autoClose: 1500 });
        }
      }
    } else if (type === 'vertical') {
      // Check box to the left of the line
      if (col > 0) {
        const boxRow = row;
        const boxCol = col - 1;
        
        if (
          horizontalLines[boxRow][boxCol] !== null && // top
          horizontalLines[boxRow + 1][boxCol] !== null && // bottom
          verticalLines[boxRow][boxCol] !== null && // left
          verticalLines[boxRow][boxCol + 1] !== null // right (current line)
        ) {
          newBoxes[boxRow][boxCol] = currentPlayer;
          
          // Update score
          if (currentPlayer === 1) {
            newScores.player1 += 1;
          } else {
            newScores.player2 += 1;
          }
          boxesCompleted = true;
          
          // Show toast for completing a box
          toast.success(`Player ${currentPlayer} completed a box!`, { autoClose: 1500 });
        }
      }
      
      // Check box to the right of the line
      if (col < boardSize) {
        const boxRow = row;
        const boxCol = col;
        
        if (
          horizontalLines[boxRow][boxCol] !== null && // top
          horizontalLines[boxRow + 1][boxCol] !== null && // bottom
          verticalLines[boxRow][boxCol] !== null && // left (current line)
          verticalLines[boxRow][boxCol + 1] !== null // right
        ) {
          newBoxes[boxRow][boxCol] = currentPlayer;
          
          // Update score
          if (currentPlayer === 1) {
            newScores.player1 += 1;
          } else {
            newScores.player2 += 1;
          }
          boxesCompleted = true;
          
          // Show toast for completing a box
          toast.success(`Player ${currentPlayer} completed a box!`, { autoClose: 1500 });
        }
      }
    }
    
    if (boxesCompleted) {
      setBoxes(newBoxes);
      setScores(newScores);
    }
    
    return boxesCompleted;
  };
  
  // Check if the game is over
  const checkGameOver = () => {
    // Calculate total possible boxes
    const totalBoxes = boardSize * boardSize;
    
    // Check if all boxes are filled
    if (scores.player1 + scores.player2 >= totalBoxes) {
      // Determine winner
      let gameWinner;
      if (scores.player1 > scores.player2) {
        gameWinner = 1;
      } else if (scores.player2 > scores.player1) {
        gameWinner = 2;
      } else {
        gameWinner = 0; // Draw
      }
      
      setWinner(gameWinner);
      
      // Show toast with the result
      if (gameWinner === 0) {
        toast.info("Game over! It's a draw!", {
          icon: "🤝",
          autoClose: false
        });
      } else {
        toast.success(`Game over! Player ${gameWinner} wins!`, {
          icon: "🏆",
          autoClose: false
        });
      }
    }
  };
  
  // Handle hover effects on lines
  const handleLineHover = (type, row, col) => {
    if (!gameStarted || winner) return;
    
    // Check if line is already drawn
    if (type === 'horizontal' && horizontalLines[row][col] !== null) return;
    if (type === 'vertical' && verticalLines[row][col] !== null) return;
    
    setHoverLine({ type, row, col });
  };
  
  const handleLineLeave = () => {
    setHoverLine({ type: null, row: null, col: null });
  };
  
  // Render the game board
  const renderGameBoard = () => {
    const gridSize = 36; // Size of each grid cell in pixels
    
    return (
      <div
        className="relative mx-auto"
        style={{
          width: (boardSize + 1) * gridSize,
          height: (boardSize + 1) * gridSize
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 bg-surface-50 dark:bg-surface-800 rounded-lg shadow-card"
          style={{ padding: gridSize / 2 }}
        >
          {/* Render boxes */}
          {boxes.map((row, rowIndex) => (
            row.map((box, colIndex) => (
              <div
                key={`box-${rowIndex}-${colIndex}`}
                className={`absolute game-box ${
                  box === 1 
                    ? 'bg-primary/30' 
                    : box === 2 
                      ? 'bg-secondary/30' 
                      : 'bg-transparent'
                }`}
                style={{
                  left: (colIndex + 1) * gridSize - gridSize / 2,
                  top: (rowIndex + 1) * gridSize - gridSize / 2,
                  width: gridSize,
                  height: gridSize,
                }}
              >
                {box !== null && (
                  <div className="flex items-center justify-center h-full w-full">
                    <span className={`text-xs font-bold ${box === 1 ? 'text-primary-dark' : 'text-secondary-dark'}`}>
                      P{box}
                    </span>
                  </div>
                )}
              </div>
            ))
          ))}
          
          {/* Render dots */}
          {dots.map((row, rowIndex) => (
            row.map((dot, colIndex) => (
              <div
                key={`dot-${rowIndex}-${colIndex}`}
                className="absolute dot transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: colIndex * gridSize,
                  top: rowIndex * gridSize,
                }}
              />
            ))
          ))}
          
          {/* Render horizontal lines */}
          {horizontalLines.map((row, rowIndex) => (
            row.map((line, colIndex) => (
              <button
                key={`h-line-${rowIndex}-${colIndex}`}
                className={`absolute line line-horizontal transition-all hover:h-2 ${
                  line === 1 
                    ? 'bg-primary h-2' 
                    : line === 2 
                      ? 'bg-secondary h-2' 
                      : hoverLine.type === 'horizontal' && hoverLine.row === rowIndex && hoverLine.col === colIndex
                        ? currentPlayer === 1 ? 'bg-primary/50 h-2' : 'bg-secondary/50 h-2'
                        : 'bg-surface-300 dark:bg-surface-600'
                }`}
                style={{
                  left: colIndex * gridSize + 3,
                  top: rowIndex * gridSize,
                  width: gridSize - 6,
                }}
                onClick={() => handleLineClick('horizontal', rowIndex, colIndex)}
                onMouseEnter={() => handleLineHover('horizontal', rowIndex, colIndex)}
                onMouseLeave={handleLineLeave}
                disabled={line !== null || winner !== null}
              />
            ))
          ))}
          
          {/* Render vertical lines */}
          {verticalLines.map((row, rowIndex) => (
            row.map((line, colIndex) => (
              <button
                key={`v-line-${rowIndex}-${colIndex}`}
                className={`absolute line line-vertical transition-all hover:w-2 ${
                  line === 1 
                    ? 'bg-primary w-2' 
                    : line === 2 
                      ? 'bg-secondary w-2' 
                      : hoverLine.type === 'vertical' && hoverLine.row === rowIndex && hoverLine.col === colIndex
                        ? currentPlayer === 1 ? 'bg-primary/50 w-2' : 'bg-secondary/50 w-2'
                        : 'bg-surface-300 dark:bg-surface-600'
                }`}
                style={{
                  left: colIndex * gridSize,
                  top: rowIndex * gridSize + 3,
                  height: gridSize - 6,
                }}
                onClick={() => handleLineClick('vertical', rowIndex, colIndex)}
                onMouseEnter={() => handleLineHover('vertical', rowIndex, colIndex)}
                onMouseLeave={handleLineLeave}
                disabled={line !== null || winner !== null}
              />
            ))
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card overflow-hidden"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">DotNexus</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
            >
              Live Game
            </motion.span>
          </h2>
          
          {!gameStarted ? (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center">
                <label htmlFor="board-size" className="mr-2 text-sm font-medium text-surface-700 dark:text-surface-300">
                  Board Size:
                </label>
                <select
                  id="board-size"
                  value={boardSize}
                  onChange={(e) => setBoardSize(parseInt(e.target.value))}
                  className="input py-1 px-2 text-sm w-auto"
                >
                  <option value="3">3×3</option>
                  <option value="4">4×4</option>
                  <option value="5">5×5</option>
                  <option value="6">6×6</option>
                </select>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={initializeGame}
                className="btn btn-primary"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                Start Game
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setGameStarted(false);
                }}
                className="btn btn-outline"
              >
                <RefreshIcon className="w-4 h-4 mr-2" />
                New Game
              </motion.button>
            </div>
          )}
        </div>
        
        {gameStarted ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 flex justify-center items-center py-4">
              {renderGameBoard()}
            </div>
            
            <div className="md:col-span-4 flex flex-col space-y-4">
              {/* Game info */}
              <div className="bg-surface-100 dark:bg-surface-700 rounded-lg p-4">
                <h3 className="font-semibold mb-4 flex items-center">
                  <SettingsIcon className="w-4 h-4 mr-2 text-surface-500" />
                  Game Info
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-300">Board Size:</span>
                    <span className="font-medium">{boardSize}×{boardSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-300">Total Boxes:</span>
                    <span className="font-medium">{boardSize * boardSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-300">Boxes Claimed:</span>
                    <span className="font-medium">{scores.player1 + scores.player2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-600 dark:text-surface-300">Boxes Remaining:</span>
                    <span className="font-medium">{boardSize * boardSize - (scores.player1 + scores.player2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Players */}
              <div className="space-y-3">
                <div className={`p-3 rounded-lg ${
                  currentPlayer === 1 && !winner
                    ? 'bg-primary/10 border border-primary/30 ring-2 ring-primary/20'
                    : 'bg-surface-100 dark:bg-surface-700'
                } transition-all`}>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="ml-2 font-semibold">Player 1</h4>
                    {winner === 1 && (
                      <div className="ml-auto flex items-center text-yellow-500">
                        <TrophyIcon className="w-5 h-5 mr-1" />
                        <span className="text-sm font-bold">Winner!</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-surface-600 dark:text-surface-400 text-sm">Boxes Claimed:</span>
                    <span className="text-lg font-bold text-primary">{scores.player1}</span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${
                  currentPlayer === 2 && !winner
                    ? 'bg-secondary/10 border border-secondary/30 ring-2 ring-secondary/20'
                    : 'bg-surface-100 dark:bg-surface-700'
                } transition-all`}>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <UsersIcon className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="ml-2 font-semibold">Player 2</h4>
                    {winner === 2 && (
                      <div className="ml-auto flex items-center text-yellow-500">
                        <TrophyIcon className="w-5 h-5 mr-1" />
                        <span className="text-sm font-bold">Winner!</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-surface-600 dark:text-surface-400 text-sm">Boxes Claimed:</span>
                    <span className="text-lg font-bold text-secondary">{scores.player2}</span>
                  </div>
                </div>
                
                {winner === 0 && (
                  <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700">
                    <div className="flex items-center justify-center">
                      <TrophyIcon className="w-5 h-5 text-yellow-500 mr-2" />
                      <span className="font-semibold">It's a draw!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center space-y-6">
            <img 
              src="https://cdn.pixabay.com/photo/2017/10/03/08/14/dots-2811931_1280.png" 
              alt="Connect Dots Game" 
              className="w-64 h-64 object-contain opacity-80 dark:opacity-50"
            />
            <div className="text-center space-y-3 max-w-md">
              <h3 className="text-xl font-semibold">Welcome to DotNexus!</h3>
              <p className="text-surface-600 dark:text-surface-300">
                Connect the dots, claim boxes, and outsmart your opponent in this classic pen-and-paper game, now digital!
              </p>
              <p className="text-surface-500 dark:text-surface-400 text-sm">
                Select your board size and click Start Game to begin playing.
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default MainFeature;