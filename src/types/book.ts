import React, { useState } from 'react';
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
        <Typography variant="h4" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Автор: {book.author}
        </Typography>

        {book.description && (
          <Box mt={2}>
            <Typography variant="body1">{book.description}</Typography>
          </Box>
        )}

        {book.price && (
          <Typography mt={2} variant="subtitle1" fontWeight={500}>
            Цена: {book.price} ₽
          </Typography>
        )}

        <Box mt={1} display="flex" gap={1} flexWrap="wrap">
          {book.exchangeable && <Chip label="Обмен возможен" color="success" />}
          <Chip label={book.status} color="primary" />
        </Box>

        {book.owner && (
          <Box mt={2}>
            <Typography variant="subtitle2">
              Размещено пользователем:{' '}
              <Link
                component={RouterLink}
                to={`/profile/${book.owner.id}`}
              >
                {book.owner.username || book.owner.fullName}
              </Link>
            </Typography>
          </Box>
        )}

        {book.quotes && book.quotes.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle2">Цитаты из книги:</Typography>
            <Stack spacing={1} mt={1}>
              {book.quotes.map((q, idx) => (
                <Typography key={idx} variant="body2" fontStyle="italic">
                  "{q}"
                </Typography>
              ))}
            </Stack>
          </Box>
        )}

        {book.reviews && book.reviews.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle2">Отзывы:</Typography>
            <Stack spacing={1} mt={1}>
              {book.reviews.map((r, idx) => (
                <Typography key={idx} variant="body2">
                  {r}
                </Typography>
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BookDetails;
