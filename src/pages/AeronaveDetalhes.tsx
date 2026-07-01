import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layouts/Sidebar";
import { TipoAeronave } from "../types/enums/tipoAeronave";
import { StatusAeronave } from "../types/enums/statusAeronave";
import { Aeronave } from "../types/models/Aeronave";

function getBadgeStatus(status: string) {
  switch (status) {
    case StatusAeronave.Producao:   return "badge badge-info";
    case StatusAeronave.Finalizada: return "badge badge-success";
    case StatusAeronave.Atrasada:   return "badge badge-danger";
    default:                        return "badge badge-neutral";
  }
}

const inicialAeronaves: Aeronave[] = [
  { id: 1, modelo: "ABCD-X1",  tipo: TipoAeronave.Militar,   status: StatusAeronave.Producao,   progresso: 78  },
  { id: 2, modelo: "DEFG-22",  tipo: TipoAeronave.Comercial, status: StatusAeronave.Finalizada, progresso: 100 },
  { id: 3, modelo: "FGHI-00",  tipo: TipoAeronave.Executivo, status: StatusAeronave.Atrasada,   progresso: 45  },
  { id: 4, modelo: "JKLM-14",  tipo: TipoAeronave.Militar,   status: StatusAeronave.Finalizada, progresso: 100 },
  { id: 5, modelo: "MNOP-07",  tipo: TipoAeronave.Comercial, status: StatusAeronave.Producao,   progresso: 32  },
];

