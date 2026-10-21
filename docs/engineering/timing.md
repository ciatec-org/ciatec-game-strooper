# Timing: como medir tempo sem estragar o dado

O tempo de reação (RT) é o dado principal do Strooper. Um erro aqui não quebra a tela: ele gera dados errados que parecem certos. **Leia este documento inteiro antes de mexer em `src/timing/`, `src/trial/` ou `src/input/`.**

## As cinco regras

1. **O relógio é `performance.now()`.** Ele é monotônico e tem resolução de submilissegundo. `Date.now()` pode saltar (sincronização do relógio do sistema) e só tem milissegundos inteiros. Nunca use `Date.now()` para medir intervalo.
2. **A resposta usa `event.timeStamp`**, e não o `performance.now()` lido dentro do handler. O `timeStamp` é o instante em que o navegador recebeu a entrada, na mesma escala do `performance.now()`. Ler o relógio dentro do handler soma o atraso da fila de eventos e do React.
3. **A resposta é `pointerdown` ou `keydown`**, e nunca `click`. O `click` só dispara quando o dedo ou o botão do mouse sobe, o que soma dezenas a centenas de milissegundos ao RT.
4. **O início do estímulo é quando ele é pintado**, e não quando o React muda o estado. Veja "Marcar o início" abaixo.
5. **Os tempos entram nos eventos da máquina.** O reducer (`trialMachine.ts`) nunca lê o relógio; o hook lê e passa. Isso deixa a máquina testável com tempos fixos.

## Marcar o início do estímulo

O React renderiza, faz o commit no DOM, e o navegador pinta no próximo quadro. O instante útil é o do quadro em que a palavra apareceu.

```ts
// timing/onset.ts
export function onNextPaint(callback: (paintedAt: number) => void): () => void {
  let second = 0;
  const first = requestAnimationFrame((frameStart) => {
    // The frame that contains the committed stimulus starts now.
    second = requestAnimationFrame(() => callback(frameStart));
  });
  return () => {
    cancelAnimationFrame(first);
    cancelAnimationFrame(second);
  };
}
```

- Chame no `useLayoutEffect` que roda depois do commit do estímulo.
- O `frameStart` do primeiro `requestAnimationFrame` é o início do quadro em que o estímulo é desenhado. O segundo quadro confirma que ele saiu. Use o `frameStart` como `stimulus_onset_ms`.
- **Precisão:** ±1 quadro (≈16,7 ms a 60 Hz). Isso é um limite do navegador, e não um bug. Registre a taxa de quadros estimada na sessão (veja abaixo) para a análise saber o erro.

## Resposta

```ts
// input/useResponseInput.ts (sketch)
function handlePointerDown(color: ColorId, event: PointerEvent) {
  if (!acceptingRef.current) return;      // ignore before the stimulus and after the first response
  acceptingRef.current = false;
  onResponse(color, event.timeStamp);     // RT = timeStamp - onset
}
```

- Só a **primeira** resposta de cada tentativa conta. As outras são ignoradas e não são registradas como resposta. **[a definir]**: se elas viram um evento separado.
- Ignore `keydown` com `event.repeat === true` e teclas fora do `keymap`.
- Respostas durante a fixação **não contam**. **[a definir]**: se elas são registradas como antecipação.
- O `RT` é `event.timeStamp - onset`, sem arredondar no cálculo. Arredonde só na exportação, se quiser.

## Timeout (1500 ms)

- O prazo é **relativo ao início pintado**: `deadline = onset + 1500`.
- Use `setTimeout` só para *acordar* o código. Ele atrasa (o navegador agrupa timers, e abas em segundo plano ficam mais lentas). Ao acordar, confira se chegou uma resposta com `timeStamp < deadline`. Se chegou, ela vale, e não é omissão.
- Na omissão, registre `timed_out: true`, `player_response: null` e `response_time_ms: null`.

## Intervalo entre estímulos (fixação, 200 a 500 ms)

- Sorteie um inteiro uniforme em [200, 500] por tentativa, com o `rng` da sessão. Registre o valor sorteado (`isi_ms`).
- A cruz `+` aparece durante o intervalo. A resposta não é aceita na fixação.

## A aba perdeu o foco

Se `document.visibilityState` vira `hidden` durante um bloco, o navegador congela os timers e os quadros, e o RT daquela tentativa não vale.

- Marque a tentativa com `visibility_lost: true`. Ela não entra nas médias.
- **[a definir]**: pausar o bloco ou repetir a tentativa (GDD §15.3, item 13). Até lá, só marque e siga.

## Taxa de quadros

Durante a primeira fixação da sessão, meça os intervalos entre `requestAnimationFrame` e registre a mediana como `frame_interval_ms` na sessão. Ela diz a precisão do início do estímulo naquela máquina.

## O que não fazer na janela do estímulo

Entre o início da fixação e a resposta:

- não serializar nem baixar JSON;
- não usar `console.log` em produção;
- não disparar `setState` em componentes que não mudam a tela;
- não carregar fonte, imagem ou áudio. Pré-carregue tudo antes do bloco, para a fonte não trocar no meio de um estímulo.

## Testes

- `trialMachine.ts`: teste com tempos fixos nos eventos ("onset em 1000, resposta em 1742 → RT 742").
- `useTrialRunner.ts`: use `vi.useFakeTimers()` e um relógio injetado (`timing/clock.ts`).
- Verificação manual de cada versão: um bloco com o DevTools aberto na aba Performance, confirmando que não há tarefa longa (>50 ms) na janela do estímulo.
