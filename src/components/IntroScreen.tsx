import { Heart } from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-3xl p-8 md:p-12 max-w-lg w-full text-center scale-in">
        {/* Floating Hearts */}
        <div className="relative">
          <Heart className="absolute -top-6 -left-6 text-heart heart-beat heart-glow" size={24} />
          <Heart className="absolute -top-4 -right-8 text-heart heart-beat heart-glow float-delayed" size={20} />
          <Heart className="absolute -bottom-8 left-4 text-heart heart-beat heart-glow float" size={18} />
        </div>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-glow">
            Happy Birthday
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-secondary mb-6">
            My Love! 💕
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            I've prepared something special for your 24th birthday.
            Are you ready for a little adventure filled with love?
          </p>
        </div>

        <button
          onClick={onStart}
          className="glass-button px-8 py-4 rounded-2xl text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
        >
          Start My Journey ✨
        </button>

        <div className="mt-6 opacity-70">
          <p className="text-sm text-text-light">
            Made with 💖 just for you
          </p>
        </div>
      </div>
    </div>
  );
};