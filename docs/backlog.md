---
doc: Backlog
titulo: Strooper
subtitulo: Plano de trabalho para uma dupla de pré-iniciação científica (ensino técnico)
versao: v1.0
data: 21/10/2026
projeto_vinculado: Strooper
organizacao: CIATec
tipo: backlog
status: rascunho
---

# 1 COMO USAR ESTE PLANO

**Para quem é:** uma dupla de estudantes do ensino técnico, em pré-iniciação científica, com **2 horas por semana cada um**. O plano diz o que construir, em que ordem, e em pedaços de 1 a 2 h, que cabem numa sessão de trabalho.

**O que o jogo é, e por quê, está no [GDD](product/GDD-Strooper.md).** Os detalhes técnicos de cada parte estão nas [specs](specs/README.md). Este plano não decide nada sobre o jogo, só organiza o trabalho. Dúvida sobre como algo deve funcionar se responde no GDD; se ele não responde, vai ao orientador.

**Meta:** o app jogável **até o fim de janeiro de 2027**. O mini-estudo com colegas fica para depois.

## 1.1 Como ler uma história

Cada história traz o perfil, as horas, a prioridade e o sprint; a história no formato *Como… quero… para que…*; o que a dupla aprende com ela; os cenários de aceite; e as tasks.

Nas tasks, **A** e **B** são os dois estudantes (vocês escolhem quem é quem). A camada **estudo** marca uma task de aprender: o agente (Claude Code ou Cursor) ajuda com explicações e pistas, mas quem escreve é o estudante.

## 1.2 Pronta e feita

**Uma história está feita** quando:

- cada cenário de aceite foi visto acontecer (no navegador ou no `npm test`);
- `npm run typecheck`, `npm run lint` e `npm test` passam;
- o pull request foi revisado pelo colega e está no `main`.

## 1.3 O ritmo

**Sprints de 2 semanas.** No começo de cada sprint, uma conversa de 15 minutos para escolher as histórias e dividir as tasks. No fim, cada um mostra no navegador o que fez. **Se uma task ficou uma semana parada, peça ajuda** sem esperar a reunião.

## 1.4 A base pronta

Algumas partes são difíceis e não são o objetivo de aprendizado. Elas são entregues prontas pelo orientador, com ajuda do agente, antes do sprint que precisa delas. **Elas não contam nas horas da dupla.**

| Item | O que é | Pronto antes de | Spec |
| --- | --- | --- | --- |
| B-01 | Projeto montado (Vite, React, TypeScript, Vitest), com `rng.ts` | Sprint 1 | SPEC-01 |
| B-02 | Oficina de 1 h de identidade visual com o orientador, com o `tokens.ts` resultante | Sprint 3 | SPEC-00 |
| B-03 | Helper de timing, máquina da tentativa e `useTrialRunner` | Sprint 4 | SPEC-03 |
| B-04 | Telas-esqueleto, máquina da sessão, gravador e download do JSON | Sprint 5 | SPEC-05, SPEC-07 |

# 2 CAPACIDADE E PREVISÃO

| Período | Semanas | Horas da dupla |
| --- | --- | --- |
| 26/out a 18/dez | 8 | 32 h |
| Recesso: 20/dez a 20/jan | — | — |
| 20/jan a 29/jan | 1,5 | 6 h |
| **Total** | **9,5** | **38 h** |

**O plano usa as 38 h, sem folga.** Reuniões e imprevistos vão comer um pouco. Por isso:

- a história **US-03.4 (feedback) é P3**: sai do plano se o sprint 4 apertar;
- se o sprint 5 apertar, o **M2 escorrega uma semana**, para o início de fevereiro.

Depois dos dois primeiros sprints, a dupla soma as horas que realmente fechou e refaz a previsão.

| Sprint | Datas | Histórias | Horas |
| --- | --- | --- | --- |
| 1 | 26/out – 06/nov | US-00.1, US-00.2, US-01.1 | 8 h |
| 2 | 09/nov – 20/nov | US-01.2, US-01.3 | 8 h |
| 3 | 23/nov – 04/dez | US-02.1, US-03.1 | 8 h |
| 4 | 07/dez – 18/dez | US-03.2, US-03.3 (**M1**), US-03.4 | 8 h |
| 5 | 20/jan – 29/jan | US-04.1, US-04.2, US-04.3 (**M2**) | 6 h |

| Marco | O que se vê | Quando |
| --- | --- | --- |
| **M1 · Um bloco joga** | No navegador: cruz, palavra colorida, toque no botão, a próxima; o registro de cada tentativa no console | 18/dez |
| **M2 · Sessão completa** | Do código do participante ao fim dos 3 blocos, e o JSON baixado com as médias e o SIE | 29/jan |

