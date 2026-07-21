import { useState } from "react";
import { useEffect } from "react";
import { criarVeiculo } from "../../services/veiculoService";
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

export default function ModalVeiculos({ open, onClose, onSuccess }) {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [contato, setContato] = useState("");
  const [tipoLavagem, setTipoLavagem] = useState("simples");

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  function handlePlacaMask(value) {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
  }

  async function finalizarCadastro() {
    if (!placa || !modelo || !cor || !nomeCliente || !contato || !tipoLavagem) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const novoVeiculo = {
        placa,
        modelo,
        cor,
        tipoLavagem,
        nomeCliente,
        contato,
      };

      await criarVeiculo(novoVeiculo);

      alert("Veículo cadastrado com sucesso!");
      onSuccess();
      onClose();

      setPlaca("");
      setModelo("");
      setCor("");
      setNomeCliente("");
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
          <h2>Cadastrar Novo Veículo</h2>

          <GridTwoCols>
            <div>
              <Label>Placa</Label>
              <StyledInput
                value={placa}
                onChange={(e) => setPlaca(handlePlacaMask(e.target.value))}
                placeholder="ABC1D23"
              />
            </div>

            <div>
              <Label>Modelo</Label>
              <StyledInput
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Ex: Gol G7"
              />
            </div>
          </GridTwoCols>

          <GridTwoCols>
            <div>
              <Label>Cor</Label>
              <StyledInput
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                placeholder="Ex: Preto"
              />
            </div>

            <div>
              <Label>Cliente</Label>
              <StyledInput
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                placeholder="Nome do dono"
              />
            </div>
          </GridTwoCols>

          <div>
            <Label>Contato (WhatsApp)</Label>
            <StyledInput
              value={contato}
              onChange={(e) => setContato(maskPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              inputMode="numeric"
            />
          </div>

          <div>
            <Label>Tipo de lavagem</Label>
            <StyledSelect
              value={tipoLavagem}
              onChange={(e) => setTipoLavagem(e.target.value)}
            >
              <option value="simples">Lavagem Simples</option>
              <option value="completa">Lavagem Completa</option>
              <option value="premium">Lavagem Premium</option>
            </StyledSelect>
          </div>

          <SubmitButton onClick={finalizarCadastro}>
            Finalizar Cadastro
          </SubmitButton>
        </StyledModalContainer>
      </StyledModalBox>
    </StyledBackdrop >
  );
}