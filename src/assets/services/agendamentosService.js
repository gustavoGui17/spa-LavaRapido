import api from "./api";

export const listarAgendamentosDashboard = async () => {
  const { data } = await api.get("/agendamentos/dashboard");
  return data;
};

export const finalizarAgendamento = async (id, motivo) => {
  const { data } = await api.patch(`/agendamentos/${id}/finalizar`, { motivo });
  return data;
};
