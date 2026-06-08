import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import StatsCards from '../../components/quiz/StatsCards';
import AttemptsTable from '../../components/quiz/AttemptsTable';
import { DashboardSkeleton } from '../../components/quiz/QuizSkeletons';
import { History, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Attempts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['quiz-attempts'],
    queryFn: async () => {
      const response = await api.get('/quiz-attempts/user');
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
          <div className="h-4 w-96 bg-muted/60 rounded-md animate-pulse" />
        </div>
        <DashboardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-card/25 border border-border/40 rounded-3xl p-8 max-w-lg mx-auto">
        <HelpCircle size={48} className="text-destructive mb-4 animate-bounce" />
        <h3 className="text-lg font-black text-foreground mb-1">Failed to load history</h3>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-6">
          Could not retrieve attempts log from the database. Make sure you are authenticated.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-primary text-white"
        >
          Retry Load
        </button>
      </div>
    );
  }

  const stats = data?.stats || {
    totalAttempts: 0,
    averageScore: 0,
    highestScore: 0,
    quizzesTaken: 0
  };

  const attempts = data?.attempts || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 pb-16"
    >
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-3">
          <History size={28} className="text-primary" />
          <span>Your Quiz Attempts</span>
        </h1>
        <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-2xl">
          Track your progress, view score averages, and verify question logs to see how you are improving over time.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Attempts Table */}
      <div className="space-y-4">
        <div className="border-b border-border/20 pb-2">
          <h2 className="text-sm font-black uppercase tracking-wider text-foreground">Attempt Logs</h2>
        </div>
        <AttemptsTable attempts={attempts} />
      </div>

    </motion.div>
  );
};

export default Attempts;
