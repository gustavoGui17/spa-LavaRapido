import { useEffect, useState } from "react";
import { criarCustomers } from "../../services/customersService";
import {
  buscarCoordenadasPorEndereco,
  buscarEnderecoPorCep,
} from "../../services/enderecoService";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

const StyledBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const StyledModalBox = styled.div`
  background: var(--color-white);
  border-radius: 16px;
  padding: 32px;
  width: 560px;
  max-width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${fadeIn} 0.25s ease;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
`;

const StyledModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  h2 {
    margin: 0 0 4px;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-dark);
  }

  h3 {
    margin: 6px 0 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-dark);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-dark-variant);
`;

const StyledInput = styled.input`
  width: 90%;
  padding: 14px 14px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-dark);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: orange;
    background: var(--color-white);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 13px 14px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-dark);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: orange;
    background: var(--color-white);
  }
`;

const GridTwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const GridThreeCols = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const TipoDocumento = styled.div`
  display: flex;
  gap: 6px;
  padding: 4px;
  background: var(--color-background);
  border-radius: 10px;
  border: 1px solid var(--color-border);
`;

const TipoButton = styled.button`
  flex: 1;
  padding: 11px;
  border: none;
  border-radius: 8px;
  background: ${({ active }) => (active ? "orange" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "var(--color-dark-variant)")};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? "orange" : "var(--color-white)")};
  }
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 14px;
  background: orange;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }
