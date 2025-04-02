# Start of Selection
# Stage 1: Build the React app
FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build && echo "Build completed successfully" || echo "Build failed"


# Выводим содержимое директории после сборки
RUN echo "Contents of /app:" && ls -la /app

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
# End of Selection
