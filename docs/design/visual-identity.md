# Identidade visual

> **Status: rascunho. É preenchido pelo time na [SPEC-00](../specs/SPEC-00-visual-identity-and-behaviors.md).** O que já vem do GDD está marcado como **regra**. O que o time decide aparece como **☐ a decidir**, com uma proposta de partida quando houver. Quando o time decide, troca o ☐ por ☑, anota a data e passa o valor para `src/theme/tokens.ts`.

## 1 Princípios (regra)

- **Durante os blocos, a tela é neutra:** sem ilustração, partícula, animação de fundo nem variação de brilho (RNF03, GDD §9.1).
- **A cor é o estímulo.** Nenhum estado da interface (acerto, erro, foco, desabilitado) se indica só pela cor (GDD §7.1).
- **Os botões de resposta não mudam de lugar** durante a sessão (RNF02).
- **Os botões trazem o nome da cor em texto, sobre fundo neutro** (DD-04). MacLeod (1991, p. 21 do PDF) indica que botões com o nome escrito preservam mais interferência do que botões com manchas de cor.
- **Os menus** (início, configurações, resultado) podem ter mais personalidade que os blocos. ☐ a decidir: se seguem o visual dos menus CIATEC, como no Caça às Cores.

## 2 Paleta

### 2.1 Cores de estímulo (regra: vermelho, verde, azul e amarelo, RNF04)

As cores puras **não servem** em nenhum fundo. Contraste calculado pela WCAG, com o mínimo de 4,5 : 1 do GDD §7.2:

| Cor pura | Em branco | Em preto | Em `#1E1E1E` |
| --- | --- | --- | --- |
| `#FF0000` | 4,00 ✗ | 5,25 ✓ | 4,17 ✗ |
| `#00FF00` | 1,37 ✗ | 15,3 ✓ | 12,15 ✓ |
| `#0000FF` | 8,59 ✓ | 2,44 ✗ | 1,94 ✗ |
| `#FFFF00` | 1,07 ✗ | 19,56 ✓ | 15,52 ✓ |

**Proposta de partida (fundo escuro), ☐ a decidir:**

| Token | Cor | Hex | Contraste em `#1E1E1E` |
| --- | --- | --- | --- |
| `color.ink.red` | Vermelho | `#FF6B61` | 5,98 |
| `color.ink.green` | Verde | `#2FD160` | 8,26 |
| `color.ink.blue` | Azul | `#6E9BFF` | 6,19 |
| `color.ink.yellow` | Amarelo | `#FFD43B` | 11,70 |

O time ainda precisa conferir na tela real se as quatro são **nomeadas sem hesitação** pelo público (o azul claro não pode parecer roxo ou ciano, e o vermelho claro não pode parecer laranja ou rosa).

### 2.2 Neutros

| Token | Uso | Proposta | ☐ |
| --- | --- | --- | --- |
| `color.bg` | Fundo dos blocos | `#1E1E1E` | ☐ |
| `color.surface` | Botão de resposta | `#3A3A3A` | ☐ |
| `color.border` | Borda do botão (≥ 3 : 1 contra o fundo) | `#8A8A8A` (4,83) | ☐ |
| `color.text` | Texto de interface e da cruz | `#F2F2F2` (10,16 sobre `#3A3A3A`) | ☐ |

☐ **Fundo claro ou escuro?** Com fundo branco, o amarelo e o verde exigiriam tons escuros, que se afastam do nome da cor. Por isso a proposta é escura.

### 2.3 Daltonismo (RNF04): ☐ a decidir, com o pesquisador

O modo acessível muda a tarefa (GDD §2.2 e §15.3, item 11). Alternativas para o time levar ao orientador:

1. Outra paleta de quatro cores distinguíveis por daltônicos, **com os nomes trocados** (ex.: azul, laranja, branco, preto). Os dados não se comparam com os do modo padrão.
2. Sem modo alternativo: registrar a condição na sessão e tratar na análise.
3. Triagem antes da sessão (fora do jogo).

A escolha registrada no GDD é feita pelo playbook `record-decision`.

## 3 Tipografia

| Elemento | Regra | Proposta | ☐ |
| --- | --- | --- | --- |
| Palavra-estímulo | Maiúsculas, sem serifa, **o mesmo tamanho e peso em todos os estímulos** (GDD §9.1) | Fonte do sistema ou uma fonte self-hosted (sem CDN), peso 700, 64–96 px | ☐ |
| Neutra | O mesmo comprimento médio das palavras de cor | ☐ "XXXX" ou palavras comuns (GDD §15.2, item 5) | ☐ |
| Rótulo dos botões | Maiúsculas, legível a ~30 cm | 20–24 px, peso 600 | ☐ |
| Textos de menu | — | 16–20 px | ☐ |

A fonte é carregada **antes** do primeiro bloco (ver [timing.md](../engineering/timing.md)).

## 4 Layout

### 4.1 Tela do bloco

```
┌──────────────────────────────┐
│                              │
│                              │
│             AZUL             │  ← palavra (ou "+" na fixação), centro exato
│                              │
│                              │
│  ┌─────────┐   ┌─────────┐   │
│  │VERMELHO │   │  VERDE  │   │  ← botões: posição FIXA na sessão
│  └─────────┘   └─────────┘   │
│  ┌─────────┐   ┌─────────┐   │
│  │  AZUL   │   │ AMARELO │   │
│  └─────────┘   └─────────┘   │
└──────────────────────────────┘
```

☐ **Arranjo dos botões:** grade 2 × 2 (proposta, cabe em retrato e paisagem) ou uma linha de 4 (casa com as teclas do teclado). A ordem dos botões é **fixa** e definida em `game/colors.ts`.

☐ **Ordem das cores nos botões:** fixa para todos ou sorteada por participante (fixa na sessão)? Pergunta para o pesquisador.

### 4.2 Medidas (proposta, do GDD §7.4)

| Item | Mínimo |
| --- | --- |
| Janela de referência | 390 × 844 px (retrato) e 844 × 390 px (paisagem) |
| Botão de resposta | 56 px de altura; ☐ largura |
| Separação entre botões | 16 px |
| Distância da palavra aos botões | ☐ |

## 5 Telas

Ver o fluxo no GDD §7.3. Para cada tela, o time desenha um wireframe simples (pode ser à mão, foto em `docs/design/figures/`):

| Tela | O que tem | Wireframe |
| --- | --- | --- |
| Início | Nome, botão Começar | ☐ |
| Configurações | Código do participante, modo daltonismo, ☐ outras opções | ☐ |
| Instruções | A regra, curta, com um exemplo visual | ☐ |
| Transição entre blocos | Nome do próximo bloco, botão Continuar | ☐ |
| Bloco | Ver 4.1 | ☐ |
| Resultado | Mensagem de fim, sem números para o participante (DD-08) | ☐ |

## 6 Tokens

Ao fim da SPEC-00, `src/theme/tokens.ts` contém todos os valores ☑ deste documento, e nenhum componente usa cor ou medida fora dele.