`;

export default function StyledModalCustomers({ open, onClose, onSuccess }) {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [nomeFantasia, setNomeFantasia] = useState("");
const [documentoTipo, setDocumentoTipo] = useState("cnpj");
const [documento, setDocumento] = useState("");
const [contato, setContato] = useState("");
const [status] = useState("ativo");
const [cep, setCep] = useState("");
const [logradouro, setLogradouro] = useState("");
const [numero, setNumero] = useState("");
const [bairro, setBairro] = useState("");
const [cidade, setCidade] = useState("");
const [estado, setEstado] = useState("");
const [carregandoCep, setCarregandoCep] = useState(false);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      return undefined;
    }

    let cancelado = false;
    setCarregandoCep(true);

    buscarEnderecoPorCep(cepLimpo)
      .then((endereco) => {
        if (cancelado) return;
        if (!endereco) {
          toast.warning("CEP não encontrado.");
          return;
        }
        setLogradouro(endereco.logradouro);
        setBairro(endereco.bairro);
        setCidade(endereco.cidade);
        setEstado(endereco.estado);
      })
      .catch(() => {
        if (!cancelado) {
          toast.error("Não foi possível consultar o CEP.");
        }
      })
      .finally(() => {
        if (!cancelado) {
          setCarregandoCep(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, [cep]);

  if (!open) return null;

  function maskCpf(value) {
    value = value.replace(/\D/g, "").slice(0, 11);

    if (value.length <= 3) return value;
    if (value.length <= 6) return value.replace(/(\d{3})(\d+)/, "$1.$2");
    if (value.length <= 9)
      return value.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");

    return value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
  }

  function maskCnpj(value) {
    value = value.replace(/\D/g, "").slice(0, 14);

    if (value.length <= 2) return value;
    if (value.length <= 5) return value.replace(/(\d{2})(\d+)/, "$1.$2");
    if (value.length <= 8)
      return value.replace(/(\d{2})(\d{3})(\d+)/, "$1.$2.$3");
    if (value.length <= 12)
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, "$1.$2.$3/$4");

    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, "$1.$2.$3/$4-$5");
  }

  function maskCep(value) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    return digits.length > 5
      ? digits.replace(/(\d{5})(\d+)/, "$1-$2")
      : digits;
  }

  function handleDocumentoTipoChange(tipo) {
    setDocumentoTipo(tipo);
    setDocumento("");
  }

  function handleDocumentoChange(value) {
    const masked =
      documentoTipo === "cnpj" ? maskCnpj(value) : maskCpf(value);
    setDocumento(masked);
  }

  async function finalizarCadastro() {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !nomeFantasia ||
      !documento ||
      !contato ||
      !cep ||
      !logradouro ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado
    ) {
      toast.warning("Preencha todos os campos obrigatórios.");
      return;
    }

    if (password.length < 6) {
      toast.warning("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("As senhas não coincidem.");
      return;
    }

    let coordenadas = null;

    try {
      coordenadas = await buscarCoordenadasPorEndereco({
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep,
      });
    } catch (error) {
      console.error("Erro ao localizar endereço:", error);
    }

    if (!coordenadas) {
      toast.error(
        "Não foi possível localizar o endereço informado. Verifique os dados e tente novamente."
      );
      return;
    }

    try {
      const novoCustomer = {
        name,
        email,
        password,
        nomeFantasia,
        documento,
        documentoTipo,
        contato,
        status,
        endereco: {
          cep: cep.replace(/\D/g, ""),
          logradouro,
          numero,
          bairro,
          cidade,
          estado: estado.toUpperCase(),
        },
        location: {
          type: "Point",
          coordinates: [coordenadas.longitude, coordenadas.latitude],
        },
      };

      await criarCustomers(novoCustomer);

      toast.success("Cliente cadastrado com sucesso!");
      onSuccess();
      onClose();

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setNomeFantasia("");
      setDocumento("");
      setContato("");
      setCep("");
      setLogradouro("");
      setNumero("");
      setBairro("");
      setCidade("");
      setEstado("");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error(error.response?.data?.message || "Erro ao cadastrar cliente. Tente novamente.");
    }
  }

  function maskPhone(value) {
    value = value.replace(/\D/g, "");
    value = value.slice(0, 11);

    if (value.length <= 10) {
      return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  return (
    <StyledBackdrop onClick={onClose}>
      <StyledModalBox onClick={(e) => e.stopPropagation()}>

        <StyledModalContainer>
          <h2>Cadastrar Novo Cliente</h2>

          <GridTwoCols>
            <Field>
              <Label>Nome</Label>
              <StyledInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
              />
            </Field>

            <Field>
              <Label>Email</Label>
              <StyledInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              />
            </Field>
          </GridTwoCols>

          <GridTwoCols>
            <Field>
              <Label>Nome fantasia</Label>
              <StyledInput
                value={nomeFantasia}
                onChange={(e) => setNomeFantasia(e.target.value)}
                placeholder="Nome fantasia"
              />
            </Field>

            <Field>
              <Label>Contato (WhatsApp)</Label>
              <StyledInput
                value={contato}
                onChange={(e) => setContato(maskPhone(e.target.value))}
                placeholder="(11) 99999-9999"
                inputMode="numeric"
              />
            </Field>
          </GridTwoCols>

          <Field>
            <Label>Tipo de documento</Label>
            <TipoDocumento>
              <TipoButton
                type="button"
                active={documentoTipo === "cnpj"}
                onClick={() => handleDocumentoTipoChange("cnpj")}
              >
                CNPJ
              </TipoButton>
              <TipoButton
                type="button"
                active={documentoTipo === "cpf"}
                onClick={() => handleDocumentoTipoChange("cpf")}
              >
                CPF
              </TipoButton>
            </TipoDocumento>
          </Field>

          <Field>
            <Label>{documentoTipo === "cnpj" ? "CNPJ" : "CPF"}</Label>
            <StyledInput
              value={documento}
              onChange={(e) => handleDocumentoChange(e.target.value)}
              placeholder={
                documentoTipo === "cnpj"
                  ? "00.000.000/0000-00"
                  : "000.000.000-00"
              }
              inputMode="numeric"
            />
          </Field>

          <h3>Endereço do lava rápido</h3>

          <GridTwoCols>
            <Field>
              <Label>CEP{carregandoCep && " (buscando...)"}</Label>
              <StyledInput
                value={cep}
                onChange={(e) => setCep(maskCep(e.target.value))}
                placeholder="00000-000"
                inputMode="numeric"
              />
            </Field>

            <Field>
              <Label>Número</Label>
              <StyledInput
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="123"
              />
            </Field>
          </GridTwoCols>

          <Field>
            <Label>Logradouro</Label>
            <StyledInput
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
              placeholder="Rua, avenida..."
            />
          </Field>

          <GridThreeCols>
            <Field>
              <Label>Bairro</Label>
              <StyledInput
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Bairro"
              />
            </Field>

            <Field>
              <Label>Cidade</Label>
              <StyledInput
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Cidade"
              />
            </Field>

            <Field>
              <Label>Estado</Label>
              <StyledInput
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                placeholder="SP"
                maxLength={2}
              />
            </Field>
          </GridThreeCols>

          <GridTwoCols>
            <Field>
              <Label>Senha</Label>
              <StyledInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                type="password"
              />
            </Field>

            <Field>
              <Label>Confirmar senha</Label>
              <StyledInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a senha"
                type="password"
              />
            </Field>
          </GridTwoCols>

          <SubmitButton onClick={finalizarCadastro}>
            Finalizar Cadastro
          </SubmitButton>
        </StyledModalContainer>
      </StyledModalBox>
    </StyledBackdrop >
  );
}