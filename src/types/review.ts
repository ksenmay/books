import type { User } from './user';

export type Review = {
  id: string;
  bookId: string;

  authorId: User['id'];
  author?: User;

  rating: number; // 1–5
  text: string;

  createdAt: string;
};
