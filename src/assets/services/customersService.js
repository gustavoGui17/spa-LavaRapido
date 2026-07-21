import api from "./api";

export const listarCustomers = async ({ limit = 5, offset = 0, search = "" }) => {
  const response = await api.get("/customer", {
    params: {
      limit,
      offset,
      search,
    },
  });

  return response.data;
};

export const criarCustomers = async (payload) => {
  const { data } = await api.post("/customer", payload);
  return data;
};

export const finalizarCustomer = async (id) => {
  const { data } = await api.patch(`/customer/${id}/status`, {
    status: "Finalizado",
  });
  return data;
};

export const atualizarCustomer = async (id, dados) => {
    const response = await api.patch(`/customer/${id}`, dados);
    return response.data;
};

export const deletarCustomer = async (id) => {
    const response = await api.delete(`/customer/${id}`);
    return response.data;
};