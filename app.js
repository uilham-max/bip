var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var conexao = require('./database/conexao');
const client = require('./database/connectionRedis.js')

// const redis = require('redis')

// // Cria um cliente Redis
// const client = redis.createClient({ url: "redis://default:axWgF0AYiM9qCUq0xnyIWL8WnOeoLuwu@redis-10472.c82.us-east-1-2.ec2.redns.redis-cloud.com:10472"});

// (async () => {
//   await client.connect();
// })();

// // Evento de erro para capturar e tratar erros de conexão
// client.on('error', (err) => {
//   console.log('Erro ao conectar ao Redis:', err);
// });

// // Conecta ao Redis e executa uma função quando a conexão estiver pronta
// client.on('connect', () => {
//   console.log('Conectado ao Redis!');
// });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var demandanteRouter = require('./routes/demandanteRouter');
var problemaRouter = require('./routes/problemaRouter');
var estudanteRouter = require('./routes/estudanteRouter');
var mentorRouter = require('./routes/mentorRouter');
var propostaRouter = require('./routes/propostaRouter');
var projetoRouter = require('./routes/projetoRouter');

const session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'udjs93ka0', resave: true, saveUninitialized: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/demandante', demandanteRouter);
app.use('/problema', problemaRouter);
app.use('/estudante', estudanteRouter);
app.use('/mentor', mentorRouter);
app.use('/proposta', propostaRouter);
app.use('/projeto', projetoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

conexao.authenticate();
client.connect();

module.exports = app;
