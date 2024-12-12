FROM node:18-alpine AS build_image

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build_image /app/dist/ /app/dist/
COPY package*.json ./
COPY vite.config.js ./

RUN npm install --only=production
RUN npm install vite

EXPOSE 5173

CMD ["npm", "run", "preview"]



