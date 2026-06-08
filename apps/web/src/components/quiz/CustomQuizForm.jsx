import React from 'react';
import { Settings, HelpCircle } from 'lucide-react';

const CustomQuizForm = ({ settings, setSettings }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePrivacyChange = (isPublic) => {
    setSettings(prev => ({
      ...prev,
      isPublic
    }));
  };

  return (
    <div className="bg-card/25 backdrop-blur-xl border border-border/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
      <div className="flex items-center gap-3 border-b border-border/20 pb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Settings size={20} />
        </div>
        <div>
          <h2 className="text-lg font-black tracking-tight">Quiz Configuration</h2>
          <p className="text-xs text-muted-foreground font-medium">Define metadata and access rules for this deployment.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div className="space-y-1.5">
          <label htmlFor="title" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Quiz Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={settings.title}
            onChange={handleChange}
            placeholder="e.g. Advanced System Design Challenge"
            className="w-full bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-2xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label htmlFor="description" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={settings.description}
            onChange={handleChange}
            placeholder="Provide summary details about what engineers should know to clear this quiz..."
            className="w-full bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-2xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all resize-none"
          />
        </div>

        {/* Dynamic configuration numeric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Time Limit */}
          <div className="space-y-1.5">
            <label htmlFor="timeLimit" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Time Limit (Minutes)
            </label>
            <input
              id="timeLimit"
              type="number"
              name="timeLimit"
              min="1"
              max="180"
              value={settings.timeLimit}
              onChange={handleChange}
              className="w-full bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-2xl px-4 py-3 text-sm text-foreground outline-none transition-all"
            />
          </div>

          {/* Passing Score */}
          <div className="space-y-1.5">
            <label htmlFor="passingScore" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Passing Score (%)
            </label>
            <input
              id="passingScore"
              type="number"
              name="passingScore"
              min="10"
              max="100"
              value={settings.passingScore}
              onChange={handleChange}
              className="w-full bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-2xl px-4 py-3 text-sm text-foreground outline-none transition-all"
            />
          </div>
        </div>

        {/* Privacy public/private toggle */}
        <div className="space-y-2.5 pt-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Visibility & Access
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handlePrivacyChange(true)}
              className={`p-4 border rounded-2xl text-left transition-all duration-300 flex flex-col justify-between ${
                settings.isPublic
                  ? 'border-primary bg-primary/10 text-primary shadow-[0_0_12px_rgba(99,102,241,0.1)]'
                  : 'border-border/40 hover:border-primary/20 text-muted-foreground hover:bg-muted/10'
              }`}
            >
              <span className="text-sm font-black">Public Quiz</span>
              <span className="text-[10px] opacity-75 mt-1 font-semibold">Anyone with the share link can view and attempt.</span>
            </button>

            <button
              type="button"
              onClick={() => handlePrivacyChange(false)}
              className={`p-4 border rounded-2xl text-left transition-all duration-300 flex flex-col justify-between ${
                !settings.isPublic
                  ? 'border-primary bg-primary/10 text-primary shadow-[0_0_12px_rgba(99,102,241,0.1)]'
                  : 'border-border/40 hover:border-primary/20 text-muted-foreground hover:bg-muted/10'
              }`}
            >
              <span className="text-sm font-black">Private Quiz</span>
              <span className="text-[10px] opacity-75 mt-1 font-semibold">Only authenticated users can access and attempt.</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomQuizForm;
