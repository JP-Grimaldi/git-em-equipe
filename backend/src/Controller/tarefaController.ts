import { Request, Response } from 'express';
import { db } from '../Config/knex';
import { createTarefaDto, updateTarefaDto } from '../Dto/tarefa.dto';
import { Tarefa } from '../Interface/tarefa.interface';

export async function getTarefa(_req: Request, res: Response) {
  const data = await db<Tarefa>('tarefa').select('*').orderBy('id', 'desc');
  return res.status(200).json({ data });
}

export async function createTarefa(req: Request, res: Response) {
  const body: createTarefaDto = req.body;

  if (!body.name || !body.description || !body.status) {
    return res.status(400).json({ error: 'Preencha nome, descrição e status.' });
  }

  await db<Tarefa>('tarefa').insert(body);
  return res.status(201).json({ message: 'Trabalho criado com sucesso.' });
}

export async function updateTarefa(req: Request, res: Response) {
  const id = Number(req.params.id);
  const body: updateTarefaDto = req.body;

  const tarefa = await db<Tarefa>('tarefa').where({ id }).first();
  if (!tarefa) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  await db<Tarefa>('tarefa').where({ id }).update(body);
  return res.status(200).json({ message: 'Tarefa atualizada com sucesso.' });
}

export async function deleteTarefa(req: Request, res: Response) {
  const id = Number(req.params.id);

  const tarefa = await db<Tarefa>('tarefa').where({ id }).first();
  if (!tarefa) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  await db<Tarefa>('tarefa').where({ id }).del();
  return res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
}
