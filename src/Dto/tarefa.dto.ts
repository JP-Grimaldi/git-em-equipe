import { Tarefa } from "../Interface/tarefa.interface";

export type createTarefaDto = Pick<Tarefa, 'name' | 'description' | 'status'>;
export type updateTarefaDto = Partial<Pick<Tarefa, 'name' | 'description' | 'status'>>