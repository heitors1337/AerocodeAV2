import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const credentials = [
    { email: "joao.silva", password: "1234", role: "admin", label: "Administrador" },
    { email: "pedro.santos", password: "1234", role: "engineer", label: "Engenheiro" },
    { email: "paulo.oliveira", password: "1234", role: "engineer", label: "Engenheiro" },
    { email: "caio.souza", password: "1234", role: "operator", label: "Operador" },
    { email: "fernando.lima", password: "1234", role: "operator", label: "Operador" }
  ];

  function lidarComLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const matchedUser = credentials.find(
      (c) => c.email === email && c.password === password
    );

    if (!matchedUser) {
      setError("Credenciais inválidas. Verifique os dados abaixo.");
      return;
    }

    setIsLoading(true);
    // Simula atraso na validação do servidor
    setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("aerocode_role", matchedUser.role);
      sessionStorage.setItem("aerocode_username", matchedUser.email);
      
      // Redireciona de acordo com o nível de acesso
      if (matchedUser.role === "operator") {
        navigate("/estoque");
      } else {
        navigate("/dashboard");
      }
    }, 1200);
  }

  const preencherCredenciais = (userEmail: string, userPass: string) => {
    setEmail(userEmail);
    setPassword(userPass);
    setError("");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>AEROCODE</h1>
        <p>Sistema de Gestão de Aeronaves</p>

        <form onSubmit={lidarComLogin} className="login-form">
          {error && (
            <div 
              className="badge badge-danger" 
              style={{ 
                width: "100%", 
                borderRadius: "var(--radius-sm)", 
                padding: "10px", 
                justifyContent: "center",
                textTransform: "none",
                fontSize: "12px"
              }}
            >
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Digite seu usuário ou email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Autenticando..." : "Entrar"}
          </button>
        </form>

        <div className="credenciais" style={{ marginTop: "20px" }}>
          <p style={{ marginBottom: "10px" }}><strong>Acesso Rápido (Clique para preencher):</strong></p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {credentials.map((c) => (
              <button
                key={c.role}
                type="button"
                className="btn btn-secondary"
                style={{ fontSize: "11px", padding: "6px 8px", width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between" }}
                onClick={() => preencherCredenciais(c.email, c.password)}
              >
                <span><strong>{c.label}:</strong> {c.email}</span>
                <span>{c.password}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}