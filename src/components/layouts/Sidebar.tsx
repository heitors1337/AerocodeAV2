import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>AEROCODE</h2>
        <span>Gestão de Aeronaves</span>
      </div>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/aeronaves">Aeronaves</Link>
        <Link to="/funcionarios">Funcionários</Link>
        <Link to="/estoque">Estoque</Link>
        <Link to="/relatorios">Relatórios</Link>
      </nav>

      <div className="sidebar-footer">
        AEROCODE © 2026
      </div>

    </aside>
  );
}