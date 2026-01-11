import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../types/book';
import { useBookStore } from '../../stores/useBookStore';

type Props = {
  book: Book;
};

const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();
  const selectBook = useBookStore((state) => state.selectBook);

  const handleClick = () => {
    selectBook(book);
    navigate(`/books/${book.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {book.images?.[0] && (
        <CardMedia
          component="img"
          height="180"
          image={book.images[0]}
          alt={book.title}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {book.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {book.author}
        </Typography>

        {book.price && (
          <Typography sx={{ mt: 1 }}>
            {book.price} ₽
          </Typography>
        )}

        <Box sx={{ mt: 1 }}>
          {book.exchangeable && (
            <Chip label="Обмен" size="small" sx={{ mr: 1 }} />
          )}
          <Chip label={book.status} size="small" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard;
