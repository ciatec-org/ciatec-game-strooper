---
id: SPEC-01
titulo: Setup do projeto
status: a fazer
depende_de: []
gdd: ["§11"]
requisitos: [DD-11, DD-12, DD-14]
---

# SPEC-01 — Setup do projeto

> **Feita em três partes**, cada uma junto do item do [backlog](../backlog.md) que precisa dela: a parte 1 na US-00.1 e a parte 3 na US-01.3, pelos estudantes (quem pega a task a monta); a parte 2, dos testes, pelo orientador, no item B-05 da base, antes do sprint 2. Esta spec documenta a stack inteira; montar o projeto é parte do aprendizado, e o agente ajuda com pistas, sem montar pelo estudante.

## Objetivo

Ao fim das três partes, o repositório tem um projeto Vite + React + TypeScript que roda com `npm run dev`, com testes de lógica, lint e checagem de tipos funcionando, e as pastas de `src/` no lugar que a arquitetura diz.

## Ler antes

- [architecture.md](../engineering/architecture.md)
- [conventions.md](../engineering/conventions.md)

## O que fazer

### Parte 1 — o projeto rodando (US-00.1)

- Criar o projeto com Vite (template `react-ts`) na raiz do repositório.
- `tsconfig` com `strict: true` e `noUncheckedIndexedAccess: true`.
- Scripts em `package.json`: `dev`, `build`, `preview` e `typecheck`.
- `src/content/strings.ts` com o título do jogo e um subtítulo provisório, e `src/theme/tokens.ts` com tokens provisórios da proposta de visual-identity.md.
- `App.tsx` mostrando só a tela de início provisória, com o título e o subtítulo vindos de `strings.ts`.
- O `.gitignore` e o `README.md` já existem: confira que os comandos do README que já existem funcionam, e ajuste o que mudar.

### Parte 2 — os testes (B-05, orientador)

- Vitest, com o script `test` no `package.json`.
- Um teste de exemplo, que passa.

### Parte 3 — o lint (US-01.3)

- ESLint com as regras recomendadas de TypeScript e de hooks do React, e o script `lint`. Prettier opcional.
- O modelo `react-ts` do Vite pode já vir com outro linter (como o oxlint) e um script `lint` próprio: troque pelo ESLint, para o projeto ter um linter só.

### Depois, junto do primeiro teste de componente

- Ambiente `jsdom` no Vitest e Testing Library. O primeiro teste de componente previsto é o `ResponseButtons.test.tsx` da SPEC-04, que fica para depois de janeiro (backlog, §1.4 e §5).

### Em todas as partes

- Cada pasta de `src/` nasce quando o primeiro arquivo dela aparece, no lugar que a architecture.md indica. Não crie código de regra nesta spec.

## Fora do escopo

- Qualquer regra de jogo, tela real ou telemetria.
- O `rng.ts`, que vem pronto na base (item B-01 do backlog) e pertence à SPEC-02.
- Backend, roteador, biblioteca de estado ou de UI.

## Critérios de aceite

**Parte 1:**

- [ ] `npm install && npm run dev` abre a tela de início no navegador.
- [ ] `npm run typecheck` e `npm run build` passam.
- [ ] Nenhum texto de tela fora de `strings.ts`.

**Parte 2:**

- [ ] `npm test` roda o teste de exemplo, e ele passa.

**Parte 3:**

- [ ] `npm run lint` passa.
- [ ] As pastas de `src/` que já existem batem com a architecture.md.

## Arquivos prováveis

- Parte 1: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/app/App.tsx`, `src/content/strings.ts`, `src/theme/tokens.ts`, `src/theme/global.css`
- Parte 2: `vite.config.ts` (bloco `test`) ou `vitest.config.ts`, um `*.test.ts` de exemplo
- Parte 3: `eslint.config.js`
