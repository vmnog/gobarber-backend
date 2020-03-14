import express from 'express';

const server = express();

server.use(express.json());

// Middleware Global
server.use((req, res, next) => {
  console.time('Request');
  console.log(`
  \n\n\n\n\n\n\n\n\n\n\n
  --------------------
  Método: ${req.method}\n
  URL: ${req.url}\n
  Params: ${JSON.stringify(req.params)}\n
  Query: ${JSON.stringify(req.query)}\n
  Body: ${JSON.stringify(req.body)}\n
  --------------------
  `);

  next();

  console.timeEnd('Request');
});

// Middleware Local
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  }

  next();
}

var users = ['Diego', 'Tiago', 'Victor'];

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;

  return res.json(users[id]);
});

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:id', checkUserExists, (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  users[id] = name;

  return res.json(users);
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  users.pop(id);

  return res.json(users);
});

server.listen(3000);
