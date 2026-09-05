import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import { atualizarUsuario } from "../../services/userService";

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
  width: 480px;
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

  p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--color-dark-variant);
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

const Field = styled.div`
  display: flex;
  flex-direction: column;
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

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-dark-variant);
  font-size: 1.4rem;
  padding: 4px;
`;

export default function StyledModalEditUser({ open, onClose, onSuccess, customer }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (open && customer) {
      setEmail(customer.user?.email || "");
      setPassword("");
      setConfirmPassword("");
    }
  }, [open, customer]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open || !customer) return null;

  const userId = customer.user?._id || customer.userId;

  async function finalizarEdicao() {
    if (!email) {
      toast.warning("Preencha o email.");
      return;
    }

    if (password && password.length < 6) {
      toast.warning("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("As senhas não coincidem.");
      return;
    }

    const dados = { email };

    if (password) {
      dados.password = password;
    }

    try {
      await atualizarUsuario(userId, dados);
      toast.success("Usuário atualizado com sucesso!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error(error.response?.data?.message || "Erro ao atualizar usuário. Tente novamente.");
    }
  }

  return (
    <StyledBackdrop onClick={onClose}>
      <StyledModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <StyledModalContainer>
          <div>
            <h2>Editar usuário</h2>
            <p>{customer.user?.name || customer.nome || ""}</p>
          </div>

          <Field>
            <Label>Email</Label>
            <StyledInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
            />
          </Field>

          <Field>
            <Label>Nova senha (deixe em branco para manter a atual)</Label>
            <StyledInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              type="password"
            />
          </Field>

          <Field>
            <Label>Confirmar nova senha</Label>
            <StyledInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a senha"
              type="password"
            />
          </Field>

          <SubmitButton onClick={finalizarEdicao}>
            Salvar alterações
          </SubmitButton>
        </StyledModalContainer>
      </StyledModalBox>
    </StyledBackdrop>
  );
}