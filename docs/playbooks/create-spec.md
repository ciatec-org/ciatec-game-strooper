# Playbook: criar uma spec

**Quando usar:** quando uma tarefa de implementação não tem spec em `docs/specs/`, ou quando uma spec existente ficou grande demais e precisa ser dividida.

**Objetivo:** transformar uma parte do GDD numa entrega pequena, com critérios de aceite verificáveis, que um desenvolvedor ou um agente consiga fazer sem decidir nada de produto.

## Passos

1. Rode o [organize-context](organize-context.md) para a área da spec.
2. **Delimite.** Uma spec cabe em um PR revisável (algo como 1 a 3 dias de trabalho de uma pessoa). Se não couber, divida.
3. **Copie** [docs/specs/_template.md](../specs/_template.md) para `docs/specs/SPEC-NN-<slug>.md`, com o próximo número livre.
4. **Preencha o cabeçalho:** seções do GDD (`gdd`) e requisitos (`requisitos`: RF, RNF, DD) que a spec realiza. Todo requisito citado tem que existir no GDD.
5. **O que fazer:** itens concretos, nomeando arquivos e funções conforme [architecture.md](../engineering/architecture.md) e os nomes de [conventions.md](../engineering/conventions.md).
6. **Valores provisórios:** para cada **[a definir]** do GDD que a spec toca, dê um valor provisório e o `TODO(GDD-15.N)`. Se não houver valor razoável, a spec fica bloqueada: anote em "Notas" e pergunte ao usuário.
7. **Fora do escopo:** liste o que parece fazer parte e não faz. Isso evita que o agente que implementar "complete" demais.
8. **Critérios de aceite:** no formato "Dado…, quando…, então…", cada um verificável por teste ou por uma ação no navegador. Sempre inclua `typecheck`, `lint` e `test`.
9. **Atualize** a tabela de [docs/specs/README.md](../specs/README.md) e, se a spec abrir uma área nova, a tabela do [docs/INDEX.md](../INDEX.md).

## Checagem final

- [ ] Nenhuma decisão de produto nova escondida na spec (se houver, ela vai para o GDD primeiro).
- [ ] Todo critério de aceite dá para conferir sem interpretar.
- [ ] Os nomes de arquivo batem com a arquitetura.
