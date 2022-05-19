FROM node:16 AS frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .
RUN NODE_ENV=production npm run build

FROM node:16
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci
COPY backend .
RUN npm run build
COPY --from=frontend /app/dist ./dist

CMD [ "npm", "start" ]