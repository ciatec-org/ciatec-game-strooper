# Comportamentos

> **Status: feedback e botões aprovados pelo orientador em 22/11/2026 (SPEC-00 / B-02).** Teclado, textos de tela e pausa ficam para depois. Tempos em `src/theme/tokens.ts`.

## 1 A tentativa, quadro a quadro

| Fase | O que aparece | Entrada aceita | Duração | Fonte |
| --- | --- | --- | --- | --- |
| Fixação | Cruz `+` no centro, botões visíveis | Nenhuma (ignorada) | 200–500 ms, sorteado | RF05 |
| Estímulo | Palavra na cor da tinta, no centro | 1ª resposta (toque ou tecla) | Até a resposta ou 1500 ms | RF04 |
| Feedback | Ver §2 | Nenhuma | 300 ms (`tokens.timing.feedbackMs`) | RF07 · DD-09 |
| Omissão | Ver §2 | Nenhuma | 500 ms (`tokens.timing.omissionFeedbackMs`) | RF04 · DD-09 |

- ☑ **A palavra some quando a resposta chega;** o feedback aparece no botão (22/11/2026).
- **Os botões ficam sempre visíveis e no mesmo lugar**, inclusive na fixação (regra, RNF02).

## 2 Feedback

**Regra:** imediato, breve, sem comemoração longa (RF07). Não usa cor e não pune (DD-09). Não pisca mais de uma vez por segundo.

| Evento | Forma | ☐ |
| --- | --- | --- |
| Acerto | Contorno grosso (3 px, `color.text`) no botão escolhido | ☑ 22/11/2026 |
| Erro | Contorno tracejado no botão escolhido e um ícone neutro (—) | ☑ 22/11/2026 |
| Omissão | Texto discreto "Mais rápido" por 500 ms | ☑ 22/11/2026 |
| Som | Nenhum (DD-10) | ☑ 22/11/2026 |

☑ **Em quais blocos há feedback?** Em todos (treino, linha de base e Stroop), com o mesmo feedback breve (22/11/2026, DD-09). O flag por bloco continua em `game/blocks.ts` (`feedback: boolean`).

> **Evidência:** num estudo com adultos, feedback e pontos a cada tentativa não prejudicaram o efeito Stroop (Wiley et al., 2024, p. 4, 5 e 12; ver o [resumo](../references/summaries/jmir-games-12-e50315.md)).

## 3 Botões de resposta

| Estado | Visual | Comportamento |
| --- | --- | --- |
| Normal | `color.surface`, borda `color.border`, rótulo `color.text` | — |
| Pressionado | Escurece e afunda 2 px, em até 80 ms (`tokens.timing.buttonPressMs`) | A resposta é registrada no `pointerdown` (ver [timing.md](../engineering/timing.md)) |
| Fixação e feedback | Iguais ao normal (não piscam nem esmaecem) | Toques são ignorados |
| Foco do teclado | Contorno de foco visível | — |

☑ Estados acima aprovados em 22/11/2026. **Não há hover** no bloco: o mouse passando por cima de um botão mudaria a tela durante o estímulo.

## 4 Teclado (RF03)

☐ **Quais quatro teclas?** Proposta: `D F J K`, na ordem dos botões em linha (as mãos ficam na posição de repouso). Se os botões forem 2 × 2, `F J` na linha de cima e `V N` na de baixo. **Para depois de janeiro** (SPEC-00).

- A tecla mostra o mesmo feedback do toque no botão correspondente.
- `keydown` com repetição é ignorado.
- ☐ O rótulo da tecla aparece no botão? Proposta: sim, pequeno, só quando um teclado físico for detectado.

## 5 Entre blocos e pausa

- Ao fim de cada bloco, uma tela de transição com o nome do próximo e o botão "Continuar". O próximo bloco só começa no toque.
- ☐ **Pausa dentro do bloco?** A fonte não prevê (GDD §15.3, item 13). Proposta: não; a transição entre blocos funciona como pausa.
- **A aba perdeu o foco:** a tentativa é marcada (`visibility_lost`) e o bloco segue. ☐ Pausar automaticamente?

## 6 Menus

| Elemento | Comportamento |
| --- | --- |
| Código do participante | Obrigatório; sem ele, "Começar" não avança e o campo mostra o aviso. ☐ Texto do aviso |
| Modo daltonismo | ☐ depende da decisão de visual-identity.md §2.3 |
| Resultado | Mensagem de fim; o JSON baixa sozinho ([telemetry.md](../engineering/telemetry.md)). Sem números para o participante (DD-08) |

## 7 Textos de tela

Todos ficam em `src/content/strings.ts`. O time propõe e o orientador aprova:

| Chave | Texto proposto | ☐ |
| --- | --- | --- |
| `instructions.rule` | "Toque na COR da tinta. Não leia a palavra." | ☐ |
| `transition.baseline` | "Agora vamos começar de verdade." | ☐ |
| `transition.stroop` | "Última parte! Continue tocando na cor da tinta." | ☐ |
| `result.done` | "Você terminou! Obrigado por jogar." | ☐ |
