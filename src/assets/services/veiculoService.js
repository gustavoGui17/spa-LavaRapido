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