import { useState } from "react";
import { Heart, Check, X } from "lucide-react";

interface LoveQuizProps {
  onComplete: () => void;
  isCompleted: boolean;
}

const questions = [
  {
    question: "What's our favorite type of date?",
    options: ["Movie nights at home", "Romantic dinners", "Adventure trips", "All of the above"],
    correct: 3,
    explanation: "Because every moment with you is perfect! 💕"
  },
  {
    question: "What do you love most about me?",
    options: ["Your smile", "Your kindness", "Your sense of humor", "Everything"],
    correct: 3,
    explanation: "The feeling is mutual, my love! ❤️"
  },
  {
    question: "Our first 'I love you' was:",
    options: ["Unexpected but perfect", "Long overdue", "Magical", "All of the above"],
    correct: 3,
    explanation: "That moment changed everything for the better! 🌟"
  }
];

export const LoveQuiz = ({ onComplete, isCompleted }: LoveQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setTimeout(() => onComplete(), 1000);
      }
    }, 2000);
  };

  if (isCompleted) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">💖</div>
        <h3 className="text-2xl font-bold text-primary mb-2">Love Expert!</h3>
        <p className="text-text-secondary">You got {score}/{questions.length} correct! You know our love story so well 💕</p>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2">Love Quiz 💕</h3>
        <p className="text-text-secondary mb-4">Let's see how well you know our love story!</p>
        <div className="flex justify-center gap-2 mb-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentQuestion 
                  ? 'bg-primary scale-125' 
                  : index < currentQuestion 
                  ? 'bg-secondary' 
                  : 'bg-glass-border'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4 text-center">
            {currentQ.question}
          </h4>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full p-4 rounded-xl text-left transition-all duration-300 border-2
                  ${selectedAnswer === index 
                    ? showResult 
                      ? index === currentQ.correct
                        ? 'border-green-400 bg-green-50 text-green-800'
                        : 'border-red-400 bg-red-50 text-red-800'
                      : 'border-primary bg-primary/10'
                    : 'border-glass-border glass-button hover:border-secondary'
                  }
                  ${showResult && index === currentQ.correct && selectedAnswer !== index
                    ? 'border-green-400 bg-green-50 text-green-800'
                    : ''
                  }
                `}
                disabled={showResult}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && (
                    <div>
                      {index === currentQ.correct ? (
                        <Check className="text-green-600" size={20} />
                      ) : selectedAnswer === index ? (
                        <X className="text-red-600" size={20} />
                      ) : null}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="text-center fade-in">
            <Heart className="text-heart mx-auto mb-2 heart-beat" size={32} />
            <p className="text-text-secondary italic">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {selectedAnswer !== null && !showResult && (
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="glass-button px-6 py-3 rounded-xl text-primary-foreground font-semibold"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'} ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
};