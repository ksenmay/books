import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Tooltip,
  Button,
  IconButton,
} from '@mui/material';
import BookImagesCarousel from '../../features/books/BookImagesCarousel';
import type { Book, BookStatus } from '../../types/book';
import { useReviewStore } from '../../stores/useReviewStore';
import { useQuoteStore } from '../../stores/useQuoteStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { useBookStore } from '../../stores/useBookStore';
import { useState, useMemo, useEffect } from 'react';

type BookMainInfoProps = {
  book: Book;
  onReserve?: (bookId: string) => void;
};

const BookMainInfo = ({ book, onReserve }: BookMainInfoProps) => {
  const { user, users } = useAuthStore();
  const toggleFavorite = useBookStore((s) => s.toggleFavorite);
  const favorites = useBookStore((s) => s.favorites);
  const updateBook = useBookStore((s) => s.updateBook);
  const reviews = useReviewStore((s) => s.reviews);
  const quotes = useQuoteStore((s) => s.quotes);

  const owner = users.find((u) => u.id === book.ownerId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isOwner = user?.id === book.ownerId;
  const isFavorited = user?.id ? favorites[user.id]?.includes(book.id) : false;

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
      sx={{ width: '100%', maxWidth: '1200px', justifyContent: 'center', mb: 4 }}
    >
      {/* Левая часть */}
      <Grid sx={{ width: { xs: '100%', md: '40%' } }}>
        <BookImagesCarousel images={book.images} alt={book.title} />
      </Grid>

      {/* Правая часть */}
      <Grid
        sx={{
          width: { xs: '100%', sm: '100%', md: '50%' },
          maxWidth: 600,
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
        }}
      >
        <Card
          sx={{
            width: '100%',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <CardContent sx={{ flexGrow: 1, pb: { xs: 2, sm: 4, md: 10 } }}>
            {/* Владелец */}
            <Typography variant="body1" gutterBottom>
              <Box component="span" sx={{ fontWeight: 600 }}>
                Опубликовал:
              </Box>{' '}
              {owner?.fullName || 'Пользователь'}
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
                {book.price} BYN
              </Typography>
            )}
          </CardContent>

          {/* Кнопка избранного */}
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          {!isOwner && user && (
            <Button
              onClick={() => toggleFavorite(user.id, book.id)}
              sx={{
                borderRadius: '50%',
                border: '2px solid',
                minWidth: 40,
                minHeight: 40,
                padding: 0,
                fontSize: 20,
                color: isFavorited ? '#ca9090' : 'grey',               // цвет иконки внутри
                backgroundColor: isFavorited ? '#6B3A3A' : 'transparent', // primaryA — фон при избранном
                borderColor: isFavorited ? '#ca9090' : 'grey',     // primaryB — обводка при избранном
                '&:hover': {
                  backgroundColor: isFavorited ? '#593333' : 'rgba(128, 128, 128, 0.1)', // чуть светлее при hover
                },
              }}
            >
            ♡
          </Button>

          )}
        </Box>

          {/* Кнопки действий */}
          {book.status !== 'доступна' ? (
              <Typography
                variant="body1"
                sx={{ m: 2, fontWeight: 600, color: 'primary.main' }}
              >
                {book.status === 'зарезервирована' && 'Зарезервирована'}
                {book.status === 'в обмене' && 'В обмене'}
                {book.status === 'продана' && 'Куплена'}
              </Typography>
            ) : (
                <Box
                  sx={{
                    m: 2,
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap',
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: '100%',
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
                          width: { xs: '90%', sm: 'auto' },
                          '&:hover, &:focus': { backgroundColor: 'rgba(25, 118, 210, 0.08)' },
                        }}
                        onClick={() => {
                          updateBook(book.id, { status: 'в обмене' });
                          setIsModalOpen(true);
                        }}
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
                        '&:hover, &:focus': { backgroundColor: 'rgba(156, 39, 176, 0.08)' },
                      }}
                      onClick={() => {
                        updateBook(book.id, { status: 'зарезервирована' });
                        setIsModalOpen(true);
                      }}

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
                          '&:hover, &:focus': { backgroundColor: 'rgba(76, 175, 80, 0.08)' },
                        }}
                       onClick={() => {
                        updateBook(book.id, { status: 'продана' });
                        setIsModalOpen(true);
                      }}

                      >
                        Купить
                      </Button>
                    </Tooltip>
                  )}
                </Box>
              )}

          {/* Диалог с контактами владельца */}
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <DialogTitle>Контактные данные владельца</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: '400px', overflowY: 'auto' }}>
              {owner && (
                <Box>
                  <Typography>
                    ФИО: {owner.fullName || [owner.lastName, owner.firstName, owner.middleName].filter(Boolean).join(' ')}
                  </Typography>
                  {owner.firstName && <Typography>Имя: {owner.firstName}</Typography>}
                  {owner.middleName && <Typography>Отчество: {owner.middleName}</Typography>}
                  {owner.lastName && <Typography>Фамилия: {owner.lastName}</Typography>}
                  <Typography>Username: {owner.username}</Typography>
                  <Typography>Email: {owner.email}</Typography>
                  {owner.profileData?.city && <Typography>Город: {owner.profileData.city}</Typography>}
                  {owner.profileData?.country && <Typography>Страна: {owner.profileData.country}</Typography>}
                  {owner.avatarUrl && <Typography>Аватар: {owner.avatarUrl}</Typography>}
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Button
                sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: '40%' }}
                onClick={() => {
                  if (owner) {
                    const contactInfo = `
ФИО: ${owner.fullName || [owner.lastName, owner.firstName, owner.middleName].filter(Boolean).join(' ')}
Никнейм: ${owner.username}
Email: ${owner.email}
Город: ${owner.profileData?.city || ''}
Страна: ${owner.profileData?.country || ''}
Аватар: ${owner.avatarUrl || ''}
                    `;
                    navigator.clipboard.writeText(contactInfo.trim());
                    alert('Контактные данные скопированы в буфер обмена!');
                  }
                }}
              >
                Копировать
              </Button>
              <Button sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: '40%' }} onClick={() => setIsModalOpen(false)}>
                Закрыть
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BookMainInfo;
