import express from 'express';

const server = express();

server.get('/', (req, res) => {
  const { nome } = req.query;

  return res.json({ message: `Oi ${nome}` })
})

server.listen(3000);
