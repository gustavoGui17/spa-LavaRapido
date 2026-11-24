import { useState } from "react";
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
    border-bottom: 1px solid var(--color-border);
    white-space: nowrap;
  }

  td {
    padding: 14px 12px;
    border-bottom: 1px solid var(--color-border);
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
    background: var(--color-light);
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

function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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
              <th>Cadastrado</th>
              <th>Finalizado</th>
              <th className="status">Status</th>
              <th className="actions">Ações</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "40px" }}>
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
                  <td>{formatDateTime(item.entryDate)}</td>
                  <td>{formatDateTime(item.finishedAt)}</td>

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

const AgendamentosTable = styled(Table)`
  th:nth-child(5),
  td:nth-child(5) {
    max-width: 240px;
    white-space: normal;
  }

  tbody tr {
    cursor: pointer;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalBox = styled.div`
  background: var(--color-white);
  border-radius: 16px;
  padding: 28px;
  width: 480px;
  max-width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);

  h2 {
    margin: 0 0 4px;
    font-size: 1.3rem;
    color: var(--color-dark);
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--color-dark-variant);
  }
`;

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 22px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Info = styled.div`
  span {
    display: block;
    margin-bottom: 4px;
    font-size: 0.78rem;
    color: var(--color-dark-variant);
  }

  strong {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-dark);
  }
`;

const InfoFull = styled(Info)`
  grid-column: 1 / -1;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-dark-variant);
  font-size: 1.4rem;
  padding: 4px;
`;

const FinalizarButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #e74c3c;
  border-radius: 6px;
  background: transparent;
  color: #e74c3c;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #e74c3c;
    color: #fff;
  }
`;

const FieldLabel = styled.label`
  display: block;
  margin: 22px 0 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-dark);
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 110px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-white);
  color: var(--color-dark);
  font-size: 0.9rem;
  font-family: inherit;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #e74c3c;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const SecondaryButton = styled.button`
  padding: 10px 18px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-white);
  color: var(--color-dark);
  font-size: 0.9rem;
  cursor: pointer;
`;

const PrimaryButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: #e74c3c;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function formatEndereco(endereco) {
  if (!endereco) return "Endereço não informado";

  const partes = [
    endereco.logradouro,
    endereco.numero,
    endereco.bairro,
    endereco.cidade,
    endereco.estado,
  ].filter(Boolean);

  if (endereco.cep) partes.push(`CEP ${endereco.cep}`);

  return partes.join(", ") || "Endereço não informado";
}

const statusLabels = {
  agendado: "Agendado",
  confirmado: "Confirmado",
  concluido: "Concluído",
  cancelado: "Cancelado",
};

export function StyledAgendamentos({ items = [], onFinalizar = () => {} }) {
  const [selecionadoId, setSelecionadoId] = useState(null);
  const [finalizando, setFinalizando] = useState(null);
  const [motivo, setMotivo] = useState("");

  const selecionado = items.find(
    (item) => (item._id || item.id) === selecionadoId
  );

  const podeFinalizar = (status) =>
    status === "agendado" || status === "confirmado";

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Agendamentos recebidos</h2>

      <AgendamentosTable>
        <thead>
          <tr>
            <th>Veículo</th>
            <th>Cliente</th>
            <th>Data e hora</th>
            <th className="status">Status</th>
            <th>Observação</th>
            <th className="actions">Ações</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>
                Nenhum agendamento recebido
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item._id || item.id}
                onClick={() => setSelecionadoId(item._id || item.id)}
              >
                <td>
                  {item.veiculo
                    ? `${item.veiculo.placa || ""} ${item.veiculo.modelo || ""}`.trim() || "—"
                    : "—"}
                </td>
                <td>{item.cliente?.name || "—"}</td>
                <td>{formatDateTime(item.data)}</td>
                <td className="status">
                  <Status value={item.status}>
                    {statusLabels[item.status] || item.status}
                  </Status>
                </td>
                <td>{item.observacao || "—"}</td>
                <td className="actions">
                  {podeFinalizar(item.status) && (
                    <FinalizarButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelecionadoId(null);
                        setFinalizando(item);
                        setMotivo("");
                      }}
                    >
                      Finalizar
                    </FinalizarButton>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </AgendamentosTable>

      {selecionado && (
        <ModalBackdrop onClick={() => setSelecionadoId(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelecionadoId(null)}>×</CloseButton>

            <h2>Detalhes do agendamento</h2>
            <p>Informações do dono do veículo</p>

            <ModalGrid>
              <Info>
                <span>Veículo</span>
                <strong>
                  {selecionado.veiculo
                    ? `${selecionado.veiculo.placa || ""} ${selecionado.veiculo.modelo || ""}`.trim() || "—"
                    : "—"}
                </strong>
              </Info>

              <Info>
                <span>Data e hora</span>
                <strong>{formatDateTime(selecionado.data)}</strong>
              </Info>

              <Info>
                <span>Nome</span>
                <strong>{selecionado.cliente?.name || "—"}</strong>
              </Info>

              <Info>
                <span>Telefone</span>
                <strong>{selecionado.cliente?.telefone || "—"}</strong>
              </Info>

              <Info>
                <span>Email</span>
                <strong>{selecionado.cliente?.email || "—"}</strong>
              </Info>

              <Info>
                <span>Status</span>
                <strong>
                  {statusLabels[selecionado.status] || selecionado.status}
                </strong>
              </Info>

              <InfoFull>
                <span>Endereço</span>
                <strong>{formatEndereco(selecionado.cliente?.endereco)}</strong>
              </InfoFull>

              <InfoFull>
                <span>Observação</span>
                <strong>{selecionado.observacao || "—"}</strong>
              </InfoFull>

              {selecionado.motivoFinalizacao && (
                <InfoFull>
                  <span>Motivo da finalização</span>
                  <strong>{selecionado.motivoFinalizacao}</strong>
                </InfoFull>
              )}
            </ModalGrid>
          </ModalBox>
        </ModalBackdrop>
      )}

      {finalizando && (
        <ModalBackdrop onClick={() => setFinalizando(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setFinalizando(null)}>×</CloseButton>

            <h2>Finalizar agendamento</h2>
            <p>
              Informe o motivo para o cliente. Se o serviço foi realizado,
              finalize pelo histórico de veículos.
            </p>

            <FieldLabel htmlFor="motivo-finalizacao">
              Motivo da finalização
            </FieldLabel>
            <TextArea
              id="motivo-finalizacao"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ex.: imprevisto no lava rápido, falta de energia..."
              maxLength={300}
            />

            <ModalActions>
              <SecondaryButton onClick={() => setFinalizando(null)}>
                Cancelar
              </SecondaryButton>
              <PrimaryButton
                disabled={!motivo.trim()}
                onClick={() => {
                  onFinalizar(finalizando, motivo.trim());
                  setFinalizando(null);
                }}
              >
                Finalizar agendamento
              </PrimaryButton>
            </ModalActions>
          </ModalBox>
        </ModalBackdrop>
      )}
    </div>
  );
}
