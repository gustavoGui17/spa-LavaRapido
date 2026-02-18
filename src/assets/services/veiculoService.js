import api from "./api";

export const listarVeiculos = async ({ limit = 5, offset = 0, search = "" }) => {
  const response = await api.get("/veiculo", {
    params: {
      limit,
      offset,
      search,
    },
  });

  return response.data;
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
    const response = await api.patch(`/veiculo/${id}`, dados);
    return response.data;
};

export const deletarVeiculo = async (id) => {
    const response = await api.delete(`/veiculo/${id}`);
    return response.data;
};