import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

export interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  coverUrl?: string;
}

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
      {book.coverUrl && (
        <CardMedia
          component="img"
          height="300"
          image={book.coverUrl}
          alt={book.title}
        />
      )}
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Автор: {book.author}
        </Typography>
        {book.description && (
          <Box mt={2}>
            <Typography variant="body1">{book.description}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BookDetails;
