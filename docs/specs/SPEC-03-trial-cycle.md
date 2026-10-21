---
id: SPEC-03
titulo: Ciclo da tentativa e timing
status: a fazer
depende_de: [SPEC-01, SPEC-02]
gdd: ["§2.3", "§12"]
requisitos: [RF04, RF05, RNF01, RNF03]
---

# SPEC-03 — Ciclo da tentativa e timing

## Objetivo

Um bloco roda tentativa após tentativa: cruz de fixação, palavra colorida até a resposta ou 1500 ms, e a próxima. Cada tentativa produz um registro com início pintado, instante da resposta, RT e omissão, medidos como diz o timing.md.

## Ler antes

- **[timing.md](../engineering/timing.md), inteiro**
- [architecture.md](../engineering/architecture.md) (máquina da tentativa)
- GDD §2.3

## O que fazer

- `timing/clock.ts`: `now()` com `performance.now()`, e uma forma de injetar outro relógio em teste.
- `timing/onset.ts`: `onNextPaint` como no timing.md.
- `trial/trialMachine.ts`: reducer puro com as fases `fixation → stimulus → feedback → done` e os eventos do architecture.md. Na resposta, calcula RT e acerto. No timeout, marca omissão.
- `trial/useTrialRunner.ts`: hook que, para um `Stimulus[]`:
  - sorteia o intervalo (200–500 ms) com o `rng`, mostra a cruz e, ao fim, mostra o estímulo;
  - marca o início com `onNextPaint`;
  - arma o timeout relativo ao início (`onset + 1500`) e resolve a corrida entre resposta e timeout pelo `timeStamp`;
  - expõe `respond(color, timeStamp)` para a SPEC-04 ligar a entrada (até lá, uma tela de teste com botões provisórios);
  - chama `onTrialComplete(record)` e passa para a próxima tentativa;
  - limpa todos os timers e quadros pendentes na desmontagem (StrictMode).
- Escuta de `visibilitychange`: marca `visibilityLost` na tentativa em curso.
- Uma tela de teste provisória, `components/StimulusWord` e `components/FixationCross` mínimos, para ver o ciclo rodando.

## Valores provisórios

| Valor | Provisório | Pendência |
| --- | --- | --- |
| Tempo máximo | 1500 ms | Fonte (RF04), confirmar em piloto |
| Intervalo | 200–500 ms, uniforme | Fonte (RF05) |
| Feedback | Fase existe, com duração de `tokens`; conteúdo na SPEC-06 | `TODO(GDD-15.9)` |

## Fora do escopo

- Visual final dos botões e do feedback (SPEC-04 e SPEC-06).
- Exportação (SPEC-07). Aqui o registro só é entregue por `onTrialComplete`.

## Critérios de aceite

- [ ] Testes do reducer com tempos fixos: resposta certa, errada, omissão, resposta exatamente no prazo, resposta durante a fixação (ignorada), segunda resposta (ignorada).
- [ ] Teste do hook com `vi.useFakeTimers()`: o intervalo fica sempre em [200, 500], e o timeout dispara em 1500 ms após o início.
- [ ] Nenhum `Date.now()` e nenhum `onClick` no caminho da resposta (`grep`).
- [ ] No navegador, com o DevTools na aba Performance, não há tarefa longa (> 50 ms) entre o início da fixação e a resposta.
- [ ] Desmontar a tela no meio de uma tentativa não deixa timer rodando (sem erro no console).

## Arquivos prováveis

- `src/timing/clock.ts`, `onset.ts`
- `src/trial/trialMachine.ts`, `trialMachine.test.ts`, `useTrialRunner.ts`, `useTrialRunner.test.ts`
- `src/components/StimulusWord.tsx`, `FixationCross.tsx`
