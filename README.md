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
- `src/Config/banco.sql` -> script do banco

## Como rodar
1. Rode o arquivo `src/Config/banco.sql` no MySQL.
2. Ajuste usuário e senha em `backend/src/Config/knex.ts` e `backend/dist/Config/knex.js`.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o projeto:
   ```bash
   npm start
   ```

## Divisão de tarefas
- J.P Grimaldi: GitHub Principal
- J.P Martins: Back-end, Insomnia e Git Auxiliar
- Inácio: SQL e Git Auxiliar
- Artur: Front-End

## Observação
A branch `main` representa a versão final do projeto, enquanto a branch `develop` foi usada para integração das funcionalidades desenvolvidas em `feature/*`.
