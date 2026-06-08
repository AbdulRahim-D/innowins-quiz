import React, { useState } from 'react';
import { Plus, Trash2, ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionBuilder = ({ questions, setQuestions }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentQuestion = questions[activeIndex] || {
    questionText: '',
    options: ['', '', '', ''],
    correctOptionIndex: 0
  };

  const handleQuestionTextChange = (e) => {
    const updated = [...questions];
    updated[activeIndex] = {
      ...currentQuestion,
      questionText: e.target.value
    };
    setQuestions(updated);
  };

  const handleOptionChange = (optIdx, val) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[optIdx] = val;

    const updated = [...questions];
    updated[activeIndex] = {
      ...currentQuestion,
      options: updatedOptions
    };
    setQuestions(updated);
  };

  const handleSelectCorrect = (optIdx) => {
    const updated = [...questions];
    updated[activeIndex] = {
      ...currentQuestion,
      correctOptionIndex: optIdx
    };
    setQuestions(updated);
  };

  const handleAddOption = () => {
    const updated = [...questions];
    updated[activeIndex] = {
      ...currentQuestion,
      options: [...currentQuestion.options, '']
    };
    setQuestions(updated);
  };

  const handleRemoveOption = (optIdx) => {
    if (currentQuestion.options.length <= 4) {
      return; // Minimum 4 options
    }
    const updatedOptions = currentQuestion.options.filter((_, idx) => idx !== optIdx);
    
    // Correct index adjustment
    let correctIdx = currentQuestion.correctOptionIndex;
    if (correctIdx === optIdx) {
      correctIdx = 0; // Default back to first
    } else if (correctIdx > optIdx) {
      correctIdx--;
    }

    const updated = [...questions];
    updated[activeIndex] = {
      ...currentQuestion,
      options: updatedOptions,
      correctOptionIndex: correctIdx
    };
    setQuestions(updated);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0
    };
    setQuestions([...questions, newQuestion]);
    setActiveIndex(questions.length); // Jump to new question
  };

  const handleDeleteQuestion = () => {
    if (questions.length <= 1) {
      // Clear instead of delete last
      setQuestions([{
        questionText: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0
      }]);
      return;
    }
    
    const updated = questions.filter((_, idx) => idx !== activeIndex);
    setQuestions(updated);
    setActiveIndex(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="bg-card/25 backdrop-blur-xl border border-border/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-border/20 pb-4">
        <div>
          <h2 className="text-lg font-black tracking-tight">Question Builder</h2>
          <p className="text-xs text-muted-foreground font-medium">Draft questions and label correct answers.</p>
        </div>
        <button
          type="button"
          onClick={handleDeleteQuestion}
          className="text-xs font-bold text-destructive hover:bg-destructive/10 px-3 py-2 rounded-xl border border-destructive/20 transition-all flex items-center gap-1.5"
        >
          <Trash2 size={13} />
          <span>Delete Question</span>
        </button>
      </div>

      {/* Main Area */}
      <div className="space-y-5">
        {/* Progress Navigation Tracker */}
        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
          <span>Editing Question {activeIndex + 1} of {questions.length}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              className="p-1.5 border border-border/40 rounded-lg hover:border-primary/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={activeIndex === questions.length - 1}
              className="p-1.5 border border-border/40 rounded-lg hover:border-primary/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="space-y-1.5">
          <label htmlFor="questionText" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Question Text
          </label>
          <input
            id="questionText"
            type="text"
            value={currentQuestion.questionText}
            onChange={handleQuestionTextChange}
            placeholder="e.g. Which HTML tag is used to create a hyperlink?"
            className="w-full bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-2xl px-4 py-3 text-sm text-foreground outline-none transition-all"
            required
          />
        </div>

        {/* Options List */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Options & Correct Answer
          </span>
          
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, optIdx) => {
              const isCorrect = currentQuestion.correctOptionIndex === optIdx;
              
              return (
                <div key={optIdx} className="flex items-center gap-3.5 group">
                  {/* Select Correct Radio Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectCorrect(optIdx)}
                    className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isCorrect 
                        ? 'border-emerald-500 bg-emerald-500 text-white' 
                        : 'border-border bg-card/25 hover:border-primary/50'
                    }`}
                    title="Mark as correct answer"
                  >
                    {isCorrect && <Check size={10} strokeWidth={3} />}
                  </button>

                  {/* Input Option Text */}
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                    placeholder={`Option ${optIdx + 1}`}
                    className={`flex-grow bg-background/50 border focus:ring-2 rounded-xl px-4 py-2.5 text-xs text-foreground outline-none transition-all ${
                      isCorrect
                        ? 'border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/10'
                        : 'border-border/40 focus:border-primary/50 focus:ring-primary/20'
                    }`}
                    required
                  />

                  {/* Delete Option Icon (visible if count > 4) */}
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(optIdx)}
                    disabled={currentQuestion.options.length <= 4}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-2 rounded-lg disabled:opacity-0 disabled:pointer-events-none transition-all shrink-0"
                    title="Remove option"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Warning if option count is low */}
        {currentQuestion.options.length < 4 && (
          <div className="flex items-center gap-2 text-[10px] font-bold text-yellow-500 bg-yellow-500/5 p-3.5 border border-yellow-500/20 rounded-xl">
            <AlertCircle size={14} />
            <span>A minimum of 4 options is required for each question.</span>
          </div>
        )}

        {/* Builder bottom controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/20">
          <button
            type="button"
            onClick={handleAddOption}
            className="text-xs font-bold text-primary hover:bg-primary/10 px-3.5 py-2 rounded-xl border border-primary/25 transition-all flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>Add Option</span>
          </button>

          <button
            type="button"
            onClick={handleAddQuestion}
            className="btn-secondary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>Add Question</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBuilder;
