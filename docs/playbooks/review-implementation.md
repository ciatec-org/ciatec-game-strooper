# Playbook: revisar uma implementação

**Quando usar:** para revisar um PR ou uma mudança local antes do PR, inclusive a sua.

**Entrada:** a spec e o diff (`git diff main...HEAD`).

## Passos

1. Leia a spec: "O que fazer", "Fora do escopo" e "Critérios de aceite".
2. Leia o diff inteiro.
3. Percorra as checagens abaixo, na ordem. Para cada problema, aponte **arquivo:linha**, o que está errado, e o que acontece por causa disso.

## Checagens

### A. A spec

- [ ] Cada critério de aceite tem teste ou foi verificado no navegador (pergunte como, se não estiver claro).
- [ ] Nada do "Fora do escopo" foi feito.
- [ ] Os valores provisórios usam `TODO(GDD-15.N)` com o número certo.

### B. Timing (se tocou em `timing/`, `trial/` ou `input/`)

- [ ] Nenhum `Date.now()` no caminho do RT.
- [ ] A resposta vem de `pointerdown` ou `keydown`, com `event.timeStamp`, e não de `onClick`.
- [ ] O início do estímulo vem de `onNextPaint`, e não do `setState`.
- [ ] O timeout é relativo ao início pintado, e a corrida resposta × timeout é resolvida pelo `timeStamp`.
- [ ] Todo timer e todo `requestAnimationFrame` é limpo na desmontagem.
- [ ] Nenhum trabalho pesado (serialização, log, `setState` desnecessário) entre a fixação e a resposta.

### C. Regras do produto

- [ ] Os botões de resposta não mudam de posição durante a sessão (RNF02).
- [ ] Nada animado ou piscando nos blocos (RNF03), e sem `:hover` nos botões do bloco.
- [ ] Nenhum estado da interface se indica só por cor.
- [ ] O participante não vê números de desempenho (DD-08).

### D. Código

- [ ] `game/` e `telemetry/` não importam React nem DOM (exceto `downloadSession`).
- [ ] Os nomes de domínio seguem a tabela de [conventions.md](../engineering/conventions.md).
- [ ] Nenhum texto de tela fora de `strings.ts`, e nenhuma cor ou medida fora de `tokens.ts`.
- [ ] Nenhum `any` e nenhum `enum`.
- [ ] Os testes usam a semente (`rng.ts`), e não `Math.random`.

### E. Telemetria (se tocou no registro)

- [ ] Os campos batem com o [telemetry.md](../engineering/telemetry.md), com os nomes exatos.
- [ ] Mudança de campo → `schema_version` e histórico atualizados.
- [ ] As regras de cálculo (o que entra e o que não entra nas médias) batem com a tabela.

### F. Documentação

- [ ] Se a arquitetura mudou, o architecture.md foi atualizado.
- [ ] O status da spec foi atualizado.

## Saída

Uma lista ordenada por gravidade: **bloqueia** (dado errado, regra do produto quebrada), **deve corrigir** e **sugestão**. No fim, um veredito: aprovar, ou pedir mudanças.
