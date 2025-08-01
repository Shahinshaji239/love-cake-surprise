import { useState, useEffect } from "react";
import { Heart, Star, Gift, Sparkles } from "lucide-react";

interface MemoryGameProps {
  onComplete: () => void;
  isCompleted: boolean;
}

const icons = [Heart, Star, Gift, Sparkles];
const iconColors = ["text-heart", "text-confetti-yellow", "text-confetti-blue", "text-confetti-purple"];

export const MemoryGame = ({ onComplete, isCompleted }: MemoryGameProps) => {
  const [cards, setCards] = useState<{ id: number; iconIndex: number; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardPairs = [];
    for (let i = 0; i < 4; i++) {
      cardPairs.push({ iconIndex: i }, { iconIndex: i });
    }
    
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        id: index,
        iconIndex: card.iconIndex,
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
      
      if (firstCard?.iconIndex === secondCard?.iconIndex) {
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
        <p className="text-text-secondary">You completed it in {moves} moves! Just like how you remember all our special moments 💕</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2">Memory of Love 💭</h3>
        <p className="text-text-secondary mb-2">Find the matching pairs, just like we're a perfect match!</p>
        <p className="text-sm text-text-light">Moves: {moves}</p>
      </div>
      
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {cards.map((card) => {
          const IconComponent = icons[card.iconIndex];
          const iconColor = iconColors[card.iconIndex];
          
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square glass-button rounded-xl flex items-center justify-center transition-all duration-300
                ${card.isFlipped || card.isMatched ? 'scale-105' : 'hover:scale-105'}
                ${card.isMatched ? 'opacity-75' : ''}
              `}
              disabled={card.isFlipped || card.isMatched}
            >
              {card.isFlipped || card.isMatched ? (
                <IconComponent className={`${iconColor} heart-beat`} size={24} />
              ) : (
                <div className="w-6 h-6 bg-glass-border rounded opacity-50" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};