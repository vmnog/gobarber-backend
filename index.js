import express from 'express';

const server = express();

server.get('/users/:id', (req, res) => {
  const { nome } = req.query;
  const { id } = req.params;

  return res.json({ message: `Oi ${nome}, id: ${id}` })
})

server.listen(3000);
