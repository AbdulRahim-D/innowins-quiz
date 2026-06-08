import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const QuestionCard = ({ 
  question, 
  selectedOptionIndex, 
  onSelectOption 
}) => {
  const { questionText, options } = question;

  return (
    <div className="space-y-6">
      {/* Question Text */}
      <h2 className="text-xl md:text-2xl font-black text-foreground leading-snug tracking-tight">
        {questionText}
      </h2>

      {/* Options Grid */}
      <div className="flex flex-col gap-3">
        {options.map((option, idx) => {
          const isSelected = selectedOptionIndex === idx;
          
          return (
            <motion.button
              key={idx}
              onClick={() => onSelectOption(idx)}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2 }}
              className={`w-full text-left p-4 rounded-2xl border flex items-center justify-between transition-all duration-300 font-bold ${
                isSelected
                  ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                  : 'bg-card/25 border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-muted/15'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Styled Custom Radio Circle */}
                <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected 
                    ? 'border-primary bg-primary text-white shadow-sm' 
                    : 'border-border bg-card/20'
                }`}>
                  {isSelected && <Check size={10} strokeWidth={3} />}
                </div>
                <span className="text-sm leading-relaxed">{option}</span>
              </div>
              
              {/* Optional indicator inside hover/select */}
              {isSelected && (
                <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/20 px-2.5 py-0.5 rounded-md hidden sm:inline">
                  Selected
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
