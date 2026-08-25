import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../../services/authService";
import { toast } from "react-toastify";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
`;

const StyledFormWrapper = styled.div`
  background: var(--color-white);
  padding: 4rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
`;

const StyledTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--color-dark);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
  background: var(--color-background);
  color: var(--color-dark);

  &:focus {
    border-color: #4facfe;
  }
`;

const StyledButton = styled.button`
  width: 50%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #4facfe;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #00c6ff;
  }
`;

export default function StyledLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUsuario({ email, password });
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro na autenticação:", error);
      toast.error(error.response?.data?.message || "Erro ao processar requisição. Tente novamente.");
    }
  };

  return (
    <StyledContainer>
      <StyledFormWrapper>
        <StyledTitle>Login</StyledTitle>
        <form onSubmit={handleSubmit}>
          <StyledInput
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledInput
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <StyledButton type="submit">Entrar</StyledButton>
        </form>
      </StyledFormWrapper>
    </StyledContainer>
  );
}
