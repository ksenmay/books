import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = useAuthStore((state) => state.login);
  const isAuth = useAuthStore((state) => state.isAuth);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/profile', { replace: true });
    }
  }, [isAuth, navigate]);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Вход
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
        >
          Войти
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
