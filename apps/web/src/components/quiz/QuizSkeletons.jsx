import React from 'react';

// Common shimmer overlay styles
const shimmerClass = "animate-pulse bg-muted rounded-xl relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent";

export const CategorySkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-3xl p-6 flex flex-col h-[220px] justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-muted rounded-2xl animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-2/3 bg-muted rounded-lg animate-pulse" />
              <div className="h-4 w-1/3 bg-muted/60 rounded-md animate-pulse" />
            </div>
          </div>
          <div className="h-10 w-full bg-muted/80 rounded-xl animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export const PlayerSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
      {/* Left panel */}
      <div className="w-full lg:flex-grow bg-card/40 backdrop-blur-xl border border-border/40 rounded-3xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-4 w-24 bg-muted rounded-md animate-pulse" />
          <div className="h-6 w-32 bg-muted rounded-lg animate-pulse" />
        </div>
        <div className="h-2 w-full bg-muted/40 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary/20 animate-pulse" />
        </div>
        <div className="space-y-3">
          <div className="h-7 w-3/4 bg-muted rounded-lg animate-pulse" />
          <div className="h-7 w-1/2 bg-muted rounded-lg animate-pulse" />
        </div>
        <div className="space-y-3 pt-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-14 w-full bg-muted/40 rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-between pt-6 border-t border-border/20">
          <div className="flex gap-3">
            <div className="h-11 w-24 bg-muted rounded-xl animate-pulse" />
            <div className="h-11 w-24 bg-muted rounded-xl animate-pulse" />
          </div>
          <div className="flex gap-3">
            <div className="h-11 w-32 bg-muted rounded-xl animate-pulse" />
            <div className="h-11 w-28 bg-muted rounded-xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        {/* Timer Card */}
        <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-3xl p-6 flex flex-col items-center">
          <div className="h-4 w-20 bg-muted rounded-md mb-2 animate-pulse" />
          <div className="h-8 w-24 bg-muted rounded-lg animate-pulse" />
        </div>
        {/* Navigator Card */}
        <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-3xl p-6 space-y-6">
          <div className="h-5 w-36 bg-muted rounded-lg animate-pulse" />
          <div className="grid grid-cols-5 gap-2.5">
            {Array.from({ length: 15 }).map((_, idx) => (
              <div key={idx} className="aspect-square bg-muted/50 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="space-y-2 pt-4 border-t border-border/20">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted rounded-sm animate-pulse" />
                <div className="h-4 w-24 bg-muted/60 rounded-md animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-3xl p-6 flex flex-col justify-between h-[120px]">
            <div className="h-4 w-28 bg-muted rounded-md animate-pulse" />
            <div className="h-8 w-16 bg-muted rounded-lg animate-pulse" />
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-3xl p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="h-11 w-full sm:w-64 bg-muted rounded-xl animate-pulse" />
          <div className="h-11 w-full sm:w-48 bg-muted rounded-xl animate-pulse" />
        </div>
        <div className="space-y-4 pt-4">
          <div className="h-10 w-full bg-muted/60 rounded-lg animate-pulse" />
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="h-16 w-full bg-muted/30 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-border/20">
          <div className="h-5 w-32 bg-muted/60 rounded-md animate-pulse" />
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-muted rounded-lg animate-pulse" />
            <div className="h-8 w-8 bg-muted rounded-lg animate-pulse" />
            <div className="h-8 w-8 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
