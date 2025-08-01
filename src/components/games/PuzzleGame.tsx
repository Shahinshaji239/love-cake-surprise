import { useState, useEffect } from "react";
import { RotateCcw, Check } from "lucide-react";

interface PuzzleGameProps {
  onComplete: () => void;
  isCompleted: boolean;
}

interface PuzzlePiece {
  id: number;
  currentPosition: number;
  correctPosition: number;
}

export const PuzzleGame = ({ onComplete, isCompleted }: PuzzleGameProps) => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const gridSize = 3; // 3x3 puzzle

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const newPieces: PuzzlePiece[] = [];
    const positions = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);

    for (let i = 0; i < gridSize * gridSize; i++) {
      newPieces.push({
        id: i,
        currentPosition: shuffledPositions[i],
        correctPosition: i
      });
    }

    setPieces(newPieces);
    setSelectedPiece(null);
    setMoves(0);
  };

  const handlePieceClick = (pieceId: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(pieceId);
    } else if (selectedPiece === pieceId) {
      setSelectedPiece(null);
    } else {
      // Swap pieces
      const piece1 = pieces.find(p => p.id === selectedPiece);
      const piece2 = pieces.find(p => p.id === pieceId);
      
      if (piece1 && piece2) {
        const newPieces = pieces.map(piece => {
          if (piece.id === selectedPiece) {
            return { ...piece, currentPosition: piece2.currentPosition };
          } else if (piece.id === pieceId) {
            return { ...piece, currentPosition: piece1.currentPosition };
          }
          return piece;
        });
        
        setPieces(newPieces);
        setMoves(prev => prev + 1);
        setSelectedPiece(null);

        // Check if puzzle is solved
        const isSolved = newPieces.every(piece => piece.currentPosition === piece.correctPosition);
        if (isSolved) {
          setTimeout(() => onComplete(), 500);
        }
      }
    }
  };

  const getPieceContent = (pieceId: number) => {
    const emojis = [
      "💕", "💖", "💗", 
      "🌹", "💐", "🦋", 
      "✨", "🌟", "💫"
    ];
    return emojis[pieceId];
  };

  const isPieceInCorrectPosition = (piece: PuzzlePiece) => {
    return piece.currentPosition === piece.correctPosition;
  };

  if (isCompleted) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">🧩</div>
        <h3 className="text-2xl font-bold text-primary mb-2">Puzzle Master!</h3>
        <p className="text-text-secondary">You solved it in {moves} moves! Just like how we fit perfectly together 💕</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2">Love Puzzle 🧩</h3>
        <p className="text-text-secondary mb-4">
          Arrange the pieces to complete our love story!
        </p>
        <div className="flex justify-center gap-4 text-sm text-text-light">
          <span>Moves: {moves}</span>
          <button
            onClick={initializePuzzle}
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <RotateCcw size={14} />
            Restart
          </button>
        </div>
      </div>

      <div className="max-w-xs mx-auto">
        <div className="grid grid-cols-3 gap-2 p-4 bg-gradient-to-br from-pink-50/50 to-purple-50/50 rounded-xl border-2 border-glass-border">
          {Array.from({ length: gridSize * gridSize }, (_, position) => {
            const piece = pieces.find(p => p.currentPosition === position);
            
            if (!piece) return null;

            const isCorrect = isPieceInCorrectPosition(piece);
            const isSelected = selectedPiece === piece.id;

            return (
              <button
                key={position}
                onClick={() => handlePieceClick(piece.id)}
                className={`
                  aspect-square glass-button rounded-lg flex items-center justify-center text-2xl
                  transition-all duration-300 relative
                  ${isSelected ? 'scale-110 ring-2 ring-primary shadow-lg' : 'hover:scale-105'}
                  ${isCorrect ? 'bg-green-100/70 border-green-300' : ''}
                `}
              >
                {getPieceContent(piece.id)}
                
                {isCorrect && (
                  <Check 
                    className="absolute -top-1 -right-1 text-green-600 bg-white rounded-full p-0.5" 
                    size={16} 
                  />
                )}
                
                {isSelected && (
                  <div className="absolute inset-0 bg-primary/20 rounded-lg animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-center text-sm text-text-light">
          Click pieces to select and swap them
        </div>

        {pieces.some(piece => isPieceInCorrectPosition(piece)) && (
          <div className="mt-4 text-center">
            <p className="text-text-secondary text-sm">
              {pieces.filter(piece => isPieceInCorrectPosition(piece)).length} of {pieces.length} pieces in place! 
            </p>
          </div>
        )}
      </div>
    </div>
  );
};