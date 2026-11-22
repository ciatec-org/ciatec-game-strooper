# Identidade visual

> **Status: essenciais aprovados pelo orientador em 22/11/2026 (SPEC-00 / B-02).** Itens 1, 2 e 5 da SPEC-00 estão ☑. Teclado, daltonismo, wireframes e textos de tela ficam para depois. Valores em `src/theme/tokens.ts`.

## 1 Princípios (regra)

- **Durante os blocos, a tela é neutra:** sem ilustração, partícula, animação de fundo nem variação de brilho (RNF03, GDD §9.1).
- **A cor é o estímulo.** Nenhum estado da interface (acerto, erro, foco, desabilitado) se indica só pela cor (GDD §7.1).
- **Os botões de resposta não mudam de lugar** durante a sessão (RNF02).
- **Os botões trazem o nome da cor em texto, sobre fundo neutro** (DD-04). MacLeod (1991, p. 21 do PDF) indica que botões com o nome escrito preservam mais interferência do que botões com manchas de cor.
- **Os menus** (início, configurações, resultado) podem ter mais personalidade que os blocos. ☑ **Tema escuro CIATEC** (22/11/2026): fundo frio escuro, tipografia sans-serif pesada, acento dourado no título e CTA em azul de marca (`brand.primary` / `brand.accent`). As cores dos cards da peça de referência **não** viram tinta de estímulo.

## 2 Paleta

### 2.1 Cores de estímulo (regra: vermelho, verde, azul e amarelo, RNF04)

As cores puras **não servem** em nenhum fundo. Contraste calculado pela WCAG, com o mínimo de 4,5 : 1 do GDD §7.2:

| Cor pura | Em branco | Em preto | Em `#1E1E1E` |
| --- | --- | --- | --- |
| `#FF0000` | 4,00 ✗ | 5,25 ✓ | 4,17 ✗ |
| `#00FF00` | 1,37 ✗ | 15,3 ✓ | 12,15 ✓ |
| `#0000FF` | 8,59 ✓ | 2,44 ✗ | 1,94 ✗ |
| `#FFFF00` | 1,07 ✗ | 19,56 ✓ | 15,52 ✓ |

**☑ Aprovado em 22/11/2026 (modelo escuro); fundo de bloco atualizado no mesmo dia para navy frio `#121820`:**

| Token | Cor | Hex | Contraste em `#121820` (aprox.) |
| --- | --- | --- | --- |
| `color.ink.red` | Vermelho | `#FF6B61` | ≥ 5,5 |
| `color.ink.green` | Verde | `#2FD160` | ≥ 8 |
| `color.ink.blue` | Azul | `#6E9BFF` | ≥ 6 |
| `color.ink.yellow` | Amarelo | `#FFD43B` | ≥ 11 |

Conferir na tela real, com 3 pessoas do público, se as quatro são nomeadas sem hesitação (o azul não pode parecer roxo ou ciano; o vermelho não pode parecer laranja ou rosa).

### 2.2 Neutros e marca (modelo escuro)

| Token | Uso | Valor | ☐ |
| --- | --- | --- | --- |
| `color.bg` | Fundo dos blocos e da app | `#121820` | ☑ 22/11/2026 |
| `color.surface` | Botão de resposta / painel | `#1E2A36` | ☑ 22/11/2026 |
| `color.surfaceRaised` | Controles de menu elevados | `#2A3A4A` | ☑ 22/11/2026 |
| `color.border` | Borda (≥ 3 : 1 contra o fundo) | `#5A6B7C` | ☑ 22/11/2026 |
| `color.text` | Texto de interface e da cruz | `#F0F4F8` | ☑ 22/11/2026 |
| `color.textMuted` | Eyebrow / texto secundário de menu | `#9AABBA` | ☑ 22/11/2026 |
| `color.brand.primary` | CTA de menu (não é estímulo) | `#40B4E5` | ☑ 22/11/2026 |
| `color.brand.accent` | Destaque de título de menu | `#C9A227` | ☑ 22/11/2026 |

☑ **Modelo escuro em toda a app** (22/11/2026), inclusive menus. Fundo claro da peça CIATEC ficou só como referência de tipografia e acentos; nos blocos a tela continua neutra (RNF03).

### 2.3 Daltonismo (RNF04): ☐ a decidir, com o pesquisador

O modo acessível muda a tarefa (GDD §2.2 e §15.3, item 11). Alternativas para o time levar ao orientador:

1. Outra paleta de quatro cores distinguíveis por daltônicos, **com os nomes trocados** (ex.: azul, laranja, branco, preto). Os dados não se comparam com os do modo padrão.
2. Sem modo alternativo: registrar a condição na sessão e tratar na análise.
3. Triagem antes da sessão (fora do jogo).

A escolha registrada no GDD é feita pelo playbook `record-decision`.

## 3 Tipografia

| Elemento | Regra | Valor | ☐ |
| --- | --- | --- | --- |
| Palavra-estímulo | Maiúsculas, sem serifa, **o mesmo tamanho e peso em todos os estímulos** (GDD §9.1) | Fonte do sistema, peso 700, 80 px | ☑ 22/11/2026 |
| Neutra | O mesmo comprimento médio das palavras de cor | ☐ "XXXX" ou palavras comuns (GDD §15.2, item 5) | ☐ |
| Rótulo dos botões | Maiúsculas, legível a ~30 cm | 22 px, peso 600 | ☑ 22/11/2026 |
| Textos de menu | Sans-serif limpa | 18 px, peso 400 | ☑ 22/11/2026 |
| Título de menu | Sans-serif pesada (inspiração CIATEC) | 40 px, peso 800; accent em `brand.accent` | ☑ 22/11/2026 |
| Eyebrow de menu | Maiúsculas, discreto | 12 px, peso 600, `textMuted` | ☑ 22/11/2026 |

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

☑ **Arranjo dos botões:** grade 2 × 2 (22/11/2026). A ordem dos botões é **fixa** e definida em `game/colors.ts` (vermelho, verde, azul, amarelo).

☑ **Ordem das cores nos botões:** fixa para todos os participantes (22/11/2026).

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

`src/theme/tokens.ts` contém os valores ☑ deste documento (paleta, tipografia, layout 2×2 e tempos de feedback). Nenhum componente usa cor ou medida fora dele.
