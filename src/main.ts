import express from 'express';
import logger from './logger/pino.logger';

const server = express();
server.use(express.json()); // Включаем парсер тела

const port = 2000;

server.get('/', (req, res) => {
  res.json({ key: 'value123' });
});

server.get('/task', (req, res) => {
  res.send('Список задач');
});

server.get('/task/:id', (req, res) => {
  res.send('Одна задача');
});

server.get('/task/my/authored', (req, res) => {
  res.send('Список своих созданных задач');
});

server.get('/task/my/assigned', (req, res) => {
  res.send('Список своих назначенных задач');
});

server.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Пользователь ${id}, держите новости!`);
});

server.get('/user/:id/news/:newsId', (req, res) => {
  const id: string = req.params.id;
  const newsId: string = req.params.newsId;

  res.send(`Держите новости ${id}  ${newsId}!`);
});

server.post('', (req, res) => {
  console.log('Пришло тело:');
  console.log(req.body);
  res.send('Hello World!');
});

server.post('/payload', (req, res) => {
  console.log(req.body);
  // res.send(req.query);
});

server.post('/task', (req, res) => {
  console.log('Пришел запрос с методом POST');
  res.send('Создать задачу');
});

server.put('/task/:id', (req, res) => {
  res.send('Обновить задачу');
});

server.delete('/task/:id', (req, res) => {
  res.send('Удалить задачу');
});

server.listen(port, () => {
  logger.info(`Это победа 🎉🎉🎉 ${port}...`);
});
