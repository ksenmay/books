import { create } from 'zustand';
import type { Book } from '../types/book';
import book1 from '../assets/images/book1.jpg';
import book2 from '../assets/images/book2.jpg';
import book3 from '../assets/images/book3.jpg';

type BookState = {
  books: Book[];
  selectedBook: Book | null;
  isLoading: boolean;

  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  updateBook: (id: string, data: Partial<Book>) => void;
  removeBook: (id: string) => void;

  selectBook: (book: Book | null) => void;
};

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    description: 'Роман о добре и зле',
    ownerId: '1',
    exchangeable: true,
    price: 500,
    status: 'доступна',
    images: [book1],
    reviews: [],
    quotes: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    ownerId: '2',
    exchangeable: false,
    price: 700,
    status: 'зарезервирована',
    images: [book2, book3],
    reviews: [],
    quotes: [],
    createdAt: new Date().toISOString(),
  },

];

export const useBookStore = create<BookState>((set, get) => ({
  books: mockBooks,
  selectedBook: null,
  isLoading: false,

  setBooks: (books) => {
    set({ isLoading: true });
    setTimeout(() => set({ books, isLoading: false }), 300);
  },

  addBook: (book) =>
    set((state) => ({
      books: [book, ...state.books],
    })),

  updateBook: (id, data) =>
    set((state) => {
      const books = state.books.map((book) =>
        book.id === id ? { ...book, ...data } : book
      );
      const selectedBook =
        state.selectedBook?.id === id
          ? { ...state.selectedBook, ...data }
          : state.selectedBook;
      return { books, selectedBook };
    }),

  removeBook: (id) =>
    set((state) => {
      const books = state.books.filter((book) => book.id !== id);
      const selectedBook =
        state.selectedBook?.id === id ? null : state.selectedBook;
      return { books, selectedBook };
    }),

  selectBook: (book) => set({ selectedBook: book }),
}));
