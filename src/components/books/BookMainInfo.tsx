import { Grid, Card, CardContent, Typography, Link } from '@mui/material';
import BookImagesCarousel from '../../features/books/BookImagesCarousel';
import type { Book } from '../../types/book';

type BookMainInfoProps = {
  book: Book;
};

const BookMainInfo = ({ book }: BookMainInfoProps) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        maxWidth: '1200px',
        justifyContent: 'center',
        mb: 4,
      }}
    >
      {/* Левая часть: Карусель */}
      <Grid
        sx={{
          width: { xs: '90%', md: '40%' },
        }}
      >
        <BookImagesCarousel images={book.images} alt={book.title} />
      </Grid>

      {/* Правая часть: Информация о книге */}
      <Grid
        sx={{
          width: { xs: '90%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Card sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            {book.owner && (
              <Typography variant="body1" gutterBottom>
                <strong>Владелец:</strong>{' '}
                <Link href={`/profile/${book.owner.id}`}>
                  {book.owner.username || book.owner.fullName}
                </Link>
              </Typography>
            )}

            <Typography variant="body1" gutterBottom>
              <strong>Наименование книги:</strong> "{book.title}"
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Автор:</strong> {book.author}
            </Typography>

            {book.description && (
              <Typography variant="body2" mt={1}>
                {book.description}
              </Typography>
            )}

            {book.price && (
              <Typography variant="body2" mt={1}>
                <strong>Цена:</strong> {book.price} ₽
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BookMainInfo;
