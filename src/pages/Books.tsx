import { Box, Typography, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useBookStore } from '../stores/useBookStore';
import BookCard from '../components/books/BookCard';

const BooksPage = () => {
  const books = useBookStore((state) => state.books);
  const isLoading = useBookStore((state) => state.isLoading);
  const setBooks = useBookStore((state) => state.setBooks);

  useEffect(() => {
    setBooks(books);
  }, [setBooks]);

  if (isLoading) return <Typography>Загрузка книг...</Typography>;
  if (books.length === 0) return <Typography>Книг пока нет</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Список книг
      </Typography>

      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BooksPage;
