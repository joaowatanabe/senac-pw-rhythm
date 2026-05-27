# 🎵 RHYTHM

Plataforma de descoberta e avaliação de música eletrônica — projeto acadêmico da UC de Programação Web (SENAC-RS).

---

## 📋 Visão geral

**RHYTHM** é uma SPA em React inspirada no Beatport, onde é possível:

- Navegar por um catálogo de músicas eletrônicas
- Filtrar por gênero e buscar por título, artista ou gênero
- Cadastrar novas faixas
- Comentar e avaliar com notas de 1 a 5 estrelas
- Salvar faixas em uma lista pessoal de **Minhas músicas**

Toda a aplicação roda 100% no frontend: os dados são carregados de um `db.json` e persistidos no `localStorage`.

---

## 🛠️ Stack

- React 19 + Vite 8
- React Router DOM 7
- React Hook Form 7
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Lucide React (ícones)
- localStorage como “banco” (seed via `public/data/db.json`)

---

## 🚀 Como rodar

```bash
# Clonar o repositório
git clone https://github.com/<seu-usuario>/rhythm.git
cd rhythm

# Instalar dependências
pnpm install
# ou: npm install

# Rodar em modo desenvolvimento
pnpm dev
# ou: npm run dev

# Acesse em:
# http://localhost:5173
```

---

## 🧩 Principais features

- **Home**: catálogo com filtro por gênero + barra de busca integrada
- **Incluir música**: formulário completo com validação
- **Minhas músicas**: lista de faixas salvas pelo usuário
- **Comentários**: modal com nome, comentário e nota via estrelas
- Persistência no navegador (sem backend)

---

## 👤 Autor

João Vicente Watanabe — SENAC-RS, Programação Web.
