import express from 'express';

const server = express();

server.use(express.json());

var users = ['Diego', 'Tiago', 'Victor'];

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

function checkUserInArray(req, res, next) {
  const { id } = req.params;
  const user = users[id];

  if (!user) {
    return res.status(400).json({ error: 'User does not exists' });
  }

  req.user = user;

  next();
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:id', checkUserInArray, (req, res) => {
  const { id } = req.params;
  const user = req.user;

  return res.json(user);
});

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:id', checkUserInArray, checkUserExists, (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  users[id] = name;

  return res.json(users);
});

server.delete('/users/:id', checkUserInArray, (req, res) => {
  const { id } = req.params;

  users.pop(id);

  return res.json(users);
});

server.listen(3000);
