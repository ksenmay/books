import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import type { Review } from '../../types/review';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewsListProps> = ({ reviews}) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Stack spacing={1}>
          {reviews.map((r) => (
            <Card key={r.id} sx={{ p: 1 }}>
              <Typography variant="body2">{r.text}</Typography>
              <Typography variant="caption" color="text.secondary">
                {r.author?.username || 'Аноним'}, {new Date(r.createdAt).toLocaleDateString()}
              </Typography>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReviewList;
