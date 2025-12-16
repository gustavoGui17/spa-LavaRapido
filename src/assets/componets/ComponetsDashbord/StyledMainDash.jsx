import { useEffect, useState } from "react";
import { listarVeiculos } from "../../services/veiculoService";
import styled from "styled-components";
import ModalVeiculos from "./StyledModal";

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

export default function StyledMainDash() {
  const [openModal, setOpenModal] = useState(false);

  const [veiculos, setVeiculos] = useState([]);

  async function carregarVeiculos() {
    const data = await listarVeiculos();
    setVeiculos(data);
  }

  useEffect(() => {
    carregarVeiculos();
  }, []);

  return (
    <StyledMain>
      <h1>Dashboard</h1>

      <StyledDate>
        <input type="date" />
      </StyledDate>

      <StyledInsights>
        <InsightCard
          type="totalDeVeiculos"
          onClick={() => setOpenModal(true)}
        >
          <span className="material-symbols-outlined">trending_up</span>
          <div className="middle">
            <div className="left">
              <h3>Total de veiculos</h3>
              <h1>{veiculos.length}</h1>
            </div>

            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36" />
              </svg>
              <div className="number">
                <p>81%</p>
              </div>
            </div>
          </div>
          <small>last 24 horas</small>
        </InsightCard>

        <InsightCard type="totalDeVeiculoLimpando">
          <span className="material-symbols-outlined">bar_chart</span>
          <div className="middle">
            <div className="left">
              <h3>Veiculos limpando</h3>
            </div>

            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36" />
              </svg>
              <div className="number">
                <p>62%</p>
              </div>
            </div>
          </div>
          <small>last 24 horas</small>
        </InsightCard>

        <InsightCard type="veiculosFinalizados">
          <span className="material-symbols-outlined">stacked_line_chart</span>
          <div className="middle">
            <div className="left">
              <h3>Veiculos finalizados</h3>
            </div>

            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36" />
              </svg>
              <div className="number">
                <p>44%</p>
              </div>
            </div>
          </div>
          <small>last 24 horas</small>
        </InsightCard>
      </StyledInsights>
      
      <ModalVeiculos
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={carregarVeiculos}
      />
    </StyledMain>
  );
}
