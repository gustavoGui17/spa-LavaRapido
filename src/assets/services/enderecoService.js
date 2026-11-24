export const buscarEnderecoPorCep = async (cep) => {
  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    return null;
  }

  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

  if (!response.ok) {
    throw new Error("Erro ao consultar CEP");
  }

  const data = await response.json();

  if (data.erro) {
    return null;
  }

  return {
    logradouro: data.logradouro || "",
    bairro: data.bairro || "",
    cidade: data.localidade || "",
    estado: data.uf || "",
  };
};

export const buscarCoordenadasPorEndereco = async ({
  logradouro,
  numero,
  bairro,
  cidade,
  estado,
  cep,
}) => {
  const endereco = [logradouro, numero, bairro, cidade, estado, cep]
    .filter(Boolean)
    .join(", ");

  const params = new URLSearchParams({
    q: endereco,
    format: "json",
    limit: "1",
    countrycodes: "br",
    "accept-language": "pt-BR",
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params}`
  );

  if (!response.ok) {
    throw new Error("Erro ao localizar endereço");
  }

  const resultados = await response.json();

  if (!resultados.length) {
    return null;
  }

  const latitude = Number(resultados[0].lat);
  const longitude = Number(resultados[0].lon);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return { latitude, longitude };
};
