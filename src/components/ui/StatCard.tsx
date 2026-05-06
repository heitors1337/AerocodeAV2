interface StatCardProps {
  titulo: string;
  valor: number;
}

export function StatCard({ titulo, valor }: StatCardProps) {
  return (
    <div className="stat-card">
      <h2>{titulo}</h2>
      <p>{valor}</p>
    </div>
  );
}