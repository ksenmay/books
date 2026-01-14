import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import type { Quote } from '../../types/quote';

interface QuotesListProps {
  quotes: Quote[];
  title?: string;
}

const QuotesList: React.FC<QuotesListProps> = ({ quotes, title = 'Цитаты' }) => {
  if (!quotes || quotes.length === 0) return null;

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Stack spacing={1}>
          {quotes.map((q, idx) => (
            <Card key={idx} sx={{ p: 1 }}>
              <Typography variant="body2" fontStyle="italic">
                "{q.text}"
              </Typography>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuotesList;
