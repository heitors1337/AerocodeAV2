import { StatCard } from "../components/ui/StatCard";
import { Sidebar } from "../components/layouts/Sidebar";

export function Dashboard() {
  const nome = "Silva";

  return (
    <div className="layout">

      <Sidebar />

      <main className="main-content">

        <div className="page-header">
          <h1>Olá, {nome}!</h1>
          <p>Bem-vindo ao sistema de gestão da Aerocode.</p>
        </div>

        <div className="cards">
          <StatCard titulo="Aeronaves"          valor={12}  />
          <StatCard titulo="Funcionários"        valor={248} />
          <StatCard titulo="Produção Ativa"      valor={7}   />
          <StatCard titulo="Aeronaves Atrasadas" valor={2}   />
        </div>

      </main>

    </div>
  );
}