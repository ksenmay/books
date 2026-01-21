import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book } from '../types/book';
import book1 from '../assets/images/book1.jpg';
import book2 from '../assets/images/book2.jpg';
import book3 from '../assets/images/book3.jpg';

type BookState = {
  books: Book[];
  selectedBook: Book | null;
  isLoading: boolean;
  favorites: Record<string, string[]>; // userId → массив id книг

  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  updateBook: (id: string, data: Partial<Book>) => void;
  removeBook: (id: string) => void;

  toggleFavorite: (userId: string, bookId: string) => void;
  selectBook: (book: Book | null) => void;
};

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    description:
      'Роман-миф о вечных темах любви, добра и зла, предательства и прощения, сочетающий сатиру на советскую действительность 1930-х с библейским сюжетом о Понтии Пилате и Иешуа, а также мистику визита Сатаны (Воланда) и его свиты в Москву',
    ownerId: '2',
    exchangeable: true,
    price: undefined,
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
    price: 15,
    status: 'зарезервирована',
    images: [book2, book3],
    reviews: [],
    quotes: [],
    createdAt: new Date().toISOString(),
  },
];

export const useBookStore = create<BookState>()(
  persist(
    (set, get) => ({
      books: mockBooks,
      selectedBook: null,
      isLoading: false,
      favorites: {},

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

      toggleFavorite: (userId, bookId) =>
        set((state) => {
          const userFavs = state.favorites[userId] || [];
          const isFav = userFavs.includes(bookId);
          return {
            favorites: {
              ...state.favorites,
              [userId]: isFav
                ? userFavs.filter((id) => id !== bookId)
                : [...userFavs, bookId],
            },
          };
        }),

      selectBook: (book) => set({ selectedBook: book }),
    }),
    {
      name: 'books-storage', 
      partialize: (state) => ({
        books: state.books,
        favorites: state.favorites, 
      }),
    }
  )
);
