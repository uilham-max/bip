const redis = require('redis')

// Cria um cliente Redis
const client = redis.createClient({ url: "redis://default:axWgF0AYiM9qCUq0xnyIWL8WnOeoLuwu@redis-10472.c82.us-east-1-2.ec2.redns.redis-cloud.com:10472"});

// Evento de erro para capturar e tratar erros de conexão
client.on('error', (err) => {
  console.log('Erro ao conectar ao Redis:', err);
});

// Conecta ao Redis e executa uma função quando a conexão estiver pronta
client.on('connect', () => {
  // console.log('Connected to Redis!');
  // console.log('Caching list of Problemas for 10 seconds...');
});

module.exports = client