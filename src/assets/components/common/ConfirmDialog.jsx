import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Box = styled.div`
  background: var(--color-white);
  border-radius: 16px;
  padding: 32px;
  width: 400px;
  max-width: 90%;
  text-align: center;
  animation: ${fadeIn} 0.2s ease;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
`;

const Icon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;

  span {
    font-size: 28px;
    color: #e74c3c;
  }
`;

const Title = styled.h3`
  margin: 0 0 8px;
  color: var(--color-dark);
  font-size: 1.1rem;
`;

const Message = styled.p`
  margin: 0 0 24px;
  color: var(--color-dark-variant);
  font-size: 0.9rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const CancelBtn = styled.button`
  padding: 10px 24px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-white);
  color: var(--color-dark);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-light);
  }
`;

const ConfirmBtn = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: #e74c3c;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c0392b;
  }
`;

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onCancel();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <Backdrop onClick={onCancel}>
      <Box onClick={(e) => e.stopPropagation()}>
        <Icon>
          <span className="material-symbols-outlined">warning</span>
        </Icon>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Buttons>
          <CancelBtn onClick={onCancel}>Cancelar</CancelBtn>
          <ConfirmBtn onClick={onConfirm}>Confirmar</ConfirmBtn>
        </Buttons>
      </Box>
    </Backdrop>
  );
}
