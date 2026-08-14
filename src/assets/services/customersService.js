import api from "./api";

export const listarCustomers = async ({ limit = 5, offset = 0, search = "" }) => {
  const response = await api.get("/customers", {
    params: {
      limit,
      offset,
      search,
    },
  });

  return response.data;
};

export const criarCustomers = async (payload) => {
  const { data } = await api.post("/customers/register", payload);
  return data;
};

export const finalizarCustomer = async (id) => {
  const { data } = await api.patch(`/customers/${id}/status`, {
    status: "Finalizado",
  });
  return data;
};

export const atualizarCustomer = async (id, dados) => {
    const response = await api.patch(`/customers/${id}`, dados);
    return response.data;
};

export const deletarCustomer = async (id) => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
};