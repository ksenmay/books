import { create } from 'zustand';
import type { Review } from '../types/review';

const STORAGE_KEY = 'reviews';

const loadReviews = (): Review[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveReviews = (reviews: Review[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
};

type ReviewState = {
  reviews: Review[];

  getByBookId: (bookId: string) => Review[];
  addReview: (review: Review) => void;
  removeReview: (reviewId: string) => void
};

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: loadReviews(),

  getByBookId: (bookId) =>
    get().reviews.filter((r) => r.bookId === bookId),

  addReview: (review) => {
    const updated = [...get().reviews, review];
    saveReviews(updated);
    set({ reviews: updated });
  },

  removeReview: (reviewId: string) => {
    const updated = get().reviews.filter(r => r.id !== reviewId);
    saveReviews(updated);
    set({ reviews: updated });
  }


}));
