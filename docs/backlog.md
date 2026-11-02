---
doc: Backlog
titulo: Strooper
subtitulo: Plano de trabalho para uma dupla de pré-iniciação científica (ensino técnico)
versao: v1.2
data: 27/10/2026
mudanca: "v1.2: correções da revisão — o M1 não depende do feedback (P3); a US-03.1 não depende mais do motor da tentativa (B-03), e o aceite dos botões fixos foi para a US-03.2; a US-00.1 passa a ser de uma pessoa só (3 h) e deixa de pedir a tela de instruções; a US-00.2 (Git em dupla) sai, porque os estudantes já usam Git, e o total cai para 38,5 h; quem não monta o projeto começa o sprint 1 pelo estudo; as tasks deixam de ter dono (A/B) — cada um escolhe, e estudo e revisão não viram cartão; o feedback segue a forma da oficina e cobre a omissão; jsdom e Testing Library saem da US-01.3; recesso até 19/jan; cada task diz do que depende (coluna Depende de), para o orientador liberar em paralelo o que pode andar junto; a escrita dos testes sai das tasks dos estudantes (a US-01.2 e as tasks de teste da US-02.1 e da US-04.1) e vai para a base (B-01, B-04 e a nova B-05), e o total cai para 32 h; o `colors.ts` passa para a US-01.1, antes do `getCondition`; as tasks marcadas "cada um" não viram cartão; os testes da base cobrem todos os critérios das specs; v1.1: a estudante A monta o projeto, aos poucos, a partir da SPEC-01 (US-00.1, US-01.2 e US-01.3); a B-01 fica só com o rng.ts; as horas passam de 38 h para 41,5 h, sem corte, e a previsão se refaz depois do sprint 2. v1.0: primeira versão."
projeto_vinculado: Strooper
organizacao: CIATec
tipo: backlog
status: rascunho
---

# 1 COMO USAR ESTE PLANO

**Para quem é:** uma dupla de estudantes do ensino técnico, em pré-iniciação científica, com **2 horas por semana cada um**. O plano diz o que construir, em que ordem, e em pedaços de até 2 h, que cabem numa sessão de trabalho (a montagem do projeto, com 2,5 h, é a exceção).

**O que o jogo é, e por quê, está no [GDD](product/GDD-Strooper.md).** Os detalhes técnicos de cada parte estão nas [specs](specs/README.md). Este plano não decide nada sobre o jogo, só organiza o trabalho. Dúvida sobre como algo deve funcionar se responde no GDD; se ele não responde, vai ao orientador.

**Meta:** o app jogável **até o fim de janeiro de 2027**. O mini-estudo com colegas fica para depois.

## 1.1 Como ler uma história

Cada história traz o perfil, as horas, a prioridade e o sprint; a história no formato *Como… quero… para que…*; o que a dupla aprende com ela; os cenários de aceite; e as tasks.

**As tasks não têm dono fixo:** o orientador libera as tasks de cada história no quadro, e cada estudante escolhe a que vai pegar. As tasks marcadas "cada um" nas horas (os estudos e as validações em dupla) valem para os dois e não viram cartão no quadro: o estudo acontece por demanda, dentro da task que precisa dele, e a revisão é a do PR. As demais tasks, inclusive as de camada estudo feitas por uma pessoa (como a montagem do projeto e o ESLint), viram cartão. A camada **estudo** marca uma task de aprender: o agente (Claude Code ou Cursor) ajuda com explicações e pistas, mas quem escreve é o estudante.

## 1.2 Pronta e feita

**Uma história está feita** quando:

- cada cenário de aceite foi visto acontecer (no navegador ou no `npm test`);
- `npm run typecheck`, `npm run lint` e `npm test` passam (cada um a partir de quando é instalado: `typecheck` na US-00.1, `test` com a B-05, antes do sprint 2, e `lint` na US-01.3). Os testes são escritos pelo orientador, na base (seção 1.4): os estudantes só os rodam, e um teste que quebra avisa que a mudança alterou uma regra do jogo;
- o pull request foi revisado pelo colega e está na `develop`.

## 1.3 O ritmo

