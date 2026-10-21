---
id: SPEC-04
titulo: Botões de resposta e teclado
status: a fazer
depende_de: [SPEC-00, SPEC-03]
gdd: ["§2.2", "§3", "§7.1"]
requisitos: [RF03, RNF02, DD-04]
---

# SPEC-04 — Botões de resposta e teclado

## Objetivo

O participante responde tocando um dos quatro botões com o nome da cor, ou apertando uma das quatro teclas. Os botões ficam sempre no mesmo lugar, e a resposta chega ao ciclo da tentativa com o `timeStamp` do evento.

## Ler antes

- [behaviors.md](../design/behaviors.md) §3 e §4, e [visual-identity.md](../design/visual-identity.md) §4 (decididos na SPEC-00)
- [timing.md](../engineering/timing.md) §Resposta

## O que fazer

- `components/ResponseButtons.tsx`: os quatro `<button>`, na ordem de `game/colors.ts`, com o rótulo de `colors.ts`, no arranjo da SPEC-00. A resposta é capturada no **`onPointerDown`** (não em `onClick`).
- `input/keymap.ts`: as teclas da SPEC-00 → `ColorId`.
- `input/useResponseInput.ts`: liga o `pointerdown` dos botões e o `keydown` da janela ao `respond(color, event.timeStamp)` da SPEC-03. Ignora `event.repeat` e teclas fora do mapa. Registra `responseDevice`.
- Estado "pressionado" do botão (SPEC-00), sem `:hover` nos blocos.
- `touch-action: manipulation` e `user-select: none` nos botões, para evitar o atraso de toque duplo e a seleção de texto.

## Fora do escopo

- O feedback de acerto e erro (SPEC-06).

## Critérios de aceite

- [ ] Os quatro botões ficam no mesmo lugar da primeira à última tentativa (conferir com uma captura no início e outra no fim de um bloco).
- [ ] Teste: cada tecla do `keymap` dispara a cor certa; `repeat` e outras teclas não disparam nada.
- [ ] Teste: a resposta usa o `timeStamp` do evento recebido.
- [ ] Nenhum `onClick` em `ResponseButtons` e em `useResponseInput`.
- [ ] Os botões funcionam no toque (celular ou tablet) e no mouse.
- [ ] Os botões têm foco visível ao usar Tab.

## Arquivos prováveis

- `src/components/ResponseButtons.tsx`, `ResponseButtons.module.css`, `ResponseButtons.test.tsx`
- `src/input/keymap.ts`, `useResponseInput.ts`, `useResponseInput.test.ts`
