import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";

const StyledMain = styled.main`
  margin-top: 1.4rem;
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

export default function StyledCustumers() {
    const totalPagina = customers.length;

    const ativos = customers.filter(c => c.status === "ativo").length;
    const inativos = customers.filter(c => c.status === "inativo").length;

    const porcentAtivos = totalPagina > 0 ? Math.round((ativos / totalPagina) * 100) : 0;
    const porcentInativos = totalPagina > 0 ? Math.round((inativos / totalPagina) * 100) : 0;

    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState("");
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const carregarCustomers = useCallback(async () => {
        try {
            setLoading(true);

            const response = await listarCustomers({
                limit,
                offset,
                search
            });

            setCustomers(response.results || []);
            setTotal(response.total || 0);

        } catch (error) {
            console.error("Erro ao carregar customers", error);
        } finally {
            setLoading(false);
        }
    }, [limit, offset, search]);

    useEffect(() => {
        carregarCustomers();
    }, [carregarCustomers]);

    return (
        <StyledMain>
            <h1>Customers</h1>

            <StyledInsights>
                <InsightCard type="investimento">
                    <span className="material-icons-sharp">groups</span>

                    <div className="middle">
                        <div className="left">
                            <h3>Total de Donos</h3>
                            <h1>{total}</h1>
                        </div>
                    </div>

                    <small>Todos os cadastros</small>
                </InsightCard>

                <InsightCard type="rendimento">
                    <span className="material-icons-sharp">check_circle</span>

                    <div className="middle">
                        <div className="left">
                            <h3>Ativos</h3>
                            <h1>{ativos}</h1>
                        </div>
                    </div>

                    <small>{porcentAtivos}% ativos</small>
                </InsightCard>

                <InsightCard type="despesas">
                    <span className="material-icons-sharp">cancel</span>

                    <div className="middle">
                        <div className="left">
                            <h3>Inativos</h3>
                            <h1>{inativos}</h1>
                        </div>
                    </div>

                    <small>{porcentInativos}% inativos</small>
                </InsightCard>
            </StyledInsights>

            <SearchContainer>
                <input
                    type="text"
                    placeholder="Buscar por nome ou CNPJ"
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
        </StyledMain>
    );
}