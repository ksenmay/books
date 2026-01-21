import { Box, Button, Grid, Typography, Tooltip } from '@mui/material';
import ReviewList from '../../features/reviews/ReviewList';
import type { Review } from '../../types/review';
import type { Book } from '../../types/book';

type BookReviewsSectionProps = {
  book: Book;
  reviews: Review[];
  onAddReview: () => void;
};

const BookReviewsSection = ({ book, reviews, onAddReview }: BookReviewsSectionProps) => {
  return (
    <Grid
      sx={{
        width: { xs: '100%', md: '50%' },
        pr: { md: 1 },
        borderRight: { xs: 'none', md: '1px solid #333' },
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
            title="Оставьте рецензию на книгу, которую вы когда-то читали, чтобы заинтересовать в ней других пользователей"
            arrow
            placement="top"
            componentsProps={{
                tooltip: {
                sx: {
                    backgroundColor: 'rgba(0,0,0,0.7)', // полупрозрачный чёрный
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
            <Typography variant="h6" sx={{ cursor: 'help', display: 'flex', alignItems: 'center', gap: 0.5}}>
                Рецензии
                <span style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                backgroundColor: '#961028',
                display: 'inline-block'
                }} />
            </Typography>
        </Tooltip>


        <Button
          variant="text"
          size="small"
          sx={{ opacity: 0.6 }}
          onClick={onAddReview}
        >
          Добавить
        </Button>
      </Box>

      {/* List */}
      <Box sx={{ p: 2, overflowY: 'auto' }}>
        <ReviewList
          reviews={reviews}
          bookId={book.id}
          bookOwnerId={book.ownerId}
        />
      </Box>
    </Grid>
  );
};

export default BookReviewsSection;
