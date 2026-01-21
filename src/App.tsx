import './assets/fonts/fonts.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './components/layout/Header';
import AppRouter from './routes/AppRouter';
import { theme } from './styles/apptheme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* ===== ГЛОБАЛЬНЫЙ RESET + ТЕМА ===== */}
      <CssBaseline />

      <BrowserRouter>
        {/* ===== HEADER (единый для всего приложения) ===== */}
        <Header />

        {/* ===== ОСНОВНОЙ КОНТЕНТ ===== */}
        <Box
          component="main"
          sx={{
            pt: 'clamp(64px, 10vh, 96px)', // отступ под AppBar
            px: 'clamp(12px, 4vw, 32px)',
            minHeight: '100vh',
          }}
        >
          <React.Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '60vh',
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <AppRouter />
          </React.Suspense>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
