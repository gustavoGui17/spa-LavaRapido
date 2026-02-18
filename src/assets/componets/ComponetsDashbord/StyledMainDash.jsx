import { useEffect, useState, useCallback } from "react";
import { listarVeiculos, atualizarVeiculo, deletarVeiculo } from "../../services/veiculoService";
import styled from "styled-components";
import ModalVeiculos from "./StyledModal";
import StyledHistory from "./StyledHistory";

const StyledMain = styled.main`
  margin-top: 1.4rem;
`;

const StyledDate = styled.div`
  display: inline-block;
  background: var(--color-light);
  border-radius: var(--border-radius-1);
  margin-top: 1rem;
  padding: 0.5rem 1.6rem;

  input[type="date"] {
    background: transparent;
    color: var(--color-dark);
  }
`;

const StyledInsights = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
`;

const InsightCard = styled.div`
  background: var(--color-white);
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  margin-top: 1rem;
  box-shadow: var(--box-shadow);
  transition: all 300ms ease;

  &:hover {
    box-shadow: none;
  }

  span {
    background: ${(props) =>
    props.type === "despesas"
      ? "var(--color-danger)"
      : props.type === "rendimento"
        ? "var(--color-success)"
        : "var(--color-primary)"};
    padding: 0.5rem;
    border-radius: 50%;
    color: var(--color-white);
    font-size: 2rem;
  }

  .middle {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h3 {
    margin: 1rem 0 0.6rem;
    font-size: 1rem;
  }

  .progress {
    position: relative;
    width: 92px;
    height: 92px;
    border-radius: 50%;
  }

  svg {
    width: 7rem;
    height: 7rem;

    circle {
      fill: none;
      stroke: var(--color-primary);
      stroke-width: 14;
      stroke-linecap: round;
      transform: translate(5px, 5px);

      ${({ type }) =>
    type === "investimento" &&
    `
          stroke-dashoffset: -30;
          stroke-dasharray: 200;
      `}

      ${({ type }) =>
    type === "despesas" &&
    `
          stroke-dashoffset: 20;
          stroke-dasharray: 80;
      `}

      ${({ type }) =>
    type === "rendimento" &&
    `
          stroke-dashoffset: 35;
          stroke-dasharray: 110;
      `}
    }
  }

  .number {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  small {
    margin-top: 1.6rem;
    display: block;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 24px 0 16px;

  input {
    height: 38px;
    width: 320px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid #dcdcdc;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: #3b82f6;
    }
  }

  button {
    height: 38px;
    padding: 0 16px;
    border-radius: 6px;
    border: none;
    background-color: #3b82f6;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: orange;
    }
  }
`;

export default function StyledMainDash() {
  const [openModal, setOpenModal] = useState(false);
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const carregarVeiculos = useCallback(async () => {
    try {
      setLoading(true);

      const response = await listarVeiculos({
        limit,
        offset,
        search
      });

      setVeiculos(response.results || []);
      setTotal(response.total || 0);

    } catch (error) {
      console.error("Erro ao carregar veículos", error);
    } finally {
      setLoading(false);
    }
  }, [limit, offset, search]);

  async function handleDeletar(_id) {
    if (window.confirm("Tem certeza que deseja remover este veículo?")) {
      try {
        await deletarVeiculo(_id);
        await carregarVeiculos();
      } catch (err) {
        alert("Erro ao deletar veículo", err);
      }
    }
  }

 async function handleProximoStatus(veiculo) {
  if (!veiculo) return;
  
  console.log("VEICULO RECEBIDO:", veiculo);
  const id = veiculo._id || veiculo.id;

  if (!id) {
    console.error("ID do veículo não encontrado", veiculo);
    return;
  }

  const fluxo = ["pendente", "em atendimento", "finalizado"];
  const prox = fluxo[fluxo.indexOf(veiculo.status) + 1];

  if (!prox) return;

  try {
    await atualizarVeiculo(id, { status: prox });
    carregarVeiculos();
  } catch (err) {
    console.error(err);
    alert("Erro ao atualizar status");
  }
}
  useEffect(() => {
    carregarVeiculos();
  }, [carregarVeiculos]);

  const totalVeiculos = total;

  const veiculosEmProducao = veiculos?.filter(
    (v) => v.status === "em atendimento"
  )?.length ?? 0;

  const veiculosFinalizados = veiculos?.filter(
    (v) => v.status === "finalizado"
  )?.length ?? 0;

  const currentPage = Math.floor(offset / limit) + 1;

  const totalPages = Math.ceil(total / limit);

  function nextPage() {
    if (offset + limit < total) {
      setOffset(offset + limit);
    }
  }

  function prevPage() {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  }

  return (
    <StyledMain>
      <h1>Dashboard</h1>
      <StyledInsights>
        <InsightCard type="totalDeVeiculos" onClick={() => setOpenModal(true)}>
          <span className="material-symbols-outlined">trending_up</span>
          <div className="middle">
            <div className="left">
              <h3>Cadastrar veiculo</h3>
              <h1>{loading ? "..." : totalVeiculos}</h1>
            </div>
          </div>
          <small>total de registros</small>
        </InsightCard>

        <InsightCard type="totalDeVeiculoLimpando">
          <span className="material-symbols-outlined">refresh</span>
          <div className="middle">
            <div className="left">
              <h3>Veículos limpando</h3>
              <h1>{loading ? "..." : veiculosEmProducao}</h1>
            </div>
          </div>
          <small>status: em atendimento</small>
        </InsightCard>

        <InsightCard type="veiculosFinalizados">
          <span className="material-symbols-outlined">done_all</span>
          <div className="middle">
            <div className="left">
              <h3>Veículos finalizados</h3>
              <h1>{loading ? "..." : veiculosFinalizados}</h1>
            </div>
          </div>
          <small>concluídos hoje</small>
        </InsightCard>
      </StyledInsights>
      <SearchContainer>
        <input
          type="text"
          placeholder="Buscar por placa, modelo ou cliente"
          value={search}
          onChange={(e) => {
            setOffset(0);
            setSearch(e.target.value);
          }}
        />

        <button onClick={() => setOffset(0)}>
          Pesquisar
        </button>
      </SearchContainer>

      <StyledHistory
        items={veiculos}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        onDelete={handleDeletar}
        onUpdateStatus={handleProximoStatus}
      />

      <ModalVeiculos
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={carregarVeiculos}
      />
    </StyledMain>
  );
}