export function AeronaveDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aeronaves, setAeronaves] = useState<Aeronave[]>(() => {
    const saved = sessionStorage.getItem("aerocode_aeronaves");
    return saved ? JSON.parse(saved) : inicialAeronaves;
  });

  const aeronave = aeronaves.find((a) => a.id === Number(id));
  const [progresso, setProgresso] = useState(aeronave ? aeronave.progresso : 0);
  const [status, setStatus] = useState(aeronave ? aeronave.status : StatusAeronave.Producao);

  // Sincroniza estado local com os detalhes da aeronave
  useEffect(() => {
    if (aeronave) {
      setProgresso(aeronave.progresso);
      setStatus(aeronave.status);
    }
  }, [id]);

  if (!aeronave) {
    return (
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <h1>Aeronave não encontrada</h1>
            <p>O ID informado não corresponde a nenhuma aeronave cadastrada.</p>
          </div>
          <Link to="/aeronaves" className="btn">← Voltar para Aeronaves</Link>
        </main>
      </div>
    );
  }

  const handleProgressoChange = (val: number) => {
    setProgresso(val);
    let newStatus = status;
    if (val === 100) {
      newStatus = StatusAeronave.Finalizada;
    } else if (val < 100 && status === StatusAeronave.Finalizada) {
      newStatus = StatusAeronave.Producao;
    }
    setStatus(newStatus);
    updateAeronaveInStorage(val, newStatus);
  };

  const handleStatusChange = (newStat: string) => {
    setStatus(newStat);
    let newProg = progresso;
    if (newStat === StatusAeronave.Finalizada) {
      newProg = 100;
      setProgresso(100);
    }
    updateAeronaveInStorage(newProg, newStat);
  };

  const updateAeronaveInStorage = (p: number, s: string) => {
    const updated = aeronaves.map((a) => {
      if (a.id === aeronave.id) {
        return { ...a, progresso: p, status: s };
      }
      return a;
    });
    setAeronaves(updated);
    sessionStorage.setItem("aerocode_aeronaves", JSON.stringify(updated));
  };

  // Auxiliar para determinar o status de cada etapa do fluxo
  const getStepStatus = (minProg: number, maxProg: number) => {
    if (progresso >= maxProg) return "completed";
    if (progresso >= minProg && progresso < maxProg) {
      return status === StatusAeronave.Atrasada ? "delayed" : "in-progress";
    }
    return "pending";
  };

  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content">
        <div className="page-toolbar">
          <div>
            <h1>Aeronave: {aeronave.modelo}</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              Painel de Detalhamento e Controle Operacional da Ordem #{String(aeronave.id).padStart(3, "0")}
            </p>
          </div>
          <Link to="/aeronaves" className="btn btn-secondary" style={{ textDecoration: "none" }}>
            ← Voltar
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
          
          {/* Main Info Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            <div className="card">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600, color: "var(--text-main)", marginBottom: "20px", letterSpacing: "0.5px" }}>
                Especificações Gerais
              </h3>
              
              <div className="detail-grid" style={{ marginTop: 0 }}>
                <div className="detail-field">
                  <label>ID Ordem</label>
                  <p>#{String(aeronave.id).padStart(3, "0")}</p>
                </div>
                <div className="detail-field">
                  <label>Modelo Comercial</label>
                  <p>{aeronave.modelo}</p>
                </div>
                <div className="detail-field">
                  <label>Segmento</label>
                  <p>{aeronave.tipo}</p>
                </div>
                <div className="detail-field">
                  <label>Status Atual</label>
                  <div style={{ marginTop: "4px" }}>
                    <span className={getBadgeStatus(status)}>{status}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Controls */}
              <div style={{ marginTop: "28px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-main)", marginBottom: "15px" }}>
                  Controle de Produção (Simulação do Engenheiro)
                </h4>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "8px" }}>
                      Progresso Físico: <strong>{progresso}%</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progresso}
                      onChange={(e) => handleProgressoChange(Number(e.target.value))}
                      style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "8px" }}>
                      Alterar Status
                    </label>
                    <select
                      className="filter-input"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                      value={status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                    >
                      <option value={StatusAeronave.Producao}>Em produção</option>
                      <option value={StatusAeronave.Finalizada}>Finalizada</option>
                      <option value={StatusAeronave.Atrasada}>Atrasada</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Consumed Parts Card */}
            <div className="card">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600, color: "var(--text-main)", marginBottom: "20px", letterSpacing: "0.5px" }}>
                Componentes Vinculados (Estoque Consumido)
              </h3>
              
              <div className="table-container" style={{ border: "none", boxShadow: "none", marginTop: 0 }}>
                <table style={{ background: "transparent" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "10px 0" }}>Componente</th>
                      <th style={{ padding: "10px 0" }}>Categoria</th>
                      <th style={{ padding: "10px 0", textAlign: "right" }}>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "12px 0", fontWeight: 600 }}>Turbina TF-9</td>
                      <td style={{ padding: "12px 0", color: "var(--text-muted)" }}>Motor</td>
                      <td style={{ padding: "12px 0", textAlign: "right", fontWeight: 600 }}>2 unidades</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 0", fontWeight: 600 }}>Asa K3</td>
                      <td style={{ padding: "12px 0", color: "var(--text-muted)" }}>Estrutura</td>
                      <td style={{ padding: "12px 0", textAlign: "right", fontWeight: 600 }}>1 unidade</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 0", fontWeight: 600 }}>Sensor de altitude</td>
                      <td style={{ padding: "12px 0", color: "var(--text-muted)" }}>Eletrônica</td>
                      <td style={{ padding: "12px 0", textAlign: "right", fontWeight: 600, color: progresso < 50 ? "var(--danger)" : "var(--text-main)" }}>
                        {progresso < 50 ? "Aguardando" : "1 unidade"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Timeline and Staff Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Timeline phase tracking */}
            <div className="card">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600, color: "var(--text-main)", letterSpacing: "0.5px" }}>
                Linha de Montagem
              </h3>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>Fluxo operacional de montagem</p>
              
              <div className="timeline">
                <div className={`timeline-item ${getStepStatus(0, 20)}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Fase 1: Estrutura</h4>
                    <p>Fuselagem e painéis de asa</p>
                  </div>
                </div>

                <div className={`timeline-item ${getStepStatus(20, 50)}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Fase 2: Motorização</h4>
                    <p>Instalação de turbinas e conexões</p>
                  </div>
                </div>

                <div className={`timeline-item ${getStepStatus(50, 75)}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Fase 3: Eletrônica</h4>
                    <p>Avionismo e sensores de navegação</p>
                  </div>
                </div>

                <div className={`timeline-item ${getStepStatus(75, 90)}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Fase 4: Hidráulica</h4>
                    <p>Freios, flaps e trem de pouso</p>
                  </div>
                </div>

                <div className={`timeline-item ${getStepStatus(90, 100)}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Fase 5: Inspeção & Voo</h4>
                    <p>Auditoria de qualidade e testes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Assigned */}
            <div className="card">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600, color: "var(--text-main)", marginBottom: "15px", letterSpacing: "0.5px" }}>
                Equipe Designada
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px" }}>
                    CS
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600 }}>Carlos Silva</p>
                    <p style={{ fontSize: "11px", color: "var(--text-light)" }}>Engenheiro Aeronáutico Chefe</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px" }}>
                    FL
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600 }}>Fernanda Lima</p>
                    <p style={{ fontSize: "11px", color: "var(--text-light)" }}>Engenheira de Produção</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}