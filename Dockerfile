# ---------- BUILD STAGE ----------
FROM node:18-alpine AS build
WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]