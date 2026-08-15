import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUsuarioLogado } from "../assets/services/authService";

export const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    getUsuarioLogado()
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        setAutenticado(true);
      })
      .catch(() => {
        setAutenticado(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return null;
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
