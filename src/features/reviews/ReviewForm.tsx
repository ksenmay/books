import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Rating,
  Typography,
} from '@mui/material';
import { v4 as uuid } from 'uuid';

import { useAuthStore } from '../../stores/useAuthStore';
import { useReviewStore } from '../../stores/useReviewStore';
import type { Review } from '../../types/review';

interface ReviewFormProps {
  open: boolean;
  onClose: () => void;
  bookId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ open, onClose, bookId }) => {
  const user = useAuthStore((s) => s.user);
  const addReview = useReviewStore((s) => s.addReview);

  const [rating, setRating] = useState<number | null>(5);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  if (!user) return null;

  const handleSubmit = () => {
    if (!text.trim()) {
      setError('Введите текст отзыва');
      return;
    }

    if (!rating) {
      setError('Выберите оценку');
      return;
    }

    const review: Review = {
      id: uuid(),
      bookId,
      authorId: user.id,
      author: user,
      rating,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    addReview(review);
    onClose();
    setText('');
    setRating(5);
    setError('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Оставить отзыв</DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Typography variant="body2">
            Пользователь: <b>{user.username}</b>
          </Typography>

          <Rating
            value={rating}
            onChange={(_, value) => setRating(value)}
            size="large"
          />

          <TextField
            label="Текст отзыва"
            multiline
            minRows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            error={!!error}
            helperText={error}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Отмена</Button>
        <Button
          variant="outlined"
          onClick={handleSubmit}
          sx={{
            borderRadius: '999px',
            px: 4,
            py: 1.2,
            textTransform: 'none',
          }}
        >
          Опубликовать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewForm;
