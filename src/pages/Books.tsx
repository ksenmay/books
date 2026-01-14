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
        Каталог книг
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {books.map((book) => (
          <Grid
            item
            key={book.id}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: {
                  xs: '90vw', // 📱 мобильные
                  sm: '30vw', // 📲 планшеты
                  md: '25vw', // 💻 ноутбуки
                },
                height: {
                  xs: '108vw', // 120% от ширины страницы
                  sm: '53vw',  // 53% от ширины страницы
                  md: '33vw',  // 26% от ширины страницы
                },
              }}
            >
              <BookCard book={book} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BooksPage;
