"use strict";
const express = require('express');
const trabalhoRoutes = require('./Routes/tarefaRoutes');
const app = express();
const port = 3000;
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});
app.use('/trabalhos', trabalhoRoutes.default || trabalhoRoutes);
app.listen(port, () => {
  console.log(`Servidor aberto na porta ${port}`);
});
