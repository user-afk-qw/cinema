<script setup>
import { ref } from 'vue'

// Временный мок календаря
const dates = ref([
  { day: 'Пн', date: '12', full: '2026-10-12' },
  { day: 'Вт', date: '13', full: '2026-10-13' },
  { day: 'Ср', date: '14', full: '2026-10-14' },
  { day: 'Чт', date: '15', full: '2026-10-15' },
  { day: 'Пт', date: '16', full: '2026-10-16' },
  { day: 'Сб', date: '17', full: '2026-10-17' },
  { day: 'Вс', date: '18', full: '2026-10-18' },
])
const selectedDate = ref('2026-10-14')

// Временный мок фильмов
const movies = ref([
  {
    id: 1,
    title: 'Дюна: Часть вторая',
    rating: 8.5,
    studio: 'Legendary Pictures',
    year: 2024,
    duration: 166,
    genre: 'Фантастика, Боевик',
    ageLimit: '12+',
    poster: 'https://image.tmdb.org/t/p/w300/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    description: 'Пол Атрейдес объединяется с Чани и фременами, чтобы отомстить заговорщикам, уничтожившим его семью.',
    sessions: [
      { id: 101, time: '12:30', price: 400, available: 45 },
      { id: 102, time: '15:00', price: 450, available: 12 },
      { id: 103, time: '19:45', price: 800, available: 5 }
    ]
  },
  {
    id: 2,
    title: 'Оппенгеймер',
    rating: 8.8,
    studio: 'Universal Pictures',
    year: 2023,
    duration: 180,
    genre: 'Биография, Драма',
    ageLimit: '18+',
    poster: 'https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    description: 'История американского физика Роберта Оппенгеймера, который руководил разработкой атомной бомбы.',
    sessions: [
      { id: 201, time: '14:20', price: 350, available: 60 },
      { id: 202, time: '21:00', price: 400, available: 25 }
    ]
  }
])
</script>

<template>
  <div class="home">
    <!-- Календарь -->
    <div class="calendar">
      <button 
        v-for="d in dates" 
        :key="d.full"
        class="date-card"
        :class="{ active: selectedDate === d.full }"
        @click="selectedDate = d.full"
      >
        <span class="day">{{ d.day }}</span>
        <span class="num">{{ d.date }}</span>
      </button>
    </div>

    <!-- Список фильмов -->
    <div class="movies-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img :src="movie.poster" :alt="movie.title" class="poster" />
        
        <div class="info">
          <div class="title-row">
            <h2>{{ movie.title }}</h2>
            <div class="rating">⭐ {{ movie.rating }}</div>
          </div>
          
          <div class="meta">
            {{ movie.studio }} • {{ movie.year }} • {{ movie.duration }} мин • {{ movie.genre }} • {{ movie.ageLimit }}
          </div>
          
          <p class="desc">{{ movie.description }}</p>
          
          <div class="sessions">
            <button v-for="s in movie.sessions" :key="s.id" class="session-btn">
              <span class="time">{{ s.time }}</span>
              <span class="price">{{ s.price }} ₽</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Календарь */
.calendar {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 15px;
  margin-bottom: 20px;
  scrollbar-width: none;
}
.calendar::-webkit-scrollbar { display: none; }
.date-card {
  min-width: 65px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--surface-color);
  border-radius: 8px;
  color: var(--text-muted);
  transition: all 0.2s;
}
.date-card:hover { background: #2a2a2a; }
.date-card.active { background: var(--accent-color); color: white; }
.date-card .day { font-size: 12px; text-transform: uppercase; margin-bottom: 4px; }
.date-card .num { font-size: 20px; font-weight: bold; }

/* Карточка фильма */
.movie-card {
  display: flex;
  gap: 20px;
  background: var(--surface-color);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
}
.poster {
  width: 150px;
  height: 225px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}
.info { flex: 1; display: flex; flex-direction: column; }
.title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px; }
.title-row h2 { font-size: 22px; font-weight: 600; margin: 0; }
.rating { color: #f5c518; font-weight: bold; font-size: 18px; }
.meta { color: var(--text-muted); font-size: 13px; margin-bottom: 15px; }
.desc { color: #ccc; font-size: 14px; margin-bottom: 20px; flex: 1; }

/* Кнопки сеансов */
.sessions { display: flex; gap: 10px; flex-wrap: wrap; }
.session-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 15px;
  background: #2a2a2a;
  border-radius: 6px;
  color: white;
  border: 1px solid transparent;
  transition: all 0.2s;
}
.session-btn:hover { border-color: var(--accent-color); background: #333; }
.session-btn .time { font-weight: bold; font-size: 16px; }
.session-btn .price { font-size: 12px; color: var(--text-muted); }
</style>