# 3 ÉPICOS

| Épico | O que entrega | Horas | Sprint |
| --- | --- | --- | --- |
| EP-00 · Primeiros passos | O projeto rodando, a primeira mudança e o git em dupla | 4 h | 1 |
| EP-01 · Aprender construindo | TypeScript, testes e React, deixando peças reais do jogo | 12 h | 1–2 |
| EP-02 · Os estímulos | O sorteio dos três blocos, testado | 5 h | 3 |
| EP-03 · Jogar um bloco | Botões, a tentativa completa, o feedback | 11 h | 3–4 |
| EP-04 · Sessão completa e dados | O resultado calculado e o arquivo baixado | 6 h | 5 |

# 4 HISTÓRIAS E TASKS

## 4.1 EP-00 — Primeiros passos

### US-00.1 — Rodar o projeto e fazer a primeira mudança

**Perfil:** Estudante · **Horas:** 2 · **Prioridade:** P1 · **Sprint:** 1

*Como estudante, quero rodar o Strooper no meu computador e mudar um texto da tela, para que eu saiba onde as coisas moram e veja o código virar tela.*

**O que aprendem:** Node e npm, o servidor de desenvolvimento, onde ficam os textos de tela, e o que o jogo vai medir (GDD §1.1 e §2.1).

**Cenários de aceite:**

- Dado o repositório clonado, quando rodo `npm install` e `npm run dev`, então a tela inicial abre no navegador.
- Dado o subtítulo em `src/content/strings.ts`, quando eu o troco por uma frase minha que explica o efeito Stroop, então a tela mostra a frase nova sem eu recarregar a página.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-00.1.1 | Instalar o Node, clonar o repositório, rodar `npm install` e `npm run dev` | A e B | 0,5 h cada · estudo |
| T-00.1.2 | Ler o GDD §1.1 e §2.1 e escrever em `strings.ts` um subtítulo que explique o efeito Stroop em uma frase (A: tela inicial; B: tela de instruções) | A e B | 0,5 h cada · telas |

### US-00.2 — Git em dupla

**Perfil:** Estudante · **Horas:** 2 · **Prioridade:** P1 · **Sprint:** 1

*Como dupla, queremos trabalhar no mesmo repositório com branches e pull requests, para que um não apague o trabalho do outro.*

**O que aprendem:** branch, commit, pull request, revisão.

**Cenários de aceite:**

- Dado o repositório do Strooper, quando cada um cria uma branch, faz um commit e abre um PR, então o colega revisa e faz o merge.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-00.2.1 | Criar uma branch com a mudança da T-00.1.2, fazer commit e abrir o PR | A e B | 0,5 h cada · estudo |
| T-00.2.2 | Revisar o PR do colega (um comentário, no mínimo) e fazer o merge | A e B | 0,5 h cada · estudo |

## 4.2 EP-01 — Aprender construindo

Cada estudo termina num arquivo real do jogo: nada é exercício jogado fora.

### US-01.1 — Descrever o Stroop em tipos

**Perfil:** Desenvolvedor · **Horas:** 4 · **Prioridade:** P1 · **Sprint:** 1 · **Spec:** SPEC-02

*Como desenvolvedor do Strooper, quero descrever os estímulos com tipos, para que o editor me avise quando eu misturar uma cor com uma condição.*

**O que aprendem:** tipos, arrays, *union types*, funções em TypeScript.

**Cenários de aceite:**

- Dado a palavra AZUL em tinta vermelha, quando chamo `getCondition`, então ele devolve `'incongruent'`.
- Dado XXXX em tinta verde, quando chamo `getCondition`, então ele devolve `'neutral'`.
- Dado um `Stimulus` com uma cor inexistente, quando rodo `npm run typecheck`, então o TypeScript acusa o erro.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-01.1.1 | TypeScript Handbook, "Everyday Types", até *union types*, testando no playground | A e B | 1 h cada · estudo |
| T-01.1.2 | Criar `ColorId`, `Condition` e `Stimulus` em `src/game/types.ts` | A | 1 h · regras |
| T-01.1.3 | Criar `getCondition(word, inkColor)` em `src/game/conditions.ts` | B | 1 h · regras |

### US-01.2 — Provar que as regras funcionam

**Perfil:** Pesquisador · **Horas:** 3 · **Prioridade:** P1 · **Sprint:** 2

*Como pesquisador, quero que as regras do jogo tenham testes, para que um erro de código não vire um dado errado.*

**O que aprendem:** o que é um teste automático; por que a ciência precisa dele.

**Cenários de aceite:**

