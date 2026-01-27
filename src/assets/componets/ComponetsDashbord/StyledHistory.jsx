import styled from "styled-components";
// import { listarVeiculos } from "../../services/veiculoService";
// import { useEffect } from "react";
// import { useState } from "react";

const Title = styled.h2`
  margin-bottom: 0.8rem;
`;

const Table = styled.table`
  background: var(--color-white);
  width: 100%;
  border-radius: var(--card-border-radius);
  padding: 1rem;
  box-shadow: var(--box-shadow);
  transition: all 300ms ease;
  border-collapse: collapse;

  &:hover {
    box-shadow: none;
  }

  th {
    text-align: left;
    padding: 12px;
    color: var(--color-dark-variant);
    font-size: 0.85rem;
    border-bottom: 1px solid #eee;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
    text-align: left; 
  }
  
   tbody tr:hover {
    background-color: #f9f9f9;
  }
`;

const Status = styled.td`
  color: ${(props) => (props.type === "Aprovado" ? "green" : "orange")};
  font-weight: bold;
`;

const LinkShowAll = styled.a`
  display: block;
  margin: 1rem auto;
  text-align: center;
  color: #4a77ff;
  cursor: pointer;
`;

export default function StyledHistory({ items = [], onDelete, onUpdateStatus }) {
  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Histórico de veículos</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Cor</th>
            <th>Tipo de lavagem</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Ações</th>
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
                <td>
                  {/* Note: Verifique se o status no banco é "em atendimento" ou "Em produção" */}
                  <span style={{ 
                    color: item.status === 'finalizado' ? 'green' : 'orange',
                    fontWeight: 'bold' 
                  }}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {/* Botão de Avançar Status */}
                    {item.status !== "finalizado" && (
                      <button 
                        onClick={() => onUpdateStatus(item)}
                        title="Avançar Status"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2ecc71' }}
                      >
                        <span className="material-symbols-outlined">play_circle</span>
                      </button>
                    )}

                    {/* Botão de Deletar */}
                    <button 
                      onClick={() => onDelete(item._id)}
                      title="Excluir"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c' }}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}