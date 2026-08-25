import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUsuarioLogado, logoutUsuario } from "../assets/services/authService";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Dialog = styled.div`
  background: var(--color-white);
  border-radius: 16px;
  padding: 40px;
  width: 420px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
`;

const Icon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;

  span {
    font-size: 32px;
    color: #e74c3c;
  }
`;

const Title = styled.h2`
  margin: 0 0 12px;
  color: var(--color-dark);
  font-size: 1.2rem;
`;

const Message = styled.p`
  margin: 0 0 24px;
  color: var(--color-dark-variant);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const LogoutBtn = styled.button`
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  background: #e74c3c;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c0392b;
  }
`;

export const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [autenticado, setAutenticado] = useState(false);
  const [inativo, setInativo] = useState(false);

  useEffect(() => {
    getUsuarioLogado()
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.user.role === "cliente" && data.user.customerStatus === "inativo") {
          setInativo(true);
        } else {
          setAutenticado(true);
        }
      })
      .catch(() => {
        setAutenticado(false);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    try {
      await logoutUsuario();
    } catch (error) {
      console.error("Erro ao encerrar sessão:", error);
    } finally {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }

  if (loading) {
    return null;
  }

  if (inativo) {
    return (
      <Overlay>
        <Dialog>
          <Icon>
            <span className="material-symbols-outlined">block</span>
          </Icon>
          <Title>Conta inativa</Title>
          <Message>
            Sua conta foi desativada pelo administrador.
            <br />
            Entre em contato para mais informações.
          </Message>
          <LogoutBtn onClick={handleLogout}>Voltar ao login</LogoutBtn>
        </Dialog>
      </Overlay>
    );
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
