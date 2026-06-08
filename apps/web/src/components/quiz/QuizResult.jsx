import React, { useState } from 'react';
import { Trophy, Clock, Target, RotateCcw, LayoutDashboard, Award, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizResult = ({ 
  quiz, 
  attempt, 
  xpEarned, 
  onRetry, 
  onReturn 
}) => {
  const [showReview, setShowReview] = useState(false);
  const { score, correctAnswers, totalQuestions, timeTaken, passed, answers } = attempt;

  // Generate motivational performance headers
  const getMotivation = (scorePercentage) => {
    if (scorePercentage >= 90) {
      return {
        title: 'Mastery Achieved!',
        desc: 'Legendary developer! You dominated this test with absolute perfection.',
        color: 'text-emerald-400',
        glow: 'shadow-emerald-500/20'
      };
    } else if (scorePercentage >= 75) {
      return {
        title: 'Excellent Work!',
        desc: 'Superb execution. Your core knowledge is highly robust and validated.',
        color: 'text-primary',
        glow: 'shadow-primary/20'
      };
    } else if (scorePercentage >= 60) {
      return {
        title: 'Mission Successful!',
        desc: 'Quiz passed! You met all minimum requirements for this technology.',
        color: 'text-blue-400',
        glow: 'shadow-blue-500/20'
      };
    } else {
      return {
        title: 'Critical Failure!',
        desc: 'System error. Your score did not meet the validation threshold. Retry recommended.',
        color: 'text-destructive',
        glow: 'shadow-destructive/20'
      };
    }
  };

  const motivation = getMotivation(score);
  const wrongAnswers = totalQuestions - correctAnswers;

  // Format time taken
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    if (mins === 0) return `${remainingSecs}s`;
    return `${mins}m ${remainingSecs}s`;
  };

  // SVG Circumference calculation for circular progress chart
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      
      {/* 1. Main Score Glow Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/25 backdrop-blur-xl border border-border/40 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent)] pointer-events-none" />

        {/* Circular Progress Chart SVG */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background Track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="text-muted/20"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Foreground Score Ring */}
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              className={passed ? 'text-primary' : 'text-destructive'}
              strokeWidth="8"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          {/* Inner Percentage text */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-black tracking-tight">{score}%</span>
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-wider">
              {passed ? 'PASSED' : 'FAILED'}
            </span>
          </div>
        </div>

        {/* Performance Description Text */}
        <div className="space-y-3 text-center md:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-muted/60 text-muted-foreground uppercase tracking-widest">
              {quiz.category}
            </span>
            <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 bg-muted/60 ${passed ? 'text-primary' : 'text-destructive'}`}>
              <Award size={12} />
              Passing Score: {quiz.passingScore}%
            </span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${motivation.color}`}>
            {motivation.title}
          </h2>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-lg">
            {motivation.desc}
          </p>
        </div>
      </motion.div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Correct', value: correctAnswers, sub: `${totalQuestions} Total`, icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
          { label: 'Incorrect', value: wrongAnswers, sub: `${totalQuestions} Total`, icon: XCircle, color: 'text-rose-500 bg-rose-500/10' },
          { label: 'Time Taken', value: formatTime(timeTaken), sub: `Limit: ${quiz.timeLimit}m`, icon: Clock, color: 'text-blue-500 bg-blue-500/10' },
          { label: 'XP Earned', value: `+${xpEarned} XP`, sub: 'Added to Profile', icon: Trophy, color: 'text-yellow-500 bg-yellow-500/10' }
        ].map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card/25 border border-border/40 rounded-3xl p-5 flex items-center gap-4 hover:border-primary/20 transition-all duration-300 shadow-md"
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${metric.color}`}>
              <metric.icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">{metric.label}</p>
              <h4 className="text-lg font-black truncate">{metric.value}</h4>
              <p className="text-[9px] font-semibold text-muted-foreground/60">{metric.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Action Buttons Section */}
      <div className="flex flex-wrap gap-4 items-center justify-center border-y border-border/20 py-6">
        <button
          onClick={() => setShowReview(!showReview)}
          className="px-6 py-3 border border-border/40 hover:border-primary/30 hover:text-foreground text-muted-foreground rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all"
        >
          {showReview ? (
            <>
              <EyeOff size={16} />
              <span>Hide Answers</span>
            </>
          ) : (
            <>
              <Eye size={16} />
              <span>Review Answers</span>
            </>
          )}
        </button>

        <button
          onClick={onRetry}
          className="btn-secondary px-6 py-3 text-xs font-black uppercase tracking-widest rounded-2xl flex items-center gap-2"
        >
          <RotateCcw size={16} />
          <span>Retry Quiz</span>
        </button>

        <button
          onClick={onReturn}
          className="btn-primary px-6 py-3 text-xs font-black uppercase tracking-widest rounded-2xl bg-primary hover:bg-primary/95 text-white flex items-center gap-2"
        >
          <LayoutDashboard size={16} />
          <span>Return to Dashboard</span>
        </button>
      </div>

      {/* 4. Collapsible Detailed Answer Review */}
      <AnimatePresence>
        {showReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-6"
          >
            <div className="pt-2">
              <h3 className="text-lg font-black tracking-tight mb-2">Detailed Question Review</h3>
              <p className="text-xs text-muted-foreground font-medium">Verify your selected options compared against the validated correct answers.</p>
            </div>

            <div className="space-y-4">
              {quiz.questions.map((question, qIdx) => {
                const answerRecord = answers.find(a => a.questionId === question._id.toString());
                const userSelection = answerRecord ? answerRecord.selectedOptionIndex : -1;
                const isCorrect = answerRecord ? answerRecord.isCorrect : false;

                return (
                  <div 
                    key={qIdx}
                    className={`bg-card/20 border rounded-2xl p-5 space-y-4 transition-colors ${
                      isCorrect ? 'border-emerald-500/20 hover:border-emerald-500/30' : 'border-rose-500/20 hover:border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-sm font-black leading-relaxed flex gap-2">
                        <span className="text-primary">{qIdx + 1}.</span>
                        <span>{question.questionText}</span>
                      </h4>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md shrink-0 flex items-center gap-1 ${
                        isCorrect ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        {isCorrect ? 'CORRECT' : 'INCORRECT'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {question.options.map((option, oIdx) => {
                        const isSelected = userSelection === oIdx;
                        const isCorrectOption = question.correctOptionIndex === oIdx;

                        let borderClass = 'border-border/30 bg-card/10 text-muted-foreground/80';
                        if (isCorrectOption) {
                          borderClass = 'border-emerald-500/50 bg-emerald-500/5 text-emerald-500 font-bold';
                        } else if (isSelected && !isCorrectOption) {
                          borderClass = 'border-rose-500/50 bg-rose-500/5 text-rose-500 font-bold';
                        }

                        return (
                          <div 
                            key={oIdx} 
                            className={`p-3 border rounded-xl text-xs flex items-center justify-between ${borderClass}`}
                          >
                            <span>{option}</span>
                            <div className="flex gap-1">
                              {isCorrectOption && (
                                <span className="text-[8px] font-black bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 rounded uppercase">
                                  Correct
                                </span>
                              )}
                              {isSelected && (
                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                                  isCorrect ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'
                                }`}>
                                  Your Choice
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default QuizResult;
