import React from 'react';
import { Card, CardContent, Typography, Stack, Box, IconButton } from '@mui/material';
import type { Quote } from '../../types/quote';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthStore } from '../../stores/useAuthStore';
import { useQuoteStore } from '../../stores/useQuoteStore';

interface QuotesListProps {
  quotes: Quote[];
  bookId: string;
  bookOwnerId: string;
}

const QuotesList: React.FC<QuotesListProps> = ({ quotes, bookId, bookOwnerId }) => {

  const user = useAuthStore((state) => state.user);
  const removeQuote= useQuoteStore((state) => state.removeQuote);
  if (!quotes || quotes.length === 0) return <Typography>Нет цитат</Typography>;

    const canDelete = user?.id === bookOwnerId;

  return (
    <Stack spacing={2}>
      {quotes.map((q) => (
        <Card
          key={q.id}
          sx={{
            p: 2,
            bgcolor: 'transparent',  // прозрачный фон
            boxShadow: 'none', 
            borderLeft: '4px double  #6c5b4f', // цветная полоска слева
          }}
        >
          <CardContent sx={{ p: 0, position: 'relative' }}>

            {canDelete && (
              <IconButton size="small" sx={{ position: 'absolute', top: 0, right: 0 }} 
                onClick={() => removeQuote(q.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}

            <Typography variant="body1" fontStyle="italic">
              “{q.text}”
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
              <span>{q.author?.username || 'Аноним'}</span>
              {q.page && <span>Стр. {q.page}</span>}
              <span>{new Date(q.createdAt).toLocaleDateString()}</span>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default QuotesList;
