import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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
    white-space: nowrap;
  }

  td {
    padding: 14px 12px;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
    font-size: 0.9rem;
  }

  th.status,
  td.status,
  th.actions,
  td.actions {
    text-align: center;
  }

  tbody tr:hover {
    background: #f9f9f9;
  }
`;

const Status = styled.span`
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ value }) =>
    value === "finalizado" ? "#2ecc71" : "#f39c12"};
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
    border: 1px solid #ddd;
    background: #fff;
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

export default function StyledHistory({ items = [], onDelete, onUpdateStatus, totalPages, currentPage, onNextPage, onPrevPage }) {
  return (
    <>
      <div>
        <h2 style={{ marginBottom: "1rem" }}>Histórico de veículos</h2>

        <Table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Cor</th>
              <th>Tipo de lavagem</th>
              <th>Cliente</th>
              <th className="status">Status</th>
              <th className="actions">Ações</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "40px" }}>
                  Nenhum registro encontrado
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id || item.id}>
                  <td>{item.placa}</td>
                  <td>{item.modelo}</td>
                  <td>{item.cor}</td>
                  <td>{item.tipoLavagem}</td>
                  <td>{item.nomeCliente}</td>

                  <td className="status">
                    <Status value={item.status}>{item.status}</Status>
                  </td>

                  <td className="actions">
                    <Actions>
                      {item.status !== "finalizado" && (
                        <button
                          onClick={() => onUpdateStatus(item)}
                          title="Avançar status"
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{ color: "#2ecc71" }}
                          >
                            play_circle
                          </span>
                        </button>
                      )}

                      <button
                        onClick={() => onDelete(item._id || item.id)}
                        title="Excluir"
                      >
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
    </>
  )
}