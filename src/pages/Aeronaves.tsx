import { useState } from "react";
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

// Carga inicial de dados
const inicialAeronaves: Aeronave[] = [
  { id: 1, modelo: "ABCD-X1",  tipo: TipoAeronave.Militar,   status: StatusAeronave.Producao,   progresso: 78  },
  { id: 2, modelo: "DEFG-22",  tipo: TipoAeronave.Comercial, status: StatusAeronave.Finalizada, progresso: 100 },
  { id: 3, modelo: "FGHI-00",  tipo: TipoAeronave.Executivo, status: StatusAeronave.Atrasada,   progresso: 45  },
  { id: 4, modelo: "JKLM-14",  tipo: TipoAeronave.Militar,   status: StatusAeronave.Finalizada, progresso: 100 },
  { id: 5, modelo: "MNOP-07",  tipo: TipoAeronave.Comercial, status: StatusAeronave.Producao,   progresso: 32  },
];

export function Aeronaves() {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>(() => {
    // Carrega dados da sessão persistente
    const saved = sessionStorage.getItem("aerocode_aeronaves");
    return saved ? JSON.parse(saved) : inicialAeronaves;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newModelo, setNewModelo] = useState("");
  const [newTipo, setNewTipo] = useState(TipoAeronave.Comercial);
  const [newStatus, setNewStatus] = useState(StatusAeronave.Producao);
  const [newProgresso, setNewProgresso] = useState(0);

  const saveToSession = (list: Aeronave[]) => {
    sessionStorage.setItem("aerocode_aeronaves", JSON.stringify(list));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModelo.trim()) return;

    const newId = aeronaves.length > 0 ? Math.max(...aeronaves.map(a => a.id)) + 1 : 1;
    const newAeronave: Aeronave = {
      id: newId,
      modelo: newModelo,
      tipo: newTipo,
      status: newStatus,
      progresso: newStatus === StatusAeronave.Finalizada ? 100 : newProgresso
    };

    const updated = [...aeronaves, newAeronave];
    setAeronaves(updated);
    saveToSession(updated);

    // Reinicializa o formulário
    setNewModelo("");
    setNewTipo(TipoAeronave.Comercial);
    setNewStatus(StatusAeronave.Producao);
    setNewProgresso(0);
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta ordem de produção?")) {
      const updated = aeronaves.filter(a => a.id !== id);
      setAeronaves(updated);
      saveToSession(updated);
    }
  };

  // Filtragem de aeronaves
  const filteredAeronaves = aeronaves.filter(a => {
    const matchesSearch = a.modelo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === "" || a.tipo === filterTipo;
    const matchesStatus = filterStatus === "" || a.status === filterStatus;
    return matchesSearch && matchesTipo && matchesStatus;
  });

  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content">
        <div className="page-toolbar">
          <div>
            <h1>Aeronaves em Produção</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              Acompanhamento detalhado das ordens de montagem ativa
            </p>
          </div>
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nova Aeronave
          </button>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <input
            type="text"
            className="filter-input search-box"
            placeholder="Pesquisar por modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="filter-input"
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            <option value={TipoAeronave.Militar}>Militar</option>
            <option value={TipoAeronave.Comercial}>Comercial</option>
            <option value={TipoAeronave.Executivo}>Executivo</option>
          </select>

          <select
            className="filter-input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value={StatusAeronave.Producao}>Em produção</option>
            <option value={StatusAeronave.Finalizada}>Finalizada</option>
            <option value={StatusAeronave.Atrasada}>Atrasada</option>
          </select>
        </div>

        {/* Table Container */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Modelo</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Progresso</th>
                <th style={{ textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAeronaves.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "var(--text-light)", padding: "40px" }}>
                    Nenhuma aeronave encontrada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredAeronaves.map((a) => (
                  <tr key={a.id}>
                    <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                      #{String(a.id).padStart(3, "0")}
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
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "12px", alignItems: "center" }}>
                        <Link
                          to={`/aeronaves/${a.id}`}
                          style={{
                            fontSize: "13px",
                            color: "var(--primary)",
                            textDecoration: "none",
                            fontWeight: 600,
                          }}
                        >
                          Ver detalhes →
                        </Link>
                        <button
                          onClick={() => handleDelete(a.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--danger)",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: 500,
                            padding: "0"
                          }}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal dialog for creating new aircraft */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Registrar Ordem de Produção</h2>
              </div>
              <form onSubmit={handleCreate}>
                <div className="form-group">
                  <label>Modelo da Aeronave</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: KC-390, A320neo, Gulf-G600"
                    value={newModelo}
                    onChange={(e) => setNewModelo(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Tipo de Aeronave</label>
                  <select
                    value={newTipo}
                    onChange={(e) => setNewTipo(e.target.value as TipoAeronave)}
                  >
                    <option value={TipoAeronave.Comercial}>Comercial</option>
                    <option value={TipoAeronave.Militar}>Militar</option>
                    <option value={TipoAeronave.Executivo}>Executivo</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status Inicial</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as StatusAeronave)}
                  >
                    <option value={StatusAeronave.Producao}>Em produção</option>
                    <option value={StatusAeronave.Finalizada}>Finalizada</option>
                    <option value={StatusAeronave.Atrasada}>Atrasada</option>
                  </select>
                </div>

                {newStatus !== StatusAeronave.Finalizada && (
                  <div className="form-group">
                    <label>Progresso Inicial (%): {newProgresso}%</label>
                    <input
                      type="range"
                      min="0"
                      max="99"
                      value={newProgresso}
                      onChange={(e) => setNewProgresso(Number(e.target.value))}
                      style={{ background: "var(--border)", height: "6px", borderRadius: "3px" }}
                    />
                  </div>
                )}

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn">
                    Salvar Ordem
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