import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookStore } from '../stores/useBookStore';
import BookMainInfo from '../components/books/BookMainInfo';
import BookReviewsSection from '../components/books/BookReviewsSection';
import BookQuotesSection from '../components/books/BookQuotesSection';
import ReviewForm from '../features/reviews/ReviewForm';
import { useReviewStore } from '../stores/useReviewStore';
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
      <BookMainInfo
        book={book}
        onReserve={(bookId) => {
          console.log('Зарезервировать книгу', bookId);
          // тут логика резервирования
        }}
      />


      {/* Нижний блок: Рецензии и Цитаты */}
      <Box
        sx={{
          width: { xs: '100%', md: '100%' },
          maxWidth: '1200px',
        }}
      >
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: 0 }}>
            <Grid container sx={{ height: '100%' }}>
              {/* Рецензии */}
              <BookReviewsSection
                book={book}
                reviews={reviews}
                onAddReview={() => setOpenReview(true)}
              />

              {/* Цитаты */}
              <BookQuotesSection
               book={book}
                quotes={quotes}
                onAddQuote={() => setOpenQuote(true)}
                />
              
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
