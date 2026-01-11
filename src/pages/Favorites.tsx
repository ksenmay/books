import React from 'react';
import { Box, Typography } from '@mui/material';

const FavoritesPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Избранное
      </Typography>
      <Typography variant="body1">
        Здесь будут отображаться ваши любимые книги.
      </Typography>
    </Box>
  );
};

export default FavoritesPage;
