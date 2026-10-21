# Arquitetura

React + TypeScript + Vite, só no navegador, sem backend. Este documento diz **onde cada coisa mora** e **quem pode depender de quem**. Se uma tarefa pede um arquivo que não cabe aqui, atualize este documento no mesmo PR.

## Princípio

**A lógica do jogo é pura, e o React só desenha e captura entrada.** Tudo que decide (sorteio, regras do bloco, cálculo de RT e SIE, montagem do JSON) é TypeScript sem React e sem DOM, testável com Vitest. Isso deixa as regras científicas verificáveis sem abrir o navegador.

## Pastas

```
src/
  main.tsx                  entrada do Vite
  app/
    App.tsx                 troca de telas pelo estado da sessão
    sessionMachine.ts       máquina de estados da sessão (pura): telas e blocos
  game/                     PURO — sem React, sem DOM
    types.ts                ColorId, Condition, BlockId, Stimulus, TrialRecord…
    colors.ts               os 4 ColorId e a ordem fixa dos botões
    blocks.ts               os 3 blocos HARD-CODED (DD-14): tamanho, proporções, feedback
    generator.ts            buildTrials(block, rng) → Stimulus[]
    rng.ts                  gerador com semente (mulberry32) para testes e reprodução
    scoring.ts              médias de RT, SIE, contagens
  trial/
    trialMachine.ts         PURO: fases da tentativa (fixation → stimulus → feedback → done)
    useTrialRunner.ts       hook que roda a máquina com o relógio e os timers
  timing/
    clock.ts                now() = performance.now(), injetável em testes
    onset.ts                marca o instante em que o estímulo foi pintado
  input/
    keymap.ts               tecla → ColorId (provisório até a SPEC-00)
    useResponseInput.ts     pointerdown + keydown → resposta com timeStamp
  telemetry/                PURO
    schema.ts               tipos do JSON exportado (snake_case)
    recorder.ts             acumula TrialRecord e eventos da sessão
    exportSession.ts        monta o JSON e dispara o download
  screens/                  uma tela por arquivo: Start, Setup, Instructions, Block, Result
  components/               FixationCross, StimulusWord, ResponseButtons, FeedbackMark…
  content/
    strings.ts              TODOS os textos de tela, em pt-BR
  theme/
    tokens.ts               cores, tamanhos e tempos da identidade visual (SPEC-00)
    global.css
```

Os testes ficam ao lado do arquivo: `generator.ts` → `generator.test.ts`.

## Dependências permitidas

```
screens, components ──► trial, input, theme, content, game (tipos)
app ──► screens, game, telemetry
trial ──► game, timing
input ──► game (tipos), timing
telemetry ──► game
game ──► (nada além de si)
```

- `game/` e `telemetry/` **nunca** importam `react`, `window` ou `document`. O download fica isolado em `exportSession.ts`, numa função separada da montagem do JSON.
- Componentes **não** calculam regra. Um componente que precisa saber se a resposta acertou recebe isso pronto.

## Máquinas de estado

### Sessão (`app/sessionMachine.ts`)

```
start → setup → instructions → block(practice) → block(baseline) → block(stroop) → result
```

- Entre blocos há uma tela de transição, curta, com o texto do próximo bloco. **[a definir]**: se ela serve também de pausa (GDD §15.3, item 13).
- A ordem dos blocos vem de `game/blocks.ts`. A ordem é fixa hoje (DD-02), e o contrabalanceamento é pendência (GDD §15.2, item 6). Por isso a ordem é um **array**, e não está espalhada no código.

### Tentativa (`trial/trialMachine.ts`)

```
fixation (200–500 ms) → stimulus (até 1500 ms) → feedback (se o bloco tiver) → done
                              │
                              ├─ resposta → registra RT, acerto/erro
                              └─ timeout  → registra omissão
```

A máquina é um reducer puro: `(state, event) → state`. Os eventos são `FIXATION_END`, `STIMULUS_PAINTED(t)`, `RESPONSE(color, t)`, `TIMEOUT(t)` e `FEEDBACK_END`. Os tempos chegam **dentro dos eventos**, e o reducer nunca lê o relógio. Os timers e o relógio ficam em `useTrialRunner.ts`. Veja [timing.md](timing.md).

## Estado e React

- O estado crítico de tempo (instante do estímulo, resposta já aceita) fica em **`useRef`**, e não em `useState`. Mudar ref não renderiza de novo, e uma renderização a mais na janela do estímulo atrasa a pintura.
- Não há biblioteca de estado global. Use `useReducer` com as máquinas acima, e contexto só para a sessão.
- **StrictMode** fica ligado em desenvolvimento, e todo efeito com timer limpa o que criou. O StrictMode roda os efeitos duas vezes, e um timer sem limpeza vira duas tentativas.

## Dados hard-coded (DD-14)

Os blocos, as palavras, as cores e os parâmetros de tempo ficam em `game/blocks.ts`, `game/colors.ts` e `theme/tokens.ts`. **Não há carregamento de arquivos externos nem backend.** Para mudar um bloco, edite o arquivo e rode os testes do gerador.
