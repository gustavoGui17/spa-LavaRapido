import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  background: var(--color-white);
  border-radius: var(--card-border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);

  th {
    text-align: left;
    padding: 14px 12px;
    font-size: 0.85rem;
    color: var(--color-dark-variant);
    border-bottom: 1px solid var(--color-border);
  }

  td {
    padding: 14px 12px;
    border-bottom: 1px solid var(--color-border);
  }

  tbody tr:hover {
    background: var(--color-light);
  }
`;

const Status = styled.span`
  font-weight: 600;
  color: ${({ value }) => (value === "ativo" ? "#2ecc71" : "#e74c3c")};
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    span {
      font-size: 22px;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 1.5rem;

  button {
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid var(--color-border);
    background: var(--color-white);
    color: var(--color-dark);
    cursor: pointer;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  span {
    font-weight: 500;
  }
`;

export default function StyledCustomers({
  items = [],
  onDelete,
  onUpdateStatus,
  onEdit,
  totalPages,
  currentPage,
  onNextPage,
  onPrevPage,
}) {
  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Clientes do sistema</h2>

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Documento</th>
            <th>Contato</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                Nenhum cliente encontrado
              </td>
            </tr>
          ) : (
            items.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.user?.name}</td>
                <td>{customer.user?.email}</td>
                <td>{customer.documento}</td>
                <td>{customer.contato}</td>

                <td>
                  <Status value={customer.status}>{customer.status}</Status>
                </td>

                <td>
                  <Actions>
                    <button onClick={() => onEdit(customer)} title="Editar usuário">
                      <span
                        className="material-symbols-outlined"
                        style={{ color: "#3b82f6" }}
                      >
                        edit
                      </span>
                    </button>

                    <button onClick={() => onUpdateStatus(customer)}>
                      <span
                        className="material-symbols-outlined"
                        style={{ color: "#f39c12" }}
                      >
                        sync
                      </span>
                    </button>

                    <button onClick={() => onDelete(customer._id)}>
                      <span
                        className="material-symbols-outlined"
                        style={{ color: "#e74c3c" }}
                      >
                        delete
                      </span>
                    </button>
                  </Actions>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination>
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <span>
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </Pagination>
      )}
    </div>
  );
}
