import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useBookStore } from '../stores/useBookStore';
import BookCard from '../components/books/BookCard';
import { AddBookForm } from '../features/books/AddBookForm';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Collapse,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const countries = {
  Беларусь: ['Минск', 'Брест', 'Витебск', 'Гомель', 'Гродно', 'Могилев'],
} as const;

type Country = keyof typeof countries;

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const books = useBookStore((state) => state.books);

  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!user) return <Typography>Профиль недоступен</Typography>;

  const profile = user.profileData;
  const userBooks = books.filter((b) => b.ownerId === user.id);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateProfile({ avatar: url });
  };

  const handleNameChange = (field: 'firstName' | 'lastName' | 'middleName', value: string) => {
    updateProfile({
      ...profile,
      [field]: value,
      fullName: [
        field === 'lastName' ? value : profile.lastName,
        field === 'firstName' ? value : profile.firstName,
        field === 'middleName' ? value : profile.middleName,
      ].filter(Boolean).join(' '),
    });
  };

  const prevBook = () => {
    setCurrentIndex((prev) => (prev === 0 ? userBooks.length - 1 : prev - 1));
  };

  const nextBook = () => {
    setCurrentIndex((prev) => (prev === userBooks.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, pb: 6 }}>
      {/* Аватар и кнопка загрузки */}
      <Box sx={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar
            src={profile?.avatar || ''}
            sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
          />
        </motion.div>

        <Button component="label" size="small">
          Загрузить фото
          <input hidden type="file" accept="image/*" onChange={handleAvatarChange} />
        </Button>
      </Box>

      {/* Пользовательские данные */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <TextField fullWidth label="Имя пользователя" value={user.username} margin="normal" disabled />
        <TextField fullWidth label="Email" value={user.email} margin="normal" disabled />
      </motion.div>

      <AnimatePresence mode="wait">
        {!editMode ? (
          <motion.div
            key="fullNameView"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TextField fullWidth label="Полное имя" value={profile?.fullName || ''} margin="normal" disabled />
          </motion.div>
        ) : (
          <motion.div
            key="fullNameEdit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <TextField
              fullWidth
              label="Фамилия"
              value={profile?.lastName || ''}
              margin="normal"
              onChange={(e) => handleNameChange('lastName', e.target.value)}
            />
            <TextField
              fullWidth
              label="Имя"
              value={profile?.firstName || ''}
              margin="normal"
              onChange={(e) => handleNameChange('firstName', e.target.value)}
            />
            <TextField
              fullWidth
              label="Отчество"
              value={profile?.middleName || ''}
              margin="normal"
              onChange={(e) => handleNameChange('middleName', e.target.value)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <FormControl fullWidth margin="normal" disabled={!editMode}>
          <InputLabel>Страна</InputLabel>
          <Select
            value={profile?.country || ''}
            label="Страна"
            onChange={(e) => updateProfile({ ...profile, country: e.target.value, city: '' })}
          >
            {Object.keys(countries).map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!editMode || !profile?.country}>
          <InputLabel>Город</InputLabel>
          <Select
            value={profile?.city || ''}
            label="Город"
            onChange={(e) => updateProfile({ ...profile, city: e.target.value })}
          >
            {profile?.country &&
              countries[profile.country as Country].map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Сохранить' : 'Редактировать'}
        </Button>
      </motion.div>

      {/* Мои книги */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Мои книги ({userBooks.length})
        </Typography>

        <Button
          onClick={() => setShowAddForm((v) => !v)}
          sx={{ mb: 2 }}
        >
          {showAddForm ? 'Закрыть' : 'Добавить книгу'}
        </Button>

        <Collapse in={showAddForm}>
          <Box sx={{ mb: 3 }}>
            <AddBookForm />
          </Box>
        </Collapse>

        {userBooks.length === 0 ? (
          <Typography>Вы пока не добавили ни одной книги.</Typography>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
            <Button onClick={() => setCurrentIndex((prev) => (prev === 0 ? userBooks.length - 1 : prev - 1))} disabled={userBooks.length <= 1}>
              ◀
            </Button>

            <Box
              sx={{
                width: { xs: '70vw', sm: '35vw', md: '30vw' },
                height: { xs: '85vw', sm: '53vw', md: '33vw' },
              }}
            >
              <BookCard book={userBooks[currentIndex]} />
            </Box>

            <Button onClick={() => setCurrentIndex((prev) => (prev === userBooks.length - 1 ? 0 : prev + 1))} disabled={userBooks.length <= 1}>
              ▶
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
