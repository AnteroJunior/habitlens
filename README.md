# HabitLens API

API para gerenciamento de hábitos e métricas pessoais, construída com NestJS, MongoDB, Prometheus e Grafana para fins educacionais e apresentação de projeto na disciplina Programação V.

## 🚀 Funcionalidades

- **Autenticação JWT**: Sistema completo de registro e login de usuários
- **Gerenciamento de Hábitos**: Criar, atualizar, deletar e fazer check-in em hábitos
- **Documentação Swagger**: API documentada automaticamente com exemplos
- **Monitoramento**: Métricas coletadas pelo Prometheus e visualizadas no Grafana
- **Health Checks**: Verificação de saúde dos serviços
- **Containerização**: Docker com multistage building para otimização

## 🛠️ Tecnologias

- **Backend**: NestJS (Node.js)
- **Banco de Dados**: MongoDB + Mongoose
- **Autenticação**: JWT + Passport
- **Monitoramento**: Prometheus + Grafana
- **Documentação**: Swagger/OpenAPI
- **Containerização**: Docker + Docker Compose

## 📋 Pré-requisitos

- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento local)
- npm ou yarn

## 🚀 Como executar

### 1. Clone o repositório
```bash
git clone <repository-url>
cd habitlens
```

### 2. Configure as variáveis de ambiente
```bash
cp env.example .env
# Edite o arquivo .env com suas configurações
```

### 3. Execute com Docker Compose
```bash
docker-compose up -d
```

### 4. Acesse os serviços
- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin123)

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger em `/api` quando a aplicação estiver rodando.

### Endpoints principais:

#### Autenticação (não requer autenticação)
- `POST /auth/signup` - Cadastrar novo usuário
- `POST /auth/signin` - Fazer login

#### Hábitos (requer autenticação JWT)
- `GET /habits` - Listar hábitos do usuário
- `POST /habits` - Criar novo hábito
- `PUT /habits` - Atualizar hábito
- `POST /habits/checkin` - Fazer check-in
- `DELETE /habits` - Deletar hábito

#### Métricas e Monitoramento
- `GET /metrics` - Métricas do Prometheus
- `GET /metrics/health` - Health check da aplicação

## 📊 Monitoramento

### Prometheus
- Coleta métricas da API a cada 10 segundos
- Métricas coletadas:
  - Total de requisições HTTP
  - Duração das requisições
  - Requisições por status code
  - Hábitos criados
  - Check-ins realizados
  - Métricas padrão do Node.js

### Grafana
- Dashboard pré-configurado com métricas da API
- Visualizações em tempo real
- Alertas configuráveis

## 🔧 Desenvolvimento Local

### Instalar dependências
```bash
npm install
```

### Executar em modo desenvolvimento
```bash
npm run start:dev
```

### Executar testes
```bash
npm run test
npm run test:e2e
```

## 🐳 Docker

### Build da imagem
```bash
docker build -t habitlens-api .
```

### Executar container
```bash
docker run -p 3000:3000 habitlens-api
```

## 📁 Estrutura do Projeto

```
habitlens/
├── src/
│   ├── modules/
│   │   ├── auth/          # Autenticação e autorização
│   │   ├── habits/        # Gerenciamento de hábitos
│   │   └── metrics/       # Métricas e monitoramento
│   ├── database/          # Schemas do MongoDB
│   ├── interfaces/        # Interfaces TypeScript
│   └── interceptors/      # Interceptores (métricas)
├── grafana/               # Configurações do Grafana
├── prometheus.yml         # Configuração do Prometheus
├── compose.yml            # Docker Compose
├── Dockerfile             # Docker multistage
└── healthcheck.js         # Health check para Docker
```

## 🔒 Segurança

- Autenticação JWT para rotas protegidas
- Validação de entrada com class-validator
- Usuário não-root no container Docker
- Health checks para verificação de integridade

## 📈 Métricas Disponíveis

### HTTP Requests
- `http_requests_total`: Contador total de requisições
- `http_request_duration_seconds`: Histograma de duração das requisições

### Business Metrics
- `habits_created_total`: Total de hábitos criados
- `checkins_total`: Total de check-ins realizados
- `active_users_total`: Total de usuários ativos

## 🚨 Troubleshooting

### Problemas comuns:

1. **API não inicia**: Verifique se o MongoDB está rodando
2. **Prometheus não coleta métricas**: Verifique se a API está respondendo em `/metrics`
3. **Grafana não conecta**: Verifique se o Prometheus está acessível

### Logs dos containers:
```bash
docker-compose logs api
docker-compose logs prometheus
docker-compose logs grafana
```

## 📄 Licença

Este projeto está sob a licença UNLICENSED.

## Autor

Antero Arcanjo
