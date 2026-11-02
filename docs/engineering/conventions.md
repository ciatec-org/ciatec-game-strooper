# Convenções

## Idioma

| O quê | Idioma |
| --- | --- |
| Nomes de pastas e arquivos, no repositório inteiro (inclusive `docs/`) | **Inglês** |
| Identificadores e comentários, inclusive nos trechos de código dos documentos | **Inglês** |
| Textos de tela | **Português do Brasil**, só em `src/content/strings.ts` |
| Conteúdo da documentação, das specs e dos playbooks | **Português do Brasil** |
| Commits, branches e títulos de PR | **Inglês**, no formato abaixo |
| Valores do JSON de telemetria | Como em [telemetry.md](telemetry.md); as palavras de cor saem em pt-BR (`"VERMELHO"`), como na fonte |

Termos do domínio têm um nome fixo no código:

| Documento (pt-BR) | Código (inglês) |
| --- | --- |
| tentativa | `trial` |
| bloco: treino, linha de base, Stroop | `block`: `practice`, `baseline`, `stroop` |
| condição: congruente, incongruente, neutra | `condition`: `congruent`, `incongruent`, `neutral` |
| cor da tinta | `inkColor` |
| palavra exibida | `word` |
| cruz de fixação | `fixation` |
| intervalo entre estímulos | `isi` |
| tempo de reação | `rt` (sempre em ms) |
| omissão | `omission` (no JSON: `timed_out`) |
| interferência (SIE) | `interference` |
| participante | `participant` |

## TypeScript

- `strict: true`, sem `any`. Para algo de fora (ex.: evento), use `unknown` e estreite o tipo.
- Use **unions de string literal** e não `enum`: `type Condition = 'congruent' | 'incongruent' | 'neutral'`.
- Use `readonly` nos dados hard-coded (`as const`).
- Todo tempo é `number` em milissegundos, e o nome termina em `Ms` quando não for óbvio: `isiMs`, `timeoutMs`.
- Prefira funções e tipos a classes.

## React

- Componentes são funções, com um componente por arquivo, em `PascalCase.tsx`. Hooks seguem o formato `useThing.ts`.
- Os estilos usam **CSS Modules** (`Thing.module.css`), e as cores e medidas vêm de `theme/tokens.ts` como variáveis CSS. Não escreva valores de cor soltos em componente.
- Acessibilidade: os botões são `<button>`, com rótulo de texto, e o foco é visível. Não use `div` clicável.

## Textos

- Todo texto de tela fica em `src/content/strings.ts`, num objeto com chave descritiva em inglês e valor em pt-BR:

```ts
export const strings = {
  start: { title: 'Strooper', begin: 'Começar' },
  instructions: { rule: 'Toque na COR da tinta. Não leia a palavra.' },
} as const;
```

- As palavras de cor (`VERMELHO`, `VERDE`, `AZUL` e `AMARELO`) ficam em `game/colors.ts`, porque são estímulo, e não texto de interface.

## Testes

- Use **Vitest**. Toda função de `game/`, `trial/trialMachine.ts`, `telemetry/` e `timing/` tem teste.
- Use o gerador **com semente** (`game/rng.ts`) nos testes, e nunca `Math.random` direto.
- Teste os invariantes, e não só exemplos. Por exemplo: "em 1000 sorteios, nunca há par palavra+cor idêntico em seguida".
- Componentes: testar com Testing Library só o que tem regra (ex.: a tecla certa dispara a resposta certa).

## Pendências do GDD no código

Quando a spec manda usar um valor provisório, marque assim:

```ts
// TODO(GDD-15.4): provisional trial count until the research team decides.
export const STROOP_TRIALS = 40;
```

O número é o item da seção 15 do GDD. Para listar as pendências: `grep -rn "TODO(GDD" src`.

## Git

- Uma branch por task do backlog, saindo da `develop` atualizada: `task-01-1-2-game-types`.
- Commits pequenos, no formato `type(scope): summary`, em inglês: `feat(trial): measure RT from pointerdown timeStamp`. Os tipos são `feat`, `fix`, `refactor`, `test`, `docs` e `chore`.
- O PR vai para a `develop`, cita a task, a história e a spec (`T-01.1.2 · US-01.1 · SPEC-02`) e marca os cenários de aceite atendidos.
- Antes do PR, rode `npm run typecheck && npm run lint && npm test` (os que a [SPEC-01](../specs/SPEC-01-project-setup.md) já criou: `typecheck` na parte 1, `test` na parte 2, `lint` na parte 3).
