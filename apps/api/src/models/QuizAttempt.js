import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Null for anonymous attempts on public quizzes
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true }, // Calculated percentage (0-100)
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  timeTaken: { type: Number, required: true }, // In seconds
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId },
    selectedOptionIndex: { type: Number },
    isCorrect: { type: Boolean }
  }],
  passed: { type: Boolean, required: true }
}, { timestamps: true });

// Indices for lookup optimization
quizAttemptSchema.index({ user: 1 });
quizAttemptSchema.index({ quiz: 1 });

export const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);
