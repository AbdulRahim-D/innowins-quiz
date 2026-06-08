import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import QuizNavigator from './QuizNavigator';
import Timer from './Timer';
import { ChevronLeft, ChevronRight, Bookmark, Send, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizPlayer = ({ quiz, onSubmit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Store user answers as a map: { questionIndex: selectedOptionIndex }
  const [answers, setAnswers] = useState({});
  // Store marked for review indices
  const [markedForReview, setMarkedForReview] = useState([]);

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    // Progress without selecting anything
    handleNext();
  };

  const handleMarkForReview = () => {
    setMarkedForReview(prev => {
      if (prev.includes(currentIndex)) {
        return prev.filter(idx => idx !== currentIndex);
      } else {
        return [...prev, currentIndex];
      }
    });
  };

  const handleSubmit = () => {
    // Format answers to match backend expected format: Array of { questionId, selectedOptionIndex }
    const formattedAnswers = questions.map((q, idx) => ({
      questionId: q._id,
      selectedOptionIndex: answers[idx] !== undefined ? answers[idx] : -1
    }));
    
    onSubmit(formattedAnswers);
  };

  const progressPercentage = totalQuestions > 0 
    ? Math.round(((Object.keys(answers).length) / totalQuestions) * 100) 
    : 0;

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start relative px-4 py-6">
      
      {/* Left Main Question Panel */}
      <div className="w-full lg:flex-grow bg-card/25 backdrop-blur-xl border border-border/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[500px] shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6">
          {/* Header Progress text */}
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="text-primary">{progressPercentage}% Answered</span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]"
            />
          </div>

          {/* Animating the Question transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="py-4"
            >
              {currentQuestion ? (
                <QuestionCard
                  question={currentQuestion}
                  selectedOptionIndex={answers[currentIndex]}
                  onSelectOption={handleSelectOption}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <HelpCircle size={48} className="text-muted-foreground mb-4 animate-bounce" />
                  <p className="text-muted-foreground text-sm font-semibold">Question not found in this quiz.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Buttons Footer */}
        <div className="flex flex-wrap gap-3.5 justify-between pt-6 border-t border-border/20 mt-8">
          <div className="flex gap-2">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn-secondary px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>

            {/* Skip Button */}
            <button
              onClick={handleSkip}
              disabled={currentIndex === totalQuestions - 1}
              className="px-4 py-2.5 border border-border/40 hover:border-primary/30 text-muted-foreground hover:text-foreground rounded-xl text-xs font-black uppercase tracking-wider transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>Skip</span>
            </button>
          </div>

          <div className="flex gap-2">
            {/* Mark for Review Button */}
            <button
              onClick={handleMarkForReview}
              className={`px-4 py-2.5 border rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                markedForReview.includes(currentIndex)
                  ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 shadow-[0_0_12px_rgba(234,179,8,0.15)]'
                  : 'border-border/40 hover:border-primary/30 text-muted-foreground hover:text-foreground hover:bg-muted/15'
              }`}
            >
              <Bookmark size={14} className={markedForReview.includes(currentIndex) ? 'fill-yellow-500 text-yellow-500' : ''} />
              <span>Review</span>
            </button>

            {/* Next / Submit Button */}
            {currentIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                className="btn-primary px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 border border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/20 text-white flex items-center gap-2"
              >
                <span>Submit Quiz</span>
                <Send size={14} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-primary hover:bg-primary/95 text-white flex items-center gap-2"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar Timer & Navigator */}
      <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
        <Timer 
          timeLimitMinutes={quiz.timeLimit} 
          onTimeUp={handleSubmit} 
          isActive={true} 
        />
        
        <QuizNavigator
          totalQuestions={totalQuestions}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          answers={answers}
          markedForReview={markedForReview}
        />
      </div>
      
    </div>
  );
};

export default QuizPlayer;
