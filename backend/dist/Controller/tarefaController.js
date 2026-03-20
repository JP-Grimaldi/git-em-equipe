"use strict";
const { db } = require('../Config/knex');
async function getTarefa(_req, res) {
  const data = await db('tarefa').select('*').orderBy('id', 'desc');
  return res.status(200).json({ data });
}
async function createTarefa(req, res) {
  const body = req.body;
  if (!body.name || !body.description || !body.status) {
    return res.status(400).json({ error: 'Preencha nome, descrição e status.' });
  }
  await db('tarefa').insert(body);
  return res.status(201).json({ message: 'Trabalho criado com sucesso.' });
}
async function updateTarefa(req, res) {
  const id = Number(req.params.id);
  const body = req.body;
  const tarefa = await db('tarefa').where({ id }).first();
  if (!tarefa) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }
  await db('tarefa').where({ id }).update(body);
  return res.status(200).json({ message: 'Tarefa atualizada com sucesso.' });
}
async function deleteTarefa(req, res) {
  const id = Number(req.params.id);
  const tarefa = await db('tarefa').where({ id }).first();
  if (!tarefa) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }
  await db('tarefa').where({ id }).del();
  return res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
}
module.exports = { getTarefa, createTarefa, updateTarefa, deleteTarefa };