**Sprints de 2 semanas.** No começo de cada sprint, uma conversa de 15 minutos sobre as histórias do sprint; o orientador libera as tasks no quadro conforme as histórias avançam, e cada um pega a sua. A coluna **Depende de** diz o que precisa estar pronto antes de uma task começar: o orientador libera as tasks cujas dependências já fecharam, e as que não dependem uma da outra andam em paralelo. No fim, cada um mostra no navegador o que fez. **Se uma task ficou uma semana parada, peça ajuda** sem esperar a reunião.

**No sprint 1, ninguém espera o projeto.** A montagem (T-00.1.1) leva mais de uma semana, e quase todo o resto do sprint depende dela. Na primeira semana, quem não está montando instala o Node, faz o estudo de TypeScript (T-01.1.1) e começa os tipos da T-01.1.2 no *playground* do TypeScript; eles entram no projeto quando ele subir, e aí essa pessoa clona o repositório e roda `npm install` e `npm run dev`.

## 1.4 A base pronta

Algumas partes são difíceis e não são o objetivo de aprendizado. Elas são entregues prontas pelo orientador, com ajuda do agente, antes do sprint que precisa delas. **Elas não contam nas horas da dupla.**

**O projeto não está na base: quem o monta são os estudantes**, a partir da [SPEC-01](specs/SPEC-01-project-setup.md), que documenta a stack inteira. Ele é montado aos poucos, cada parte junto da história que precisa dela: Vite, React e TypeScript na US-00.1; o ESLint na US-01.3. **Os testes ficam com o orientador:** o Vitest (parte 2 da SPEC-01) e os testes das regras entram pela base, porque são eles que garantem que o dado da pesquisa sai certo, e escrever teste não é o foco de quem está começando. O ambiente de teste de componente (jsdom e Testing Library) entra junto do primeiro teste de componente, que fica para depois de janeiro.

| Item | O que é | Pronto antes de | Spec |
| --- | --- | --- | --- |
| B-01 | `rng.ts`, o sorteio com semente, e os testes do sorteio: proporções de cada bloco, nunca o mesmo par seguido em 1000 sementes, mesma semente dá a mesma lista, cores de tinta balanceadas em cada condição (±1), incongruente sempre com palavra ≠ tinta e congruente com palavra = tinta (até a v1.0, também o projeto montado, que passou para os estudantes nas US-00.1 e US-01.3, com o Vitest na B-05) | Sprint 3 | SPEC-02 |
| B-02 | Oficina de 1 h de identidade visual com o orientador, com o `tokens.ts` resultante | Sprint 3 | SPEC-00 |
| B-03 | Helper de timing, máquina da tentativa e `useTrialRunner` (sem `StimulusWord` e `FixationCross`, que vêm da US-01.3), com o registro de cada tentativa já trazendo o `response_device` (`pointer`, enquanto não houver teclado), e os testes do reducer e do hook | Sprint 4 | SPEC-03 |
| B-04 | Telas-esqueleto (exceto o `BlockScreen`, feito na T-03.2.1), máquina da sessão, gravador e download do JSON, e os testes do cálculo (`scoring`) com valores conferidos à mão, do `sessionMachine` e do formato do JSON (snapshot) | Sprint 5 | SPEC-05, SPEC-07 |
| B-05 | Vitest instalado (parte 2 da SPEC-01) e os testes do `getCondition` (as três condições; incongruente nunca tem palavra igual à tinta) | Sprint 2 | SPEC-01, SPEC-02 |

# 2 CAPACIDADE E PREVISÃO

| Período | Semanas | Horas da dupla |
| --- | --- | --- |
| 26/out a 18/dez | 8 | 32 h |
| Recesso: 20/dez a 19/jan | — | — |
| 20/jan a 29/jan | 1,5 | 6 h |
| **Total** | **9,5** | **38 h** |

**O plano pede 32 h para 38 h de capacidade.** A montagem do projeto pelos estudantes (v1.1) somou 3,5 h aos sprints 1 e 2; na v1.2, saíram a história de Git em dupla (2 h) e a parte do colega na US-00.1 (1 h), a escrita dos testes passou para a base (7 h), e a criação do `colors.ts` entrou na US-01.1 (0,5 h). Sobram cerca de 6 h para reuniões, imprevistos e o tempo de aprender. Mesmo assim:

