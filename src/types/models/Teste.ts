export interface Teste {
  id: number;
  aeronaveId: number;
  tipo: 'Elétrico' | 'Hidráulico' | 'Aerodinâmico';
  resultado: 'Aprovado' | 'Reprovado';
  data: string;
}
