import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookStore } from '../stores/useBookStore';
import BookMainInfo from '../components/books/BookMainInfo';
import ReviewList from '../features/reviews/ReviewList';
import ReviewForm from '../features/reviews/ReviewForm';
import { useReviewStore } from '../stores/useReviewStore';
import QuotesList from '../features/quotes/QuoteList';
import QuoteForm from '../features/quotes/QuoteForm';
import { useQuoteStore } from '../stores/useQuoteStore';
import { Box, Button, Grid, Typography, Card, CardContent, Link } from '@mui/material';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = useBookStore((state) => state.books.find((b) => b.id === id));
  const [openReview, setOpenReview] = useState(false);
  const [openQuote, setOpenQuote] = useState(false);
  const allReviews = useReviewStore((state) => state.reviews);
  const reviews = React.useMemo(
    () => allReviews.filter((r) => r.bookId === id),
    [allReviews, id]
  );
  const allQuotes = useQuoteStore((state) => state.quotes);
  const quotes = React.useMemo(
    () => allQuotes.filter((q) => q.bookId === id),
    [allQuotes, id]
  );

  if (!book) return <Typography>Книга не найдена</Typography>;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        px: 2,
      }}
    >
      {/* Верхний блок: Карусель слева, Информация справа */}
      <BookMainInfo book={book} />

      {/* Нижний блок: Отзывы и Цитаты */}
      <Box
        sx={{
          width: { xs: '90%', md: '1200px' },
          maxWidth: '1200px',
        }}
      >
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: 0 }}>
            <Grid container sx={{ height: '100%' }}>
              {/* Отзывы */}
              <Grid
                sx={{
                  width: { xs: '100%', md: '50%' },
                  pr: { md: 1 },
                  borderRight: { xs: 'none', md: '1px solid #333' },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 50,
                    px: 2,
                    mt: 1,
                  }}
                >
                <Typography variant="h6">Отзывы</Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ opacity: 0.6 }}
                    onClick={() => setOpenReview(true)}
                  >
                    Добавить
                  </Button>
                </Box>

                <Box sx={{ p: 2, overflowY: 'auto' }}>
                  <ReviewList reviews={reviews} />
                </Box>
              </Grid>


              {/* Цитаты */}
              <Grid
                sx={{
                  width: { xs: '100%', md: '50%' },
                  pl: { md: 1 },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 50,
                    px: 2,
                    mt: 1,
                }}
                >
                <Typography variant="h6">Цитаты</Typography>
                <Button
                  variant="text"
                  size="small"
                  sx={{ opacity: 0.6 }}
                  onClick={() => setOpenQuote(true)}
                >
                  Добавить
                </Button>
                </Box>
                <Box sx={{ p: 2, overflowY: 'auto' }}>
                  <QuotesList quotes={quotes} />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <ReviewForm
        open={openReview}
        onClose={() => setOpenReview(false)}
        bookId={book.id}
      />

      <QuoteForm
        open={openQuote}
        onClose={() => setOpenQuote(false)}
        bookId={book.id}
      />
    </Box>
  );
};

export default BookDetailPage;
