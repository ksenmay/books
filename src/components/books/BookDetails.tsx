import React, { useState } from 'react';
import { Button } from '@mui/material';
import ReviewForm from '../../features/reviews/ReviewForm';
import { useReviewStore } from '../../stores/useReviewStore';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Link,
  Stack,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { Book } from '../../types/book';
import { Link as RouterLink } from 'react-router-dom';

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const reviews = useReviewStore((s) => s.getByBookId(book.id));
  const [openReview, setOpenReview] = useState(false);


  const handlePrevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? (book.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev =>
      prev === (book.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto', mt: 4 }}>
      {/* Слайдер изображений */}
      {book.images && book.images.length > 0 && (
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="400"
            image={book.images[currentImageIndex]}
            alt={book.title}
          />
          {book.images.length > 1 && (
            <>
              <IconButton
                size="small"
                onClick={handlePrevImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 8,
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleNextImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 8,
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      )}

      <CardContent>
        {/* Название и автор */}
        <Typography variant="h4" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Автор: {book.author}
        </Typography>

        {/* Описание */}
        {book.description && (
          <Box mt={2}>
            <Typography variant="body1">{book.description}</Typography>
          </Box>
        )}

        {/* Цена */}
        {book.price && (
          <Typography mt={2} variant="subtitle1" fontWeight={500}>
            Цена: {book.price} ₽
          </Typography>
        )}

        {/* Статус и обмен */}
        <Box mt={1} display="flex" gap={1} flexWrap="wrap">
          {book.exchangeable && <Chip label="Обмен возможен" color="success" />}
          <Chip label={book.status} color="primary" />
        </Box>

        {/* Информация о пользователе */}
        {book.owner && (
          <Box mt={2}>
            <Typography variant="subtitle2">
              Размещено пользователем:{' '}
              <Link component={RouterLink} to={`/profile/${book.owner.id}`}>
                {book.owner.username || book.owner.fullName}
              </Link>
            </Typography>
          </Box>
        )}

        {/* Цитаты */}
        {book.quotes && book.quotes.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle2">Цитаты из книги:</Typography>
            <Stack spacing={1} mt={1}>
              {book.quotes.map((q, idx) => (
                <Typography key={idx} variant="body2" fontStyle="italic">
                  "{q.text}"
                </Typography>
              ))}
            </Stack>
          </Box>
        )}

        {/* Отзывы */}
      <Box mt={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2">Отзывы</Typography>
          <Button size="small" onClick={() => setOpenReview(true)}>
            Оставить отзыв
          </Button>
        </Box>

        {reviews.length === 0 ? (
          <Typography variant="body2" color="text.secondary" mt={1}>
            Отзывов пока нет
          </Typography>
        ) : (
          <Stack spacing={1} mt={1}>
            {reviews.map((r) => (
              <Box key={r.id}>
                <Typography variant="body2">{r.text}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {r.author?.username} • {r.rating}/5
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      </CardContent>

      <ReviewForm
        open={openReview}
        onClose={() => setOpenReview(false)}
        bookId={book.id}
      />

    </Card>
  );
};

export default BookDetails;
