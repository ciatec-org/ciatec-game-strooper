# Playbook: organizar o contexto

**Quando usar:** no começo de qualquer tarefa, antes de ler código ou documentos. Também quando alguém pergunta "onde está X?" ou "o que diz o projeto sobre Y?".

**Objetivo:** carregar **só** o que a tarefa precisa. O GDD, os PDFs e o código inteiro não cabem juntos no contexto, e ler demais piora as respostas.

## Passos

1. **Classifique a tarefa** numa linha da tabela "Por tipo de tarefa" de [docs/INDEX.md](../INDEX.md). Se ela cruza duas linhas, junte as duas listas.
2. **Ache a spec.** Se a tarefa é implementar ou corrigir algo, procure em [docs/specs/README.md](../specs/README.md) a spec correspondente. Se não houver, a primeira tarefa é [create-spec](create-spec.md).
3. **Leia na ordem do INDEX**, e no GDD só as seções indicadas. Para achar uma seção: `grep -n "^#" docs/product/GDD-Strooper.md`.
4. **Pendências:** se a tarefa toca em algo marcado como **[a definir]** no GDD, leia o item correspondente da seção 15 e veja se a spec dá um valor provisório.
5. **Ciência:** se a dúvida é científica (número de tentativas, neutra, prática, idade, cálculo), leia os **resumos** em `docs/references/summaries/`, e não os PDFs.
6. **Código:** só agora abra o código, começando pelos arquivos que a spec lista em "Arquivos prováveis".

## Saída

Antes de agir, escreva em 3 a 6 linhas:

- a tarefa, em uma frase;
- a spec (ou "sem spec: criar");
- os documentos e seções lidos;
- as pendências do GDD envolvidas, com o valor provisório de cada uma;
- o que ainda falta saber (se faltar algo que só o usuário sabe, pergunte agora).

## Não faça

- Não leia o GDD inteiro "para garantir".
- Não abra os PDFs para uma pergunta que o resumo responde.
- Não decida uma pendência do GDD por conta própria (veja [record-decision](record-decision.md)).
