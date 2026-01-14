// src/pages/BookDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useBookStore } from '../stores/useBookStore';
import BookDetails from '../components/books/BookDetails';
import { Typography, Box } from '@mui/material';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = useBookStore((state) =>
    state.books.find((b) => b.id === id)
  );

  if (!book) {
    // Простая разметка при отсутствии книги
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h5">Книга не найдена</Typography>
      </Box>
    );
  }

  // Разметка страницы — фактически рендеринг BookDetails
  return (
    <Box sx={{ px: 2, py: 4 }}>
      <BookDetails book={book} />
    </Box>
  );
};

export default BookDetailPage;
