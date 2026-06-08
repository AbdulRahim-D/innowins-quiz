import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import QuizPlayer from '../../components/quiz/QuizPlayer';
import QuizResult from '../../components/quiz/QuizResult';
import { PlayerSkeleton } from '../../components/quiz/QuizSkeletons';
import { ArrowLeft, Play, Award, Clock, BookOpen, Lock, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const QuizPlayerPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Fetch quiz by slug
  const { data: quiz, isLoading, error, refetch } = useQuery({
    queryKey: ['quiz', slug],
    queryFn: async () => {
      const response = await api.get(`/quizzes/by-slug/${slug}`);
      return response.data;
    },
    retry: false
  });

  const handleStartQuiz = () => {
    setIsPlaying(true);
    setStartTime(Date.now());
  };

  const handleSubmitQuiz = async (answers) => {
    if (!quiz) return;
    setIsSubmitting(true);
    
    // Calculate actual time taken in seconds
    const timeTakenSeconds = Math.round((Date.now() - startTime) / 1000);

    try {
      const response = await api.post(`/quiz-attempts/${quiz._id}`, {
        answers,
        timeTaken: timeTakenSeconds
      });

      setSubmissionResult(response.data);
      setIsPlaying(false);
    } catch (err) {
      console.error(err);
      alert('Failed to submit your quiz attempt. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmissionResult(null);
    setIsPlaying(true);
    setStartTime(Date.now());
  };

  const handleReturn = () => {
    navigate('/quiz');
  };

  // If loading quiz data
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <PlayerSkeleton />
      </div>
    );
  }

  // Handle access error (unauthorized private quiz, not found, etc.)
  if (error) {
    const isPrivateErr = error.response?.status === 401 || error.response?.data?.message?.includes('private');
    
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-3xl bg-destructive/10 flex items-center justify-center text-destructive mb-6 shadow-md shadow-destructive/5 animate-pulse">
          {isPrivateErr ? <Lock size={30} /> : <ShieldAlert size={30} />}
        </div>
        <h2 className="text-2xl font-black text-foreground tracking-tight mb-2">
          {isPrivateErr ? 'Private Access Required' : 'Assessment Unavailable'}
        </h2>
        <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8">
          {isPrivateErr 
            ? 'This technical assessment has been set to private by its creator. Authenticated credentials are required to attempt.'
            : 'The requested quiz slug could not be resolved in our database. It may have been deleted or archived.'}
        </p>
        <div className="flex flex-col w-full gap-3">
          <Link
            to="/"
            className="btn-primary w-full py-3.5 text-xs font-black uppercase tracking-widest rounded-2xl bg-primary text-white text-center"
          >
            Authenticate Profile
          </Link>
          <Link
            to="/quiz"
            className="btn-secondary w-full py-3.5 text-xs font-black uppercase tracking-widest rounded-2xl text-center"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // If currently submitting answers to the database
  if (isSubmitting) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" size={20} />
        </div>
        <h2 className="text-xl font-black tracking-tight mb-2">Compiling Assessment Metrics</h2>
        <p className="text-muted-foreground text-sm font-medium">Please wait while our validation server audits your choices and awards XP...</p>
      </div>
    );
  }

  // If submission succeeded: Show results
  if (submissionResult) {
    return (
      <QuizResult
        quiz={quiz}
        attempt={submissionResult.attempt}
        xpEarned={submissionResult.xpEarned}
        onRetry={handleRetry}
        onReturn={handleReturn}
      />
    );
  }

  // If user is actively playing the quiz
  if (isPlaying) {
    return (
      <div className="max-w-7xl mx-auto py-6">
        {/* Back Link */}
        <div className="max-w-6xl mx-auto px-4 mb-4">
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
                setIsPlaying(false);
              }
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Exit Assessment</span>
          </button>
        </div>
        <QuizPlayer quiz={quiz} onSubmit={handleSubmitQuiz} />
      </div>
    );
  }

  // Otherwise, render the Start Assessment summary screen
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-6">
      {/* Back button */}
      <Link 
        to="/quiz" 
        className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors mb-2"
      >
        <ArrowLeft size={14} />
        <span>Back to Dashboard</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/25 backdrop-blur-xl border border-border/40 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden text-center sm:text-left"
      >
        {/* Decorative corner blur */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <span className="text-[10px] font-black uppercase text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full tracking-wider">
              {quiz.category}
            </span>
            <span className="text-[10px] font-black uppercase text-muted-foreground bg-muted/60 border border-border/30 px-3 py-1 rounded-full tracking-wider">
              {quiz.isPublic ? 'Public Assessment' : 'Private Assessment'}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-foreground tracking-tight leading-none">
              {quiz.title}
            </h1>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              {quiz.description || 'Audit your technical capacity and earn reputational scores by attempting this certification challenge.'}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 border-y border-border/20 py-5 text-center">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest block">Questions</span>
            <div className="flex items-center justify-center gap-1.5 font-black text-lg text-foreground">
              <BookOpen size={16} className="text-primary" />
              <span>{quiz.questions?.length || 0}</span>
            </div>
          </div>
          <div className="space-y-1 border-x border-border/20">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest block">Duration</span>
            <div className="flex items-center justify-center gap-1.5 font-black text-lg text-foreground">
              <Clock size={16} className="text-primary" />
              <span>{quiz.timeLimit}m</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest block">Target Score</span>
            <div className="flex items-center justify-center gap-1.5 font-black text-lg text-foreground">
              <Award size={16} className="text-primary" />
              <span>{quiz.passingScore}%</span>
            </div>
          </div>
        </div>

        {/* Creator info */}
        {quiz.creator && (
          <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-muted-foreground font-bold">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-border/50">
              <img src={quiz.creator.avatarUrl} alt={quiz.creator.username} className="w-full h-full object-cover" />
            </div>
            <span>Created by <span className="text-foreground">@{quiz.creator.username}</span></span>
          </div>
        )}

        {/* Start Button */}
        <div className="pt-2">
          <button
            onClick={handleStartQuiz}
            className="btn-primary w-full py-4 text-xs font-black uppercase tracking-widest rounded-2xl bg-primary hover:bg-primary/95 text-white flex items-center justify-center gap-2 shadow-[0_15px_30px_rgba(99,102,241,0.25)]"
          >
            <Play size={14} className="fill-white" />
            <span>Start Assessment</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizPlayerPage;
