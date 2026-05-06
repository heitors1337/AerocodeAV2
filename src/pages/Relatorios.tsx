import { Sidebar } from "../components/layouts/Sidebar";

function getBadgeRelatorio(status: string) {
  switch (status) {
    case "Concluído":   return "badge badge-success";
    case "Em análise":  return "badge badge-warning";
    case "Pendente":    return "badge badge-neutral";
    case "Cancelado":   return "badge badge-danger";
    default:            return "badge badge-neutral";
  }
}

export function Relatorios() {

  const relatorios = [
    { id: 1, nome: "Produção Mensal",          data: "05/05/2026", tipo: "Produção",  status: "Concluído"  },
    { id: 2, nome: "Controle de Estoque",       data: "06/05/2026", tipo: "Estoque",   status: "Em análise" },
    { id: 3, nome: "Desempenho de Funcionários",data: "04/05/2026", tipo: "RH",        status: "Concluído"  },
    { id: 4, nome: "Aeronaves Atrasadas",       data: "03/05/2026", tipo: "Produção",  status: "Pendente"   },
    { id: 5, nome: "Auditoria de Qualidade",    data: "01/05/2026", tipo: "Qualidade", status: "Em análise" },
  ];

  return (
    <div className="layout">

      <Sidebar />

      <main className="main-content">

        <div className="page-toolbar">
          <div>
            <h1>Relatórios</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              Histórico e geração de relatórios operacionais
            </p>
          </div>
          <button className="btn">+ Gerar Relatório</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Relatório</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {relatorios.map((r) => (
                <tr key={r.id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    {String(r.id).padStart(3, "0")}
                  </td>
                  <td style={{ fontWeight: 600 }}>{r.nome}</td>
                  <td>{r.tipo}</td>
                  <td style={{ color: "var(--text-muted)" }}>{r.data}</td>
                  <td>
                    <span className={getBadgeRelatorio(r.status)}>
                      {r.status}
                    </span>
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