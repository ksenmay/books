import React from 'react';
import { Grid, Box, Typography, Button, Tooltip } from '@mui/material';
import QuotesList from '../../features/quotes/QuoteList';
import type { Quote } from '../../types/quote';

type BookQuotesSectionProps = {
  quotes: Quote[];
  onAddQuote: () => void;
};

const BookQuotesSection: React.FC<BookQuotesSectionProps> = ({ quotes, onAddQuote }) => {
  return (
    <Grid
      sx={{
        width: { xs: '100%', md: '50%' },
        pl: { md: 1 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          px: 2,
          mt: 1,
        }}
      >
        <Tooltip
          title="Оставьте цепляющие цитаты из книги для других читателей"
          arrow
          placement="top"
          componentsProps={{
            tooltip: { sx: { backgroundColor: 'rgba(0,0,0,0.7)', fontSize: '0.875rem' } },
            arrow: { sx: { color: 'rgba(0,0,0,0.7)' } },
          }}
        >
          <Typography
            variant="h6"
            sx={{ cursor: 'help', display: 'flex', alignItems: 'center', gap: 0.5}}
          >
            Цитаты
            <span
              style={{
               width: 5,
                height: 5,
                borderRadius: '50%',
                backgroundColor: '#961028',
                display: 'inline-block'
              }}
            />
          </Typography>
        </Tooltip>

        <Button variant="text" size="small" sx={{ opacity: 0.6 }} onClick={onAddQuote}>
          Добавить
        </Button>
      </Box>

      <Box sx={{ p: 2, overflowY: 'auto' }}>
        <QuotesList quotes={quotes} />
      </Box>
    </Grid>
  );
};

export default BookQuotesSection;
