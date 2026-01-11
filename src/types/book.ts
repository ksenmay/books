import type { User } from './user';

export type BookStatus =
  | 'available'
  | 'sold'
  | 'reserved'
  | 'in_exchange';

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

  images?: string[];

  createdAt: string;
};
