import { Grid, Card, CardContent, Typography, Link, Box, Tooltip, Button } from '@mui/material';
import BookImagesCarousel from '../../features/books/BookImagesCarousel';
import type { Book } from '../../types/book';
import { useReviewStore } from '../../stores/useReviewStore';
import { useQuoteStore } from '../../stores/useQuoteStore';
import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type BookMainInfoProps = {
  book: Book;
  onReserve?: (bookId: string) => void; // функция для резервирования книги
};

const BookMainInfo = ({ book, onReserve }: BookMainInfoProps) => {
  const reviews = useReviewStore((s) => s.reviews);
  const quotes = useQuoteStore((s) => s.quotes);

  const { reviewsCount, quotesCount, averageRating } = useMemo(() => {
    const bookReviews = reviews.filter((r) => r.bookId === book.id);
    const bookQuotes = quotes.filter((q) => q.bookId === book.id);

    const reviewsCount = bookReviews.length;
    const quotesCount = bookQuotes.length;

    const averageRating =
      reviewsCount > 0
        ? bookReviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount
        : null;

    return { reviewsCount, quotesCount, averageRating };
  }, [reviews, quotes, book.id]);

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
      {/* Левая часть */}
      <Grid sx={{ width: { xs: '100%', md: '40%' } }}>
        <BookImagesCarousel images={book.images} alt={book.title} />
      </Grid>

      {/* Правая часть */}
        <Grid
            sx={{
                width: { xs: '100%', sm: '90%', md: '50%' }, // на xs и sm подстраиваем ширину
                maxWidth: 600, // ограничение максимальной ширины карточки
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto', // центрирование на маленьких экранах
            }}
        >

        <Card
            sx={{
                width: '100%',
                minHeight: 200, // минимум, чтобы карточка не была очень маленькой
                display: 'flex',
                flexDirection: 'column',
                position: 'relative', // можно убрать, если кнопки не absolute
            }}
        >
          <CardContent
            sx={{
                flexGrow: 1,
                pb: { xs: 2, sm: 4, md: 10 }, // адаптивный отступ снизу
            }}
            >

            {/* Владелец */}
            <Typography variant="body1" gutterBottom>
                <Box component="span" sx={{ fontWeight: 600 }}>
                    Опубликовал:
                </Box>{' '}
                <Link
                    component={RouterLink}
                    to={`/profile/${book.owner?.id || book.ownerId}`}
                    underline="hover"
                >
                    {book.owner?.username || book.owner?.fullName || 'Пользователь'}
                </Link>
            </Typography>


            {/* Название */}
            <Typography variant="body1" gutterBottom>
              <Box component="span" sx={{ fontWeight: 600 }}>
                Наименование книги:
              </Box>{' '}
              "{book.title}"
            </Typography>

            {/* Автор */}
            <Typography variant="body1" gutterBottom>
              <Box component="span" sx={{ fontWeight: 600 }}>
                Автор:
              </Box>{' '}
              {book.author}
            </Typography>

            {/* Статус книги */}
            <Typography variant="body1" gutterBottom>
              <Box component="span" sx={{ fontWeight: 600 }}>
                Статус:
              </Box>{' '}
              {book.status}
            </Typography>

            {/* Рейтинг и статистика */}
            <Typography variant="body2" mt={1}>
              <Box component="span" sx={{ fontWeight: 600 }}>
                Рейтинг:
              </Box>{' '}
              {averageRating !== null ? ` ${averageRating.toFixed(1)}` : 'нет оценок'}
            </Typography>

            <Typography variant="body2">
              <Box component="span" sx={{ fontWeight: 600 }}>
                Рецензии:
              </Box>{' '}
              {reviewsCount}
            </Typography>

            <Typography variant="body2">
              <Box component="span" sx={{ fontWeight: 600 }}>
                Цитаты:
              </Box>{' '}
              {quotesCount}
            </Typography>

            {/* Описание */}
            {book.description && (
              <Typography variant="body2" mt={2}>
                {book.description}
              </Typography>
            )}

            {/* Цена */}
            {book.price && (
              <Typography variant="body2" mt={1}>
                <Box component="span" sx={{ fontWeight: 600 }}>
                  Цена:
                </Box>{' '}
                {book.price} ₽
              </Typography>
            )}
          </CardContent>

           {/* Кнопки действий */}
            {book.status === 'доступна' && onReserve && (
            <Box
                sx={{
                    m: 2, // отступ сверху, чтобы кнопки не сливались с текстом
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap',
                    flexDirection: { xs: 'column', sm: 'row' }, // вертикально на мобильных
                    width: '100%', // растягиваем на мобильных
                }}
            >
                {/* Обменять */}
                {book.exchangeable && (
                <Tooltip
                    title="С согласия владельца вы можете обменять свою книгу на данную"
                    arrow
                    placement="top"
                >
                    <Button
                    sx={{
                        borderWidth: 1,
                        backgroundColor: 'transparent',
                        width: { xs: '90%', sm: 'auto' }, // адаптация на мобильных
                        '&:hover, &:focus': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        },
                    }}
                    onClick={() => onReserve(book.id)}
                    >
                    Обменять
                    </Button>
                </Tooltip>
                )}

                {/* Зарезервировать */}
                <Tooltip
                    title="Вы можете зарезервировать эту книгу, чтобы потом оформить обмен или покупку"
                    arrow
                    placement="top"
                    >
                    <Button
                        sx={{
                        borderWidth: 1,
                        backgroundColor: 'transparent',
                        width: { xs: '90%', sm: 'auto' },
                        '&:hover, &:focus': {
                            backgroundColor: 'rgba(156, 39, 176, 0.08)',
                        },
                        }}
                        onClick={() => onReserve(book.id)}
                    >
                        Зарезервировать
                    </Button>
                </Tooltip>

                {/* Купить */}
                {!book.exchangeable && book.price && (
                <Tooltip
                    title="Вы можете купить данную книгу за указанную цену"
                    arrow
                    placement="top"
                >
                    <Button
                    sx={{
        
                        borderWidth: 1,
                        backgroundColor: 'transparent',
                        width: { xs: '90%', sm: 'auto' },
                        '&:hover, &:focus': {
                        backgroundColor: 'rgba(76, 175, 80, 0.08)',
                        },
                    }}
                    onClick={() => onReserve(book.id)}
                    >
                    Купить
                    </Button>
                </Tooltip>
            )}
        </Box>
        )}


        </Card>
      </Grid>
    </Grid>
  );
};

export default BookMainInfo;
