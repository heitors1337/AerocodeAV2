import { useParams, Link } from "react-router-dom";
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

// Dados mock — futuramente virão de uma API/contexto
const aeronavesMock: Aeronave[] = [
  { id: 1, modelo: "ABCD-X1",  tipo: TipoAeronave.Militar,   status: StatusAeronave.Producao,   progresso: 78  },
  { id: 2, modelo: "DEFG-22",  tipo: TipoAeronave.Comercial, status: StatusAeronave.Finalizada, progresso: 100 },
  { id: 3, modelo: "FGHI-00",  tipo: TipoAeronave.Executivo, status: StatusAeronave.Atrasada,   progresso: 45  },
  { id: 4, modelo: "JKLM-14",  tipo: TipoAeronave.Militar,   status: StatusAeronave.Finalizada, progresso: 100 },
  { id: 5, modelo: "MNOP-07",  tipo: TipoAeronave.Comercial, status: StatusAeronave.Producao,   progresso: 32  },
];

export function AeronaveDetalhes() {
  const { id } = useParams();
  const aeronave = aeronavesMock.find((a) => a.id === Number(id));

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

  return (
    <div className="layout">

      <Sidebar />

      <main className="main-content">

        {/* Header */}
        <div className="page-toolbar">
          <div>
            <h1>{aeronave.modelo}</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              Detalhes completos da aeronave #{String(aeronave.id).padStart(3, "0")}
            </p>
          </div>
          <Link to="/aeronaves" className="btn" style={{ textDecoration: "none" }}>
            ← Voltar
          </Link>
        </div>

        {/* Grid de campos */}
        <div className="detail-grid">

          <div className="detail-field">
            <label>ID</label>
            <p>#{String(aeronave.id).padStart(3, "0")}</p>
          </div>

          <div className="detail-field">
            <label>Modelo</label>
            <p>{aeronave.modelo}</p>
          </div>

          <div className="detail-field">
            <label>Tipo</label>
            <p>{aeronave.tipo}</p>
          </div>

          <div className="detail-field">
            <label>Status</label>
            <p>
              <span className={getBadgeStatus(aeronave.status)}>
                {aeronave.status}
              </span>
            </p>
          </div>

        </div>

        {/* Progresso */}
        <div className="detail-field" style={{ marginTop: "16px" }}>
          <label>Progresso de Produção</label>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px" }}>
            <div className="progress-bar" style={{ width: "100%", height: "10px" }}>
              <div
                className="progress-bar-fill"
                style={{ width: `${aeronave.progresso}%` }}
              />
            </div>
            <span style={{ fontSize: "20px", fontWeight: 700, minWidth: "52px", color: "var(--text-main)" }}>
              {aeronave.progresso}%
            </span>
          </div>
        </div>

      </main>
    </div>
  );
}