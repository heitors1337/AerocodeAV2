# ✈️ Aerocode - (AV2)
Sistema web de gestão de produção de aeronaves (SPA desenvolvida em React + TypeScript).

Este projeto é o protótipo de interface gráfica (Front-end) navegável desenvolvido como requisito para a Avaliação 2 (AV2) da disciplina de Programação Orientada a Objetos.

---

## 🚀 Como rodar o projeto localmente

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   Acesse a aplicação em: **[http://localhost:5173](http://localhost:5173)**

3. **Build de produção**
   ```bash
   npm run build
   ```

---

## 🔐 Acessos de Demonstração (Controle de Acesso - RBAC)
Para avaliar o funcionamento da proteção de rotas e menus adaptativos, utilize os usuários abaixo (senha padrão `1234`):

| Usuário | Perfil / Nível | Permissões de Acesso |
| :--- | :--- | :--- |
| **joao.silva** | Administrador | Acesso total ao sistema (inclui gerenciamento de funcionários e relatórios). |
| **pedro.santos** | Engenheiro | Acesso a Dashboard, Aeronaves, Estoque, Etapas e Relatórios. |
| **paulo.oliveira** | Engenheiro | Acesso a Dashboard, Aeronaves, Estoque, Etapas e Relatórios. |
| **caio.souza** | Operador | Acesso limitado apenas às abas de Estoque e Etapas de Produção. |
| **fernando.lima** | Operador | Acesso limitado apenas às abas de Estoque e Etapas de Produção. |

---

## 🛠️ Tecnologias Utilizadas
- **React.js** + **TypeScript** + **Vite**
- **React Router DOM** (Roteamento dinâmico SPA e proteção de rotas)
- **Vanilla CSS** (Interface moderna em Dark Mode)

---

## 📋 Regras de Negócio Implementadas
- **Controle de Acesso (RBAC)**: Menus e rotas são filtrados dinamicamente com base no perfil de usuário logado.
- **Sequência de etapas**: As etapas da produção seguem um fluxo encadeado até o status "Concluída".
- **Gerenciamento de Funcionários**: Apenas o Administrador pode visualizar, cadastrar e remover funcionários do sistema (com proteção para não deletar a si mesmo).
- **Dados Temporários**: Toda a persistência é mantida em memória (`sessionStorage` e estado do React), simulando um backend funcional sem necessidade de banco de dados ativo.
- **Relatório**: Relatório de Interface disponível no diretório `/docs` (tanto em PDF quanto em markdown).
