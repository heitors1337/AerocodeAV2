import { Sidebar } from "../components/layouts/Sidebar";
import { Funcionario } from "../types/models/Funcionario";

function getBadgeFuncionario(status: string) {
  switch (status) {
    case "Ativo":    return "badge badge-success";
    case "Férias":   return "badge badge-info";
    case "Afastado": return "badge badge-warning";
    case "Inativo":  return "badge badge-danger";
    default:         return "badge badge-neutral";
  }
}

export function Funcionarios() {

  const funcionarios: Funcionario[] = [
    { id: 1,  nome: "Carlos Silva",    cargo: "Engenheiro Aeronáutico",  setor: "Produção",   status: "Ativo"    },
    { id: 2,  nome: "Marina Costa",    cargo: "Inspetora de Qualidade",  setor: "Inspeção",   status: "Férias"   },
    { id: 3,  nome: "Roberto Alves",   cargo: "Técnico de Manutenção",   setor: "Manutenção", status: "Ativo"    },
    { id: 4,  nome: "Fernanda Lima",   cargo: "Engenheira de Produção",  setor: "Produção",   status: "Ativo"    },
    { id: 5,  nome: "Paulo Mendes",    cargo: "Analista de Estoque",     setor: "Logística",  status: "Afastado" },
  ];

  return (
    <div className="layout">

      <Sidebar />

      <main className="main-content">

        <div className="page-toolbar">
          <div>
            <h1>Funcionários</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              Gestão de colaboradores e equipes
            </p>
          </div>
          <button className="btn">+ Novo Funcionário</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Setor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((f) => (
                <tr key={f.id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    {String(f.id).padStart(3, "0")}
                  </td>
                  <td style={{ fontWeight: 600 }}>{f.nome}</td>
                  <td>{f.cargo}</td>
                  <td>{f.setor}</td>
                  <td>
                    <span className={getBadgeFuncionario(f.status)}>
                      {f.status}
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