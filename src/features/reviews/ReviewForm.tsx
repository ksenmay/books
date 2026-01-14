import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';

interface AddReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (review: { text: string; rating?: number }) => void;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ open, onClose, onSubmit }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number | ''>('');

  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!reviewText.trim()) {
      setError('Отзыв не может быть пустым');
      return;
    }

    onSubmit({ text: reviewText, rating: rating === '' ? undefined : Number(rating) });
    setReviewText('');
    setRating('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Добавить отзыв</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Текст отзыва"
            multiline
            minRows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            error={!!error}
            helperText={error}
            fullWidth
            required
          />
          <TextField
            label="Оценка (1-5)"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={rating}
            onChange={(e) => setRating(e.target.value === '' ? '' : Number(e.target.value))}
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
            fontSize: '1rem',
            color: '#fffaf3',
            borderColor: 'rgba(255, 250, 243, 0.6)',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(6px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.12)',
              borderColor: '#fffaf3',
              transform: 'scale(1.05)',
            },
          }}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReviewModal;
