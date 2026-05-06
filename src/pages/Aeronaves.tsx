import { Link } from "react-router-dom";
import { Sidebar } from "../components/layouts/Sidebar";
import { Aeronave } from "../types/models/Aeronave";
import { TipoAeronave } from "../types/enums/tipoAeronave";
import { StatusAeronave } from "../types/enums/statusAeronave";

function getBadgeStatus(status: string) {
  switch (status) {
    case StatusAeronave.Producao:   return "badge badge-info";
    case StatusAeronave.Finalizada: return "badge badge-success";
    case StatusAeronave.Atrasada:   return "badge badge-danger";
    default:                        return "badge badge-neutral";
  }
}

function getBadgeTipo(tipo: string) {
  switch (tipo) {
    case TipoAeronave.Militar:   return "badge badge-danger";
    case TipoAeronave.Comercial: return "badge badge-info";
    case TipoAeronave.Executivo: return "badge badge-neutral";
    default:                     return "badge badge-neutral";
  }
}

export function Aeronaves() {

  const aeronaves: Aeronave[] = [
    { id: 1, modelo: "ABCD-X1",  tipo: TipoAeronave.Militar,   status: StatusAeronave.Producao,   progresso: 78  },
    { id: 2, modelo: "DEFG-22",  tipo: TipoAeronave.Comercial, status: StatusAeronave.Finalizada, progresso: 100 },
    { id: 3, modelo: "FGHI-00",  tipo: TipoAeronave.Executivo, status: StatusAeronave.Atrasada,   progresso: 45  },
    { id: 4, modelo: "JKLM-14",  tipo: TipoAeronave.Militar,   status: StatusAeronave.Finalizada, progresso: 100 },
    { id: 5, modelo: "MNOP-07",  tipo: TipoAeronave.Comercial, status: StatusAeronave.Producao,   progresso: 32  },
  ];

  return (
    <div className="layout">

      <Sidebar />

      <main className="main-content">

        <div className="page-toolbar">
          <div>
            <h1>Aeronaves</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              Gestão e acompanhamento da frota em produção
            </p>
          </div>
          <button className="btn">+ Nova Aeronave</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Modelo</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Progresso</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {aeronaves.map((a) => (
                <tr key={a.id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    {String(a.id).padStart(3, "0")}
                  </td>
                  <td style={{ fontWeight: 600 }}>{a.modelo}</td>
                  <td>
                    <span className={getBadgeTipo(a.tipo)}>{a.tipo}</span>
                  </td>
                  <td>
                    <span className={getBadgeStatus(a.status)}>{a.status}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${a.progresso}%` }}
                        />
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", minWidth: "36px" }}>
                        {a.progresso}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/aeronaves/${a.id}`}
                      style={{
                        fontSize: "13px",
                        color: "var(--primary)",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      Ver detalhes →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}