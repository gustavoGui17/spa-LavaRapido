import api from "./api";

export const listarVeiculos = async () => {
  const { data } = await api.get("/veiculo");
  return data.results;
};

export const criarVeiculo = async (payload) => {
  const { data } = await api.post("/veiculo", payload);
  return data;
};

export const finalizarVeiculo = async (id) => {
  const { data } = await api.patch(`/veiculo/${id}/status`, {
    status: "Finalizado",
  });
  return data;
};

export const atualizarVeiculo = async (id, dados) => {
    const response = await api.put(`/veiculo/${id}`, dados);
    return response.data;
};

export const deletarVeiculo = async (id) => {
    const response = await api.delete(`/veiculo/${id}`);
    return response.data;
};