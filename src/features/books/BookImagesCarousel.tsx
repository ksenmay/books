import React, { useState } from 'react';
import { Card, CardMedia, IconButton, Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface BookImagesCarouselProps {
  images?: string[];
  alt?: string;
}

const BookImagesCarousel: React.FC<BookImagesCarouselProps> = ({ images = [], alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const handlePrev = () =>
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <Card sx={{ position: 'relative', aspectRatio: '3/4' }}>
      <CardMedia
        component="img"
        image={images[currentIndex]}
        alt={alt}
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {images.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 8,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 8,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      )}
    </Card>
  );
};

export default BookImagesCarousel;
