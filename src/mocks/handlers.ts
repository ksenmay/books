// /src/mocks/handlers.ts
import { http } from 'msw';

export const handlers = [
  // Мок логина
  http.post('/api/login', async ({ request }) => {
    const { username } = await request.json() as { username: string };
    return new Response(
      JSON.stringify({
        user: { username, fullName: 'Иван Иванов', role: 'user' },
        token: 'fake-jwt-token',
      }),
      { status: 200 }
    );
  }),

  // Мок списка книг
  http.get('/api/books', () => {
    return new Response(
      JSON.stringify([
        { id: 1, title: 'Война и мир', author: 'Л. Толстой' },
        { id: 2, title: 'Преступление и наказание', author: 'Ф. Достоевский' },
      ]),
      { status: 200 }
    );
  }),

  // Мок профиля пользователя
  http.get('/api/profile', () => {
    return new Response(
      JSON.stringify({
        username: 'ivan123',
        fullName: 'Иван Иванов',
        country: 'Россия',
        city: 'Москва',
        avatar: '',
        rating: null,
        createdAt: '2025-01-01',
      }),
      { status: 200 }
    );
  }),
];
