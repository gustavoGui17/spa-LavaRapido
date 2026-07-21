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
    border-bottom: 1px solid #eee;
  }

  td {
    padding: 14px 12px;
    border-bottom: 1px solid #eee;
  }

  tbody tr:hover {
    background: #f9f9f9;
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
  }
`;

export default function StyledCustomers({
  items = [],
  onDelete,
  onToggleStatus,
}) {
  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Clientes do sistema</h2>

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CNPJ</th>
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
                <td>{customer.cnpj}</td>
                <td>{customer.contato}</td>

                <td>
                  <Status value={customer.status}>{customer.status}</Status>
                </td>

                <td>
                  <Actions>
                    <button onClick={() => onToggleStatus(customer)}>
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
    </div>
  );
}
