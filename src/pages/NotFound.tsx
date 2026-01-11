import { Box, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h5">
        Страница не найдена
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
