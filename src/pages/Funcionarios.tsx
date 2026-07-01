import { useState } from "react";
import { Sidebar } from "../components/layouts/Sidebar";
import { Funcionario } from "../types/models/Funcionario";

function obterBadgeFuncionario(status: string) {
  switch (status) {
    case "Ativo":    return "badge badge-success";
    case "Férias":   return "badge badge-info";
    case "Afastado": return "badge badge-warning";
    case "Inativo":  return "badge badge-danger";
    default:         return "badge badge-neutral";
  }
}

const inicialFuncionarios: Funcionario[] = [
  { id: 1,  nome: "Carlos Silva",    cargo: "Engenheiro Aeronáutico",  setor: "Produção",   status: "Ativo"    },
  { id: 2,  nome: "Marina Costa",    cargo: "Inspetora de Qualidade",  setor: "Inspeção",   status: "Férias"   },
  { id: 3,  nome: "Roberto Alves",   cargo: "Técnico de Manutenção",   setor: "Manutenção", status: "Ativo"    },
  { id: 4,  nome: "Fernanda Lima",   cargo: "Engenheira de Produção",  setor: "Produção",   status: "Ativo"    },
  { id: 5,  nome: "Paulo Mendes",    cargo: "Analista de Estoque",     setor: "Logística",  status: "Afastado" },
];

export function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(() => {
    const saved = sessionStorage.getItem("aerocode_funcionarios");
    return saved ? JSON.parse(saved) : inicialFuncionarios;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSetor, setFilterSetor] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNome, setNewNome] = useState("");
  const [newCargo, setNewCargo] = useState("");
  const [newSetor, setNewSetor] = useState("Produção");
  const [newStatus, setNewStatus] = useState("Ativo");

  const salvarNaSessao = (list: Funcionario[]) => {
    sessionStorage.setItem("aerocode_funcionarios", JSON.stringify(list));
  };

  const lidarComCriar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNome.trim() || !newCargo.trim()) return;

    const nextId = funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.id)) + 1 : 1;
    const newFunc: Funcionario = {
      id: nextId,
      nome: newNome,
      cargo: newCargo,
      setor: newSetor,
      status: newStatus
    };

    const updated = [...funcionarios, newFunc];
    setFuncionarios(updated);
    salvarNaSessao(updated);

    // Reinicializa o formulário
    setNewNome("");
    setNewCargo("");
    setNewSetor("Produção");
    setNewStatus("Ativo");
    setIsModalOpen(false);
  };

  const filteredFuncionarios = funcionarios.filter((f) => {
    const matchesSearch = f.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSetor = filterSetor === "" || f.setor === filterSetor;
    const matchesStatus = filterStatus === "" || f.status === filterStatus;
    return matchesSearch && matchesSetor && matchesStatus;
  });

  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content">
        <div className="page-toolbar">
          <div>
            <h1>Recursos Humanos e Equipes</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              Gestão de colaboradores operacionais e corpo técnico
            </p>
          </div>
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Novo Funcionário
          </button>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <input
            type="text"
            className="filter-input search-box"
            placeholder="Pesquisar por nome ou cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="filter-input"
            value={filterSetor}
            onChange={(e) => setFilterSetor(e.target.value)}
          >
            <option value="">Todos setores</option>
            <option value="Produção">Produção</option>
            <option value="Inspeção">Inspeção</option>
            <option value="Manutenção">Manutenção</option>
            <option value="Logística">Logística</option>
          </select>

          <select
            className="filter-input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Todos status</option>
            <option value="Ativo">Ativo</option>
            <option value="Férias">Férias</option>
            <option value="Afastado">Afastado</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Setor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredFuncionarios.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "var(--text-light)", padding: "40px" }}>
                    Nenhum colaborador encontrado com os termos filtrados.
                  </td>
                </tr>
              ) : (
                filteredFuncionarios.map((f) => (
                  <tr key={f.id}>
                    <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                      #{String(f.id).padStart(3, "0")}
                    </td>
                    <td style={{ fontWeight: 600 }}>{f.nome}</td>
                    <td>{f.cargo}</td>
                    <td>{f.setor}</td>
                    <td>
                      <span className={obterBadgeFuncionario(f.status)}>
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal addition */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Registrar Colaborador</h2>
              </div>
              <form onSubmit={lidarComCriar}>
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva"
                    value={newNome}
                    onChange={(e) => setNewNome(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Cargo de Atuação</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Engenheiro Aeronáutico"
                    value={newCargo}
                    onChange={(e) => setNewCargo(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Setor / Departamento</label>
                  <select
                    value={newSetor}
                    onChange={(e) => setNewSetor(e.target.value)}
                  >
                    <option value="Produção">Produção</option>
                    <option value="Inspeção">Inspeção</option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Logística">Logística</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status Inicial</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Férias">Férias</option>
                    <option value="Afastado">Afastado</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn">
                    Salvar Cadastro
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}