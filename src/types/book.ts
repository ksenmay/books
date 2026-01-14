import type { User } from './user';
import type { Review } from './review';
import type { Quote } from './quote';

export type BookStatus =
  | 'доступна'
  | 'продана'
  | 'зарезервирована'
  | 'в обмене';

export type Book = {
  id: string;
  title: string;
  author: string;
  description?: string;
  ownerId: User['id'];
  owner?: User;
  price?: number;          // если продажа
  exchangeable: boolean;   // можно ли обменять
  status: BookStatus;
  images?: string[];       // несколько картинок
  createdAt: string;

  // Добавляем для фронта
  reviews?: Review[];      // рецензии, уже есть тип review.ts
  quotes?: Quote[];        // цитаты, тип quote.ts
  categories?: string[];   // жанры/категории книги (может пригодиться для фильтров)
  isFavorite?: boolean;    // для страницы Favorites
};
