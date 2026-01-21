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
  const [images, setImages] = useState<string[]>([]);

  // обработка выбора файлов
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setImages((prev) => [...prev, result]); // добавляем base64
        }
      };
      reader.readAsDataURL(file);
    });
  };

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
      images: images.length > 0 ? images : undefined,
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
    setImages([]);
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
                  if (isExchange) setPrice('');
                  }}
              >
                  <FormControlLabel value="exchange" control={<Radio />} label="Обмен" />
                  <FormControlLabel value="sale" control={<Radio />} label="Продажа" />
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

            <Box>
              <Button component="label">
                Загрузить изображение
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleFilesChange}
                />
              </Button>
              {images.length > 0 && (
                <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Картинка ${idx + 1}`}
                      style={{ width: 60, height: 80, objectFit: 'cover', borderRadius: 4 }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            <Button type="submit" size="large">
              Добавить
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
