import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Aeronaves } from "./pages/Aeronaves";
import { Funcionarios } from "./pages/Funcionarios";
import { Estoque } from "./pages/Estoque";
import { Relatorios } from "./pages/Relatorios";
import { AeronaveDetalhes } from "./pages/AeronaveDetalhes";
import './App.css'

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/aeronaves"
          element={<Aeronaves />}
        />

        <Route
          path="/aeronaves/:id"
          element={<AeronaveDetalhes />}
        />

        <Route
          path="/funcionarios"
          element={<Funcionarios />}
        />

        <Route
          path="/estoque"
          element={<Estoque />}
        />

        <Route
          path="/relatorios"
          element={<Relatorios />}
        />

      </Routes>

    </BrowserRouter>
  );
}