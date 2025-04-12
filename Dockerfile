# Estágio de construção (builder)
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiar dependências e schema do Prisma
COPY package*.json ./
COPY prisma ./prisma/

# Instalar todas as dependências e gerar client do Prisma
RUN npm ci
RUN npx prisma generate

# Copiar código e buildar
COPY . .
RUN npm run build

# ------------------------------------------------------------

# Estágio de desenvolvimento
FROM node:20-alpine AS development

WORKDIR /usr/src/app

# Copiar node_modules e dependências do builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma

# Copiar código fonte para hot-reload
COPY . .

CMD ["npm", "run", "start:dev"]

# ------------------------------------------------------------

# Estágio de produção
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Instalar APENAS dependências de produção + Prisma CLI para migrações
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --only=production && npm install prisma@latest

# Copiar artefatos essenciais do builder
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/dist ./dist

# Executar migrações e iniciar aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]