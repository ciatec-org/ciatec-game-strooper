# Playbook: implementar uma spec

**Quando usar:** para construir o que uma spec de `docs/specs/` pede.

**Entrada:** a task do backlog (ex.: `T-01.1.2`) e a spec que ela cita (ex.: `SPEC-02`). Uma spec é feita aos poucos, por várias tasks, às vezes em sprints diferentes: implemente só o que a task pede.

## Passos

1. **Contexto.** Rode o [organize-context](organize-context.md) com a spec. Leia tudo em "Ler antes". Se a spec toca em tempo ou entrada, leia o [timing.md](../engineering/timing.md) inteiro, sem exceção.
2. **Dependências.** Confira na coluna **Depende de** da task, no [backlog](../backlog.md), que as tasks e os itens da base de que ela depende já estão prontos (o orientador só libera a task quando estão). Não exija que as specs de `depende_de` estejam "feito": o backlog faz specs em partes. Se faltar algo de que a task depende, pare e avise.
3. **Status.** Se a spec ainda está "a fazer", mude para "em andamento" (no cabeçalho e no README das specs). Crie a branch da task, `task-NN-N-N-<slug>` (ex.: `task-01-1-2-game-types`).
4. **Plano.** Liste os arquivos que vai criar ou mudar e confira com "Arquivos prováveis" e com a [architecture.md](../engineering/architecture.md). Arquivo fora da arquitetura: atualize a arquitetura no mesmo PR, ou repense.
5. **Os testes vêm prontos.** Os testes de `game/`, `trial/trialMachine.ts`, `telemetry/` e `timing/` são escritos pelo orientador (a base do backlog). Rode-os antes de começar, para ver o que falta, e de novo no fim. Não escreva testes novos nem mude os da base; se um teste parecer errado, pare e avise.
6. **Implemente** seguindo as [convenções](../engineering/conventions.md): código em inglês, textos em `strings.ts`, valores em `tokens.ts` ou `blocks.ts`, provisórios com `TODO(GDD-15.N)`.
7. **Verifique** cada critério de aceite, um a um:
   - `npm run typecheck && npm run lint && npm test` (os que a SPEC-01 já criou: `typecheck` na parte 1, `test` na parte 2, `lint` na parte 3);
   - os critérios de navegador: rode `npm run dev` e faça a ação descrita.
8. **Revise você mesmo** com o [review-implementation](review-implementation.md).
9. **Feche.** Abra o PR citando a task, a história e a spec (ex.: `T-01.1.2 · US-01.1 · SPEC-02`). Anote decisões e dúvidas em "Notas" da spec. Quando a última task da spec fechar, marque os critérios atendidos e mude o status da spec para "em revisão".

## Se aparecer uma decisão de produto

Se a implementação esbarra em algo que o GDD não decide e a spec não dá provisório:

- **Não decida.** Pare, descreva as opções em "Notas" da spec e pergunte ao usuário.
- Se o usuário decidir, registre com [record-decision](record-decision.md) antes de seguir.

## Não faça

- Não implemente o que está em "Fora do escopo", mesmo que pareça rápido.
- Não mude nomes de campos da telemetria sem atualizar o [telemetry.md](../engineering/telemetry.md) e o `schema_version`.
- Não marque como "feito": quem marca é a revisão, depois do merge.
