import React, { useState } from 'react';
import QuizSidebar from '../../components/quiz/QuizSidebar';
import QuizCategories from './QuizCategories';
import CustomQuiz from './CustomQuiz';
import Attempts from './Attempts';
import { motion, AnimatePresence } from 'framer-motion';

const QuizDashboard = () => {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'custom' | 'attempts'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Render sub page workspace dynamically
  const renderWorkspace = () => {
    switch (activeTab) {
      case 'quiz':
        return <QuizCategories />;
      case 'custom':
        return <CustomQuiz />;
      case 'attempts':
        return <Attempts />;
      default:
        return <QuizCategories />;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-69px)] bg-background relative overflow-hidden">
      
      {/* 1. Left Sidebar Navigation */}
      <QuizSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* 2. Main content workspace area */}
      <main className="flex-1 lg:pl-[240px] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {renderWorkspace()}
            </motion.div>
          </AnimatePresence>
          
        </div>
      </main>
      
    </div>
  );
};

export default QuizDashboard;
