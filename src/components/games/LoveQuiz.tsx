import { useState } from "react";
import { Heart, Check, X } from "lucide-react";

interface LoveQuizProps {
  onComplete: () => void;
  isCompleted: boolean;
}

const questions = [
  {
    question: "What feels like our true way of being together?",
    options: ["Quiet nights wrapped in love", "Sharing meals made with care", "Exploring the world hand in hand", "Every moment, every way"],
    correct: 3,
    explanations: {
      0: "Remember those peaceful evenings when the world felt like it was just ours? Your head on my shoulder, hearts beating in perfect rhythm... 💕",
      1: "Every meal we share becomes a love letter - the way you smile when I cook for you, how we laugh over burnt toast... these are the moments that make us 'us' 🥰",
      2: "Hand in hand, we've turned every street into our adventure. From that first walk where we talked for hours to every journey since - you make everywhere feel like home 🌟",
      3: "Because every way we share love feels like heaven sent - whether it's quiet nights, shared meals, or grand adventures, you make every moment magical ✨"
    }
  },
  {
    question: "What's the most beautiful thing about us?",
    options: ["The warmth of your smile", "The kindness you bring to my soul", "The laughter that lights up our days", "The way our hearts move as one"],
    correct: 3,
    explanations: {
      0: "Your smile is my sunrise - it lights up not just my day, but my entire world. The way your eyes crinkle when you're truly happy... that's my favorite view 😊",
      1: "You have this incredible way of making my soul feel safe. Your gentle heart heals parts of me I didn't even know were broken 💖",
      2: "Our laughter is the soundtrack of our love story. From silly inside jokes to those moments when we can't stop giggling - you make joy feel effortless 😄",
      3: "This is it - two hearts that found their perfect rhythm. We don't just love each other, we move through life as one beautiful dance 💫"
    }
  },
  {
    question: "When our souls first whispered 'I love you,' it felt:",
    options: ["Like time stood still", "Like the universe had waited for us", "Like pure magic", "All of it and more"],
    correct: 3,
    explanations: {
      0: "Remember that perfect pause? The world held its breath while our hearts recognized their home. That moment lives in my heart forever ⏰",
      1: "It really did feel like every star had aligned just for us. Like the universe had been patiently weaving our paths together all along 🌌",
      2: "Pure magic doesn't even begin to describe it - it was like watching our souls remember a love that existed before we even met ✨",
      3: "All of it and more - time stood still while the universe celebrated, magic filled the air, and our hearts finally came home 💖"
    }
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