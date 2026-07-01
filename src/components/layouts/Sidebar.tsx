import { NavLink, useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("aerocode_role") || "operator";
  const username = sessionStorage.getItem("aerocode_username") || "Usuário";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>AEROCODE</h2>
        <span style={{ fontSize: "11px", opacity: 0.8 }}>
          {role === "admin" ? "Administrador" : role === "engineer" ? "Engenheiro" : "Operador"}: {username}
        </span>
      </div>

      <nav>
        {/* Dashboard: Apenas admin e engenheiro */}
        {(role === "admin" || role === "engineer") && (
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
            Dashboard
          </NavLink>
        )}

        {/* Aeronaves: Apenas admin e engenheiro */}
        {(role === "admin" || role === "engineer") && (
          <NavLink to="/aeronaves" className={({ isActive }) => isActive ? "active" : ""}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            Aeronaves
          </NavLink>
        )}

        {/* Funcionários: Apenas admin */}
        {role === "admin" && (
          <NavLink to="/funcionarios" className={({ isActive }) => isActive ? "active" : ""}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Funcionários
          </NavLink>
        )}

        {/* Estoque (Peças): Todos */}
        <NavLink to="/estoque" className={({ isActive }) => isActive ? "active" : ""}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
            <polyline points="7.5 19.79 7.5 14.6 3 12" />
            <polyline points="21 12 16.5 14.6 16.5 19.79" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <polyline points="12 22.08 12 12" />
          </svg>
          Estoque (Peças)
        </NavLink>

        {/* Etapas: Todos */}
        <NavLink to="/etapas" className={({ isActive }) => isActive ? "active" : ""}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          Etapas
        </NavLink>

        {/* Relatórios: Admin e engenheiro */}
        {(role === "admin" || role === "engineer") && (
          <NavLink to="/relatorios" className={({ isActive }) => isActive ? "active" : ""}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Relatórios
          </NavLink>
        )}
      </nav>

      <div style={{ padding: "0 16px 12px 16px" }}>
        <button 
          onClick={handleLogout} 
          className="btn"
          style={{ 
            color: "var(--danger)", 
            background: "rgba(239,68,68,0.05)", 
            border: "1px solid rgba(239,68,68,0.15)",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: "pointer"
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sair
        </button>
      </div>

      <div className="sidebar-footer">
        AEROCODE © 2026
      </div>
    </aside>
  );
}