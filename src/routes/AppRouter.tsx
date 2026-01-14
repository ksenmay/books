// src/routes/AppRouter.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import BooksPage from '../pages/Books';
import ProfilePage from '../pages/Profile';
import FavoritesPage from '../pages/Favorites';
import NotFoundPage from '../pages/NotFound';
import BookDetailPage from '../pages/BookDetailPage';
import { useAuthStore } from '../stores/useAuthStore';

// Компонент для защищённого маршрута
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  return user ? children : <Navigate to="/login" replace />;
};

// Компонент для публичного маршрута (например, главная для гостей)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  return !user ? children : <Navigate to="/books" replace />; // если авторизован, перенаправим на /books
};

const AppRouter: React.FC = () => (
  <Routes>
    {/* Публичные маршруты */}
    <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
    <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

    {/* Защищённые маршруты */}
    <Route path="/books" element={<PrivateRoute><BooksPage /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
    <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
    <Route path="/books" element={<BooksPage />} />
    <Route path="/books/:id" element={<BookDetailPage />} />
    {/* 404 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRouter;
