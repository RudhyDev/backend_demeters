# Estágio de desenvolvimento
FROM node:22.13.1-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio de produção
FROM node:22.13.1-alpine AS production
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package*.json ./
RUN npm install --only=production
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