- a história **US-03.4 (feedback) é P3**: sai do plano se o sprint 4 apertar;
- se o sprint 5 apertar, o **M2 escorrega uma semana**, para o início de fevereiro.

Depois dos dois primeiros sprints, a dupla soma as horas que realmente fechou e refaz a previsão. É nesse ponto que se vê se a montagem coube nas horas previstas ou se o resto do plano anda uma semana.

| Sprint | Datas | Histórias | Horas |
| --- | --- | --- | --- |
| 1 | 26/out – 06/nov | US-00.1, US-01.1 | 7,5 h |
| 2 | 09/nov – 20/nov | US-01.3 | 6 h |
| 3 | 23/nov – 04/dez | US-02.1, US-03.1 | 6 h |
| 4 | 07/dez – 18/dez | US-03.2, US-03.3 (**M1**), US-03.4 | 8 h |
| 5 | 20/jan – 29/jan | US-04.1, US-04.2, US-04.3 (**M2**) | 4,5 h |

| Marco | O que se vê | Quando |
| --- | --- | --- |
| **M1 · Um bloco joga** | No navegador: cruz, palavra colorida, toque no botão, a próxima; o registro de cada tentativa no console. O feedback (US-03.4, P3) não é condição do M1 | 18/dez |
| **M2 · Sessão completa** | Do código do participante ao fim dos 3 blocos, e o JSON baixado com as médias e o SIE | 29/jan |

# 3 ÉPICOS

| Épico | O que entrega | Horas | Sprint |
| --- | --- | --- | --- |
| EP-00 · Primeiros passos | O projeto montado e rodando, e a primeira mudança | 3 h | 1 |
| EP-01 · Aprender construindo | TypeScript e React, deixando peças reais do jogo, e o resto do projeto montado | 10,5 h | 1–2 |
| EP-02 · Os estímulos | O sorteio dos três blocos, conferido pelos testes da base | 3 h | 3 |
| EP-03 · Jogar um bloco | Botões, a tentativa completa, o feedback | 11 h | 3–4 |
| EP-04 · Sessão completa e dados | O resultado calculado e o arquivo baixado | 4,5 h | 5 |

# 4 HISTÓRIAS E TASKS

## 4.1 EP-00 — Primeiros passos

### US-00.1 — Montar o projeto e fazer a primeira mudança

**Perfil:** Estudante · **Horas:** 3 · **Prioridade:** P1 · **Sprint:** 1 · **Spec:** SPEC-01 (parte 1)

**Feita por uma pessoa só:** quem pega a T-00.1.1 pega também a T-00.1.2.

*Como estudante, quero montar o projeto do Strooper, rodá-lo no meu computador e mudar um texto da tela, para que eu saiba como o projeto é feito, onde as coisas moram e veja o código virar tela.*

**O que aprende:** Node e npm, o `package.json`, o Vite e o servidor de desenvolvimento, o `tsconfig`, onde ficam os textos de tela, e o que o jogo vai medir (GDD §1.1 e §2.1).

**Cenários de aceite:**

- Dado o repositório só com a documentação, quando sigo a parte 1 da SPEC-01, então `npm run dev` abre a tela inicial com o título e o subtítulo vindos de `strings.ts`, e `npm run typecheck` e `npm run build` passam.
- Dado o subtítulo em `src/content/strings.ts`, quando o troco por uma frase minha que explica o efeito Stroop, então a tela mostra a frase nova sem recarregar a página.

| Task | O que fazer | Horas e camada | Depende de |
| --- | --- | --- | --- |
| T-00.1.1 | Instalar o Node e montar o projeto pela parte 1 da SPEC-01 (Vite com React e TypeScript, `tsconfig` estrito, scripts, `strings.ts` com título e subtítulo provisórios, `tokens.ts` provisório e a tela inicial), e abrir o PR | 2,5 h · estudo | — |
| T-00.1.2 | Ler o GDD §1.1 e §2.1 e trocar o subtítulo da tela inicial por uma frase que explique o efeito Stroop | 0,5 h · telas | T-00.1.1 |

## 4.2 EP-01 — Aprender construindo

Cada estudo termina num arquivo real do jogo: nada é exercício jogado fora.

### US-01.1 — Descrever o Stroop em tipos

