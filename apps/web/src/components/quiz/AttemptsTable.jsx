import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, Award, Eye, X, CheckCircle, XCircle } from 'lucide-react';
import QuizResult from './QuizResult';

const AttemptsTable = ({ attempts = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAttempt, setSelectedAttempt] = useState(null);

  const itemsPerPage = 5;

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time taken
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    if (mins === 0) return `${remainingSecs}s`;
    return `${mins}m ${remainingSecs}s`;
  };

  // Get unique categories for filtering
  const categories = ['All', ...new Set(attempts.map(a => a.quiz?.category).filter(Boolean))];

  // Filtering logic
  const filteredAttempts = attempts.filter((attempt) => {
    const quizTitle = attempt.quiz?.title || 'Custom Quiz';
    const matchesSearch = quizTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || attempt.quiz?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredAttempts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAttempts = filteredAttempts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/10 backdrop-blur-xl border border-border/40 p-4 rounded-2xl">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-4 top-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl pl-11 pr-4 py-2.5 text-xs text-foreground placeholder-muted-foreground outline-none transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="relative w-full sm:w-48 flex items-center gap-2">
          <Filter size={14} className="text-muted-foreground shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl px-3 py-2.5 text-xs text-foreground outline-none transition-all appearance-none cursor-pointer"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Modern SaaS Table */}
      <div className="bg-card/10 backdrop-blur-xl border border-border/40 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4">Quiz Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Time Taken</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/25 text-xs font-semibold text-muted-foreground">
              {paginatedAttempts.length > 0 ? (
                paginatedAttempts.map((attempt) => (
                  <tr key={attempt._id} className="hover:bg-muted/10 hover:text-foreground transition-all duration-200">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground text-sm">
                        {attempt.quiz?.title || 'Custom Quiz'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-muted/50 border border-border/30 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase text-muted-foreground">
                        {attempt.quiz?.category || 'Custom'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-black ${attempt.passed ? 'text-primary' : 'text-destructive'}`}>
                          {attempt.score}%
                        </span>
                        {attempt.passed ? (
                          <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                        ) : (
                          <XCircle size={14} className="text-rose-500 shrink-0" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="opacity-70" />
                        <span>{formatTime(attempt.timeTaken)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="opacity-70" />
                        <span>{formatDate(attempt.createdAt)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedAttempt(attempt)}
                        className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 px-3.5 py-1.5 rounded-xl border border-primary/20 transition-all font-bold"
                      >
                        <Eye size={13} />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-muted-foreground/60 font-medium">
                    No attempts found. Solve a quiz to record your metrics!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-border/30 bg-muted/10 flex justify-between items-center text-xs font-bold text-muted-foreground">
            <span>Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredAttempts.length)} of {filteredAttempts.length} attempts</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-border/40 rounded-lg hover:border-primary/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
                    currentPage === idx + 1
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border/40 hover:border-primary/20 hover:bg-muted/10'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-border/40 rounded-lg hover:border-primary/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Details modal popup */}
      {selectedAttempt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setSelectedAttempt(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          {/* Content container */}
          <div className="relative bg-background border border-border rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl z-10 p-6 sm:p-8">
            <button
              onClick={() => setSelectedAttempt(null)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground hover:bg-muted p-2 rounded-xl transition-all"
              aria-label="Close details"
            >
              <X size={18} />
            </button>

            <div className="pr-8 pb-4 border-b border-border/30 mb-6">
              <h3 className="text-xl font-black tracking-tight text-foreground">
                Quiz Submission Report
              </h3>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Completed on {formatDate(selectedAttempt.createdAt)}
              </p>
            </div>

            {/* Reuse QuizResult for detailed review */}
            <QuizResult
              quiz={selectedAttempt.quiz || { title: 'Custom Quiz', category: 'Custom', questions: [] }}
              attempt={selectedAttempt}
              xpEarned={0} // Don't recalculate XP on review details
              onRetry={null} // Disable actions in this review context
              onReturn={() => setSelectedAttempt(null)}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default AttemptsTable;
