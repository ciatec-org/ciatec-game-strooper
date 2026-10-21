---
id: SPEC-00
titulo: Identidade visual e comportamentos
status: a fazer
depende_de: []
gdd: ["§2.2", "§3", "§7", "§8", "§9", "§15.3"]
requisitos: [RNF02, RNF03, RNF04, RF07, DD-04, DD-08, DD-09]
---

# SPEC-00 — Identidade visual e comportamentos

> **Feita numa oficina de 1 h com o orientador** (item B-02 do [backlog](../backlog.md)), para liberar o tempo dos estudantes para o código. O GDD define as regras; a oficina decide como o jogo se parece e como reage, dentro delas. O resultado são dois documentos preenchidos e um arquivo de tokens. Nesta primeira versão, os essenciais são os itens 1, 2, 3 e 5; o teclado (item 4) e o daltonismo ficam para depois de janeiro.

## Objetivo

Ao fim desta spec, [visual-identity.md](../design/visual-identity.md) e [behaviors.md](../design/behaviors.md) não têm mais nenhum ☐ das seções marcadas como essenciais abaixo, as escolhas foram aprovadas pelo orientador, e `src/theme/tokens.ts` tem os valores.

## Ler antes

- [visual-identity.md](../design/visual-identity.md) e [behaviors.md](../design/behaviors.md), inteiros
- GDD §2.2, §7, §8 e §9
- Resumo [macleod-1991-stroop-review.md](../references/summaries/macleod-1991-stroop-review.md), parte sobre resposta manual e botões
- Resumo [jmir-games-12-e50315.md](../references/summaries/jmir-games-12-e50315.md), parte sobre feedback e gamificação

## O que fazer

**Essencial (bloqueia as SPEC-04 a 06):**

1. **Paleta** (visual-identity.md §2.1 e §2.2): escolher fundo e as quatro cores de estímulo, conferir o contraste ≥ 4,5 : 1 (ferramenta: qualquer verificador de contraste WCAG) e testar na tela real com 3 pessoas: elas nomeiam as quatro cores sem hesitar?
2. **Botões** (visual-identity.md §4.1; behaviors.md §3): arranjo (2 × 2 ou linha), ordem das cores, estados.
3. **Feedback** (comportamentos §2): forma do acerto, do erro e da omissão; duração; em quais blocos.
4. **Teclado** (comportamentos §4): as quatro teclas.
5. **Tipografia da palavra-estímulo** (visual-identity.md §3).

**Importante (bloqueia a SPEC-05):**

6. **Wireframes das telas** (visual-identity.md §5).
7. **Textos de tela** (comportamentos §7).

**Para levar ao orientador (não bloqueia código):**

8. **Daltonismo** (visual-identity.md §2.3): trazer as alternativas, e não decidir sozinho.
9. **Neutra:** XXXX ou palavras comuns (GDD §15.2, item 5). Os resumos mostram que a escolha muda a interferência medida.

**Ao fim:**

10. Criar `src/theme/tokens.ts` com os valores ☑ (se a SPEC-01 ainda não acabou, deixar o conteúdo pronto no próprio documento).
11. Registrar no GDD, pelo playbook [record-decision](../playbooks/record-decision.md), as escolhas que respondem itens da seção 15.

## Fora do escopo

- Implementar componentes (SPEC-04 a 06).
- Arte, ilustração, logo e animações elaboradas: o bloco é neutro de propósito (RNF03).

## Critérios de aceite

- [ ] Os itens 1 a 5 estão ☑ nos dois documentos, com data.
- [ ] Toda cor de estímulo tem contraste ≥ 4,5 : 1 contra o fundo, com o valor anotado.
- [ ] Nenhum estado da interface depende só de cor (conferir item a item em comportamentos §2 e §3).
- [ ] Os wireframes das telas estão em `docs/design/figures/` (foto de papel vale).
- [ ] O orientador aprovou (anotar a data no topo de visual-identity.md).
- [ ] As decisões que respondem à seção 15 do GDD foram registradas lá.

## Arquivos prováveis

- `docs/design/visual-identity.md`, `docs/design/behaviors.md`, `docs/design/figures/*`
- `src/theme/tokens.ts`
