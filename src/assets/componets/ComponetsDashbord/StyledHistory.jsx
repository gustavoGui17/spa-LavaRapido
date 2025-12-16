import styled from "styled-components";
import { listarVeiculos } from "../../services/veiculoService";
import { useEffect } from "react";
import { useState } from "react";

const Title = styled.h2`
  margin-bottom: 0.8rem;
`;

const Table = styled.table`
  background: var(--color-white);
  width: 100%;
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  box-shadow: var(--box-shadow);
  transition: all 300ms ease;

  &:hover {
    box-shadow: none;
  }

  th, td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  tbody tr:last-child td {
    border: none;
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

const ActionButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
`;

export default function StyledHistory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const veiculos = await listarVeiculos();
        console.log("VEICULOS:", veiculos);
        setItems(veiculos);
      } catch (err) {
        console.error("Erro ao buscar veículos", err);
      }
    }

    loadHistory();
  }, []);

  return (
    <div>
      <Title>Historico de veiculos</Title>

      <Table>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Cor</th>
            <th>Cliente</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                Nenhum registro encontrado
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id || item._id}>
                <td>{item.placa}</td>
                <td>{item.modelo}</td>
                <td>{item.cor}</td>
                <td>{item.nomeCliente}</td>
                <Status type={item.status || "Em produção"}>
                  {item.status || "Em produção"}
                </Status>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <LinkShowAll href="#">Mostrar tudo</LinkShowAll>
    </div>
  );
}