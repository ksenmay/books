import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import type { Review } from '../../types/review';

interface ReviewsListProps {
  reviews: Review[];
  title?: string;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews, title = 'Отзывы' }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Stack spacing={1}>
          {reviews.map((r, idx) => (
            <Card key={idx} sx={{ p: 1 }}>
              <Typography variant="body2">{r.text}</Typography>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReviewsList;
