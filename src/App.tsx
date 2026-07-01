import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Aeronaves } from "./pages/Aeronaves";
import { Funcionarios } from "./pages/Funcionarios";
import { Estoque } from "./pages/Estoque";
import { Etapas } from "./pages/Etapas";
import { Relatorios } from "./pages/Relatorios";
import { AeronaveDetalhes } from "./pages/AeronaveDetalhes";
import './App.css'

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const role = sessionStorage.getItem("aerocode_role");
  if (!role) {
    return <Navigate to="/" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={role === "operator" ? "/estoque" : "/dashboard"} replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "engineer"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/aeronaves"
          element={
            <ProtectedRoute allowedRoles={["admin", "engineer"]}>
              <Aeronaves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/aeronaves/:id"
          element={
            <ProtectedRoute allowedRoles={["admin", "engineer"]}>
              <AeronaveDetalhes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/funcionarios"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Funcionarios />
            </ProtectedRoute>
          }
        />

        <Route
          path="/estoque"
          element={
            <ProtectedRoute allowedRoles={["admin", "engineer", "operator"]}>
              <Estoque />
            </ProtectedRoute>
          }
        />

        <Route
          path="/etapas"
          element={
            <ProtectedRoute allowedRoles={["admin", "engineer", "operator"]}>
              <Etapas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/relatorios"
          element={
            <ProtectedRoute allowedRoles={["admin", "engineer"]}>
              <Relatorios />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </BrowserRouter>
  );
}