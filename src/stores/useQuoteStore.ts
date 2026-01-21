import { create } from 'zustand';
import type { Quote } from '../types/quote';
import type { q } from 'framer-motion/client';

const STORAGE_KEY = 'quotes';

const loadQuotes = (): Quote[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveQuotes = (quotes: Quote[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
};

type QuoteState = {
  quotes: Quote[];

  getByBookId: (bookId: string) => Quote[];
  addQuote: (quote: Quote) => void;
  removeQuote: (quoteId: string) => void;
};

export const useQuoteStore = create<QuoteState>((set, get) => ({
  quotes: loadQuotes(),

  getByBookId: (bookId) =>
    get().quotes.filter((q) => q.bookId === bookId),

  addQuote: (quote) => {
    const updated = [...get().quotes, quote];
    saveQuotes(updated);
    set({ quotes: updated });
  },

  removeQuote: (quoteId: string) => {
    const updated = get().quotes.filter(q => q.id !== quoteId);
    saveQuotes(updated);
    set({ quotes: updated });
  }

}));
