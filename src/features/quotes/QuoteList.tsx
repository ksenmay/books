import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import type { Quote } from '../../types/quote';

interface QuotesListProps {
  quotes: Quote[];
}

const QuotesList: React.FC<QuotesListProps> = ({ quotes }) => {
  if (!quotes || quotes.length === 0) return <Typography>Нет цитат</Typography>;

  return (
    <Stack spacing={2}>
      {quotes.map((q) => (
        <Card
          key={q.id}
          sx={{
            p: 2,
            bgcolor: 'transparent',  // прозрачный фон
            borderLeft: '4px double  #6c5b4f', // цветная полоска слева
          }}
        >
          <CardContent sx={{ p: 0 }}>
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
