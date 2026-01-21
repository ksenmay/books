import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Rating, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Review } from '../../types/review';
import { useAuthStore } from '../../stores/useAuthStore';
import { useReviewStore } from '../../stores/useReviewStore';


interface ReviewsListProps {
  reviews: Review[];
  bookId: string;
  bookOwnerId: string;
}

const ReviewList: React.FC<ReviewsListProps> = ({ reviews, bookId, bookOwnerId }) => {

  const user = useAuthStore((state) => state.user);
  const removeReview = useReviewStore((state) => state.removeReview);
  if (!reviews || reviews.length === 0) return <Typography>Нет рецензий</Typography>;  
  const canDelete = user?.id === bookOwnerId;
  return (
    <Stack spacing={2}>
      {reviews.map((r) => (
        <Card
          key={r.id}
          sx={{
            p: 2,
            bgcolor: 'transparent',       // прозрачный фон
            borderLeft: '4px double #6c5b4f', // цветная полоска слева
            boxShadow: 'none',            // убираем тень
          }}
        >
          <CardContent sx={{ p: 0, position: 'relative' }}>            
            {canDelete && (
              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={() => removeReview(r.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
            {/* Рейтинг звездочками */}
            <Rating
              value={r.rating}
              readOnly
              size="small"
              precision={1} // шаг в 1 звезду
              sx={{ mb: 1, color: '#ffb400' }} // цвет звёздочек
            />

            {/* Текст отзыва */}
            <Typography variant="body1">
              {r.text}
            </Typography>

            {/* Автор и дата */}
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'text.secondary',
              }}
            >
              <span>{r.author?.username || 'Аноним'}</span>
              <span>{new Date(r.createdAt).toLocaleDateString()}</span>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default ReviewList;
