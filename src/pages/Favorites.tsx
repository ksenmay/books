import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useBookStore } from '../stores/useBookStore';
import { useAuthStore } from '../stores/useAuthStore';
import BookCard from '../components/books/BookCard';

const FavoritesPage: React.FC = () => {
  const { user } = useAuthStore();
  const favorites = useBookStore((s) => s.favorites);
  const books = useBookStore((s) => s.books);

  const favoriteBooks = user?.id
    ? books.filter((b) => favorites[user.id]?.includes(b.id))
    : [];

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Избранное
      </Typography>

      {favoriteBooks.length === 0 ? (
        <Typography variant="body1">
          У вас пока нет любимых книг.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {favoriteBooks.map((book) => (
            <Grid
              key={book.id}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Box
                sx={{
                  width: {
                    xs: '90vw',
                    sm: '30vw',
                    md: '25vw',
                  },
                  height: {
                    xs: '108vw',
                    sm: '53vw',
                    md: '33vw',
                  },
                }}
              >
                <BookCard book={book} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FavoritesPage;
