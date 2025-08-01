import { useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";

interface CelebrationScreenProps {
  isVisible: boolean;
}

export const CelebrationScreen = ({ isVisible }: CelebrationScreenProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [candlesLit, setCandlesLit] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Light candles one by one
      const candleTimer = setInterval(() => {
        setCandlesLit(prev => {
          if (prev < 24) {
            return prev + 1;
          } else {
            clearInterval(candleTimer);
            setTimeout(() => setShowMessage(true), 500);
            return prev;
          }
        });
      }, 100);

      return () => clearInterval(candleTimer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="text-center z-20 relative">
        {/* Birthday Message */}
        {showMessage && (
          <div className="mb-8 scale-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 text-glow">
              Happy 24th Birthday
            </h1>
            <h2 className="text-3xl md:text-4xl font-light text-secondary mb-6">
              My Love! ❤️🎉
            </h2>
            <div className="glass rounded-2xl p-6 max-w-lg mx-auto">
              <Heart className="text-heart mx-auto mb-4 heart-beat heart-glow" size={48} />
              <p className="text-lg text-text-primary leading-relaxed">
                Another year of your beautiful existence, another year of our incredible love story. 
                You make every day brighter, every moment sweeter, and every dream more possible.
              </p>
              <p className="text-text-secondary mt-4 italic">
                Here's to many more adventures together! 💕✨
              </p>
            </div>
          </div>
        )}

        {/* Birthday Cake */}
        <div className="glass rounded-3xl p-8 max-w-md mx-auto">
          <div className="relative">
            {/* Cake Base */}
            <div className="text-8xl md:text-9xl mb-4 filter drop-shadow-lg">
              🎂
            </div>
            
            {/* Candles */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    {/* Flame */}
                    {candlesLit > i && (
                      <div className="text-xs animate-pulse">
                        🕯️
                      </div>
                    )}
                    {/* Candle */}
                    <div className={`w-1 h-4 ${candlesLit > i ? 'bg-yellow-300' : 'bg-gray-300'} rounded-full transition-colors duration-300`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cake Details */}
          <div className="mt-6 text-center">
            <p className="text-text-secondary mb-2">
              {candlesLit}/24 candles lit
            </p>
            {candlesLit === 24 && (
              <div className="fade-in">
                <Sparkles className="text-confetti-yellow mx-auto mb-2 animate-spin" size={24} />
                <p className="text-primary font-semibold">
                  Make a wish, my love! ✨
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Message */}
        {showMessage && (
          <div className="mt-8 glass rounded-xl p-4 fade-in">
            <p className="text-text-light text-sm">
              Created with endless love and countless lines of code 💻💕<br />
              Because you deserve all the magic in the world ✨
            </p>
          </div>
        )}
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <Heart className="absolute top-10 left-10 text-heart heart-beat opacity-60 float" size={20} />
        <Heart className="absolute top-20 right-20 text-heart heart-beat opacity-60 float-delayed" size={16} />
        <Heart className="absolute bottom-20 left-20 text-heart heart-beat opacity-60 float" size={18} />
        <Heart className="absolute bottom-10 right-10 text-heart heart-beat opacity-60 float-delayed" size={22} />
        <Sparkles className="absolute top-32 left-1/4 text-confetti-yellow opacity-70 float" size={16} />
        <Sparkles className="absolute bottom-32 right-1/4 text-confetti-purple opacity-70 float-delayed" size={14} />
      </div>
    </div>
  );
};