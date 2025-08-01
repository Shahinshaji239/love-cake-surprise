import { useState } from "react";
import { IntroScreen } from "../components/IntroScreen";
import { TaskSection } from "../components/TaskSection";
import { CelebrationScreen } from "../components/CelebrationScreen";

type AppState = 'intro' | 'tasks' | 'celebration';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('intro');

  const handleStart = () => {
    setCurrentState('tasks');
  };

  const handleAllTasksCompleted = () => {
    setCurrentState('celebration');
  };

  return (
    <div className="min-h-screen">
      {currentState === 'intro' && (
        <IntroScreen onStart={handleStart} />
      )}
      
      {currentState === 'tasks' && (
        <TaskSection onAllCompleted={handleAllTasksCompleted} />
      )}
      
      {currentState === 'celebration' && (
        <CelebrationScreen isVisible={true} />
      )}
    </div>
  );
};

export default Index;
