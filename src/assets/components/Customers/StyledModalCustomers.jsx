import { useState } from "react";
import { useEffect } from "react";
import { criarCustomers } from "../../services/customersService";
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
  gap: 22px;

  h2 {
    margin: 0 0 4px;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-dark);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-dark-variant);
`;

const StyledInput = styled.input`
  width: 90%;
  padding: 14px 14px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-dark);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: orange;
    background: var(--color-white);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 13px 14px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-dark);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: orange;
    background: var(--color-white);
  }
`;

const GridTwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const TipoDocumento = styled.div`
  display: flex;
  gap: 6px;
  padding: 4px;
  background: var(--color-background);
  border-radius: 10px;
  border: 1px solid var(--color-border);
`;

const TipoButton = styled.button`
  flex: 1;
  padding: 11px;
  border: none;
  border-radius: 8px;
  background: ${({ active }) => (active ? "orange" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "var(--color-dark-variant)")};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? "orange" : "var(--color-white)")};
  }
`;

const SubmitButton = styled.button`
  margin-top: 8px;
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
const [confirmPassword, setConfirmPassword] = useState("");
const [nomeFantasia, setNomeFantasia] = useState("");
const [documentoTipo, setDocumentoTipo] = useState("cnpj");
const [documento, setDocumento] = useState("");
const [contato, setContato] = useState("");
const [status] = useState("ativo");

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  function maskCpf(value) {
    value = value.replace(/\D/g, "").slice(0, 11);

    if (value.length <= 3) return value;
    if (value.length <= 6) return value.replace(/(\d{3})(\d+)/, "$1.$2");
    if (value.length <= 9)
      return value.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");

    return value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
  }

  function maskCnpj(value) {
    value = value.replace(/\D/g, "").slice(0, 14);

    if (value.length <= 2) return value;
    if (value.length <= 5) return value.replace(/(\d{2})(\d+)/, "$1.$2");
    if (value.length <= 8)
      return value.replace(/(\d{2})(\d{3})(\d+)/, "$1.$2.$3");
    if (value.length <= 12)
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, "$1.$2.$3/$4");

    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, "$1.$2.$3/$4-$5");
  }

  function handleDocumentoTipoChange(tipo) {
    setDocumentoTipo(tipo);
    setDocumento("");
  }

  function handleDocumentoChange(value) {
    const masked =
      documentoTipo === "cnpj" ? maskCnpj(value) : maskCpf(value);
    setDocumento(masked);
  }

  async function finalizarCadastro() {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !nomeFantasia ||
      !documento ||
      !contato
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const novoCustomer = {
        name,
        email,
        password,
        nomeFantasia,
        documento,
        documentoTipo,
        contato,
        status,
      };

      await criarCustomers(novoCustomer);

      alert("Cliente cadastrado com sucesso!");
      onSuccess();
      onClose();

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setNomeFantasia("");
      setDocumento("");
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
            <Field>
              <Label>Nome</Label>
              <StyledInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
              />
            </Field>

            <Field>
              <Label>Email</Label>
              <StyledInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              />
            </Field>
          </GridTwoCols>

          <GridTwoCols>
            <Field>
              <Label>Nome fantasia</Label>
              <StyledInput
                value={nomeFantasia}
                onChange={(e) => setNomeFantasia(e.target.value)}
                placeholder="Nome fantasia"
              />
            </Field>

            <Field>
              <Label>Contato (WhatsApp)</Label>
              <StyledInput
                value={contato}
                onChange={(e) => setContato(maskPhone(e.target.value))}
                placeholder="(11) 99999-9999"
                inputMode="numeric"
              />
            </Field>
          </GridTwoCols>

          <Field>
            <Label>Tipo de documento</Label>
            <TipoDocumento>
              <TipoButton
                type="button"
                active={documentoTipo === "cnpj"}
                onClick={() => handleDocumentoTipoChange("cnpj")}
              >
                CNPJ
              </TipoButton>
              <TipoButton
                type="button"
                active={documentoTipo === "cpf"}
                onClick={() => handleDocumentoTipoChange("cpf")}
              >
                CPF
              </TipoButton>
            </TipoDocumento>
          </Field>

          <Field>
            <Label>{documentoTipo === "cnpj" ? "CNPJ" : "CPF"}</Label>
            <StyledInput
              value={documento}
              onChange={(e) => handleDocumentoChange(e.target.value)}
              placeholder={
                documentoTipo === "cnpj"
                  ? "00.000.000/0000-00"
                  : "000.000.000-00"
              }
              inputMode="numeric"
            />
          </Field>

          <GridTwoCols>
            <Field>
              <Label>Senha</Label>
              <StyledInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                type="password"
              />
            </Field>

            <Field>
              <Label>Confirmar senha</Label>
              <StyledInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a senha"
                type="password"
              />
            </Field>
          </GridTwoCols>

          <SubmitButton onClick={finalizarCadastro}>
            Finalizar Cadastro
          </SubmitButton>
        </StyledModalContainer>
      </StyledModalBox>
    </StyledBackdrop >
  );
}