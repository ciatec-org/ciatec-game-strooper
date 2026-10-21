---
id: SPEC-02
titulo: Blocos hard-coded e gerador de estímulos
status: a fazer
depende_de: [SPEC-01]
gdd: ["§2.1", "§2.4", "§6", "§12"]
requisitos: [RF01, RF02, RNF04, DD-02, DD-06, DD-14]
---

# SPEC-02 — Blocos hard-coded e gerador de estímulos

## Objetivo

Existe uma função pura que, dado um bloco e uma semente, devolve a lista de estímulos daquele bloco, com as proporções certas e sem repetição idêntica seguida. Os três blocos estão definidos no código.

## Ler antes

- GDD §2.1, §2.4, §6 e §12
- [architecture.md](../engineering/architecture.md) (pasta `game/`)
- Resumos: [macleod-1991](../references/summaries/macleod-1991-stroop-review.md) (proporções e sequência), [stroop-color-test](../references/summaries/stroop-color-test.md) (número de itens)

## O que fazer

- `game/types.ts`: `ColorId = 'red' | 'green' | 'blue' | 'yellow'`, `Condition`, `BlockId = 'practice' | 'baseline' | 'stroop'`, `Stimulus { word: string; inkColor: ColorId; condition: Condition; wordColor: ColorId | null }`, `BlockConfig`.
- `game/colors.ts`: a ordem fixa dos quatro `ColorId` e a palavra pt-BR de cada um (`VERMELHO`, `VERDE`, `AZUL` e `AMARELO`).
- `game/blocks.ts`: os três blocos, `as const`, na ordem da sessão, com os valores provisórios abaixo.
- `game/rng.ts`: `createRng(seed: number): () => number` (mulberry32).
- `game/generator.ts`: `buildTrials(block: BlockConfig, rng): Stimulus[]`.
  - Monta a lista exata pelas contagens do bloco e embaralha (Fisher–Yates).
  - **Congruente:** palavra = cor da tinta. **Incongruente:** palavra de outra cor, sorteada entre as três restantes. **Neutra:** estímulo neutro (`NEUTRAL_STIMULUS`), na cor sorteada.
  - As cores de tinta ficam balanceadas dentro de cada condição (cada cor aparece o mesmo número de vezes, ±1).
  - **Sem par palavra + cor idêntico em duas tentativas seguidas** (RF02). Se o embaralhamento violar, troque localmente ou reembaralhe; a função **sempre termina** (limite de tentativas e erro claro se impossível).

## Valores provisórios

| Valor | Provisório | Pendência |
| --- | --- | --- |
| Treino | 12 tentativas: 4 congruentes, 4 incongruentes, 4 neutras; feedback ligado; não pontua | `TODO(GDD-15.7)` |
| Linha de base | 40: 20 congruentes, 20 neutras | `TODO(GDD-15.4)` |
| Stroop | 40: 30 incongruentes, 10 congruentes (75/25, RF02), 0 neutras | `TODO(GDD-15.4)`, `TODO(GDD-15.5)` |
| Estímulo neutro | `XXXX` | `TODO(GDD-15.5)` |
| Mesma cor de tinta seguida | Permitida | `TODO(GDD-15.8)` |
| Palavra de n−1 = tinta de n | Não controlado; a ordem fica no registro para a análise | `TODO(GDD-15.8)` (MacLeod, p. 15–16) |

> **Evidência para a decisão pendente:** Di Russo e Bianco (2023) e MacLeod (1991) indicam que a neutra deveria estar **também no bloco Stroop**, para separar interferência e facilitação no mesmo contexto. O tipo de neutra também muda o valor: com XXXX, a interferência sai cerca de 65 ms maior do que com palavras comuns (MacLeod, p. 10 do PDF). Por isso o `BlockConfig` aceita neutras em qualquer bloco: mudar a decisão é mudar um número.

## Fora do escopo

- Contrabalanceamento da ordem dos blocos (pendência §15.2, item 6). A ordem é um array, para facilitar depois.
- Telas, tempo, resposta.

## Critérios de aceite

- [ ] Para cada bloco, `buildTrials` devolve exatamente as contagens por condição do `blocks.ts`.
- [ ] Teste de propriedade: em 1000 sementes, nunca há par palavra + cor idêntico em seguida.
- [ ] Em 1000 sementes, toda incongruente tem palavra ≠ tinta, e toda congruente tem palavra = tinta.
- [ ] Mesma semente → mesma lista (reprodutível).
- [ ] As cores de tinta ficam balanceadas por condição (±1).
- [ ] Nenhum import de React ou DOM em `game/`.

## Arquivos prováveis

- `src/game/types.ts`, `colors.ts`, `blocks.ts`, `rng.ts`, `generator.ts`, `generator.test.ts`
