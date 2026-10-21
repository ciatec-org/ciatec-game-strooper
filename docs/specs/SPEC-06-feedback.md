---
id: SPEC-06
titulo: Feedback de acerto, erro e omissão
status: a fazer
depende_de: [SPEC-00, SPEC-04]
gdd: ["§8"]
requisitos: [RF07, RNF03, DD-06, DD-09]
---

# SPEC-06 — Feedback de acerto, erro e omissão

## Objetivo

Depois de cada resposta, o participante vê, por um instante, se acertou ou errou, sem cor e sem punição, na forma decidida na SPEC-00. O feedback não atrasa a próxima tentativa além da duração definida.

## Ler antes

- [behaviors.md](../design/behaviors.md) §2 (decidido na SPEC-00)
- GDD §8
- [timing.md](../engineering/timing.md) §O que não fazer na janela do estímulo

## O que fazer

- `components/FeedbackMark.tsx` (ou o estado visual no botão, conforme a SPEC-00) para acerto, erro e omissão.
- Ligar à fase `feedback` da máquina da SPEC-03, com a duração de `tokens.ts`.
- Respeitar `feedback: boolean` de cada bloco em `blocks.ts`. Sem feedback, a fase tem duração zero.
- Sem cor de estado e sem som (DD-10), e nada pisca mais de uma vez por segundo.

## Valores provisórios

| Valor | Provisório | Pendência |
| --- | --- | --- |
| Feedback por bloco | Ligado nos três | `TODO(GDD-15.9)` |
| Duração | 300 ms | `TODO(GDD-15.9)` |

## Critérios de aceite

- [ ] Acerto, erro e omissão se distinguem **com a tela em escala de cinza** (conferir com o filtro de escala de cinza do sistema).
- [ ] Com `feedback: false` no bloco, nada aparece, e a próxima fixação começa logo.
- [ ] A duração do feedback não entra no RT (o RT já foi registrado na resposta).
- [ ] Nenhuma animação passa da duração do token.

## Arquivos prováveis

- `src/components/FeedbackMark.tsx`, `FeedbackMark.module.css`
- `src/trial/useTrialRunner.ts`, `src/theme/tokens.ts`, `src/game/blocks.ts`
