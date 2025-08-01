import { useState, useEffect } from "react";
import { Heart, Sparkles, Star, Gift } from "lucide-react";

// Mock personal config for demonstration
const personalConfig = {
  birthdayAge: 24,
  herName: "Rizwana",
  yourName: "Shahin",
  messages: {
    celebration: {
      title: "Happy {age}th Birthday!",
      subtitle: "KILI!",
      mainMessage: "Wishing you all the happiness in the world on your special day!",
      subMessage: "May this year bring you endless joy and beautiful memories.",
      wishMessage: "Make a wish! 🌟",
      footerMessage: "Hope your birthday is as wonderful as you are!\nCelebrating another year of your amazing journey."
    }
  }
};

interface CelebrationScreenProps {
  isVisible: boolean;
}

export const CelebrationScreen = ({ isVisible }: CelebrationScreenProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [candlesLit, setCandlesLit] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [candlesPlaced, setCandlesPlaced] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Show image first
      setTimeout(() => setShowImage(true), 500);
      
      // Show cake after image
      setTimeout(() => setShowCake(true), 1500);
      
      // Start placing candles one by one
      setTimeout(() => {
        const candleInterval = setInterval(() => {
          setCandlesPlaced(prev => {
            if (prev < 24) {
              return prev + 1;
            } else {
              clearInterval(candleInterval);
              // Start lighting candles after all are placed
              setTimeout(() => {
                const lightInterval = setInterval(() => {
                  setCandlesLit(prev => {
                    if (prev < 24) {
                      return prev + 1;
                    } else {
                      clearInterval(lightInterval);
                      setTimeout(() => setShowMessage(true), 500);
                      return prev;
                    }
                  });
                }, 100);
              }, 500);
              return prev;
            }
          });
        }, 150); // Place candles every 150ms
      }, 2000);
    }
  }, [isVisible]);

  // Generate candle positions in a dense arrangement like the second image
  const generateCandlePositions = () => {
    const positions = [];
    const rows = 4; // 4 rows of candles
    const candlesPerRow = [5, 6, 7, 6]; // Varying number of candles per row
    let candleIndex = 0;

    for (let row = 0; row < rows; row++) {
      const candlesInThisRow = candlesPerRow[row];
      const rowY = -15 + (row * 8); // Vertical spacing between rows
      
      for (let col = 0; col < candlesInThisRow; col++) {
        if (candleIndex >= 24) break;
        
        // Calculate horizontal position with some randomness for natural look
        const baseX = -25 + (col * (50 / (candlesInThisRow - 1)));
        const randomOffset = (Math.random() - 0.5) * 6; // Small random offset
        const x = baseX + randomOffset;
        
        positions.push({
          x: x,
          y: rowY,
          color: ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400', 'bg-orange-400'][candleIndex % 6]
        });
        
        candleIndex++;
      }
    }
    
    return positions;
  };

  const candlePositions = generateCandlePositions();

  if (!isVisible) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-100">
      {/* Old Confetti Effect */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 80 }, (_, i) => (
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
      <div className="text-center z-20 relative max-w-4xl mx-auto">
        {/* Birthday Header - Static */}
        {showMessage && (
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-purple-600 mb-4 drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
              {personalConfig.messages.celebration.title.replace('{age}', personalConfig.birthdayAge.toString())}
            </h1>
            <h2 className="text-3xl md:text-4xl font-light text-pink-600 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              {personalConfig.messages.celebration.subtitle.replace('{name}', personalConfig.herName)}
            </h2>
          </div>
        )}

        {/* Her Image Section - Only this bounces */}
        {showImage && (
          <div className="mb-8 animate-bounce">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 max-w-md mx-auto relative overflow-hidden shadow-2xl border border-white/30">
              <div className="relative">
                <img 
                  src="/riz.jpg" 
                  alt={`${personalConfig.herName}`}
                  className="w-full h-64 object-cover rounded-2xl shadow-xl"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center';
                    fallback.innerHTML = '<div class="text-6xl">💕</div>';
                    target.parentNode?.appendChild(fallback);
                  }}
                />
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 to-purple-400/20 animate-pulse"></div>
                
                {/* Floating hearts around image */}
                <Heart className="absolute -top-2 -left-2 text-pink-500 animate-pulse" size={20} />
                <Heart className="absolute -top-1 -right-1 text-pink-500 animate-pulse" size={16} />
                <Heart className="absolute -bottom-1 left-2 text-pink-500 animate-pulse" size={18} />
                <Heart className="absolute -bottom-2 right-2 text-pink-500 animate-pulse" size={14} />
              </div>
            </div>
          </div>
        )}

        {/* Birthday Message Card - Static */}
        {showMessage && (
          <div className="mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto shadow-2xl border border-white/30">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Heart className="text-pink-500 animate-pulse" size={48} />
                  <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-spin" size={20} />
                  <Star className="absolute -bottom-2 -left-2 text-purple-500 animate-spin" size={16} />
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                {personalConfig.messages.celebration.mainMessage}
              </p>
              <p className="text-gray-600 italic" style={{ fontFamily: 'Georgia, serif' }}>
                {personalConfig.messages.celebration.subMessage}
              </p>
            </div>
          </div>
        )}

        {/* Enhanced Birthday Cake - Static */}
        {showCake && (
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto shadow-2xl border border-white/30">
            <div className="relative">
              {/* Cake Base with better styling */}
              <div className="text-8xl md:text-9xl mb-4 filter drop-shadow-lg relative">
                🎂
                {/* Cake glow effect */}
                <div className="absolute inset-0 text-8xl md:text-9xl blur-sm opacity-50 animate-pulse">🎂</div>
              </div>
              
              {/* Candles positioned densely on top of cake surface */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <div className="relative w-32 h-20">
                  {candlePositions.map((position, i) => (
                    <div 
                      key={i} 
                      className="absolute flex flex-col items-center"
                      style={{
                        left: `calc(50% + ${position.x}px)`,
                        top: `calc(${position.y}px)`,
                        transform: 'translate(-50%, 0)'
                      }}
                    >
                      {/* Enhanced Flame */}
                      {candlesLit > i && candlesPlaced > i && (
                        <div className="text-xs relative mb-1 animate-pulse">
                          <div className="w-1 h-2 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full animate-bounce"></div>
                        </div>
                      )}
                      {/* Enhanced Candle */}
                      {candlesPlaced > i && (
                        <div className={`w-1 h-4 ${candlesLit > i ? position.color + ' shadow-lg' : 'bg-gray-300'} rounded-full transition-all duration-300 ${candlesLit > i ? 'animate-pulse' : ''}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Cake Details */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-2 font-medium">
                {candlesPlaced}/24 candles placed
              </p>
              {candlesPlaced === 24 && (
                <p className="text-gray-600 mb-2 font-medium">
                  {candlesLit}/24 candles lit
                </p>
              )}
              {candlesLit === 24 && (
                <div className="animate-pulse">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <Sparkles className="text-yellow-400 animate-spin" size={24} />
                    <Sparkles className="text-purple-500 animate-spin" size={20} />
                    <Sparkles className="text-yellow-400 animate-spin" size={24} />
                  </div>
                  <p className="text-purple-600 font-semibold text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                    {personalConfig.messages.celebration.wishMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Footer Message - Static */}
        {showMessage && (
          <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="text-purple-500 animate-bounce" size={20} />
              <Heart className="text-pink-500 animate-pulse" size={20} />
              <Gift className="text-yellow-400 animate-bounce" size={20} />
            </div>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
              {personalConfig.messages.celebration.footerMessage.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < personalConfig.messages.celebration.footerMessage.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
            <p className="text-gray-500 text-xs mt-2" style={{ fontFamily: 'Georgia, serif' }}>
              - {personalConfig.yourName} 💖
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <Heart className="absolute top-10 left-10 text-pink-500 animate-pulse opacity-60" size={20} />
        <Heart className="absolute top-20 right-20 text-pink-500 animate-pulse opacity-60" size={16} />
        <Heart className="absolute bottom-20 left-20 text-pink-500 animate-pulse opacity-60" size={18} />
        <Heart className="absolute bottom-10 right-10 text-pink-500 animate-pulse opacity-60" size={22} />
        <Sparkles className="absolute top-32 left-1/4 text-yellow-400 opacity-70 animate-spin" size={16} />
        <Sparkles className="absolute bottom-32 right-1/4 text-purple-500 opacity-70 animate-spin" size={14} />
        <Star className="absolute top-40 right-1/3 text-blue-400 opacity-60 animate-pulse" size={12} />
        <Star className="absolute bottom-40 left-1/3 text-green-400 opacity-60 animate-pulse" size={10} />
      </div>
    </div>
  );
};

export default CelebrationScreen;