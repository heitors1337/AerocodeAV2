import { Sidebar } from "../components/layouts/Sidebar";
import { Estoque as EstoqueModel } from "../types/models/Estoque";

function getBadgeEstoque(status: string) {
  switch (status) {
    case "Disponível":    return "badge badge-success";
    case "Baixo estoque": return "badge badge-warning";
    case "Esgotado":      return "badge badge-danger";
    default:              return "badge badge-neutral";
  }
}

export function Estoque() {

  const estoque: EstoqueModel[] = [
    { id: 1, peca: "Turbina TF-9",       categoria: "Motor",      quantidade: 8,  status: "Disponível"    },
    { id: 2, peca: "Asa K3",             categoria: "Estrutura",  quantidade: 2,  status: "Baixo estoque" },
    { id: 3, peca: "Trem de pouso AX-4", categoria: "Estrutura",  quantidade: 5,  status: "Disponível"    },
    { id: 4, peca: "Sensor de altitude", categoria: "Eletrônica", quantidade: 0,  status: "Esgotado"      },
    { id: 5, peca: "Hidráulico H-7",     categoria: "Hidráulica", quantidade: 12, status: "Disponível"    },
    { id: 6, peca: "Tanque de combustível", categoria: "Combustível", quantidade: 1, status: "Baixo estoque" },
  ];

  return (
    <div className="layout">

      <Sidebar />

      <main className="main-content">

        <div className="page-header">
          <h1>Estoque</h1>
          <p>Controle de peças e componentes em estoque</p>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Peça</th>
                <th>Categoria</th>
                <th>Quantidade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {estoque.map((item) => (
                <tr key={item.id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    {String(item.id).padStart(3, "0")}
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.peca}</td>
                  <td>{item.categoria}</td>
                  <td style={{ fontWeight: 600 }}>{item.quantidade}</td>
                  <td>
                    <span className={getBadgeEstoque(item.status)}>
                      {item.status}
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