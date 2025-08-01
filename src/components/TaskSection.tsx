import { useState } from "react";
import { MemoryGame } from "./games/MemoryGame";
import { LoveQuiz } from "./games/LoveQuiz";
import { HeartHunt } from "./games/HeartHunt";
import { PuzzleGame } from "./games/PuzzleGame";
import { Check, Heart } from "lucide-react";

interface TaskSectionProps {
  onAllCompleted: () => void;
}

export const TaskSection = ({ onAllCompleted }: TaskSectionProps) => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [currentTask, setCurrentTask] = useState(0);

  const tasks = [
    { id: 0, name: "Memory Game", component: MemoryGame, icon: "🧠" },
    { id: 1, name: "Love Quiz", component: LoveQuiz, icon: "💕" },
    { id: 2, name: "Heart Hunt", component: HeartHunt, icon: "💖" },
    { id: 3, name: "Love Puzzle", component: PuzzleGame, icon: "🧩" }
  ];

  const handleTaskComplete = (taskId: number) => {
    if (!completedTasks.includes(taskId)) {
      const newCompleted = [...completedTasks, taskId];
      setCompletedTasks(newCompleted);
      
      if (newCompleted.length === tasks.length) {
        setTimeout(() => onAllCompleted(), 1000);
      } else if (currentTask < tasks.length - 1) {
        setTimeout(() => setCurrentTask(currentTask + 1), 800);
      }
    }
  };

  const CurrentTaskComponent = tasks[currentTask].component;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Progress Indicator */}
      <div className="glass rounded-2xl p-6 mb-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">
          Birthday Challenges 🎯
        </h2>
        <div className="flex justify-between items-center gap-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                completedTasks.includes(task.id)
                  ? 'bg-primary/20 scale-105'
                  : currentTask === task.id
                  ? 'bg-secondary/20 scale-105'
                  : 'bg-glass-bg/30'
              }`}
            >
              <div className="text-2xl mb-1">{task.icon}</div>
              <div className="text-xs text-center font-medium text-text-secondary">
                {task.name}
              </div>
              {completedTasks.includes(task.id) && (
                <Check className="text-primary mt-1 animate-bounce" size={16} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 bg-glass-bg/30 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${(completedTasks.length / tasks.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Task */}
      <div className="w-full max-w-2xl">
        <CurrentTaskComponent 
          onComplete={() => handleTaskComplete(currentTask)}
          isCompleted={completedTasks.includes(currentTask)}
        />
      </div>

      {/* Encouraging Message */}
      {completedTasks.length > 0 && completedTasks.length < tasks.length && (
        <div className="glass rounded-xl p-4 mt-6 text-center fade-in">
          <Heart className="text-heart mx-auto mb-2 heart-beat" size={24} />
          <p className="text-text-secondary">
            Great job, my love! {completedTasks.length} of {tasks.length} completed! 
          </p>
        </div>
      )}

      {completedTasks.length === tasks.length && (
        <div className="glass rounded-xl p-6 mt-6 text-center scale-in">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-primary font-semibold text-lg">
            Amazing! You completed all challenges!
          </p>
          <p className="text-text-secondary mt-2">
            Get ready for your special surprise...
          </p>
        </div>
      )}
    </div>
  );
};