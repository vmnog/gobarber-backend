import express from 'express';

const server = express();

server.use(express.json());

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

server.listen(3000);
