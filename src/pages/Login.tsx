import { useNavigate } from "react-router-dom";

export function Login() {

  const navigate = useNavigate();

  function entrar() {
    navigate("/dashboard");
  }

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>AEROCODE</h1>

        <p>Sistema de Gestão de Aeronaves</p>

        <div className="login-form">

          <input
            type="email"
            placeholder="Digite seu email"
          />

          <input
            type="password"
            placeholder="Digite sua senha"
          />

          <button onClick={entrar}>
            Entrar
          </button>

        </div>

        <div className="credenciais">
          <p>Email: silva@email.com</p>
          <p>Senha: jsemelhorquepython</p>
        </div>

      </div>

    </div>
  );
}