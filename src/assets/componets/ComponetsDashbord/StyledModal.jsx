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
  border-radius: 10px;
  padding: 25px;
  width: 550px;
  max-width: 95%;
  animation: ${fadeIn} 0.2s ease;
  position: relative;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 22px;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const StyledModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledResume = styled.div`
  display: flex;
  padding: 10px 0;
  padding-top: 10%;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    box-shadow: var(--box-shadow);
    border-radius: var(--card-border-radius);
    padding: 10px;
    width: 150px;
  }
`;

const StyledInput = styled.input`
  padding: 5px;
  background: var(--color-white);
  padding: 0.4rem;
  border-radius: var(--card-border-radius);
  margin-top: 1rem;
  box-shadow: var(--box-shadow);
  border: none;
  outline: none;
  transition: all 300ms ease;

  &:hover {
    box-shadow: none;
  }
`;

const StyledSelect = styled.select`
  padding: 5px;
  background: var(--color-white);
  padding: 0.4rem;
  border-radius: var(--card-border-radius);
  margin-top: 1rem;
  box-shadow: var(--box-shadow);
  border: none;
  outline: none;
  transition: all 300ms ease;

  &:hover {
    box-shadow: none;
  }
`;

const StyledTotal = styled.span`
  background: var(--color-white);
  padding: 0.4rem;
  border-radius: var(--card-border-radius);
  margin-top: 1rem;
  box-shadow: var(--box-shadow);
  transition: all 300ms ease;

  &:hover {
    box-shadow: none;
  }
`;

const StyledNewItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledDivAmount = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledAddButton = styled.button`
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0 15px;
  border-radius: 5px;
  cursor: pointer;
  height: 34px;
`;

const StyledDivTable = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledTable = styled.table`
  width: 98%;
  padding: 20px 0;
  border-radius: 5px;
`;

const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

const Td = styled.td`
  padding: 8px 0;
`;

const Amount = styled(Th)`
  width: 30%;
`;

const Type = styled(Th)`
  width: 80px;
  text-align: center;
`;

const Action = styled(Th)`
  width: 40px;
  text-align: center;
`;

export default function ModalVeiculos({ open, onClose, onSuccess }) {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [contato, setContato] = useState("");
  const [tipoLavagem, setTipoLavagem] = useState("simples"); // Valor exato do enum no back
  // const [total, setTotal] = useState(""); // Nota: seu schema não tem 'total', considere adicionar lá depois

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
    // Validação básica de campos obrigatórios do Schema
    if (!placa || !modelo || !cor || !nomeCliente || !contato) {
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
        // O status e entryDate o back-end já define como default
      };

      await criarVeiculo(novoVeiculo);
      
      alert("Veículo cadastrado com sucesso!");
      onSuccess(); // Função para recarregar a lista na Dash
      onClose();   // Fecha a modal
      
      // Limpa os campos
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

  return (
    <StyledBackdrop onClick={onClose}>
      <StyledModalBox onClick={(e) => e.stopPropagation()}>
        <StyledCloseButton onClick={onClose}>×</StyledCloseButton>

        <StyledModalContainer>
          <h2>Cadastrar Novo Veículo</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <h3>Placa</h3>
              <StyledInput
                value={placa}
                onChange={(e) => setPlaca(handlePlacaMask(e.target.value))}
                placeholder="ABC1D23"
              />
            </div>
            <div>
              <h3>Modelo</h3>
              <StyledInput value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Ex: Gol G7" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <h3>Cor</h3>
              <StyledInput value={cor} onChange={(e) => setCor(e.target.value)} placeholder="Ex: Preto" />
            </div>
            <div>
              <h3>Cliente</h3>
              <StyledInput value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} placeholder="Nome do dono" />
            </div>
          </div>

          <div>
            <h3>Contato (WhatsApp)</h3>
            <StyledInput value={contato} onChange={(e) => setContato(e.target.value)} placeholder="(11) 99999-9999" />
          </div>

          <div>
            <h3>Tipo de lavagem</h3>
            <StyledSelect
              value={tipoLavagem}
              onChange={(e) => setTipoLavagem(e.target.value)}
            >
              <option value="simples">Lavagem Simples</option>
              <option value="completa">Lavagem Completa</option>
              <option value="premium">Lavagem Premium</option>
            </StyledSelect>
          </div>

          <button 
            onClick={finalizarCadastro}
            style={{ 
              marginTop: '20px', 
              padding: '12px', 
              backgroundColor: 'orange', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Finalizar Cadastro
          </button>
        </StyledModalContainer>
      </StyledModalBox>
    </StyledBackdrop>
  );
}