import { useState, useEffect } from "react";
import { Sidebar } from "../components/layouts/Sidebar";

function obterBadgeRelatorio(status: string) {
  switch (status) {
    case "Concluído":   return "badge badge-success";
    case "Em análise":  return "badge badge-warning";
    case "Pendente":    return "badge badge-neutral";
    case "Cancelado":   return "badge badge-danger";
    default:            return "badge badge-neutral";
  }
}

const inicialRelatorios = [
  { id: 1, nome: "Produção Mensal",          data: "05/05/2026", tipo: "Produção",  status: "Concluído"  },
  { id: 2, nome: "Controle de Estoque",       data: "06/05/2026", tipo: "Estoque",   status: "Em análise" },
  { id: 3, nome: "Desempenho de Funcionários",data: "04/05/2026", tipo: "RH",        status: "Concluído"  },
  { id: 4, nome: "Aeronaves Atrasadas",       data: "03/05/2026", tipo: "Produção",  status: "Pendente"   },
  { id: 5, nome: "Auditoria de Qualidade",    data: "01/05/2026", tipo: "Qualidade", status: "Em análise" },
];

export function Relatorios() {
  const [relatorios, setRelatorios] = useState(() => {
    const saved = sessionStorage.getItem("aerocode_relatorios");
    return saved ? JSON.parse(saved) : inicialRelatorios;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("");

  // Estados do Modal e Geração
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportName, setReportName] = useState("");
  const [reportTipo, setReportTipo] = useState("Produção");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);

  const salvarNaSessao = (list: any[]) => {
    sessionStorage.setItem("aerocode_relatorios", JSON.stringify(list));
  };

  const lidarComGerar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportName.trim()) return;

    setIsModalOpen(false);
    setIsGenerating(true);
    setGenProgress(0);
  };

  // Simulação do progresso do compilador
  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setGenProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finalizarGeracaoRelatorio();
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isGenerating]);

  const finalizarGeracaoRelatorio = () => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    
    const nextId = relatorios.length > 0 ? Math.max(...relatorios.map((r: any) => r.id)) + 1 : 1;
    const newReport = {
      id: nextId,
      nome: reportName,
      data: formattedDate,
      tipo: reportTipo,
      status: "Concluído"
    };

    const updated = [newReport, ...relatorios];
    setRelatorios(updated);
    salvarNaSessao(updated);
    
    // Reinicializa o formulário
    setIsGenerating(false);
    setReportName("");
    setReportTipo("Produção");
  };

  const filteredRelatorios = relatorios.filter((r: any) => {
    const matchesSearch = r.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === "" || r.tipo === filterTipo;
    return matchesSearch && matchesTipo;
  });

  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content">
        <div className="page-toolbar">
          <div>
            <h1>Relatórios Operacionais</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              Auditorias históricas e análise de eficiência de fabricação
            </p>
          </div>
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Gerar Relatório
          </button>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <input
            type="text"
            className="filter-input search-box"
            placeholder="Pesquisar relatório por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="filter-input"
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            <option value="Produção">Produção</option>
            <option value="Estoque">Estoque</option>
            <option value="RH">RH</option>
            <option value="Qualidade">Qualidade</option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Relatório</th>
                <th>Tipo</th>
                <th>Data de Geração</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRelatorios.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "var(--text-light)", padding: "40px" }}>
                    Nenhum relatório emitido atende a esses filtros.
                  </td>
                </tr>
              ) : (
                filteredRelatorios.map((r: any) => (
                  <tr key={r.id}>
                    <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                      #{String(r.id).padStart(3, "0")}
                    </td>
                    <td style={{ fontWeight: 600 }}>{r.nome}</td>
                    <td>{r.tipo}</td>
                    <td style={{ color: "var(--text-muted)" }}>{r.data}</td>
                    <td>
                      <span className={obterBadgeRelatorio(r.status)}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Report configuration modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Parâmetros do Relatório</h2>
              </div>
              <form onSubmit={lidarComGerar}>
                <div className="form-group">
                  <label>Título do Relatório</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Auditoria Hangar B Q2"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Tipo / Escopo</label>
                  <select
                    value={reportTipo}
                    onChange={(e) => setReportTipo(e.target.value)}
                  >
                    <option value="Produção">Produção</option>
                    <option value="Estoque">Estoque</option>
                    <option value="RH">RH</option>
                    <option value="Qualidade">Qualidade</option>
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
                    Compilar PDF
                  </button>
                </div>
              </form>
          </div>
        )}

        {/* Compile Progress Overlay */}
        {isGenerating && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ textAlign: "center", maxWidth: "400px" }}>
              <div className="modal-header" style={{ marginBottom: "15px" }}>
                <h2 style={{ fontSize: "20px" }}>Compilando Relatório</h2>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "20px" }}>
                Calculando eficiência física e consultando estoque...
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <div className="progress-bar" style={{ width: "100%", height: "10px" }}>
                  <div className="progress-bar-fill" style={{ width: `${genProgress}%` }} />
                </div>
                <span style={{ fontSize: "16px", fontWeight: "bold", color: "var(--primary)" }}>
                  {genProgress}%
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}