- Dado os testes de `getCondition`, quando rodo `npm test`, então as três condições passam.
- Dado que alguém quebre `getCondition` de propósito, quando rodo `npm test`, então um teste falha.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-01.2.1 | Rodar `npm test`, ler um teste pronto da base e explicar ao colega o que ele confere | A e B | 0,5 h cada · estudo |
| T-01.2.2 | Escrever os testes de `getCondition` para as três condições | A | 1 h · testes |
| T-01.2.3 | Escrever o teste "incongruente nunca tem palavra igual à tinta" | B | 1 h · testes |

### US-01.3 — A palavra na tela

**Perfil:** Participante · **Horas:** 5 · **Prioridade:** P1 · **Sprint:** 2

*Como participante, quero ver a palavra colorida no centro da tela, para que eu saiba a que cor responder.*

**O que aprendem:** componente, props, estado e evento em React.

**Cenários de aceite:**

- Dado um `Stimulus` com AZUL em tinta vermelha, quando a tela de teste abre, então AZUL aparece em vermelho, no centro.
- Dado a tela de teste, quando toco em "próxima", então aparece a cruz `+` e, em seguida, outro estímulo.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-01.3.1 | React, "Quick Start" (componentes, props, estado, eventos) | A e B | 1 h cada · estudo |
| T-01.3.2 | Componente `StimulusWord`, com palavra e cor por props e cores vindas de `tokens.ts` | A | 1,5 h · telas |
| T-01.3.3 | Componente `FixationCross` e uma tela de teste com o botão "próxima" | B | 1,5 h · telas |

## 4.3 EP-02 — Os estímulos

### US-02.1 — Sortear os estímulos de cada bloco

**Perfil:** Pesquisador · **Horas:** 5 · **Prioridade:** P1 · **Sprint:** 3 · **Spec:** SPEC-02

*Como pesquisador, quero que cada bloco sorteie os estímulos nas proporções definidas, sem repetir o mesmo par seguido, para que os dados sejam comparáveis entre participantes.*

**O que aprendem:** dados no código, embaralhamento, semente aleatória, teste de propriedade.

**Cenários de aceite:**

- Dado o bloco Stroop, quando sorteio, então há 30 incongruentes e 10 congruentes.
- Dado 1000 sementes diferentes, quando sorteio cada bloco, então nunca há duas tentativas seguidas com a mesma palavra e a mesma cor.
- Dado a mesma semente, quando sorteio duas vezes, então a lista é igual.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-02.1.1 | Criar `colors.ts` (as 4 cores e as palavras) e `blocks.ts` (os 3 blocos, com os valores provisórios da SPEC-02) | A | 1 h · regras |
| T-02.1.2 | Escrever `buildTrials(block, rng)`: montar a lista e embaralhar | B | 2 h · regras |
| T-02.1.3 | Teste das proporções de cada bloco | A | 1 h · testes |
| T-02.1.4 | Teste "nunca repete o par" em 1000 sementes | B | 1 h · testes |

## 4.4 EP-03 — Jogar um bloco

### US-03.1 — Responder tocando no botão

**Perfil:** Participante · **Horas:** 3 · **Prioridade:** P1 · **Sprint:** 3 · **Spec:** SPEC-04

*Como participante, quero tocar no botão com o nome da cor, para que eu responda rápido e sem confusão.*

**O que aprendem:** por que `pointerdown` e não `click`; por que os botões não mudam de lugar.

**Cenários de aceite:**

- Dado os quatro botões, quando toco em VERMELHO, então a resposta chega com o `timeStamp` do toque.
- Dado um bloco inteiro, quando comparo uma captura do início com uma do fim, então os botões estão no mesmo lugar.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-03.1.1 | Ler [timing.md](engineering/timing.md), "As cinco regras", e explicar ao colega a regra 3 | A e B | 0,5 h cada · estudo |
| T-03.1.2 | Componente `ResponseButtons`: 4 botões na ordem de `colors.ts`, resposta no `onPointerDown` | A | 2 h · telas |

### US-03.2 — Uma tentativa depois da outra

**Perfil:** Participante · **Horas:** 4 · **Prioridade:** P1 · **Sprint:** 4 · **Spec:** SPEC-03

*Como participante, quero ver a cruz, depois a palavra, responder e seguir para a próxima, para que eu jogue um bloco inteiro.*

**O que aprendem:** como uma máquina de estados conduz a tela; como usar um hook pronto.

**Cenários de aceite:**

