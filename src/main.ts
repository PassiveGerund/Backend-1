import express from 'express';
import logger from './logger/pino.logger';

const server = express();
server.use(express.json()); // Включаем парсер тела

const port = 2000;

server.get('/', (req, res) => {
  logger.info('Главная страница');
  res.json({ key: 'value123' });
});

server.get('/task', (req, res) => {
  logger.info('Список задач');
  res.send('Список задач');
});

server.get('/task/:id', (req, res) => {
  const id = req.params.id;
  logger.info(`Задача ${id}`);
  res.send('Одна задача');
});

server.get('/task/my/authored', (req, res) => {
  logger.info(`Список своих созданных задач`);
  res.send('Список своих созданных задач');
});

server.get('/task/my/assigned', (req, res) => {
  logger.info(`Список своих назначенных задач`);
  res.send('Список своих назначенных задач');
});

server.get('/user/:id', (req, res) => {
  const { id } = req.params;
  logger.info(`Пользователь ${id}, держите новости!`);
  res.send(`Пользователь ${id}, держите новости!`);
});

server.get('/user/:id/news/:newsId', (req, res) => {
  const id: string = req.params.id;
  const newsId: string = req.params.newsId;
  logger.info(`Держите новости ${id}  ${newsId}!`);
  res.send(`Держите новости ${id}  ${newsId}!`);
});

server.post('', (req, res) => {
  // console.log('Пришло тело:');
  // console.log(req.body);
  const body = JSON.stringify(req.body);
  logger.info(`Пришло тело: ${body}  !`);
  res.send(`Пришло тело: ${body}`);
});

server.post('/task', (req, res) => {
  logger.info('Пришел запрос с методом POST. Создать задачу');
  res.send('Создать задачу');
});

server.put('/task/:id', (req, res) => {
  const id: string = req.params.id;
  logger.info(`Пришел запрос с методом PUT. Обновить задачу ${id}`);
  res.send('Обновить задачу');
});

server.delete('/task/:id', (req, res) => {
  const id: string = req.params.id;
  logger.info(`Пришел запрос с методом DELETE. Обновить задачу ${id}`);
  res.send('Удалить задачу');
});

server.listen(port, () => {
  logger.info(`Это победа 🎉🎉🎉 ${port}...`);
});
