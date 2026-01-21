import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuthStore();

  // ===== Навигационные кнопки =====
  const navButtons = user
    ? [{ label: 'Книги', to: '/books' }] // только авторизованные
    : [{ label: 'Главная', to: '/' }]; // только для гостей

  // ===== Кнопки авторизации / профиля =====
  const navigate = useNavigate(); // <-- добавить в начале Header, после useAuthStore()

  const authButtons = user
      ? [
          { label: 'Избранное', to: '/favorites' },
          { label: 'Профиль', to: '/profile' },
          { 
            label: 'Выйти', 
            onClick: () => {
              logout();      // выйти из аккаунта
              navigate('/'); // редирект на главную
            },
          },
        ]
      : [{ label: 'Войти', to: '/login' }];

  // ===== Функция для рендера кнопок =====
  const renderButton = (btn: any, idx: number) =>
    btn.to ? (
      <Button
        key={idx}
        component={Link}
        to={btn.to}
        sx={{
          borderRadius: 100,
          textTransform: 'none',
          fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
          color: '#fffaf3ff',
          border: '1px solid rgba(255,250,243,0.15)',
          transition: 'all 0.3s ease',
          '&:hover, &:focus': {
            transform: 'translateY(-2px) scale(1.05)',
            boxShadow: '0 6px 14px rgba(0,0,0,0.25)',
            background: 'linear-gradient(90deg, #4B2E2E, #6B3A3A)',
            color: '#fff',
          },
        }}
      >
        {btn.label}
      </Button>
    ) : (
      <Button
        key={idx}
        onClick={btn.onClick}
        sx={{
          borderRadius: 100,
          textTransform: 'none',
          fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
          color: '#fffaf3ff',
          border: '1px solid rgba(255,250,243,0.15)',
          transition: 'all 0.3s ease',
          '&:hover, &:focus': {
            transform: 'translateY(-2px) scale(1.05)',
            boxShadow: '0 6px 14px rgba(0,0,0,0.25)',
            background: 'linear-gradient(90deg, #4B2E2E, #6B3A3A)',
            color: '#fff',
          },
        }}
      >
        {btn.label}
      </Button>
    );

  return (
    <>
      {/* ===== APP BAR ===== */}
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(90deg, #2A2723 0%, #4B2E2E 100%)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 'clamp(56px, 8vh, 72px)',
            px: 'clamp(12px, 4vw, 32px)',
          }}
        >
          {/* ===== ЛОГО слева ===== */}
          <Typography
            variant="h4"
            sx={{
              color: '#fffaf3ff',
              fontWeight: 600,
              fontFamily: 'title, alltext, sans-serif',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
              whiteSpace: 'nowrap',
            }}
          >
            Book Exchange
          </Typography>

          {/* ===== NAVIGATION / MOBILE BUTTON ===== */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(8px, 1.5vw, 20px)',
            }}
          >
            {!isMobile && (
              <>
                {navButtons.map(renderButton)}
                {authButtons.map(renderButton)}
              </>
            )}

            {isMobile && (
              <IconButton color="inherit" onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ===== MOBILE DRAWER ===== */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 260,
            height: '100%',
            bgcolor: '#2A2723',
            color: '#fffaf3ff',
          }}
        >
          <List>
            {navButtons.map((btn, idx) => (
              <ListItemButton
                key={idx}
                component={Link}
                to={btn.to}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={btn.label} />
              </ListItemButton>
            ))}

            <Divider sx={{ bgcolor: 'rgba(255,250,243,0.2)', my: 1 }} />

            {authButtons.map((btn, idx) =>
              btn.to ? (
                <ListItemButton
                  key={idx}
                  component={Link}
                  to={btn.to}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText primary={btn.label} />
                </ListItemButton>
              ) : (
                <ListItemButton
                key={idx}
                onClick={() => {
                  btn.onClick?.(); // logout
                  setOpen(false); // закрыть Drawer
                  navigate('/'); // редирект на корень
                }}
              >
                <ListItemText primary={btn.label} />
              </ListItemButton>

              )
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
