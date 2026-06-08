import React from 'react';
import { Coffee, Terminal, Code2, Blocks, Database, GitBranch, Binary, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  'Java': Coffee,
  'Python': Terminal,
  'JavaScript': Code2,
  'React': Blocks,
  'SQL': Database,
  'Git': GitBranch,
  'DSA': Binary,
  'C++': Cpu
};

// Vibrant tailored gradients for category icons
const gradientMap = {
  'Java': 'from-orange-500 to-red-600 shadow-orange-500/20',
  'Python': 'from-blue-500 to-yellow-500 shadow-blue-500/20',
  'JavaScript': 'from-yellow-400 to-amber-500 shadow-yellow-500/20',
  'React': 'from-cyan-400 to-blue-500 shadow-cyan-500/20',
  'SQL': 'from-emerald-400 to-teal-600 shadow-emerald-500/20',
  'Git': 'from-orange-600 to-red-500 shadow-orange-600/20',
  'DSA': 'from-purple-500 to-indigo-600 shadow-purple-500/20',
  'C++': 'from-indigo-500 to-blue-600 shadow-indigo-500/20'
};

const CategoryCard = ({ quiz, onStart }) => {
  const { title, description, category, questions, slug } = quiz;
  
  // Resolve icon, fallback to Code2 if custom category
  const IconComponent = iconMap[category] || Code2;
  const gradientClass = gradientMap[category] || 'from-primary to-indigo-600 shadow-primary/20';

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-card/30 backdrop-blur-xl border border-border/40 hover:border-primary/40 rounded-3xl p-6 flex flex-col justify-between h-[240px] relative overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] transition-shadow duration-300"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />
      
      <div className="space-y-4">
        {/* Category Logo / Icon Container */}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white shadow-lg`}>
          <IconComponent size={22} strokeWidth={2.2} />
        </div>
        
        {/* Texts */}
        <div className="space-y-1">
          <h3 className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {description || 'Test your knowledge and verify your developer capabilities in this technical challenge.'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs font-bold text-muted-foreground/80 bg-muted/50 border border-border/30 px-3 py-1 rounded-full">
          {questions?.length || 0} Questions
        </span>
        <button
          onClick={() => onStart(slug)}
          className="btn-primary group/btn flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/10 hover:shadow-primary/20"
        >
          <span>Start Quiz</span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
