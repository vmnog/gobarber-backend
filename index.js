import express from 'express';

const server = express();

server.use(express.json());

server.use((req, res, next) => {
  console.log(`
  --------------------
  Método: ${req.method}\n
  URL: ${req.url}\n
  Params: ${JSON.stringify(req.params)}\n
  Query: ${JSON.stringify(req.query)}\n
  Body: ${JSON.stringify(req.body)}\n
  ---------------------
  `);

  return next();
});

var users = ['Diego', 'Tiago', 'Victor'];

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;

  return res.json(users[id]);
});

server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:id', (req, res) => {
  const { newName } = req.body;
  const { id } = req.params;

  users[id] = newName;

  return res.json(users);
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  users.pop(id);

  return res.json(users);
});

server.listen(3000);
