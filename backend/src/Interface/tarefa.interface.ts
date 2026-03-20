export interface Tarefa {
  id: number;
  name: string;
  description: string;
  status: 'pendente' | 'entregue' | 'atrasado';
  created_at: Date;
}
