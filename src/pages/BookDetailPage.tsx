import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookStore } from '../stores/useBookStore';
import BookImagesCarousel from '../features/books/BookImagesCarousel';
import QuotesList from '../features/quotes/QuoteList';
import ReviewList from '../features/reviews/ReviewList';
import ReviewForm from '../features/reviews/ReviewForm';
import { useReviewStore } from '../stores/useReviewStore';
import { Box, Button, Grid, Typography, Card, CardContent, Link } from '@mui/material';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = useBookStore((state) => state.books.find((b) => b.id === id));
  const [openReview, setOpenReview] = useState(false);
  const allReviews = useReviewStore((state) => state.reviews);
  const reviews = React.useMemo(
    () => allReviews.filter((r) => r.bookId === id),
    [allReviews, id]
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
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
          maxWidth: '1200px',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        {/* Левая часть: Карусель */}
        <Grid
          sx={{
            width: { xs: '90%', md: '40%' },
          }}
        >
          <BookImagesCarousel images={book.images} alt={book.title} />
        </Grid>

        {/* Правая часть: Информация о книге */}
        <Grid
          sx={{
            width: { xs: '90%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Card sx={{ width: '100%', height: '100%' }}>
            <CardContent>
              {book.owner && (
                <Typography variant="body1" gutterBottom>
                  Владелец:{' '}
                  <Link href={`/profile/${book.owner.id}`}>
                    {book.owner.username || book.owner.fullName}
                  </Link>
                </Typography>
              )}
              <Typography variant="body1" gutterBottom>
                Наименование книги: "{book.title}"
              </Typography>
              <Typography variant="body1" gutterBottom>
                Автор: {book.author}
              </Typography>
              {book.description && (
                <Typography variant="body2" mt={1}>
                  {book.description}
                </Typography>
              )}
              {book.price && (
                <Typography variant="body2" mt={1}>
                  Цена: {book.price} ₽
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
                    onClick={() => {
                    console.log('Добавить цитату');
                    }}
                >
                    Добавить
                </Button>
                </Box>
                <Box sx={{ p: 2, overflowY: 'auto' }}>
                  <QuotesList quotes={book.quotes || []} />
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

    </Box>
  );
};

export default BookDetailPage;
