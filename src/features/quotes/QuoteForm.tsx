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
import { v4 as uuid } from 'uuid';

import { useAuthStore } from '../../stores/useAuthStore';
import { useQuoteStore } from '../../stores/useQuoteStore';
import type { Quote } from '../../types/quote';

interface QuoteFormProps {
  open: boolean;
  onClose: () => void;
  bookId: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ open, onClose, bookId }) => {
  const user = useAuthStore((s) => s.user);
  const addQuote = useQuoteStore((s) => s.addQuote);

  const [text, setText] = useState('');
  const [page, setPage] = useState<number | ''>('');
  const [error, setError] = useState('');

  if (!user) return null;

  const handleSubmit = () => {
    if (!text.trim()) {
      setError('Введите текст цитаты');
      return;
    }

    const quote: Quote = {
      id: uuid(),
      bookId,
      authorId: user.id,
      author: user,
      text: text.trim(),
      page: page === '' ? undefined : Number(page),
      createdAt: new Date().toISOString(),
    };

    addQuote(quote);
    onClose();
    setText('');
    setPage('');
    setError('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Добавить цитату</DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Typography variant="body2">
            Пользователь: <b>{user.username}</b>
          </Typography>

          <TextField
            label="Текст цитаты"
            multiline
            minRows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            error={!!error}
            helperText={error}
            fullWidth
          />

          <TextField
            label="Страница (необязательно)"
            type="number"
            value={page}
            onChange={(e) => setPage(e.target.value ? Number(e.target.value) : '')}
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
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuoteForm;
