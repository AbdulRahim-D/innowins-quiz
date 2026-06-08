import React from 'react';
import { Trophy, Target, Award, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsCards = ({ stats }) => {
  const { totalAttempts, averageScore, highestScore, quizzesTaken } = stats;

  const cardItems = [
    {
      label: 'Total Attempts',
      value: totalAttempts,
      icon: ListChecks,
      gradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
      borderColor: 'group-hover:border-blue-500/30',
      iconColor: 'text-blue-400',
      glow: 'shadow-blue-500/5'
    },
    {
      label: 'Average Score',
      value: `${averageScore}%`,
      icon: Target,
      gradient: 'from-cyan-600/20 via-cyan-500/10 to-transparent',
      borderColor: 'group-hover:border-cyan-500/30',
      iconColor: 'text-cyan-400',
      glow: 'shadow-cyan-500/5'
    },
    {
      label: 'Highest Score',
      value: `${highestScore}%`,
      icon: Trophy,
      gradient: 'from-yellow-600/20 via-yellow-500/10 to-transparent',
      borderColor: 'group-hover:border-yellow-500/30',
      iconColor: 'text-yellow-400',
      glow: 'shadow-yellow-500/5'
    },
    {
      label: 'Quizzes Taken',
      value: quizzesTaken,
      icon: Award,
      gradient: 'from-purple-600/20 via-purple-500/10 to-transparent',
      borderColor: 'group-hover:border-purple-500/30',
      iconColor: 'text-purple-400',
      glow: 'shadow-purple-500/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardItems.map((item, idx) => {
        const Icon = item.icon;
        
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`group bg-card/25 backdrop-blur-xl border border-border/40 ${item.borderColor} rounded-3xl p-6 flex items-center justify-between shadow-2xl hover:shadow-[0_15px_30px_rgba(99,102,241,0.05)] transition-all duration-300 relative overflow-hidden h-[120px]`}
          >
            {/* Background Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none`} />
            
            <div className="space-y-1.5 relative z-10">
              <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.15em] block">
                {item.label}
              </span>
              <span className="text-3xl font-black text-foreground tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left inline-block">
                {item.value}
              </span>
            </div>

            <div className={`w-12 h-12 rounded-2xl bg-card/30 border border-border/40 flex items-center justify-center shrink-0 shadow-md ${item.iconColor} relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
              <Icon size={22} strokeWidth={2} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
