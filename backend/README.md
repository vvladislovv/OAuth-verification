# OAuth Authentication System - Backend

Серверная часть системы аутентификации OAuth, обрабатывающая запросы от клиента и взаимодействующая с сервисами Google и GitHub.

## Технологии

- Node.js
- Express.js
- Swagger для документации API
- Axios для HTTP-запросов
- Docker для контейнеризации

## Структура проекта

backend/
├── src/
│ ├── routes/ # Маршруты API
│ │ └── auth.js # Маршруты аутентификации
│ └── server.js # Основной файл сервера
├── .env # Переменные окружения
├── .env.example # Пример файла переменных окружения
├── Dockerfile # Инструкции для сборки Docker-образа
├── package.json # Зависимости и скрипты
└── README.md # Этот файл


## API Endpoints

### Google OAuth

#### POST /auth/google
Обрабатывает код авторизации от Google и возвращает токен доступа и информацию о пользователе.

**Запрос:**
```json
{
"code": "4/0AeaYSHDxxxxxxxxxxxxxxxxxxx",
"redirectUri": "http://localhost:0000/auth/google/callback"
}
```


**Ответ:**
```json
{
"token": "ya29.a0AfB_byC...",
"user": {
"id": "123456789",
"email": "user@example.com",
"name": "User Name",
"picture": "https://lh3.googleusercontent.com/..."
}
}
```


#### GET /auth/google/callback
Обрабатывает callback от Google OAuth.

**Параметры запроса:**
- `code`: Код авторизации от Google

### GitHub OAuth

#### POST /auth/github
Обрабатывает код авторизации от GitHub и возвращает токен доступа и информацию о пользователе.

**Запрос:**
```json
{
"code": "a1b2c3d4e5f6g7h8i9j0"
}

```

**Ответ:**
```json
{
"token": "gho_16C7e42F292c6912E7710c838347Ae178B4a",
"user": {
"login": "username",
"id": 123456,
"avatar_url": "https://avatars.githubusercontent.com/...",
"name": "User Name",
"email": "user@example.com"
}
}
```


#### GET /auth/github/callback
Обрабатывает callback от GitHub OAuth.

**Параметры запроса:**
- `code`: Код авторизации от GitHub

## Документация API

Документация API доступна через Swagger UI по адресу:
```
http://localhost:0000/api-docs
```

## Настройка и запуск

### Переменные окружения

Создайте файл `.env` на основе `.env.example` и заполните следующие переменные:
```
VITE_GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=http://localhost:0000
PORT=0000
```


### Запуск в режиме разработки
```bash
npm install
node src/server.js
```


## Настройка OAuth

### Google OAuth

1. Создайте проект в [Google Cloud Console](https://console.cloud.google.com/)
2. Настройте OAuth consent screen
3. Создайте OAuth client ID для веб-приложения
4. Добавьте разрешенные URI перенаправления:
   - http://localhost:0000/auth/google/callback

### GitHub OAuth

1. Зарегистрируйте новое OAuth приложение в [GitHub Developer Settings](https://github.com/settings/developers)
2. Укажите Homepage URL: http://localhost:0000
3. Укажите Authorization callback URL: http://localhost:0000/auth/github/callback