**Perfil:** Desenvolvedor · **Horas:** 4,5 · **Prioridade:** P1 · **Sprint:** 1 · **Spec:** SPEC-02

*Como desenvolvedor do Strooper, quero descrever os estímulos com tipos, para que o editor me avise quando eu misturar uma cor com uma condição.*

**O que aprendem:** tipos, arrays, *union types*, funções em TypeScript.

**Cenários de aceite:**

- Dado a palavra AZUL em tinta vermelha, quando chamo `getCondition`, então ele devolve `'incongruent'`.
- Dado XXXX em tinta verde, quando chamo `getCondition`, então ele devolve `'neutral'`.
- Dado um `Stimulus` com uma cor inexistente, quando rodo `npm run typecheck`, então o TypeScript acusa o erro.

| Task | O que fazer | Horas e camada | Depende de |
| --- | --- | --- | --- |
| T-01.1.1 | TypeScript Handbook, "Everyday Types", até *union types*, testando no playground | 1 h cada um · estudo | — |
| T-01.1.2 | Criar `ColorId`, `Condition` e `Stimulus` em `src/game/types.ts` (pode começar no *playground* antes de o projeto subir; ver §1.3) | 1 h · regras | T-00.1.1 (o rascunho no *playground* não depende) |
| T-01.1.3 | Criar `src/game/colors.ts`: os quatro `ColorId` na ordem fixa dos botões e a palavra pt-BR de cada um (VERMELHO, VERDE, AZUL e AMARELO) | 0,5 h · regras | T-01.1.2 |
| T-01.1.4 | Criar `getCondition(word, inkColor)` em `src/game/conditions.ts`, usando as palavras do `colors.ts` | 1 h · regras | T-01.1.3 |

### US-01.3 — A palavra na tela

**Perfil:** Participante · **Horas:** 6 · **Prioridade:** P1 · **Sprint:** 2 · **Spec:** SPEC-01 (parte 3) e SPEC-03 (`StimulusWord` e `FixationCross`)

*Como participante, quero ver a palavra colorida no centro da tela, para que eu saiba a que cor responder.*

**O que aprendem:** componente, props, estado e evento em React; o que um *linter* aponta.

**Cenários de aceite:**

- Dado um `Stimulus` com AZUL em tinta vermelha, quando a tela de teste abre, então AZUL aparece em vermelho, no centro.
- Dado a tela de teste, quando toco em "próxima", então aparece a cruz `+` e, em seguida, outro estímulo.
- Dado o ESLint instalado, quando rodo `npm run lint`, então ele passa sem erro.

| Task | O que fazer | Horas e camada | Depende de |
| --- | --- | --- | --- |
| T-01.3.1 | React, "Quick Start" (componentes, props, estado, eventos) | 1 h cada um · estudo | — |
| T-01.3.2 | Componente `StimulusWord`, com palavra e cor por props e cores vindas de `tokens.ts` | 1,5 h · telas | T-01.1.2 |
| T-01.3.3 | Componente `FixationCross` e uma tela de teste com o botão "próxima" | 1,5 h · telas | T-00.1.1; a tela de teste, também T-01.3.2 |
| T-01.3.4 | Instalar o ESLint pela parte 3 da SPEC-01 e corrigir o que ele apontar | 1 h · estudo | T-00.1.1 |

## 4.3 EP-02 — Os estímulos

### US-02.1 — Sortear os estímulos de cada bloco

**Perfil:** Pesquisador · **Horas:** 3 · **Prioridade:** P1 · **Sprint:** 3 · **Spec:** SPEC-02

*Como pesquisador, quero que cada bloco sorteie os estímulos nas proporções definidas, sem repetir o mesmo par seguido, para que os dados sejam comparáveis entre participantes.*

**O que aprendem:** dados no código, embaralhamento, semente aleatória; como um teste pronto aponta o que está errado.

**Cenários de aceite:**

- Dado os testes do sorteio da base (B-01), quando rodo `npm test`, então todos passam: as proporções de cada bloco (no Stroop, 30 incongruentes e 10 congruentes), nunca o mesmo par seguido em 1000 sementes, e a mesma lista para a mesma semente.

