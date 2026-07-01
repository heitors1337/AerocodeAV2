import { StatCard } from "../components/ui/StatCard";
import { Sidebar } from "../components/layouts/Sidebar";

export function Dashboard() {
  const nome = "Silva";

  // Dados simulados de produção mensal
  const chartData = [
    { label: "Jan", val: 3, height: "40%" },
    { label: "Fev", val: 5, height: "60%" },
    { label: "Mar", val: 4, height: "50%" },
    { label: "Abr", val: 8, height: "90%" },
    { label: "Mai", val: 7, height: "80%" },
    { label: "Jun", val: 12, height: "100%" }
  ];

  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content">
        <div className="page-header">
          <h1>Olá, {nome}!</h1>
          <p>Painel de Controle de Operações Aeroespaciais — Aerocode v2.0</p>
        </div>

        <div className="cards">
          <StatCard titulo="Aeronaves Ativas" valor={12} />
          <div className="stat-card">
            <h2>Funcionários</h2>
            <p>248</p>
            <div className="stat-trend" style={{ color: "var(--success)" }}>
              <span>▲ +14 este mês</span>
            </div>
          </div>
          <div className="stat-card">
            <h2>Produção Ativa</h2>
            <p>7</p>
            <div className="stat-trend" style={{ color: "var(--primary)" }}>
              <span>● Linhas 1, 2, e 4</span>
            </div>
          </div>
          <div className="stat-card" style={{ borderColor: "rgba(239, 68, 68, 0.25)" }}>
            <h2>Aeronaves Atrasadas</h2>
            <p style={{ color: "var(--danger)" }}>2</p>
            <div className="stat-trend" style={{ color: "var(--danger)" }}>
              <span>⚠️ Ação requerida</span>
            </div>
          </div>
        </div>

        {/* Alert Notification Panel */}
        <div className="alert-panel">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div>
            <p style={{ fontWeight: 600, color: "#fff" }}>ALERTAS DE FLUXO DE TRABALHO CRÍTICOS</p>
            <p>Aeronave <strong>FGHI-00</strong> está atrasada na fase de <strong>Eletrônica</strong> devido à falta do Sensor de Altitude no estoque.</p>
          </div>
        </div>

        {/* Charts & Details Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginTop: "24px" }}>
          
          {/* Production chart */}
          <div className="chart-container" style={{ margin: 0 }}>
            <div className="chart-header">
              <h3>Entregas Mensais de Aeronaves</h3>
            </div>
            <div className="chart-body">
              {chartData.map((item, index) => (
                <div key={index} className="chart-bar-wrapper">
                  <div className="chart-bar" style={{ height: item.height }}>
                    <span className="chart-bar-value">{item.val}</span>
                  </div>
                  <span className="chart-bar-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick status list */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600, color: "var(--text-main)", letterSpacing: "0.5px" }}>
              Status das Linhas
            </h3>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600 }}>Linha Ásia (Hangar A)</p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Produzindo ABCD-X1</p>
              </div>
              <span className="badge badge-success">Operando</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600 }}>Linha Europa (Hangar B)</p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Produzindo MNOP-07</p>
              </div>
              <span className="badge badge-success">Operando</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600 }}>Hangar de Testes de Voo</p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Pista de Decolagem 02</p>
              </div>
              <span className="badge badge-warning">Aguardando</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}