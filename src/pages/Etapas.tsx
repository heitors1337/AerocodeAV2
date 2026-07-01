import { useState, useEffect } from "react";
import { Sidebar } from "../components/layouts/Sidebar";
import { Etapa } from "../types/models/Etapa";
import { StatusEtapa } from "../types/enums/statusEtapa";

function obterBadgeEtapa(status: StatusEtapa) {
  switch (status) {
    case "Pendente":
      return "badge badge-neutral";
    case "Em andamento":
      return "badge badge-warning";
    case "Concluída":
      return "badge badge-success";
    default:
      return "badge badge-neutral";
  }
}

const inicialEtapas: Etapa[] = [
  { id: 1, nome: "Montagem da Estrutura", prazo: "2026-07-10", status: "Pendente" },
  { id: 2, nome: "Instalação de Sistemas", prazo: "2026-07-20", status: "Pendente" },
  { id: 3, nome: "Teste de Voo", prazo: "2026-07-30", status: "Pendente" },
];

export function Etapas() {
  const [etapas, setEtapas] = useState<Etapa[]>(() => {
    const saved = sessionStorage.getItem("aerocode_etapas");
    return saved ? JSON.parse(saved) : inicialEtapas;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNome, setNewNome] = useState("");
  const [newPrazo, setNewPrazo] = useState("");
  const [selected, setSelected] = useState<Etapa | null>(null);

  const salvarNaSessao = (list: Etapa[]) => {
    sessionStorage.setItem("aerocode_etapas", JSON.stringify(list));
  };

  const lidarComAdicionar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNome.trim() || !newPrazo) return;
    const nextId = etapas.length > 0 ? Math.max(...etapas.map(e => e.id)) + 1 : 1;
    const newEtapa: Etapa = { id: nextId, nome: newNome, prazo: newPrazo, status: "Pendente" };
    const updated = [...etapas, newEtapa];
    setEtapas(updated);
    salvarNaSessao(updated);
    setIsModalOpen(false);
    setNewNome("");
    setNewPrazo("");
  };

  const iniciarEtapa = (etapa: Etapa) => {
    // Validação de precedência das etapas
    const index = etapas.findIndex(e => e.id === etapa.id);
    const previous = etapas.slice(0, index);
    const allPrevDone = previous.every(e => e.status === "Concluída");
    if (!allPrevDone) {
      alert("Não é possível iniciar esta etapa antes das anteriores serem concluídas.");
      return;
    }
    const updated = etapas.map(e => e.id === etapa.id ? { ...e, status: "Em andamento" } : e);
    setEtapas(updated);
    salvarNaSessao(updated);
  };

  const finalizarEtapa = (etapa: Etapa) => {
    if (etapa.status !== "Em andamento") return;
    const updated = etapas.map(e => e.id === etapa.id ? { ...e, status: "Concluída" } : e);
    setEtapas(updated);
    salvarNaSessao(updated);
  };

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <div className="page-toolbar">
          <div>
            <h1>Fluxo de Etapas</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              Gerencie as etapas de produção da aeronave
            </p>
          </div>
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            + Nova Etapa
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Etapa</th>
                <th>Prazo</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {etapas.map(e => (
                <tr key={e.id}>
                  <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>#{String(e.id).padStart(3, "0")}</td>
                  <td style={{ fontWeight: 600 }}>{e.nome}</td>
                  <td>{e.prazo}</td>
                  <td>
                    <span className={obterBadgeEtapa(e.status)}>{e.status}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {e.status === "Pendente" && (
                      <button className="btn btn-secondary" style={{ marginRight: "8px" }} onClick={() => iniciarEtapa(e)}>
                        Iniciar
                      </button>
                    )}
                    {e.status === "Em andamento" && (
                      <button className="btn btn-success" onClick={() => finalizarEtapa(e)}>
                        Finalizar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Nova Etapa</h2>
              </div>
              <form onSubmit={lidarComAdicionar}>
                <div className="form-group">
                  <label>Nome da Etapa</label>
                  <input type="text" required value={newNome} onChange={e => setNewNome(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Prazo (YYYY-MM-DD)</label>
                  <input type="date" required value={newPrazo} onChange={e => setNewPrazo(e.target.value)} />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
