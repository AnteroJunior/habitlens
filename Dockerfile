# Multi-stage build para otimizar o tamanho da imagem
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage de produção
FROM node:20-alpine AS production

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci && npm cache clean --force

# Copiar código buildado do stage anterior
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Copiar arquivos de configuração
COPY --chown=nestjs:nodejs .env* ./

# Mudar para usuário não-root
USER nestjs

# Expor porta
EXPOSE 3000

# Comando de inicialização
CMD ["node", "dist/main.js"]
