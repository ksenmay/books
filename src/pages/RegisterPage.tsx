import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuthStore } from '../stores/useAuthStore';

const countries = {
  Беларусь: ['Минск', 'Брест', 'Витебск', 'Гомель', 'Гродно', 'Могилев'],
} as const;

type Country = keyof typeof countries;

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ open, onClose }) => {
  const register = useAuthStore((s) => s.register);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    lastName: '',
    firstName: '',
    middleName: '',
    password: '',
    confirmPassword: '',
    country: '',
    city: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Za-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthConfig = [
    { label: 'Очень слабый', color: '#8b0000' },
    { label: 'Слабый', color: '#b8860b' },
    { label: 'Нормальный', color: '#6b8e23' },
    { label: 'Хороший', color: '#2e8b57' },
    { label: 'Отличный', color: '#3a7bd5' },
  ];

  const passwordStrength = getPasswordStrength(formData.password);

  const validate = () => {
    const e: Record<string, string> = {};

    if (!formData.email) e.email = 'Email обязателен';
    if (!formData.username) e.username = 'Имя пользователя обязательно';
    if (!formData.lastName) e.lastName = 'Фамилия обязательна';

    if (!formData.password) e.password = 'Пароль обязателен';
    else if (formData.password.length < 8)
      e.password = 'Минимум 8 символов';

    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = 'Пароли не совпадают';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const res = register({
      email: formData.email,
      username: formData.username,
      lastName: formData.lastName,
      firstName: formData.firstName || undefined,
      middleName: formData.middleName || undefined,
      password: formData.password,
    });

    if (!res.ok) {
      setErrors({ 
        [res.field]: res.field === 'username' 
          ? 'Имя пользователя уже занято' 
          : 'Email уже занят' 
      });
      return;
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Регистрация</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
          />
          <TextField
            label="Имя пользователя"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username || 'Нельзя изменить после регистрации'}
            fullWidth
            required
          />
          <TextField
            label="Фамилия"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
            required
          />
          <TextField
            label="Имя"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Отчество"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Страна</InputLabel>
            <Select
              name="country"
              value={formData.country}
              label="Страна"
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value, city: '' })
              }
            >
              {Object.keys(countries).map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth disabled={!formData.country}>
            <InputLabel>Город</InputLabel>
            <Select
              name="city"
              value={formData.city}
              label="Город"
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            >
              {formData.country &&
                countries[formData.country as Country].map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            label="Пароль"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 1 }}>
            <Box
              sx={{
                height: 6,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.15)',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${(passwordStrength / 4) * 100}%`,
                  background: strengthConfig[passwordStrength]?.color,
                  transition: 'width 0.4s ease, background 0.4s ease',
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'block',
                color: strengthConfig[passwordStrength]?.color,
              }}
            >
              {formData.password
                ? strengthConfig[passwordStrength]?.label
                : 'Введите пароль'}
            </Typography>
          </Box>
          <TextField
            label="Подтверждение пароля"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
            * Обязательные поля
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Отмена</Button>
        <Button
          variant="outlined"
          onClick={handleSubmit}
          sx={{
            borderRadius: '999px',
            px: 4,
            py: 1.2,
            textTransform: 'none',
            fontSize: '1rem',
            color: '#fffaf3',
            borderColor: 'rgba(255, 250, 243, 0.6)',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(6px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.12)',
              borderColor: '#fffaf3',
              transform: 'scale(1.05)',
            },
          }}
        >
          Зарегистрироваться
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationModal;
