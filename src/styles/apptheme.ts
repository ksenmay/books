import { createTheme, alpha, responsiveFontSizes } from '@mui/material/styles';

// ==========================================================================
// 🎨 ЦВЕТА — DARK ACADEMIA
// ==========================================================================
const colors = {
  bg: '#1C1B18',
  surface: '#2A2723',
  primaryA: '#4B2E2E',
  primaryB: '#6B3A3A',
  border: '#7B4B4B',
  text: '#fffaf3ff',
  textMuted: '#A1866F',
  shadow: '#00000090',
};

// ==========================================================================
// 🌍 БАЗОВАЯ ТЕМА
// ==========================================================================
let theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: colors.bg,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: colors.textMuted,
    },
    divider: alpha(colors.text, 0.08),
  },

  // ========================================================================
  // 🔤 FLUID TYPOGRAPHY (viewport-based)
  // ========================================================================
  typography: {
    fontFamily: 'alltext, Arial, sans-serif',

    h1: {
      fontFamily: 'title, alltext, sans-serif',
      fontWeight: 700,
      fontSize: 'clamp(1.8rem, 4vw, 3rem)',
      WebkitTextStroke: '0.5px rgba(255,255,255,0.2)',
    },

    h2: {
      fontFamily: 'title, alltext, sans-serif',
      fontWeight: 600,
      fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
    },

    h3: {
      fontFamily: 'title, alltext, sans-serif',
      fontWeight: 500,
      fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)',
    },

    body1: {
      fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
      lineHeight: 1.65,
    },

    button: {
      fontSize: 'clamp(0.85rem, 1vw, 1rem)',
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.04em',
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    // ========================================================================
    // 📌 HEADER / APP BAR — FLUID + CONTINUOUS GRADIENT
    // ========================================================================
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: 'sticky',
          top: 0,

          // 🔥 градиент считается от viewport
          background: `
            linear-gradient(
              135deg,
              ${colors.surface} 0%,
              ${alpha(colors.primaryA, 0.45)} 45%,
              ${alpha(colors.primaryB, 0.75)} 100%
            )
          `,
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '200% 200%',

          minHeight: 'clamp(56px, 8vh, 96px)',
          paddingInline: 'clamp(12px, 4vw, 48px)',

          backdropFilter: 'blur(14px)',
          boxShadow: `0 0.5vh 2vh ${alpha(colors.shadow, 0.45)}`,
          borderBottom: `1px solid ${alpha(colors.text, 0.08)}`,
        },
      },
    },

    // ========================================================================
    // 🔘 BUTTONS — GLOBAL + АНИМАЦИИ
    // ========================================================================
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
          color: '#f5e6d3', // светлый текст
          background: `radial-gradient(circle at 30% 30%, ${colors.primaryA}, ${colors.primaryB})`,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 2px 12px ${alpha(colors.shadow, 0.3)}`,
          transition: 'all 0.35s ease',

          // ===== HOVER / FOCUS =====
          '&:hover, &:focus': {
            background: `radial-gradient(circle at 70% 70%, ${colors.primaryB}, ${colors.primaryA})`, // меняем градиент местами
            color: '#fff',
            transform: 'translateY(-2px) scale(1.03)',
            boxShadow: `0 6px 18px ${alpha(colors.shadow, 0.25)}`,
          },

          // ===== ACTIVE =====
          '&:active': {
            transform: 'translateY(0) scale(1)',
            boxShadow: `0 2px 12px ${alpha(colors.shadow, 0.6)}`,
          },
        },

        // ===== HEADER BUTTONS (TEXT) =====
        text: {
          borderRadius: 100,
          border: `1px solid ${alpha(colors.text, 0.25)}`,
          color: colors.text,
          background: 'transparent',

          '&:hover, &:focus': {
            background: alpha(colors.text, 0.06),
            borderColor: alpha(colors.text, 0.45),
            transform: 'translateY(-2px) scale(1.03)',
            boxShadow: `0 4px 14px ${alpha(colors.shadow, 0.15)}`,
          },
        },

        // ===== CONTAINED BUTTONS (основные) =====
        contained: {
          borderRadius: 14,
          background: `radial-gradient(circle at 30% 30%, ${colors.primaryA}, ${colors.primaryB})`,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 0.6vh 2vh ${alpha(colors.shadow, 0.8)}`,

          '&:hover, &:focus': {
            background: `radial-gradient(circle at 70% 70%, ${colors.primaryB}, ${colors.primaryA})`,
            color: '#fff',
            transform: 'translateY(-2px) scale(1.03)',
            boxShadow: `0 6px 18px ${alpha(colors.shadow, 0.25)}`,
          },

          '&:active': {
            transform: 'translateY(0) scale(1)',
            boxShadow: `0 2px 12px ${alpha(colors.shadow, 0.6)}`,
          },
        },
      },
    },

    // ========================================================================
    // 📦 CONTAINER — НЕ ДАЁТ ЛОМАТЬСЯ LAYOUT
    // ========================================================================
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '100%',
          paddingInline: 'clamp(12px, 4vw, 32px)',
        },
      },
    },

    // ========================================================================
    // 🃏 CARD — FLUID SCALE
    // ========================================================================
    MuiCard: {
      styleOverrides: {
        root: {
          background: colors.surface,
          borderRadius: 'clamp(10px, 1.5vw, 16px)',
          border: `1px solid ${alpha(colors.text, 0.05)}`,
          boxShadow: `0 1vh 3vh ${alpha(colors.shadow, 0.25)}`,
        },
      },
    },
  },
});

// ==========================================================================
// 📱 АВТО-МАСШТАБ ШРИФТОВ
// ==========================================================================
theme = responsiveFontSizes(theme);

export { theme };
