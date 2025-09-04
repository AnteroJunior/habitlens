#!/bin/sh

set -e  # Faz o script falhar se qualquer comando falhar

echo "🔄 Rodando as migrations..."
npm run migrate:run

echo "🚀 Iniciando a API..."
node dist/main.js
