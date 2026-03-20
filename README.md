# Projeto integrado com Electron

## Estrutura
- `frontend/` -> interface
- `backend/` -> API Express + MySQL
- `main.js` -> processo principal do Electron
- `preload.js` -> ponte segura para o front
- `banco.sql` -> script do banco

## Como rodar
1. Rode o arquivo `banco.sql` no MySQL.
2. Ajuste usuário e senha em `backend/src/Config/knex.ts` e `backend/dist/Config/knex.js`.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie:
   ```bash
   npm start
   ```

## Observação
O Electron abre o front-end e sobe o back-end automaticamente.
