---
id: SPEC-01
titulo: Setup do projeto
status: a fazer
depende_de: []
gdd: ["§11"]
requisitos: [DD-11, DD-12, DD-14]
---

# SPEC-01 — Setup do projeto

## Objetivo

O repositório tem um projeto Vite + React + TypeScript que roda com `npm run dev`, com testes, lint e checagem de tipos funcionando, e a estrutura de pastas da arquitetura criada.

## Ler antes

- [architecture.md](../engineering/architecture.md)
- [conventions.md](../engineering/conventions.md)

## O que fazer

- Criar o projeto com Vite (template `react-ts`) na raiz do repositório.
- `tsconfig` com `strict: true` e `noUncheckedIndexedAccess: true`.
- Vitest com ambiente `jsdom`, e Testing Library para os poucos testes de componente.
- ESLint com as regras recomendadas de TypeScript e de hooks do React. Prettier opcional.
- Scripts em `package.json`: `dev`, `build`, `preview`, `test`, `lint`, `typecheck`.
- Criar as pastas de `src/` da arquitetura, com um `index.ts` ou arquivo mínimo onde fizer sentido. Não crie código de regra ainda.
- `src/content/strings.ts` com o título do jogo, e `src/theme/tokens.ts` com tokens provisórios da proposta de visual-identity.md.
- `App.tsx` mostrando só a tela de início provisória, com o título vindo de `strings.ts`.
- O `.gitignore` e o `README.md` já existem: confira que os comandos do README funcionam e ajuste o que mudar.

## Fora do escopo

- Qualquer regra de jogo, tela real ou telemetria.
- Backend, roteador, biblioteca de estado ou de UI.

## Critérios de aceite

- [ ] `npm install && npm run dev` abre a tela de início no navegador.
- [ ] `npm run typecheck`, `npm run lint`, `npm test` (com um teste de exemplo) e `npm run build` passam.
- [ ] As pastas de `src/` batem com a architecture.md.
- [ ] Nenhum texto de tela fora de `strings.ts`.

## Arquivos prováveis

- `package.json`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `index.html`
- `src/main.tsx`, `src/app/App.tsx`, `src/content/strings.ts`, `src/theme/tokens.ts`, `src/theme/global.css`
