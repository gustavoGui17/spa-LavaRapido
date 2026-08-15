import api from "./api";

export const loginUsuario = async ({ email, password }) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const logoutUsuario = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getUsuarioLogado = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};