import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Avatar, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RegistrationModal from '../pages/RegisterPage';

const reviews = [
  { name: 'Лидделл Алиса', avatar: 'https://i.pinimg.com/736x/0b/9f/8e/0b9f8eb9202b7ca1c9365f1e86886e24.jpg', text: 'Этот сервис — та самая кроличья нора. За одной книгой найдёшь целую стопку сокровищ. Безумное чаепитие для книголюбов! Но осторожнее с отзывами — они бывают волшебными грибами.' },
  { name: 'Ким Докча', avatar: 'https://i.pinimg.com/1200x/27/ba/2a/27ba2acb9547e8262d21799f0f1fe42d.jpg', text: 'Как живой сценарий. Каждая книга — ветвь сюжета, каждый обмен — поворотный момент. Идеальное место для тех, кто знает: спасение — в следующей главе.' },
  { name: 'Экхарт Пенелопа', avatar: 'https://i.pinimg.com/736x/e3/35/12/e335126c582b4b573512f2a0f9e149be.jpg', text: 'Полезный интерфейс для выживания. Меняю сентиментальные романы на практические руководства. Изучаю чужие библиотеки, чтобы предсказать их ходы.' },
  { name: 'Мориарти', avatar: 'https://i.pinimg.com/736x/aa/b0/96/aab09692148fba4c958da50c4a6a24ea.jpg', text: 'Элегантная система перераспределения знаний с удобным интерфейсом и приятным дизайном. Ломает интеллектуальную иерархию, давая всем доступ к самому мощному оружию — образованию.' },
  { name: 'Сееле', avatar: 'https://i.pinimg.com/736x/53/a7/72/53a7726c533021185a25cceb1c7a01bc.jpg', text: 'Как найти склад оружия в Опустошении, только оружие — это книги. Отдаёшь старую историю — получаешь силу. Для тех, кто внизу — это реальный шанс. Круто!' },
];

const HomePage: React.FC = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [openRegister, setOpenRegister] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  const cardWidth = isMobile ? 280 : 360;
  const cardGap = 16;

  const handlePrev = () => setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const handleNext = () => setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', py: 6, px: 2, color: '#fdf6e3' }}>
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 100, mb: 2, color: '#fffaf3', textAlign: 'center' }}>
          История <u>должна быть прочитана</u> — дай книге новую жизнь!
        </Typography>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1.2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, lineHeight: 1.8 }}>
          Добро пожаловать в <b>Book Exchange</b> — сервис для книжных фанатов, готовых присоединиться к «круговороту» печатных изданий. Мы убеждены, 
          что <b>лучшая книга</b> — та, которую <b>читают без остановки</b>, поэтому предоставляем возможность для лёгкого обмена и продажи. 
        </Typography>
        <ul style={ { marginLeft: '1.2rem', marginBottom: '3rem', lineHeight: 1.6, listStyleType: 'circle'
 }}>
          <li><b>Обменивайся мирами</b><br/> Отправляйте книги, которые вас <b>изменили</b>, в новое путешествие. Бесплатно. Просто так. Получайте взамен истории, которые изменят вас.</li>
          <li><b>Охотьтесь за сокровищами</b><br/> Продайте редкий фолиант тому, кто <b>искал его всю жизнь</b>. Или найдите на нашей барахолке то самое издание, о котором давно мечтали.</li>
          <li><b>Доверяйте голосам сообщества</b><br/> Читайте искренние рецензии от таких же книголюбов. Делитесь своим мнением и создавайте самые честные рекомендательные списки.</li>
        </ul>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, lineHeight: 1.8 }}>
          <b>Book Exchange</b> — место, где «я прочитал» трансформируется в «давай обменяемся».
        </Typography>
        

      </motion.div>

      <Box sx={{ position: 'relative', mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Что говорят о нас пользователи
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          {/* Кнопка назад */}
          {!isMobile && (
            <IconButton
              onClick={handlePrev}
              sx={{
                color: '#fffaf3',
                bgcolor: 'rgba(75,46,46,0.2)',
                '&:hover': { bgcolor: 'rgba(75,46,46,0.4)' },
                ml: -2,
                zIndex: 3,
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}

          {/* Слайдер */}
          <Box
            sx={{
              overflowX: isMobile ? 'auto' : 'hidden',
              flex: 1,
              px: isMobile ? 1 : 0,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <motion.div
              style={{
                display: 'flex',
                gap: cardGap,
              }}
              animate={
                isMobile
                  ? {}
                  : {
                      x: `calc(50% - ${cardWidth / 2}px - ${currentReview * (cardWidth + cardGap)}px)`,
                    }
              }
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.8 }}
            >
              {reviews.map((review, idx) => {
                const isActive = idx === currentReview;
                return (
                  <motion.div
                    key={idx}
                    animate={{
                      scale: isMobile ? 1 : isActive ? 1 : 0.9,
                      opacity: isMobile ? 1 : isActive ? 1 : 0.5,
                      zIndex: isMobile ? 1 : isActive ? 2 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    style={{ flex: '0 0 auto' }}
                  >
                    <Paper
                      elevation={isActive ? 8 : 2}
                      sx={{
                        p: 4,
                        width: cardWidth,
                        minHeight: 220,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 250, 243, 0.3)',
                        background: 'linear-gradient(135deg, rgba(75,46,46,0.9) 0%, rgba(75,46,46,0.6) 100%)',
                        color: '#fffaf3',
                        backdropFilter: 'blur(6px)',
                        boxShadow: isActive ? '0 12px 25px rgba(0,0,0,0.4)' : '0 4px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      <Avatar src={review.avatar} sx={{ width: 64, height: 64, mb: 2, border: '2px solid #fffaf3aa' }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        {review.name}
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        {review.text}
                      </Typography>
                    </Paper>
                  </motion.div>
                );
              })}
            </motion.div>
          </Box>


          {/* Кнопка вперед */}
          {!isMobile && (
            <IconButton
              onClick={handleNext}
              sx={{
                color: '#fffaf3',
                bgcolor: 'rgba(75,46,46,0.2)',
                '&:hover': { bgcolor: 'rgba(75,46,46,0.4)' },
                mr: -2,
                zIndex: 3,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => setOpenRegister(true)}
          sx={{
            borderRadius: 50,
            px: 6,
            py: 1.5,
            fontSize: '1.2rem',
            textTransform: 'none',
            color: '#fffaf3',
            borderColor: '#fffaf3aa',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(4px)',
            '&:hover': { background: 'rgba(255,255,255,0.1)', transform: 'scale(1.05)' },
          }}
        >
          Зарегистрироваться
        </Button>
      </Box>

      <RegistrationModal open={openRegister} onClose={() => setOpenRegister(false)} />
    </Box>
  );
};

export default HomePage;
