# 💧 Lava Rápido — Frontend (SPA)

Interface web (SPA) do sistema de gerenciamento de um lava rápido. Inclui uma landing page institucional, autenticação, painel do usuário (dashboard) e área administrativa de clientes, com animações de transição e sistema de temas de cores.

## ✨ Visão geral

| Feature | Descrição |
|---------|-----------|
| Landing page | Banner, preços, galeria e mapa de localização |
| Autenticação | Login/logout com sessão via cookie (JWT) |
| Dashboard | Painel do usuário com histórico de lavagens |
| Clientes (admin) | CRUD de clientes com busca, cadastro e edição |
| Temas | 5 cores primárias + modo claro/escuro |

## 🛠️ Tecnologias

- **React 19 + Vite** — SPA
- **React Router DOM v7** — navegação e rotas protegidas
- **framer-motion** — animações de transição entre páginas
- **styled-components** — estilização de componentes
- **axios** — consumo da API
- **react-toastify** — notificações
- **react-icons** — ícones
- **react-input-mask** — máscaras de input (CPF/CNPJ)
- **@emailjs/browser** — envio de e-mails direto do frontend
- **react-scroll** — rolagem suave na landing page

## 📦 Instalação

```bash
# clone o repositório
git clone https://github.com/gustavoGui17/spa-LavaRapido.git
cd spa-LavaRapido

# instale as dependências
npm install
```

## ▶️ Como rodar

```bash
npm run dev        # ambiente de desenvolvimento (Vite)
npm run build      # build de produção
npm run preview    # pré-visualizar o build
npm run lint       # verificação de lint (ESLint)
```

O servidor de desenvolvimento roda em `http://localhost:5173`.

## ⚙️ Integração com a API

O frontend consome a API do projeto **[API-LavaRapido](https://github.com/gustavoGui17/API-LavaRapido)**.

A URL base e a configuração das requisições estão em `src/assets/services/api.js`:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // envia o cookie de sessão
});

export default api;
```

> O backend precisa estar rodando com CORS liberado para a origem do frontend (`http://localhost:5173`).

### Camada de serviços

| Arquivo | Responsabilidade |
|---------|------------------|
| `api.js` | Instância compartilhada do axios |
| `authService.js` | Login, logout, usuário logado |
| `userService.js` | Operações de usuário |
| `customersService.js` | CRUD de clientes |
| `veiculoService.js` | Veículos e lavagens |

## 🗺️ Rotas

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/` | Redireciona para `/home` | — |
| `/home` | Landing page (banner, preços, galeria, mapa) | Público |
| `/login` | Página de login | Público |
| `/dashboard` | Painel do usuário com histórico de lavagens | Logado |
| `/customers` | Gerenciamento de clientes | Admin |
| `*` | Rota não encontrada → redireciona para `/home` | — |

### Guardas de rota

- **`ProtectedRoute`** — exige usuário autenticado. Consulta a API (`/auth/me`) e, se a conta do cliente estiver **inativa**, bloqueia o acesso exibindo um aviso.
- **`AdminRoute`** — exige papel de **administrador**; caso contrário, redireciona para o dashboard.

## 🎨 Sistema de temas

Controlado pelo contexto global `ThemeContext` (`src/contexts/ThemeContext.jsx`), com persistência em `localStorage`:

- **5 cores primárias**: laranja, azul, verde, roxo e rosa.
- **Modo claro/escuro**, aplicado via classe `dark-theme-variables` no `body`.
- Disponibiliza `useTheme()` com `themeName`, `changeTheme`, `isDark`, `toggleDark` e `themes`.

## 🏗️ Estrutura do projeto

```
spa-LavaRapido/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                 # entrada da aplicação
    ├── App.jsx                  # rotas, transições e ThemeProvider
    ├── index.css                # estilos globais/base
    ├── route/                   # guardas de rota (auth/admin)
    ├── contexts/                # contextos (ex.: tema)
    └── assets/
        ├── components/          # componentes da UI (por página/sessão)
        │   ├── common/          # componentes reutilizáveis (modais, toggle)
        │   ├── Home/            # banner, cards, galeria, mapa, navbar
        │   ├── Login/
        │   ├── Dashbord/
        │   └── Customers/
        ├── pages/               # páginas: Home, Login, Dashbord, Customers
        ├── services/            # camada de comunicação com a API
        ├── css/                 # estilos globais (styled-components)
        └── img/                 # imagens e galeria
```

## 👤 Funcionalidades

- **Landing page** — apresentação do serviço com preços, galeria e localização.
- **Autenticação** — login com cookie de sessão via API, logout e bloqueio de conta inativa.
- **Dashboard** — visualização e acompanhamento das lavagens do usuário.
- **Clientes (admin)** — CRUD de clientes com busca, cadastro e edição.
- **Tema** — alternância de cor primária e modo claro/escuro via contexto global.

## 📄 Licença

Projeto privado — licença não especificada.