| Task | O que fazer | Horas e camada | Depende de |
| --- | --- | --- | --- |
| T-02.1.1 | Criar `BlockId` e `BlockConfig` em `types.ts` e o `blocks.ts` (os 3 blocos, com os valores provisórios da SPEC-02) | 1 h · regras | T-01.1.2 |
| T-02.1.2 | Escrever `buildTrials(block, rng)`: montar a lista com as cores de tinta balanceadas em cada condição (±1) e embaralhar | 2 h · regras | T-02.1.1, T-01.1.4, B-01 |

## 4.4 EP-03 — Jogar um bloco

### US-03.1 — Responder tocando no botão

**Perfil:** Participante · **Horas:** 3 · **Prioridade:** P1 · **Sprint:** 3 · **Spec:** SPEC-04

*Como participante, quero tocar no botão com o nome da cor, para que eu responda rápido e sem confusão.*

**O que aprendem:** por que `pointerdown` e não `click`; por que os botões não mudam de lugar.

**Cenários de aceite:**

- Dado os quatro botões numa tela de teste, quando toco em VERMELHO, então o console mostra VERMELHO e o `timeStamp` do toque.
- Dado a tela de teste, quando clico e solto devagar, então a resposta aparece no console no momento em que o dedo ou o botão do mouse desce, e não quando sobe.

| Task | O que fazer | Horas e camada | Depende de |
| --- | --- | --- | --- |
| T-03.1.1 | Ler [timing.md](engineering/timing.md), "As cinco regras", e explicar ao colega a regra 3 | 0,5 h cada um · estudo | — |
| T-03.1.2 | Componente `ResponseButtons`: 4 botões na ordem de `colors.ts`, resposta no `onPointerDown`, entregue a uma função recebida por props; na tela de teste, essa função mostra a cor e o `timeStamp` no console (o `useTrialRunner` só chega no sprint 4, com a B-03) | 2 h · telas | T-01.1.3, B-02 |

### US-03.2 — Uma tentativa depois da outra

**Perfil:** Participante · **Horas:** 4 · **Prioridade:** P1 · **Sprint:** 4 · **Spec:** SPEC-03 e SPEC-05 (`BlockScreen`)

*Como participante, quero ver a cruz, depois a palavra, responder e seguir para a próxima, para que eu jogue um bloco inteiro.*

**O que aprendem:** como uma máquina de estados conduz a tela; como usar um hook pronto.

**Cenários de aceite:**

- Dado o bloco de treino, quando jogo, então cada tentativa mostra a cruz, a palavra e aceita um toque.
- Dado que eu não responda, quando passam 1500 ms, então a tentativa conta como omissão e a próxima começa.
- Dado um bloco inteiro, quando comparo uma captura do início com uma do fim, então os botões estão no mesmo lugar.

| Task | O que fazer | Horas e camada | Depende de |
| --- | --- | --- | --- |
| T-03.2.1 | `BlockScreen`: ligar o `useTrialRunner` (B-03) a `StimulusWord`, `FixationCross` e `ResponseButtons` | 2 h · telas | B-03, T-01.3.2, T-01.3.3, T-02.1.2, T-03.1.2 |
| T-03.2.2 | Conferir no navegador o timeout e a omissão, anotando o que se viu | 1 h · validação | T-03.2.1 |
| T-03.2.3 | Mostrar no console o registro de cada tentativa (condição, resposta, RT) | 1 h · regras | T-03.2.1 |

### US-03.3 — Marco M1: um bloco no navegador

**Perfil:** Equipe · **Horas:** 2 · **Prioridade:** P1 · **Sprint:** 4 · **Marco M1**

*Como equipe, queremos jogar um bloco inteiro no navegador, para que vejamos o jogo de verdade antes do recesso.*

**Cenários de aceite:**

- Dado `npm run dev`, quando cada um joga o bloco de treino inteiro, errando e deixando passar de propósito, então tudo acontece como no GDD §2.3, sem erro no console. O passo 4 do GDD §2.3 (feedback) só entra se a US-03.4, que é P3, tiver sido feita.

| Task | O que fazer | Horas e camada | Depende de |
| --- | --- | --- | --- |
| T-03.3.1 | Jogar o bloco e anotar o que se viu, regra por regra | 0,5 h cada um · validação | T-03.2.2, T-03.2.3 |
| T-03.3.2 | Corrigir o que apareceu e jogar de novo | 0,5 h cada um · validação | T-03.3.1 |

