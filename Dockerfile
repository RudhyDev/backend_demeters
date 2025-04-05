FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .
RUN npm run build

FROM node:18-alpine AS development
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm install
RUN npx prisma generate

FROM node:18-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

RUN npm install --only=production
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/main"]
