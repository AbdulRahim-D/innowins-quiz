import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import CategoryCard from '../../components/quiz/CategoryCard';
import { CategorySkeleton } from '../../components/quiz/QuizSkeletons';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const QuizCategories = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['quizzes'],
    queryFn: async () => {
      const response = await api.get('/quizzes');
      return response.data;
    }
  });

  const handleStartQuiz = (slug) => {
    navigate(`/quiz/play/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
          <div className="h-4 w-96 bg-muted/60 rounded-md animate-pulse" />
        </div>
        <CategorySkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-card/25 border border-border/40 rounded-3xl p-8 max-w-lg mx-auto">
        <HelpCircle size={48} className="text-destructive mb-4 animate-bounce" />
        <h3 className="text-lg font-black text-foreground mb-1">Failed to load quizzes</h3>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-6">
          There was an error communicating with the validation server. Check your connection or retry.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-primary text-white"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const defaultQuizzes = data?.defaultQuizzes || [];
  const customQuizzes = data?.customQuizzes || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-12"
    >
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-3">
          <BookOpen size={28} className="text-primary" />
          <span>Quiz Categories</span>
        </h1>
        <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-2xl">
          Select a category to start solving questions and test your knowledge. Complete challenges to earn XP and level up.
        </p>
      </div>

      {/* Default System Quizzes */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border/20 pb-2">
          <Sparkles size={16} className="text-primary" />
          <h2 className="text-sm font-black uppercase tracking-wider text-foreground">Standard Certifications</h2>
        </div>
        
        {defaultQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {defaultQuizzes.map((quiz) => (
              <CategoryCard
                key={quiz._id}
                quiz={quiz}
                onStart={handleStartQuiz}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground text-xs font-semibold">
            No standard certification quizzes found.
          </div>
        )}
      </div>

      {/* User Custom Quizzes (optional section for high-end feel) */}
      {customQuizzes.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 border-b border-border/20 pb-2">
            <BookOpen size={16} className="text-primary" />
            <h2 className="text-sm font-black uppercase tracking-wider text-foreground">Community Created Quizzes</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customQuizzes.map((quiz) => (
              <CategoryCard
                key={quiz._id}
                quiz={quiz}
                onStart={handleStartQuiz}
              />
            ))}
          </div>
        </div>
      )}

    </motion.div>
  );
};

export default QuizCategories;
