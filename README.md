# Sistema de Tarefas

## Integrantes
- J.P Grimaldi (Líder / GitHub Principal)
- J.P Martins (Back-end, Insomnia e Git Auxiliar)
- Inácio (SQL e Git Auxiliar)
- Artur (Front-End)

## Descrição do sistema
Sistema de tarefas simples que permite criar, listar, editar e deletar tarefas.

## Funcionalidades
- Criar tarefas
- Listar tarefas
- Editar tarefas
- Deletar tarefas

## Tecnologias utilizadas
- JavaScript
- TypeScript
- Electron
- HTML
- CSS
- MySQL
- Insomnia

## Estrutura do projeto
- `frontend/` -> interface
- `backend/` -> API Express + MySQL
- `main.js` -> processo principal do Electron
- `preload.js` -> ponte segura para o front-end
- `banco.sql` -> script do banco

## Como rodar
1. Rode o arquivo `banco.sql` no MySQL.
2. Ajuste usuário e senha em `backend/src/Config/knex.ts` e `backend/dist/Config/knex.js`.
3. Instale as dependências:
   ```bash
   npm install