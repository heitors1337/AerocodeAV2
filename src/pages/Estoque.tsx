import { useState } from "react";
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

const inicialEstoque: EstoqueModel[] = [
  { id: 1, peca: "Turbina TF-9",       categoria: "Motor",      quantidade: 8,  status: "Disponível"    },
  { id: 2, peca: "Asa K3",             categoria: "Estrutura",  quantidade: 2,  status: "Baixo estoque" },
  { id: 3, peca: "Trem de pouso AX-4", categoria: "Estrutura",  quantidade: 5,  status: "Disponível"    },
  { id: 4, peca: "Sensor de altitude", categoria: "Eletrônica", quantidade: 0,  status: "Esgotado"      },
  { id: 5, peca: "Hidráulico H-7",     categoria: "Hidráulica", quantidade: 12, status: "Disponível"    },
  { id: 6, peca: "Tanque de combustível", categoria: "Combustível", quantidade: 1, status: "Baixo estoque" },
];

export function Estoque() {
  const [estoque, setEstoque] = useState<EstoqueModel[]>(() => {
    const saved = sessionStorage.getItem("aerocode_estoque");
    return saved ? JSON.parse(saved) : inicialEstoque;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EstoqueModel | null>(null);
  const [newPeca, setNewPeca] = useState("");
  const [newCategoria, setNewCategoria] = useState("Motor");
  const [newQuantidade, setNewQuantidade] = useState(0);

  const saveToSession = (list: EstoqueModel[]) => {
    sessionStorage.setItem("aerocode_estoque", JSON.stringify(list));
  };

  const getStatusFromQty = (qty: number): string => {
    if (qty === 0) return "Esgotado";
    if (qty <= 3) return "Baixo estoque";
    return "Disponível";
  };

  const handleOpenEdit = (item: EstoqueModel) => {
    setSelectedItem(item);
    setNewPeca(item.peca);
    setNewCategoria(item.categoria);
    setNewQuantidade(item.quantidade);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setSelectedItem(null);
    setNewPeca("");
    setNewCategoria("Motor");
    setNewQuantidade(0);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPeca.trim()) return;

    let updated: EstoqueModel[];

    if (selectedItem) {
      // Atualização de registro existente
      updated = estoque.map((item) => {
        if (item.id === selectedItem.id) {
          return {
            ...item,
            peca: newPeca,
            categoria: newCategoria,
            quantidade: newQuantidade,
            status: getStatusFromQty(newQuantidade)
          };
        }
        return item;
      });
    } else {
      // Inserção de novo registro
      const nextId = estoque.length > 0 ? Math.max(...estoque.map(e => e.id)) + 1 : 1;
      const newItem: EstoqueModel = {
        id: nextId,
        peca: newPeca,
        categoria: newCategoria,
        quantidade: newQuantidade,
        status: getStatusFromQty(newQuantidade)
      };
      updated = [...estoque, newItem];
    }

    setEstoque(updated);
    saveToSession(updated);
    setIsModalOpen(false);
  };

  const filteredEstoque = estoque.filter((item) => {
    const matchesSearch = item.peca.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategoria === "" || item.categoria === filterCategoria;
    const matchesStatus = filterStatus === "" || item.status === filterStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content">
        <div className="page-toolbar">
          <div>
            <h1>Controle de Estoque</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              Gerenciamento de insumos e peças críticas para montagem
            </p>
          </div>
          <button className="btn" onClick={handleOpenAdd}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Adicionar Peça
          </button>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <input
            type="text"
            className="filter-input search-box"
            placeholder="Pesquisar peça..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="filter-input"
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
          >
            <option value="">Todas categorias</option>
            <option value="Motor">Motor</option>
            <option value="Estrutura">Estrutura</option>
            <option value="Eletrônica">Eletrônica</option>
            <option value="Hidráulica">Hidráulica</option>
            <option value="Combustível">Combustível</option>
          </select>

          <select
            className="filter-input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Todos status</option>
            <option value="Disponível">Disponível</option>
            <option value="Baixo estoque">Baixo estoque</option>
            <option value="Esgotado">Esgotado</option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Peça</th>
                <th>Categoria</th>
                <th>Quantidade</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEstoque.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "var(--text-light)", padding: "40px" }}>
                    Nenhum componente em estoque atende a esses filtros.
                  </td>
                </tr>
              ) : (
                filteredEstoque.map((item) => (
                  <tr key={item.id}>
                    <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                      #{String(item.id).padStart(3, "0")}
                    </td>
                    <td style={{ fontWeight: 600 }}>{item.peca}</td>
                    <td>{item.categoria}</td>
                    <td style={{ fontWeight: 600 }}>{item.quantidade}</td>
                    <td>
                      <span className={getBadgeEstoque(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                        onClick={() => handleOpenEdit(item)}
                      >
                        Ajustar Qtd
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal edit/add */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedItem ? "Ajustar Estoque" : "Cadastrar Componente"}</h2>
              </div>
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label>Nome do Componente</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sensor Giroscópio G2"
                    value={newPeca}
                    onChange={(e) => setNewPeca(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Categoria</label>
                  <select
                    value={newCategoria}
                    onChange={(e) => setNewCategoria(e.target.value)}
                  >
                    <option value="Motor">Motor</option>
                    <option value="Estrutura">Estrutura</option>
                    <option value="Eletrônica">Eletrônica</option>
                    <option value="Hidráulica">Hidráulica</option>
                    <option value="Combustível">Combustível</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Quantidade Disponível</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newQuantidade}
                    onChange={(e) => setNewQuantidade(Number(e.target.value))}
                  />
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
                    Salvar Peça
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