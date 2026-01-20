import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import type { Review } from '../../types/review';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewsListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <Typography>Нет отзывов</Typography>;

  return (
    <Stack spacing={2}>
      {reviews.map((r) => (
        <Card
          key={r.id}
          sx={{
            p: 2,
            bgcolor: 'transparent',       // прозрачный фон
            borderLeft: '4px double  #6c5b4f', // цветная полоска слева
            boxShadow: 'none',            // убираем тень
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Typography variant="body1">
              {r.text}
            </Typography>

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
