import { useEffect, useState, useCallback } from "react";
import { listarCustomers, atualizarCustomer, deletarCustomer } from "../../services/customersService";
import styled from "styled-components";
import StyledModalCustomers from "./StyledModalCustomers";
import StyledModalEditUser from "./StyledModalEditUser";
import StyledCustomers from "./StyledCustomers";
import { toast } from "react-toastify";
import ConfirmDialog from "../common/ConfirmDialog";

const ModalClientes = StyledModalCustomers;

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
    border: 1px solid var(--color-border);
    background: var(--color-white);
    color: var(--color-dark);
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

export default function StyledMainCustomers() {
  const [openModal, setOpenModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editUser, setEditUser] = useState(null);

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
      console.error("Erro ao carregar clientes", error);
    } finally {
      setLoading(false);
    }
  }, [limit, offset, search]);

  async function handleDeletar(_id) {
    try {
      await deletarCustomer(_id);
      toast.success("Cliente removido com sucesso!");
      await carregarCustomers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao remover cliente. Tente novamente.");
    }
  }

 async function handleProximoStatus(customer) {
  if (!customer) return;
  
  const id = customer._id || customer.id;

  if (!id) {
    console.error("ID do cliente não encontrado", customer);
    return;
  }

  const prox = customer.status === "ativo" ? "inativo" : "ativo";

  try {
    await atualizarCustomer(id, { status: prox });
    toast.success(`Cliente ${prox === "ativo" ? "ativado" : "desativado"} com sucesso!`);
    carregarCustomers();
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Erro ao atualizar status. Tente novamente.");
  }
}
  useEffect(() => {
    carregarCustomers();
  }, [carregarCustomers]);

  const totalCustomers = total;

  const customersEmAtendimento = customers?.filter(
    (c) => c.status === "ativo"
  )?.length ?? 0;

  const customersFinalizados = customers?.filter(
    (c) => c.status === "inativo"
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
      <h1>Dashboard Clientes</h1>
      <StyledInsights>
        <InsightCard type="totalDeClientes" onClick={() => setOpenModal(true)}>
          <span className="material-symbols-outlined">trending_up</span>
          <div className="middle">
            <div className="left">
              <h3>Cadastrar novo usuário</h3>
              <h1>{loading ? "..." : totalCustomers}</h1>
            </div>
          </div>
          <small>total de registros</small>
        </InsightCard>

        <InsightCard type="totalDeClientesAtivos">
          <span className="material-symbols-outlined">refresh</span>
          <div className="middle">
            <div className="left">
              <h3>Clientes ativos </h3>
              <h1>{loading ? "..." : customersEmAtendimento}</h1>
            </div>
          </div>
        </InsightCard>

        <InsightCard type="totalDeClientesInativos">
          <span className="material-symbols-outlined">done_all</span>
          <div className="middle">
            <div className="left">
              <h3>Clientes inativos</h3>
              <h1>{loading ? "..." : customersFinalizados}</h1>
            </div>
          </div>
        </InsightCard>
      </StyledInsights>
      <SearchContainer>
        <input
          type="text"
          placeholder="Buscar clientes por nome, documento (CPF/CNPJ) ou email"
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

      <StyledCustomers
        items={customers}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        onDelete={(id) => setConfirmDelete(id)}
        onUpdateStatus={handleProximoStatus}
        onEdit={(customer) => setEditUser(customer)}
      />

      <ModalClientes
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={carregarCustomers}
      />

      <StyledModalEditUser
        open={editUser !== null}
        customer={editUser}
        onClose={() => setEditUser(null)}
        onSuccess={carregarCustomers}
      />

      <ConfirmDialog
        open={confirmDelete !== null}
        title="Remover cliente"
        message="Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita."
        onConfirm={() => {
          handleDeletar(confirmDelete);
          setConfirmDelete(null);
        }}
        onCancel={() => setConfirmDelete(null)}
      />
    </StyledMain>
  );
}