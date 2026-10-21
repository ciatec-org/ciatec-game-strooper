# Playbook: implementar uma spec

**Quando usar:** para construir o que uma spec de `docs/specs/` pede.

**Entrada:** o id da spec (ex.: `SPEC-03`).

## Passos

1. **Contexto.** Rode o [organize-context](organize-context.md) com a spec. Leia tudo em "Ler antes". Se a spec toca em tempo ou entrada, leia o [timing.md](../engineering/timing.md) inteiro, sem exceção.
2. **Dependências.** Confira em [docs/specs/README.md](../specs/README.md) que as specs de `depende_de` estão como "feito". Se não estiverem, pare e avise.
3. **Status.** Mude o status da spec para "em andamento" (no cabeçalho e no README das specs). Crie a branch `spec-NN-<slug>`.
4. **Plano.** Liste os arquivos que vai criar ou mudar e confira com "Arquivos prováveis" e com a [architecture.md](../engineering/architecture.md). Arquivo fora da arquitetura: atualize a arquitetura no mesmo PR, ou repense.
5. **Teste primeiro onde houver regra.** Para `game/`, `trial/trialMachine.ts`, `telemetry/` e `timing/`, escreva os testes dos critérios de aceite antes do código.
6. **Implemente** seguindo as [convenções](../engineering/conventions.md): código em inglês, textos em `strings.ts`, valores em `tokens.ts` ou `blocks.ts`, provisórios com `TODO(GDD-15.N)`.
7. **Verifique** cada critério de aceite, um a um:
   - `npm run typecheck && npm run lint && npm test`;
   - os critérios de navegador: rode `npm run dev` e faça a ação descrita.
8. **Revise você mesmo** com o [review-implementation](review-implementation.md).
9. **Feche.** Marque os critérios atendidos na spec, anote decisões e dúvidas em "Notas", mude o status para "em revisão" e abra o PR citando a spec.

## Se aparecer uma decisão de produto

Se a implementação esbarra em algo que o GDD não decide e a spec não dá provisório:

- **Não decida.** Pare, descreva as opções em "Notas" da spec e pergunte ao usuário.
- Se o usuário decidir, registre com [record-decision](record-decision.md) antes de seguir.

## Não faça

- Não implemente o que está em "Fora do escopo", mesmo que pareça rápido.
- Não mude nomes de campos da telemetria sem atualizar o [telemetry.md](../engineering/telemetry.md) e o `schema_version`.
- Não marque como "feito": quem marca é a revisão, depois do merge.
