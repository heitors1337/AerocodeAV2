export interface Etapa {
  id: number;
  nome: string;
  prazo: string;
  status: 'Pendente' | 'Em andamento' | 'Concluída';
  funcionarioId?: number;
}
