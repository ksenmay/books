import { create } from 'zustand';
import type { Book } from '../types/book';

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
    status: 'available',
    images: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    ownerId: '2',
    exchangeable: false,
    price: 700,
    status: 'available',
    images: [],
    createdAt: new Date().toISOString(),
  },
];

export const useBookStore = create<BookState>((set, get) => ({
  books: mockBooks,
  selectedBook: null,
  isLoading: false,

  setBooks: (books) => set({ books }),

  addBook: (book) =>
    set((state) => ({
      books: [book, ...state.books],
    })),

  updateBook: (id, data) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, ...data } : book
      ),
      selectedBook:
        state.selectedBook?.id === id
          ? { ...state.selectedBook, ...data }
          : state.selectedBook,
    })),

  removeBook: (id) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== id),
      selectedBook:
        state.selectedBook?.id === id ? null : state.selectedBook,
    })),

  selectBook: (book) => set({ selectedBook: book }),
}));
