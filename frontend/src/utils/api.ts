import axios from 'axios';

// Определяем базовый URL для API
// В development используем proxy (относительные пути)
// В production используем абсолютный URL из переменных окружения
const getBaseURL = () => {
  // Если указан REACT_APP_BACKEND_URL, используем его
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  
  // Если есть REACT_APP_HOST и REACT_APP_SERVER_PORT, формируем URL
  if (process.env.REACT_APP_HOST && process.env.REACT_APP_SERVER_PORT) {
    return `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_SERVER_PORT}`;
  }
  
  // В development mode возвращаем пустую строку для использования proxy
  // В production это должно быть установлено через переменные окружения
  return '';
};

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
