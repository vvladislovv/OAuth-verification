# OAuth Authentication System

Полнофункциональная система аутентификации с использованием OAuth 2.0 для Google и GitHub.

## Обзор проекта

Этот проект представляет собой полноценное веб-приложение с разделением на фронтенд и бэкенд части, которое демонстрирует реализацию аутентификации через сторонние сервисы (Google и GitHub) с использованием протокола OAuth 2.0.

## Функциональность

- Аутентификация через Google OAuth 2.0
- Аутентификация через GitHub OAuth
- Защищенные маршруты для авторизованных пользователей
- Сохранение состояния аутентификации между сессиями
- Документация API с использованием Swagger

## Технологии

### Фронтенд
- React 19
- React Router 7
- Axios для HTTP-запросов
- Vite для сборки

### Бэкенд
- Node.js с Express
- Swagger для документации API
- Axios для HTTP-запросов к сервисам OAuth

### Инфраструктура
- Docker и Docker Compose для контейнеризации
- Nginx для проксирования запросов

## Начало работы

### Предварительные требования
- Docker и Docker Compose
- Учетные записи разработчика в Google Cloud Platform и GitHub
- Настроенные OAuth приложения в Google и GitHub

### Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/yourusername/oauth-auth-system.git
cd oauth-auth-system
```

2. Создайте файлы .env на основе примеров:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Заполните файлы .env вашими ключами OAuth:

# backend/.env
VITE_GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=http://localhost:0000
PORT=0000


# frontend/.env
VITE_GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=http://localhost:0000
PORT=0000


4. Запустите приложение с помощью Docker Compose:
```bash
docker-compose up --build
```


5. Откройте приложение в браузере:
- Фронтенд: http://localhost:0000
- Документация API: http://localhost:0000/api-docs

## Структура проекта
oauth-auth-system/
├── backend/ # Серверная часть приложения
├── frontend/ # Клиентская часть приложения
├── docker-compose.yml # Конфигурация Docker Compose
└── README.md # Этот файл


Подробная информация о каждой части проекта находится в соответствующих README файлах в директориях backend и frontend.
