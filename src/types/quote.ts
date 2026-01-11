import type { User } from './user';

export type Quote = {
  id: string;
  bookId: string;

  authorId: User['id'];
  author?: User;

  text: string;
  page?: number;

  createdAt: string;
};
