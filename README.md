# 🎵 RHYTHM

> Plataforma de descoberta e avaliação de música eletrônica — projeto acadêmico da UC de Programação Web, SENAC-RS.

---

## 📋 Visão Geral

**RHYTHM** é uma SPA (Single Page Application) inspirada no [Beatport](https://www.beatport.com), porém simplificada para fins didáticos. Permite listar, cadastrar, pesquisar e avaliar músicas eletrônicas com comentários e notas de 1 a 5 estrelas.

O projeto é desenvolvido com **React + Vite**, utilizando apenas ferramentas client-side e um arquivo JSON como banco de dados local — sem backend real, sem autenticação.

---

## 🎯 Objetivos Pedagógicos

- Praticar componentização com **React**
- Gerenciar formulários com **React Hook Form**
- Implementar navegação com **React Router DOM**
- Trabalhar com persistência simples via **localStorage** (simulando um banco JSON)
- Aplicar boas práticas de organização de projeto frontend

---

## 🗂️ Estrutura do Projeto

```
rhythm/
├── public/
│   └── data/
│       └── db.json              # Banco de dados local (músicas + avaliações)
├── src/
│   ├── assets/                  # Imagens, ícones estáticos
│   ├── components/              # Componentes reutilizáveis
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── MusicCard/
│   │   │   └── MusicCard.jsx
│   │   ├── StarRating/
│   │   │   └── StarRating.jsx
│   │   ├── CommentModal/
│   │   │   └── CommentModal.jsx
│   │   └── GenreFilter/
│   │       └── GenreFilter.jsx
│   ├── pages/
│   │   ├── Home/
│   │   │   └── Home.jsx         # Listagem de músicas com filtro por gênero
│   │   ├── Inclusion/
│   │   │   └── Inclusion.jsx    # Formulário de cadastro de nova música
│   │   └── Search/
│   │       └── Search.jsx       # Pesquisa por nome ou gênero
│   ├── hooks/
│   │   └── useMusic.js          # Hook customizado para CRUD no localStorage
│   ├── utils/
│   │   └── helpers.js           # Funções utilitárias (formatação de tempo, etc.)
│   ├── App.jsx                  # Configuração das rotas
│   ├── main.jsx                 # Entry point
│   └── index.css                # Estilos globais
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Função |
|---|---|---|
| [Vite](https://vitejs.dev/) | latest | Bundler / dev server |
| [React](https://react.dev/) | ^19 | Framework UI |
| [React Router DOM](https://reactrouter.com/) | ^7 | Navegação SPA |
| [React Hook Form](https://react-hook-form.com/) | ^7 | Gerenciamento de formulários |
| JavaScript (ES2022+) | — | Linguagem principal |
| CSS Modules / CSS puro | — | Estilização |

> **Sobre o banco de dados:** optamos por **`localStorage`** em vez de `json-server` para manter o projeto **100% frontend**, sem necessidade de rodar um servidor separado. Os dados do `db.json` são carregados na primeira visita e persistidos no `localStorage` do navegador — simples, didático e sem conflito com o repositório.

---

## 💾 Estratégia de Persistência — Por que localStorage?

### Alternativas consideradas

| Solução | Prós | Contras | Adequada? |
|---|---|---|---|
| `json-server` | Simula REST real | Precisa de processo separado (`npm run server`), porta extra, dois terminais | ⚠️ Funciona, porém adiciona complexidade desnecessária para fins didáticos |
| `localStorage` | Zero dependências extras, 100% client-side, sem servidor separado | Dados ficam no navegador (não compartilhados entre usuários/máquinas) | ✅ **Escolhido** |
| `IndexedDB` | Mais robusto que localStorage, suporta blobs | API mais complexa, overkill para o escopo | ❌ Fora do escopo |
| Firebase / Supabase | Banco real na nuvem, dados persistidos | Requer conta, setup, variáveis de ambiente | ❌ Fora do escopo desta UC |

### Como funciona na prática

```
1. App inicializa → verifica se "rhythm_db" existe no localStorage
2. Se NÃO existe → importa db.json (dados seed) e salva no localStorage
3. Todas as operações de leitura/escrita acontecem via localStorage
4. O hook `useMusic` abstrai toda essa lógica
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 20.x
- [pnpm](https://pnpm.io/) (recomendado) ou npm

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/<seu-usuario>/rhythm.git
cd rhythm

# 2. Instalar dependências
pnpm install
# ou: npm install

# 3. Iniciar o servidor de desenvolvimento
pnpm dev
# ou: npm run dev

# 4. Abrir no navegador
# http://localhost:5173
```

### Scripts disponíveis

```bash
pnpm dev        # Servidor de desenvolvimento com HMR
pnpm build      # Build de produção (pasta /dist)
pnpm preview    # Preview do build de produção
```

---

## 📦 Instalando as Dependências

```bash
# React Router DOM
pnpm add react-router-dom

# React Hook Form
pnpm add react-hook-form
```

---

## 🎵 Funcionalidades

### Home (`/`)
- Listagem de todas as músicas cadastradas em cards
- Filtro por gênero (House, Techno, Trance, Drum & Bass, etc.)
- Cada card exibe:
  - Capa da música (URL externa)
  - Nome da música
  - Artista(s)
  - Gênero
  - BPM
  - Duração
  - Data de lançamento
  - Streamings disponíveis
  - Média de avaliação (estrelas) com total de comentários
  - Botão **Comentar** → abre modal
  - Botão **Ver Comentários** → lista de avaliações

### Inclusão (`/inclusion`)
- Formulário completo validado com React Hook Form
- Campos:
  - Nome da música *(obrigatório)*
  - Artista(s) *(obrigatório)*
  - Gênero *(select — obrigatório)*
  - BPM *(número — obrigatório)*
  - Duração *(formato mm:ss — obrigatório)*
  - Data de lançamento *(obrigatório)*
  - Streamings disponíveis *(checkboxes: Spotify, Beatport, SoundCloud, YouTube, etc.)*
  - URL da capa *(opcional — usa placeholder se vazio)*
- Salva no localStorage via `useMusic`

### Pesquisa (`/search`)
- Input de busca livre
- Filtra por nome da música **ou** gênero em tempo real
- Exibe os cards filtrados no mesmo formato da Home

### Modal de Comentário
- Campos: Nome do usuário, Comentário, Nota (1–5 estrelas — clicável)
- Validação com React Hook Form
- Salva a avaliação associada à música
- Fecha ao enviar ou ao clicar fora / pressionar Esc

---

## 🗃️ Estrutura do db.json (seed inicial)

```json
{
  "musics": [
    {
      "id": "uuid-aqui",
      "title": "Nome da Música",
      "artist": "Nome do Artista",
      "genre": "Techno",
      "bpm": 140,
      "duration": "6:30",
      "releaseDate": "2026-01-15",
      "streamings": ["Spotify", "Beatport"],
      "coverUrl": "https://url-da-capa.jpg",
      "ratings": [
        {
          "id": "uuid-rating",
          "user": "João",
          "comment": "Faixa incrível!",
          "score": 5,
          "createdAt": "2026-05-20T14:00:00Z"
        }
      ]
    }
  ]
}
```

---

## 🧩 Componentes Principais

### `<MusicCard />`
Recebe um objeto `music` e renderiza o card completo com avaliações e botões de ação.

**Props:**
```js
{
  music: {
    id, title, artist, genre, bpm,
    duration, releaseDate, streamings,
    coverUrl, ratings
  },
  onComment: (musicId) => void,
  onViewComments: (musicId) => void
}
```

### `<CommentModal />`
Modal controlado por estado. Exibe formulário de avaliação e fecha ao confirmar.

**Props:**
```js
{
  isOpen: boolean,
  musicId: string,
  onClose: () => void,
  onSubmit: (data) => void
}
```

### `<StarRating />`
Componente de exibição e/ou seleção de estrelas.

**Props:**
```js
{
  value: number,        // 0–5
  interactive: boolean, // true = clicável, false = só display
  onChange: (score) => void
}
```

### `<GenreFilter />`
Lista de botões/chips de gênero. Filtra os cards na Home.

**Props:**
```js
{
  genres: string[],
  selected: string,
  onChange: (genre) => void
}
```

---

## 🪝 Hook `useMusic`

Hook centralizado para todas as operações de dados.

```js
const {
  musics,          // array de músicas
  addMusic,        // (musicData) => void
  addRating,       // (musicId, ratingData) => void
  searchMusics,    // (query) => music[]
  filterByGenre,   // (genre) => music[]
  getGenres,       // () => string[]
} = useMusic()
```

---

## 🎨 Design

- Paleta escura inspirada no universo da música eletrônica (preto, roxo, ciano)
- Tipografia: **Outfit** (display) + **Inter** (corpo) — Google Fonts
- Responsivo: mobile-first, breakpoints em 768px e 1024px
- Ícones: [Lucide React](https://lucide.dev/)

---

## 📁 Convenções de Código

- Componentes: `PascalCase` (ex: `MusicCard.jsx`)
- Hooks customizados: prefixo `use` (ex: `useMusic.js`)
- Arquivos de estilo: junto ao componente (ex: `MusicCard.css`)
- IDs gerados com `crypto.randomUUID()` (nativo do browser)
- Datas no formato ISO 8601 (`YYYY-MM-DD`)

---

## 🌿 Workflow Git

```bash
main          # Branch principal — código estável
├── feature/home-page
├── feature/inclusion-form
├── feature/search-page
└── feature/comment-modal
```

- Commits em português, descritivos e pequenos
- PRs revisados antes de merge na `main`

---

## 📌 Status do Projeto

| Etapa | Status |
|---|---|
| Setup do projeto (Vite + dependências) | ⬜ Pendente |
| Estrutura de pastas e roteamento | ⬜ Pendente |
| Hook `useMusic` + seed do localStorage | ⬜ Pendente |
| Componente `MusicCard` | ⬜ Pendente |
| Componente `StarRating` | ⬜ Pendente |
| Componente `CommentModal` | ⬜ Pendente |
| Componente `GenreFilter` | ⬜ Pendente |
| Página Home | ⬜ Pendente |
| Página Inclusão | ⬜ Pendente |
| Página Pesquisa | ⬜ Pendente |
| Responsividade | ⬜ Pendente |
| Polimento visual | ⬜ Pendente |

---

## 👤 Autor

**João Vicente Watanabe** — SENAC-RS, Curso Técnico em Desenvolvimento de Sistemas  
UC: Programação Web

---

## 📄 Licença

Projeto acadêmico — sem licença de distribuição.
