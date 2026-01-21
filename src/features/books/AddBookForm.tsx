import { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import {
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    MenuItem,
    Stack,
} from '@mui/material';
import { useBookStore } from '../../stores/useBookStore';
import { v4 as uuidv4 } from 'uuid';

export const AddBookForm = () => {
  const addBook = useBookStore((s) => s.addBook);
  const user = useAuthStore((s) => s.user);

    if (!user) {
    return (
        <Typography color="error">
        Для добавления книги необходимо войти в систему
        </Typography>
    );
    }


  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [exchangeable, setExchangeable] = useState(false);
  const [images, setImages] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addBook({
      id: uuidv4(),
      title,
      author,
      description: description || undefined,
      ownerId: user.id,
      exchangeable,
      price: exchangeable ? undefined : price || undefined,
      status: 'доступна',
      images: images
        ? images.split(',').map((url) => url.trim())
        : undefined,
      createdAt: new Date().toISOString(),
      reviews: [],
      quotes: [],
    });

    // reset
    setTitle('');
    setAuthor('');
    setDescription('');
    setPrice('');
    setExchangeable(false);
    setImages('');
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Добавить книгу
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <TextField
              label="Автор"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />

            <TextField
              label="Описание"
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <FormControl>
            <FormLabel>Тип размещения</FormLabel>
            <RadioGroup
                row
                value={exchangeable ? 'exchange' : 'sale'}
                onChange={(e) => {
                const isExchange = e.target.value === 'exchange';
                setExchangeable(isExchange);

                // если обмен — цену сбрасываем
                if (isExchange) {
                    setPrice('');
                }
                }}
            >
                <FormControlLabel
                value="exchange"
                control={<Radio />}
                label="Обмен"
                />
                <FormControlLabel
                value="sale"
                control={<Radio />}
                label="Продажа"
                />
            </RadioGroup>
            </FormControl>


            <TextField
                label="Цена"
                type="number"
                disabled={exchangeable}
                value={price}
                inputProps={{ min: 1 }}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    setPrice(value >= 1 ? value : '');
                }}
            />

            <TextField
              label="Ссылки на изображения (через запятую)"
              placeholder="https://..., https://..."
              value={images}
              onChange={(e) => setImages(e.target.value)}
            />

            <Button
              type="submit"
              size="large"
            >
              Добавить
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
