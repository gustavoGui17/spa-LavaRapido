import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 
import { loginUsuario} from "../../services/authService";
import { cadastrarUsuario } from "../../services/userService";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
`;

const StyledFormWrapper = styled.div`
  background: #fff;
  padding: 4rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
`;

const StyledTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;

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

const StyledToggleText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;

  span {
    color: #4facfe;
    cursor: pointer;
    font-weight: bold;
  }
`;

export default function StyledLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const data = await loginUsuario({
          email: formData.email,
          password: formData.password
        });
        
        localStorage.setItem("token", data.token);
        
        alert("Login realizado com sucesso!");
        navigate("/dashboard");
      } else {
        await cadastrarUsuario(formData);
        alert("Cadastro realizado! Agora faça o login.");
        setIsLogin(true); 
      }
    } catch (error) {
      console.error("Erro na autenticação:", error);
      alert(error.response?.data?.message || "Erro ao processar requisição");
    }
  };

  return (
    <StyledContainer>
      <StyledFormWrapper>
        <StyledTitle>{isLogin ? "Login" : "Cadastro"}</StyledTitle>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <StyledInput
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          )}
          <StyledInput
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <StyledInput
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <StyledButton type="submit">{isLogin ? "Entrar" : "Cadastrar"}</StyledButton>
        </form>
        <StyledToggleText>
          {isLogin ? "Não tem conta?" : "Já possui conta?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Cadastre-se" : "Faça Login"}
          </span>
        </StyledToggleText>
      </StyledFormWrapper>
    </StyledContainer>
  );
}