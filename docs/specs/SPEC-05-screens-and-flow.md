---
id: SPEC-05
titulo: Telas e fluxo da sessão
status: a fazer
depende_de: [SPEC-00, SPEC-03, SPEC-04]
gdd: ["§5.1", "§7.3"]
requisitos: [RF01, RNF03, DD-02, DD-08]
---

# SPEC-05 — Telas e fluxo da sessão

## Objetivo

A sessão vai do início ao resultado: início, configurações (código do participante), instruções, treino, transição, linha de base, transição, Stroop e resultado, com as telas da SPEC-00.

## Ler antes

- GDD §5.1 e §7.3
- [visual-identity.md](../design/visual-identity.md) §5 (wireframes) e [behaviors.md](../design/behaviors.md) §5 a §7
- [architecture.md](../engineering/architecture.md) (máquina da sessão)

## O que fazer

- `app/sessionMachine.ts`: reducer puro com as telas e os blocos na ordem de `game/blocks.ts`.
- Telas em `screens/`: `StartScreen`, `SetupScreen`, `InstructionsScreen`, `TransitionScreen`, `BlockScreen` e `ResultScreen`.
- `SetupScreen`: código do participante obrigatório (sem ele, não avança, e aparece o aviso de `strings.ts`) e o modo daltonismo, se a SPEC-00 o tiver decidido. O clique em "Começar" é o instante zero da sessão ([telemetry.md](../engineering/telemetry.md)).
- `BlockScreen`: usa `useTrialRunner` (SPEC-03) e `ResponseButtons` (SPEC-04) com os estímulos de `buildTrials` (SPEC-02), e entrega os registros para cima.
- `ResultScreen`: mensagem de fim, sem números (DD-08). O download do JSON é ligado na SPEC-07.
- Pré-carregar a fonte antes do primeiro bloco (`document.fonts.ready`).
- Todos os textos vêm de `strings.ts`.

## Fora do escopo

- O cálculo e o download do JSON (SPEC-07).
- Pausa dentro do bloco (pendência do GDD §15.3, item 13).

## Critérios de aceite

- [ ] Teste do `sessionMachine`: a sequência completa de telas, e "Começar" bloqueado sem código.
- [ ] Jogando no navegador, a sessão vai do início ao resultado sem erro no console.
- [ ] Os blocos aparecem na ordem de `blocks.ts`; mudar a ordem no array muda a sessão.
- [ ] Nenhuma tela de bloco tem elemento animado ou decorativo (RNF03).
- [ ] O resultado não mostra números.

## Arquivos prováveis

- `src/app/App.tsx`, `src/app/sessionMachine.ts`, `sessionMachine.test.ts`
- `src/screens/*.tsx`, `src/content/strings.ts`
