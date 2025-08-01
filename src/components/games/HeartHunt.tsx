import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface HeartHuntProps {
  onComplete: () => void;
  isCompleted: boolean;
}

interface HeartPosition {
  id: number;
  x: number;
  y: number;
  found: boolean;
}

export const HeartHunt = ({ onComplete, isCompleted }: HeartHuntProps) => {
  const [hearts, setHearts] = useState<HeartPosition[]>([]);
  const [foundCount, setFoundCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const totalHearts = 8;

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && foundCount < totalHearts) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (foundCount === totalHearts) {
      onComplete();
    }
  }, [timeLeft, gameStarted, foundCount, totalHearts, onComplete]);

  const generateHearts = () => {
    const newHearts: HeartPosition[] = [];
    for (let i = 0; i < totalHearts; i++) {
      newHearts.push({
        id: i,
        x: Math.random() * 80 + 5, // 5% to 85% to avoid edges
        y: Math.random() * 70 + 10, // 10% to 80% to avoid edges
        found: false
      });
    }
    setHearts(newHearts);
    setGameStarted(true);
    setFoundCount(0);
    setTimeLeft(30);
  };

  const handleHeartClick = (heartId: number) => {
    setHearts(prev => prev.map(heart => 
      heart.id === heartId ? { ...heart, found: true } : heart
    ));
    setFoundCount(prev => prev + 1);
  };

  if (isCompleted) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">💖</div>
        <h3 className="text-2xl font-bold text-primary mb-2">Heart Hunter!</h3>
        <p className="text-text-secondary">You found all the hidden hearts! Just like how you found your way to my heart 💕</p>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-primary mb-4">Heart Hunt 💖</h3>
        <p className="text-text-secondary mb-6">
          Find all {totalHearts} hidden hearts within 30 seconds!<br />
          Click on the hearts when you spot them.
        </p>
        <button
          onClick={generateHearts}
          className="glass-button px-6 py-3 rounded-xl text-primary-foreground font-semibold"
        >
          Start Hunting! 🔍
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-primary mb-2">Heart Hunt 💖</h3>
        <div className="flex justify-center gap-6 text-text-secondary">
          <span>Found: {foundCount}/{totalHearts}</span>
          <span className={timeLeft <= 10 ? 'text-red-500 font-bold' : ''}>
            Time: {timeLeft}s
          </span>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-pink-100/50 to-purple-100/50 rounded-xl h-64 md:h-80 overflow-hidden border-2 border-glass-border">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-pink-300">💕</div>
          <div className="absolute top-8 right-8 text-purple-300">✨</div>
          <div className="absolute bottom-4 left-8 text-blue-300">🌟</div>
          <div className="absolute bottom-8 right-4 text-yellow-300">💫</div>
        </div>

        {/* Hidden Hearts */}
        {hearts.map((heart) => (
          <button
            key={heart.id}
            onClick={() => handleHeartClick(heart.id)}
            className={`
              absolute transition-all duration-300 transform hover:scale-125
              ${heart.found ? 'opacity-30 scale-125' : 'hover:animate-pulse'}
            `}
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
            }}
            disabled={heart.found}
          >
            <Heart 
              className={`${heart.found ? 'text-gray-400' : 'text-heart heart-glow'} cursor-pointer`} 
              size={24}
              fill={heart.found ? 'currentColor' : 'none'}
            />
          </button>
        ))}

        {/* Game Over Overlay */}
        {(timeLeft === 0 && foundCount < totalHearts) && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
            <div className="glass rounded-xl p-6 text-center">
              <h4 className="text-xl font-bold text-primary mb-2">Time's Up!</h4>
              <p className="text-text-secondary mb-4">You found {foundCount}/{totalHearts} hearts</p>
              <button
                onClick={generateHearts}
                className="glass-button px-4 py-2 rounded-lg text-primary-foreground"
              >
                Try Again 💪
              </button>
            </div>
          </div>
        )}
      </div>

      {foundCount > 0 && foundCount < totalHearts && (
        <div className="text-center mt-4">
          <p className="text-text-secondary">
            Great job! Keep looking for more hearts! 💕
          </p>
        </div>
      )}
    </div>
  );
};