import { Box, Typography, Grid, Button, Collapse } from '@mui/material';
import { useEffect, useState } from 'react';
import { AddBookForm } from '../features/books/AddBookForm';
import { useBookStore } from '../stores/useBookStore';
import BookCard from '../components/books/BookCard';

const BooksPage = () => {
  const books = useBookStore((state) => state.books);
  const isLoading = useBookStore((state) => state.isLoading);
  const setBooks = useBookStore((state) => state.setBooks);

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setBooks(books);
  }, [setBooks]);

  if (isLoading) return <Typography>Загрузка книг...</Typography>;
  if (books.length === 0) return <Typography>Книг пока нет</Typography>;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Каталог книг
        </Typography>

        <Button
          onClick={() => setShowAddForm((v) => !v)}
        >
          {showAddForm ? 'Закрыть' : 'Добавить книгу'}
        </Button>
      </Box>

      <Collapse in={showAddForm}>
        <Box sx={{ mb: 4 }}>
          <AddBookForm />
        </Box>
      </Collapse>

      <Grid container spacing={3} justifyContent="center">
        {books.map((book) => (
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
    </>
  );
};

export default BooksPage;
