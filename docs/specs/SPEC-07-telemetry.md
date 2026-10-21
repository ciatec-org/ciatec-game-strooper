---
id: SPEC-07
titulo: Telemetria, cálculos e exportação
status: a fazer
depende_de: [SPEC-02, SPEC-03]
gdd: ["§13"]
requisitos: [RF06, RNF05, DD-03, DD-12, DD-13]
---

# SPEC-07 — Telemetria, cálculos e exportação

## Objetivo

Ao fim da sessão, o navegador baixa um JSON com todas as tentativas e o resumo calculado, exatamente no formato do telemetry.md.

## Ler antes

- **[telemetry.md](../engineering/telemetry.md), inteiro**
- GDD §13
- Resumos [brainsci-13-00982](../references/summaries/brainsci-13-00982.md) e [macleod-1991](../references/summaries/macleod-1991-stroop-review.md), parte sobre interferência e neutra

## O que fazer

- `telemetry/schema.ts`: tipos do JSON (snake_case), com `schema_version: 1`.
- `telemetry/recorder.ts`: recebe os registros das tentativas (SPEC-03) e os dados da sessão (código, semente, configurações, `frame_interval_ms`), e guarda em memória.
- `game/scoring.ts`: as regras de cálculo da tabela do telemetry.md, com SIE e as medidas contra a neutra, por bloco e no total.
- `telemetry/exportSession.ts`: `buildSessionJson(...)` (pura) e `downloadSession(json)` (único ponto com DOM: `Blob` + `<a download>`).
- Ligar o download à entrada na tela de resultado (SPEC-05).
- `session_id` com `crypto.randomUUID()`.

## Valores provisórios

| Valor | Provisório | Pendência |
| --- | --- | --- |
| Bloco do SIE | Só o Stroop | `TODO(GDD-15.19)` |
| `player_id` e `timestamp` | Como na fonte | DD-13, aguarda o orientador |
| Exclusão de RT extremo | Nenhuma | `TODO(GDD-15.20)` |

## Fora do escopo

- Envio para servidor, armazenamento no navegador e recuperação de sessão interrompida.

## Critérios de aceite

- [ ] Teste do `scoring` com um conjunto fixo de tentativas e valores esperados calculados à mão (incluir omissão, erro, `visibility_lost` e treino, que não entram nas médias).
- [ ] Com o bloco Stroop sem neutras, `interference_vs_neutral_ms` e `facilitation_vs_neutral_ms` saem `null`.
- [ ] Teste: o JSON tem todos os campos do telemetry.md, com os nomes exatos (comparar com um snapshot).
- [ ] Jogando uma sessão inteira, o arquivo baixa sozinho na tela de resultado e abre num leitor de JSON.
- [ ] `game/scoring.ts` e `telemetry/` (exceto `downloadSession`) não importam React nem DOM.

## Arquivos prováveis

- `src/telemetry/schema.ts`, `recorder.ts`, `exportSession.ts`, `*.test.ts`
- `src/game/scoring.ts`, `scoring.test.ts`
