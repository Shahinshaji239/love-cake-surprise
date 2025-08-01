import { Heart } from "lucide-react";
import { personalConfig } from "../config/personal";

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
            {personalConfig.messages.intro.title}
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-secondary mb-6">
            {personalConfig.herName}! 💕
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            {personalConfig.birthdayMessage}
          </p>
          <p className="text-text-light text-sm mt-4">
            - {personalConfig.yourName} 💖
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
            {personalConfig.messages.intro.signature}
          </p>
        </div>
      </div>
    </div>
  );
};