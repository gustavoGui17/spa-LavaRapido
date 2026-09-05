import api from "./api";

export const cadastrarUsuario = async (dados) => {
  const payload = {
    nome: dados.nome,
    email: dados.email,
    password: dados.senha
  };
  const response = await api.post("/user/register", payload);
  return response.data;
};

export const atualizarUsuario = async (id, dados) => {
  const { data } = await api.patch(`/user/${id}`, dados);
  return data;
};