### US-03.4 — Saber se acertei

**Perfil:** Participante · **Horas:** 2 · **Prioridade:** P3 · **Sprint:** 4 · **Spec:** SPEC-06

*Como participante, quero ver se acertei, errei ou deixei passar, sem levar bronca, para que eu entenda a tarefa enquanto jogo.*

**O que aprendem:** por que o feedback não pode usar cor neste jogo.

**Cenários de aceite:**

- Dado um acerto, um erro e uma omissão, quando vejo a tela em escala de cinza, então ainda distingo os três.
- Dado o feedback na tela, quando passa a duração definida em `tokens.ts`, então ele some e a próxima cruz aparece.

| Task | O que fazer | Horas e camada | Depende de |
| --- | --- | --- | --- |
| T-03.4.1 | Feedback de acerto, erro e omissão, sem cor, na forma decidida na oficina (B-02, SPEC-00) e com a duração de `tokens.ts` | 2 h · telas | B-02, B-03, T-03.2.1 |

## 4.5 EP-04 — Sessão completa e dados

### US-04.1 — Calcular o resultado

**Perfil:** Pesquisador · **Horas:** 1,5 · **Prioridade:** P1 · **Sprint:** 5 · **Spec:** SPEC-07

*Como pesquisador, quero o tempo médio por condição e o SIE de cada sessão, para que eu compare o efeito entre participantes.*

**O que aprendem:** média só dos acertos; por que o treino e as omissões não entram.

**Cenários de aceite:**

- Dado os testes do cálculo da base (B-04), quando rodo `npm test`, então todos passam: os valores batem com os calculados à mão, e o treino e as omissões ficam fora das médias.

| Task | O que fazer | Horas e camada | Depende de |
| --- | --- | --- | --- |
| T-04.1.1 | `scoring.ts`: média de RT por condição e SIE, pelas regras de [telemetry.md](engineering/telemetry.md) | 1,5 h · regras | B-03, B-04 |

### US-04.2 — A sessão do começo ao fim

**Perfil:** Mediador · **Horas:** 2 · **Prioridade:** P1 · **Sprint:** 5

*Como mediador, quero digitar o código do participante, rodar os três blocos e receber o arquivo no fim, para que eu aplique a sessão sem ajuda.*

**Cenários de aceite:**

- Dado o código digitado, quando começo, então os três blocos rodam em ordem e o arquivo baixa no fim.
- Dado o código vazio, quando toco em Começar, então a sessão não começa.

| Task | O que fazer | Horas e camada | Depende de |
| --- | --- | --- | --- |
| T-04.2.1 | Ligar os blocos às telas-esqueleto (B-04) e escrever os textos em `strings.ts` | 1 h · telas | B-04, T-03.2.1 |
| T-04.2.2 | Ligar o registro de cada tentativa ao gravador e o resultado ao download (B-04) | 1 h · regras | T-04.2.1 (mesmos arquivos: de preferência a mesma pessoa), T-04.1.1 |

### US-04.3 — Marco M2: a sessão completa

**Perfil:** Equipe · **Horas:** 1 · **Prioridade:** P1 · **Sprint:** 5 · **Marco M2**

*Como equipe, queremos jogar uma sessão inteira e abrir o arquivo gerado, para que o app esteja pronto para o mini-estudo.*

**Cenários de aceite:**

- Dado uma sessão completa, quando abro o JSON, então ele tem todas as tentativas, as médias e o SIE.

| Task | O que fazer | Horas e camada | Depende de |
| --- | --- | --- | --- |
| T-04.3.1 | Jogar a sessão inteira, abrir o JSON e conferir com o [telemetry.md](engineering/telemetry.md) | 0,5 h cada um · validação | T-04.2.2 |

# 5 DEPOIS DE JANEIRO

Fora deste plano, na ordem sugerida: o mini-estudo com colegas (coletar, abrir os JSON numa planilha, calcular o SIE, apresentar), o teclado (com o primeiro teste de componente, que traz o jsdom e a Testing Library), o modo daltonismo e o acabamento visual.
