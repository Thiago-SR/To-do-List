import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar Express
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging para desenvolvimento
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Backend da To-Do List funcionando!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Rota de teste do banco de dados
app.get('/api/test-db', async (req, res) => {
  try {
    // Testar conexão com o banco
    await prisma.$connect();
    
    // Contar usuários (para testar se a tabela existe)
    const userCount = await prisma.user.count();
    
    res.json({
      message: '✅ Conexão com banco de dados OK!',
      userCount,
      database: 'PostgreSQL',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro na conexão com banco:', error);
    res.status(500).json({
      message: '❌ Erro na conexão com banco de dados',
      error: error.message
    });
  }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Inicializar servidor
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🔗 Frontend: ${process.env.CORS_ORIGIN}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Desligando servidor...');
  await prisma.$disconnect();
  process.exit(0);
}); 