- Dado o bloco de treino, quando jogo, então cada tentativa mostra a cruz, a palavra e aceita um toque.
- Dado que eu não responda, quando passam 1500 ms, então a tentativa conta como omissão e a próxima começa.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-03.2.1 | `BlockScreen`: ligar o `useTrialRunner` (B-03) a `StimulusWord`, `FixationCross` e `ResponseButtons` | B | 2 h · telas |
| T-03.2.2 | Conferir no navegador o timeout e a omissão, anotando o que se viu | A | 1 h · validação |
| T-03.2.3 | Mostrar no console o registro de cada tentativa (condição, resposta, RT) | B | 1 h · regras |

### US-03.3 — Marco M1: um bloco no navegador

**Perfil:** Equipe · **Horas:** 2 · **Prioridade:** P1 · **Sprint:** 4 · **Marco M1**

*Como equipe, queremos jogar um bloco inteiro no navegador, para que vejamos o jogo de verdade antes do recesso.*

**Cenários de aceite:**

- Dado `npm run dev`, quando cada um joga o bloco de treino inteiro, errando e deixando passar de propósito, então tudo acontece como no GDD §2.3, sem erro no console.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-03.3.1 | Jogar o bloco e anotar o que se viu, regra por regra | A e B | 0,5 h cada · validação |
| T-03.3.2 | Corrigir o que apareceu e jogar de novo | A e B | 0,5 h cada · validação |

### US-03.4 — Saber se acertei

**Perfil:** Participante · **Horas:** 2 · **Prioridade:** P3 · **Sprint:** 4 · **Spec:** SPEC-06

*Como participante, quero ver se acertei ou errei, sem levar bronca, para que eu entenda a tarefa enquanto jogo.*

**O que aprendem:** por que o feedback não pode usar cor neste jogo.

**Cenários de aceite:**

- Dado um acerto e um erro, quando vejo a tela em escala de cinza, então ainda distingo os dois.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-03.4.1 | Contorno no botão escolhido, diferente para acerto e erro, sem cor, por 300 ms | A | 2 h · telas |

## 4.5 EP-04 — Sessão completa e dados

### US-04.1 — Calcular o resultado

**Perfil:** Pesquisador · **Horas:** 3 · **Prioridade:** P1 · **Sprint:** 5 · **Spec:** SPEC-07

*Como pesquisador, quero o tempo médio por condição e o SIE de cada sessão, para que eu compare o efeito entre participantes.*

**O que aprendem:** média só dos acertos; por que o treino e as omissões não entram.

**Cenários de aceite:**

- Dado um conjunto pequeno de tentativas, com o resultado calculado à mão, quando rodo `scoring`, então os valores batem.
- Dado tentativas de treino e omissões, quando calculo as médias, então elas ficam de fora.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-04.1.1 | `scoring.ts`: média de RT por condição e SIE, pelas regras de [telemetry.md](engineering/telemetry.md) | A | 1,5 h · regras |
| T-04.1.2 | Teste com valores calculados à mão numa planilha | B | 1,5 h · testes |

### US-04.2 — A sessão do começo ao fim

**Perfil:** Mediador · **Horas:** 2 · **Prioridade:** P1 · **Sprint:** 5

*Como mediador, quero digitar o código do participante, rodar os três blocos e receber o arquivo no fim, para que eu aplique a sessão sem ajuda.*

**Cenários de aceite:**

- Dado o código digitado, quando começo, então os três blocos rodam em ordem e o arquivo baixa no fim.
- Dado o código vazio, quando toco em Começar, então a sessão não começa.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-04.2.1 | Ligar os blocos às telas-esqueleto (B-04) e escrever os textos em `strings.ts` | B | 1 h · telas |
| T-04.2.2 | Ligar o registro de cada tentativa ao gravador e o resultado ao download (B-04) | A | 1 h · regras |

### US-04.3 — Marco M2: a sessão completa

**Perfil:** Equipe · **Horas:** 1 · **Prioridade:** P1 · **Sprint:** 5 · **Marco M2**

*Como equipe, queremos jogar uma sessão inteira e abrir o arquivo gerado, para que o app esteja pronto para o mini-estudo.*

**Cenários de aceite:**

- Dado uma sessão completa, quando abro o JSON, então ele tem todas as tentativas, as médias e o SIE.

| Task | O que fazer | Quem | Horas e camada |
| --- | --- | --- | --- |
| T-04.3.1 | Jogar a sessão inteira, abrir o JSON e conferir com o [telemetry.md](engineering/telemetry.md) | A e B | 0,5 h cada · validação |

# 5 DEPOIS DE JANEIRO

Fora deste plano, na ordem sugerida: o mini-estudo com colegas (coletar, abrir os JSON numa planilha, calcular o SIE, apresentar), o teclado, o modo daltonismo e o acabamento visual.
