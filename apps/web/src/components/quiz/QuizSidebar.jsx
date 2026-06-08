import React from 'react';
import { BookOpen, PlusCircle, History, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const QuizSidebar = ({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { id: 'quiz', label: 'Quiz', icon: BookOpen },
    { id: 'custom', label: 'Custom Quiz', icon: PlusCircle },
    { id: 'attempts', label: 'Attempts', icon: History }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card/10 backdrop-blur-2xl border-r border-border/40 p-4 justify-between">
      <div className="space-y-6">
        {/* Sidebar Header */}
        <div className="px-3 py-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/80">QUIZ MODULE</p>
          <h2 className="text-xl font-black text-foreground mt-0.5 tracking-tight">Navigation Center</h2>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 relative group overflow-hidden ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                }`}
              >
                {/* Active Glow Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute inset-0 bg-primary/5 border border-primary/20 rounded-2xl shadow-[inset_0_0_12px_rgba(99,102,241,0.08)] z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Left Active Glow Border */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                )}

                <Icon size={18} className="relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User profile at the bottom */}
      <div className="border-t border-border/40 pt-4 px-2">
        <Link 
          to={`/profile/${user?.username}`}
          className="flex items-center gap-3 p-2 rounded-2xl hover:bg-muted/30 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 p-[2px] shadow-sm">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
              ) : (
                <User size={18} className="text-primary" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
              {user?.username || 'DevUser'}
            </h4>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">
              View Profile
            </p>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (visible on md+) */}
      <aside className="hidden lg:block w-[240px] fixed top-[69px] bottom-0 left-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile hamburger button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-12 h-12 rounded-full bg-primary text-white shadow-lg shadow-primary/20 flex items-center justify-center focus:outline-none hover:scale-105 active:scale-95 transition-transform"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black z-30"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden fixed top-[69px] bottom-0 left-0 w-[240px] z-30"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuizSidebar;
