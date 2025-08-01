import { useState, useEffect } from "react";
import { Heart, Star, Gift, Sparkles } from "lucide-react";
import { personalConfig } from "../../config/personal";

interface MemoryGameProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const MemoryGame = ({ onComplete, isCompleted }: MemoryGameProps) => {
  const [cards, setCards] = useState<{ id: number; imageIndex: number; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardPairs = [];
    for (let i = 0; i < 4; i++) {
      cardPairs.push({ imageIndex: i }, { imageIndex: i });
    }
    
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        id: index,
        imageIndex: card.imageIndex,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
  };

  const handleCardClick = (cardId: number) => {
    if (isCompleted || flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);
      
      if (firstCard?.imageIndex === secondCard?.imageIndex) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlippedCards.includes(c.id) ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          
          // Check if all cards are matched
          const updatedCards = cards.map(c => 
            newFlippedCards.includes(c.id) ? { ...c, isMatched: true } : c
          );
          
          if (updatedCards.every(c => c.isMatched)) {
            setTimeout(() => onComplete(), 500);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlippedCards.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  if (isCompleted) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-primary mb-2">Perfect Memory!</h3>
        <p className="text-text-secondary">
          {personalConfig.messages.memoryGame.completed.replace('{moves}', moves.toString())}
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2">{personalConfig.messages.memoryGame.title}</h3>
        <p className="text-text-secondary mb-2">{personalConfig.messages.memoryGame.description}</p>
        <p className="text-sm text-text-light">Moves: {moves}</p>
      </div>
      
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {cards.map((card) => {
          const imageData = personalConfig.memoryGameImages[card.imageIndex];
          
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square glass-button rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden
                ${card.isFlipped || card.isMatched ? 'scale-105' : 'hover:scale-105'}
                ${card.isMatched ? 'opacity-75' : ''}
              `}
              disabled={card.isFlipped || card.isMatched}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="w-full h-full relative">
                  <img 
                    src={imageData.src} 
                    alt={imageData.alt}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      // Fallback to heart icon if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center';
                      fallback.innerHTML = '<svg class="w-8 h-8 text-heart" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
                      target.parentNode?.appendChild(fallback);
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-glass-border rounded opacity-50 flex items-center justify-center">
                    <Heart className="text-heart/50" size={16} />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};