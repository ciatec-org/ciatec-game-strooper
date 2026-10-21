# Índice: o que ler para cada tarefa

**Este é o organizador.** Para cada tarefa, ache a linha mais parecida e leia **só** o que ela indica, na ordem. O GDD tem mais de 300 linhas, então leia as seções indicadas, e não o arquivo inteiro.

## Por tipo de tarefa

| Tarefa | Leia, nesta ordem |
| --- | --- |
| **Qualquer implementação** | A spec da tarefa (`docs/specs/`) → [conventions.md](engineering/conventions.md) → [architecture.md](engineering/architecture.md) |
| Ciclo da tentativa: fixação, estímulo, resposta, timeout | [timing.md](engineering/timing.md) → GDD §2.3 e §12 → SPEC-03 |
| Cronômetro, `performance.now`, eventos de entrada | [timing.md](engineering/timing.md) (todo) |
| Botões de resposta, teclado | GDD §2.2 e §3 → [behaviors.md](design/behaviors.md) → SPEC-04 |
| Blocos, sorteio, proporções, condições | GDD §2.1, §2.4, §6 e §12 → SPEC-02 |
| Telas e navegação | GDD §7.3 → [visual-identity.md](design/visual-identity.md) → SPEC-05 |
| Feedback de acerto e erro | GDD §8 → [behaviors.md](design/behaviors.md) → SPEC-06 |
| Cores, fontes, layout, contraste | [visual-identity.md](design/visual-identity.md) → GDD §7.2, §7.4 e §9 |
| Telemetria, JSON, cálculo de RT e SIE | [telemetry.md](engineering/telemetry.md) → GDD §13 → SPEC-07 |
| Textos de tela | GDD §7.3 → `src/content/strings.ts` → [conventions.md](engineering/conventions.md) §Textos |
| Acessibilidade e daltonismo | GDD §2.2 (lacuna), §7.2 e §15.3 → [visual-identity.md](design/visual-identity.md) |
| Decisão de produto nova ou alterada | Playbook [record-decision](playbooks/record-decision.md) → GDD §14 e §15 |
| Escrever uma spec | Playbook [create-spec](playbooks/create-spec.md) → [specs/_template.md](specs/_template.md) |
| Revisar código | Playbook [review-implementation](playbooks/review-implementation.md) |
| Dúvida científica (número de tentativas, neutra, prática, idade) | [Resumos](#referências) → GDD §15 |

## Documentos

| Documento | O que tem | Quando confiar |
| --- | --- | --- |
| [product/GDD-Strooper.md](product/GDD-Strooper.md) | O que o jogo é e por quê; decisões (§14); pendências (§15) | **Fonte de verdade do produto** |
| [product/source-requirements.md](product/source-requirements.md) | Documento original de requisitos (RF/RNF) | Histórico; o GDD prevalece |
| [design/visual-identity.md](design/visual-identity.md) | Paleta, tipografia, layout, telas | Ao desenhar qualquer coisa |
| [design/behaviors.md](design/behaviors.md) | O que cada elemento faz em cada estado | Ao implementar interação |
| [engineering/architecture.md](engineering/architecture.md) | Pastas, camadas, fluxo de dados, máquinas de estado | Ao criar ou mover arquivos |
| [engineering/conventions.md](engineering/conventions.md) | Idioma, nomes, testes, commits, TODOs | Sempre |
| [engineering/timing.md](engineering/timing.md) | Como medir tempo sem estragar o dado | Ao tocar em tempo ou entrada |
| [engineering/telemetry.md](engineering/telemetry.md) | Schema do JSON e regras de cálculo | Ao tocar no registro |
| [backlog.md](backlog.md) | Histórias, tasks de 1–2 h, sprints e marcos da dupla | Para saber o que fazer nesta semana |
| [specs/README.md](specs/README.md) | Quadro das specs e status | Para os detalhes técnicos de uma história |

## Referências

Leia o **resumo**, e não o PDF. Os PDFs são grandes e gastam muito contexto. Abra o PDF só para conferir uma citação, na página indicada.

| Resumo | Assunto |
| --- | --- |
| [macleod-1991-stroop-review.md](references/summaries/macleod-1991-stroop-review.md) | MacLeod (1991): revisão clássica; interferência, facilitação, neutra, prática, crianças |
| [brainsci-13-00982.md](references/summaries/brainsci-13-00982.md) | Di Russo e Bianco (2023): facilitação e interferência separadas pela neutra; EEG |
| [jmir-games-12-e50315.md](references/summaries/jmir-games-12-e50315.md) | Wiley et al. (2024): confiabilidade de um Stroop gamificado; feedback e número de tentativas |
| [stroop-color-test.md](references/summaries/stroop-color-test.md) | Scarpina e Tagini (2017): métodos de pontuação do Stroop Color and Word Test |

## Ordem sugerida de trabalho

Veja [specs/README.md](specs/README.md). Em resumo: **SPEC-00** (identidade visual e comportamentos, a primeira intervenção do time), **SPEC-01** (projeto), e depois as specs 02 a 07.
