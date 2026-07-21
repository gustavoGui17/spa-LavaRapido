import { useState } from "react";
import { useEffect } from "react";
import { criarCustumers } from "../../services/customersService";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

const StyledBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const StyledModalBox = styled.div`
  background: var(--color-white);
  border-radius: 16px;
  padding: 32px;
  width: 560px;
  max-width: 95%;
  animation: ${fadeIn} 0.25s ease;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
`;

const StyledModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  h2 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
    color: #333;
  }
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: #555;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 15px 14px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: orange;
    background: #fff;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 14px;
  margin-top: 6px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: orange;
    background: #fff;
  }
`;

const GridTwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  margin-top: 12px;
  padding: 14px;
  background: orange;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }
`;

export default function StyledModalCustomers({ open, onClose, onSuccess }) {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [nomeFantasia, setNomeFantasia] = useState("");
const [cnpj, setCnpj] = useState("");
const [contato, setContato] = useState("");
const [status, setStatus] = useState("ativo");

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  async function finalizarCadastro() {
    if (!name || !email || !password || !nomeFantasia || !cnpj || !contato) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const novoCustomer = {
        name,
        email,
        password,
        nomeFantasia,
        cnpj,
        contato,
        status,
      };

      await criarCustumers(novoCustomer);

      alert("Cliente cadastrado com sucesso!");
      onSuccess();
      onClose();

      setName("");
      setEmail("");
      setPassword("");
      setNomeFantasia("");
      setCnpj("");
      setContato("");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert(error.response?.data?.message || "Erro ao conectar com o servidor");
    }
  }

  function maskPhone(value) {
    value = value.replace(/\D/g, "");
    value = value.slice(0, 11);

    if (value.length <= 10) {
      return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  return (
    <StyledBackdrop onClick={onClose}>
      <StyledModalBox onClick={(e) => e.stopPropagation()}>

        <StyledModalContainer>
          <h2>Cadastrar Novo Cliente</h2>

          <GridTwoCols>
            <div>
              <Label>Nome</Label>
              <StyledInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
              />
            </div>

            <div>
              <Label>Email</Label>
              <StyledInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </GridTwoCols>

          <GridTwoCols>
            <div>
              <Label>nomeFantasia</Label>
              <StyledInput
                value={nomeFantasia}
                onChange={(e) => setNomeFantasia(e.target.value)}
                placeholder="Nome fantasia"
              />
            </div>

            <div>
              <Label>Password</Label>
              <StyledInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                type="password"
              />
            </div>
          </GridTwoCols>

                    <div>
            <Label>cnpj</Label>
            <StyledInput
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="00.000.000/0000-00"
              inputMode="numeric"
            />
          </div>

          <div>
            <Label>Contato (WhatsApp)</Label>
            <StyledInput
              value={contato}
              onChange={(e) => setContato(maskPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              inputMode="numeric"
            />
          </div>

          <SubmitButton onClick={finalizarCadastro}>
            Finalizar Cadastro
          </SubmitButton>
        </StyledModalContainer>
      </StyledModalBox>
    </StyledBackdrop >
  );
}