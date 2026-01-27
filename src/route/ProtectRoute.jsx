import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined" || token === "null") {
    console.log("Acesso negado: Token inválido ou inexistente");
    return <Navigate to="/login" replace />;
  }

  return children;
};