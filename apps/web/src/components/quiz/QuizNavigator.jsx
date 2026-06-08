import React from 'react';

const QuizNavigator = ({ 
  totalQuestions, 
  currentIndex, 
  setCurrentIndex, 
  answers, 
  markedForReview 
}) => {

  const getStatusColor = (idx) => {
    if (currentIndex === idx) {
      return 'border-primary bg-primary/10 text-primary shadow-[0_0_12px_rgba(99,102,241,0.2)]';
    }
    if (markedForReview.includes(idx)) {
      return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
    }
    // Check if answered (an option was selected, which is not null/undefined)
    if (answers[idx] !== undefined && answers[idx] !== null) {
      return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20';
    }
    return 'border-border bg-card/20 text-muted-foreground hover:bg-muted/35 hover:text-foreground';
  };

  return (
    <div className="bg-card/25 border border-border/40 rounded-2xl p-5 space-y-5 w-full">
      <h3 className="text-sm font-bold text-foreground tracking-tight">Question Navigator</h3>
      
      {/* Navigator Grid */}
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`aspect-square rounded-xl border text-xs font-black flex items-center justify-center transition-all duration-300 focus:outline-none ${getStatusColor(idx)}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="border-t border-border/20 pt-4 space-y-2 text-[10px] font-bold tracking-wide text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-lg border border-primary/50 bg-primary/10 flex items-center justify-center text-primary text-[8px] font-black">1</div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-lg border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-[8px] font-black">1</div>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-lg border border-yellow-500/50 bg-yellow-500/10 flex items-center justify-center text-yellow-500 text-[8px] font-black">1</div>
          <span>Marked for review</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-lg border border-border bg-card/20 flex items-center justify-center text-muted-foreground text-[8px] font-black">1</div>
          <span>Unanswered</span>
        </div>
      </div>
    </div>
  );
};

export default QuizNavigator;
