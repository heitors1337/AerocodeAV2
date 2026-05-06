interface HeaderProps {
  titulo: string;
  descricao: string;
}

export function Header({ titulo, descricao }: HeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">
        {titulo}
      </h1>

      <p className="text-slate-600">
        {descricao}
      </p>
    </div>
  );
}