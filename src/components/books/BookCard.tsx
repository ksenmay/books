import { Card, CardContent, CardMedia, Typography, Box, Chip, IconButton, Tooltip} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../types/book';
import { useBookStore } from '../../stores/useBookStore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

type Props = {
  book: Book;
};

const BookCard = ({ book }: Props) => {
  const user = useAuthStore((s) => s.user);
  const isOwner = user && book.ownerId === user.id;
  const navigate = useNavigate();
  const selectBook = useBookStore((state) => state.selectBook);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = book.images ?? [];

  const handleClick = () => {
    selectBook(book);
    navigate(`/books/${book.id}`);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        height: '100%',        // ⬅ обязательно
        display: 'flex',
        flexDirection: 'column',
      }}
>

      {/* ===== Изображение (70%) ===== */}
      {images.length > 0 && (
        <Box
          sx={{
            position: 'relative',
            height: '60%',
          }}
        >

          {/* ===== БЕЙДЖ МОЯ / ЧУЖАЯ ===== */}
          {user && (
            <Chip
              label={isOwner ? 'моя книга' : 'чужая книга'}
              size="small"
              color={isOwner ? 'success' : 'default'}
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                fontWeight: 500,
                backdropFilter: 'blur(4px)',
                backgroundColor: isOwner
                  ? 'rgba(46,125,50,0.55)'
                  : 'rgba(0,0,0,0.55)',
                color: '#fff',
              }}
            />
          )}

          <CardMedia
            component="img"
            image={images[currentImageIndex]}
            alt={book.title}
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />

          {images.length > 1 && (
            <>
              <IconButton
                size="small"
                onClick={handlePrevImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 6,
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                onClick={handleNextImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 6,
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      )}

      {/* ===== Контент (30%) ===== */}
      <CardContent
        sx={{
          height: '40%',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="h6" noWrap>
            {book.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" noWrap>
            {book.author}
          </Typography>
        </Box>

        <Box>
          {book.price && (
            <Typography sx={{ fontWeight: 500 }}>
              {book.price} ₽
            </Typography>
          )}

          <Box sx={{ mt: 0.5 }}>
          <Tooltip
            title={
              book.exchangeable
                ? 'С согласия владельца вы можете обменять свою книгу на данную'
                : 'Вы можете купить данную книгу за указанную цену'
            }
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  fontSize: '0.875rem',
                },
              },
              arrow: {
                sx: {
                  color: 'rgba(0,0,0,0.7)',
                },
              },
            }}
          >
            <Chip
              label={book.exchangeable ? 'обмен' : 'покупка'}
              size="small"
              sx={{ mr: 1, cursor: 'help' }}
            />
          </Tooltip>

          <Chip label={book.status} size="small" />
        </Box>

        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard;
