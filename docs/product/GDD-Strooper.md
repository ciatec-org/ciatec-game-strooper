---
doc: GDD — Game Design Document
titulo: Strooper
subtitulo: Tarefa de Efeito Stroop, em fases, para estudo de controle inibitório e atenção seletiva
versao: v0.4
mudanca: pastas e arquivos do repositório em inglês (docs/product, design, engineering, references, specs, playbooks). v0.3: TypeScript; código em inglês e documentação em português; documentos reorganizados em docs/ (produto, design, engenharia, specs). v0.2: stack em React no navegador, sem backend; fases hard-coded e locais (DD-11, DD-12, DD-14). v0.1: primeira versão, derivada do documento de requisitos técnicos e conceito. Tudo que o documento-fonte não define está marcado como pendente (seção 15).
data: 21/10/2026
projeto_vinculado: Strooper (serious game)
organizacao: CIATec (contexto ilustrativo)
triple_diamond: 1º Diamante — definição inicial, proposta
ppi: nenhum até o momento
pesquisador: "[a definir]"
tipo: requisitos
ids_externos: RF, RNF, RT
status: rascunho
data_criacao: 21/10/2026
data_atualizacao: 21/10/2026
fonte: docs/product/source-requirements.md
---

> **Como ler este documento.** A fonte é o documento de requisitos técnicos (citado como *fonte*). Os identificadores RF01 a RF07, RNF01 a RNF05 e a estrutura de telemetria são da fonte e se mantêm. Decisões novas deste GDD têm identificador `DD-xx` (seção 14). Onde a fonte não decide, o item está em **[a definir]** e aparece na seção 15. Os valores numéricos da fonte são de partida, e se confirmam em testes piloto.

# 1 CONCEITO DO JOGO

## 1.1 Premissa

*A criança, ou o participante, vê uma palavra de cor de nome colorido, como a palavra **AZUL** escrita em vermelho, e responde à **cor da tinta**, ignorando o significado da palavra. Em cada tentativa, toca o botão da cor certa. Em três blocos seguidos, a tarefa fica mais difícil: primeiro treina, depois mede uma linha de base, e por fim enfrenta o conflito.*

**A sensação:** *LER É AUTOMÁTICO, MAS O PEDIDO É A COR.*

O efeito Stroop é um fenômeno clássico. A leitura de uma palavra é automática e rápida; identificar a cor da tinta é intencional e um pouco mais lento. Quando as duas informações entram em conflito, o tempo de reação sobe. A diferença entre as condições incongruente e congruente é a **interferência** (RF06).

## 1.2 Gênero e Plataforma

**Gênero:** jogo sério de tarefa cognitiva, em blocos, com resposta por clique ou toque.

**Modo de jogo:** um jogador por sessão. **[a definir]**: se há um mediador (um adulto que inicia a sessão e observa) e se ele é necessário em todas as sessões (ver 1.3 e 15.1).

**Plataforma:** aplicação web em **React com TypeScript**, rodando no navegador, sem backend nesta etapa (seção 11).

**Interação:** clique ou toque em um botão de resposta; teclado como alternativa (RF03).

## 1.3 Público-Alvo

**[a definir].** A fonte não diz a faixa etária nem o perfil. Um estudo de controle inibitório pode ter crianças, adultos ou pacientes, e cada caso muda o texto da tela, o tamanho dos alvos e a duração do treino. Este GDD precisa dessa resposta antes de fechar as seções 2, 7 e 12.

# 2 MECÂNICAS

## 2.1 Conceito Geral

**Nomear a cor, e não ler a palavra.** Cada estímulo é uma palavra escrita numa cor. O participante escolhe, entre quatro botões, o nome da **cor da tinta**.

### As três condições (fonte, seção 1.2)

| Condição | Descrição | Exemplo | Resposta correta |
| --- | --- | --- | --- |
| **Congruente** | Palavra e cor coincidem | VERMELHO em vermelho | VERMELHO |
| **Incongruente** | Palavra e cor conflitam | AZUL em vermelho | VERMELHO |
| **Neutra** | Estímulo sem significado de cor | XXXX em verde | VERDE |

A condição **incongruente** é a que cria o conflito. A **congruente** é a de referência para a interferência, e a **neutra** é a linha de base sem palavra de cor. Como a fonte não diz se a neutra usa símbolos ou palavras sem sentido, isso fica em **[a definir]** (seção 15).

## 2.2 Os estímulos e as respostas

**Quatro cores, quatro palavras.** A fonte fixa as quatro cores de resposta: vermelho, verde, azul e amarelo (RNF04). Cada uma tem uma palavra em português, em maiúsculas: VERMELHO, VERDE, AZUL e AMARELO.

**Os botões de resposta trazem o nome da cor, em texto.** **Recomendação (DD-04):** os botões ficam em cor neutra, com o nome escrito. Se tivessem a cor da resposta, a tela daria uma pista visual que compete com a tarefa, e a interface passaria a ter uma informação a mais para ler.

> **Lacuna de acessibilidade.** O RNF04 pede um modo acessível ao daltonismo, mas na tarefa a cor é o estímulo. Um participante que não distingue vermelho de verde não faz a tarefa da mesma forma. Isso é uma escolha de pesquisa, e não só de interface (seção 15).

## 2.3 O ciclo de uma tentativa

1. **Fixação.** Uma cruz `+` na tela, por **200 a 500 ms** (RF05).
2. **Estímulo.** A palavra aparece na cor. Fica visível até a resposta ou até **1500 ms** (RF04).
3. **Resposta.** O participante toca um botão ou aperta uma tecla. O jogo registra a resposta e o tempo de reação (RNF01).
4. **Retorno.** Feedback visual ou sonoro, imediato e breve (RF07).
5. **Próxima tentativa.** Volta ao passo 1.

Se o tempo de 1500 ms acaba sem resposta, a tentativa conta como **omissão** (RF04), e o ciclo segue.

## 2.4 Os blocos

O jogo tem **três blocos, em sequência** (RF01):

| Bloco | Condições | Conta para o resultado? |
| --- | --- | --- |
| **1 · Treino** | **[a definir]** (número e condições) | **[a definir]**. Recomendação: não conta (DD-06) |
| **2 · Linha de base** | Congruente e neutra (RF01) | Sim, para a média de referência |
| **3 · Stroop** | Incongruente, com congruentes (RF02) | Sim, para a interferência |

**A proporção no bloco Stroop:** 75 % incongruentes e 25 % congruentes (RF02). A fonte não diz a proporção do bloco de linha de base nem se a neutra entra no bloco Stroop; ambas estão em **[a definir]**.

**Sorteio sem repetição idêntica seguida** (RF02): duas tentativas seguidas não podem ter o mesmo par palavra e cor. O documento não define se a mesma resposta correta pode se repetir seguida; esse ponto está em **[a definir]** (seção 15).

# 3 CONTROLES

Neste documento, **tocar** é clicar com o mouse ou tocar na tela.

- **Responder:** um clique ou toque no botão da cor (RF03). A resposta não exige arrastar, segurar nem duplo clique.
- **Teclado (alternativa):** quatro teclas fixas, uma por cor (RF03). **[a definir]** quais teclas. Recomendação: teclas da linha inferior do teclado, na ordem dos botões.
- **Pausa e saída:** **[a definir]**. A fonte não prevê pausa. Como o tempo de reação é sensível a interrupções, este GDD recomenda uma pausa entre blocos, sem contar o tempo parado (ver seção 13).

O jogo não usa câmera, microfone nem outro sensor. **[a definir]**: a fonte não diz, mas o escopo de sensores deve ser confirmado.

# 4 TREINO

**O bloco de treino existe** (RF01), mas a fonte não define o conteúdo.

**Recomendação (DD-06):**

- Treino com poucas tentativas, com as três condições, para que o participante entenda a tarefa antes do bloco 2;
- Com **feedback** (certo ou errado), para que a regra fique clara;
- **Não conta** para a média de referência nem para a interferência;
- Pode ser repetido se o mediador achar que o participante não entendeu.

Se o treino tiver feedback e os outros blocos não, a diferença entre eles entra na análise, e isso precisa ser decidido antes do piloto.

# 5 DINÂMICAS E PROGRESSÃO

## 5.1 Arco de uma sessão

| Etapa | O que acontece | Duração ilustrativa |
| --- | --- | --- |
| Início | Tela inicial e configurações do mediador (seção 7.3) | 1 minuto |
| Bloco 1 · Treino | Tentativas com feedback, não contadas | **[a definir]** |
| Bloco 2 · Linha de base | Congruentes e neutras | **[a definir]** |
| Bloco 3 · Stroop | Incongruentes e congruentes, 75/25 | **[a definir]** |
| Resultado | Cálculo dos indicadores (RF06) e envio ou gravação (RNF05) | segundos |

A fonte mostra um exemplo com **60 tentativas no total** (seção 4 da fonte). Como a divisão entre blocos não está escrita, o número de 60 é só um exemplo.

## 5.2 Não há progressão

Diferente do Caça às Cores, o Strooper **não tem fases que se liberam**. Os três blocos são fixos e seguem a mesma ordem. A dificuldade muda entre blocos, e não dentro deles.

**Consequência:** a ordem fixa faz a prática melhorar o desempenho no bloco 3, e isso pode se confundir com a interferência. Como contrabalancear (ou não) a ordem é uma decisão de pesquisa, e está em **[a definir]** (seção 15).

# 6 LEVEL DESIGN

**O que faz uma tentativa mais difícil** é a condição, a proporção de incongruentes e o tempo máximo de 1500 ms. A fonte não prevê outras variáveis (tamanho de fonte, número de botões, cores parecidas).

| Bloco | Condições | Proporção | Tempo máximo |
| --- | --- | --- | --- |
| 1 · Treino | **[a definir]** | **[a definir]** | 1500 ms (RF04) |
| 2 · Linha de base | Congruente e neutra | **[a definir]** | 1500 ms |
| 3 · Stroop | Incongruente e congruente | 75 % incongruente, 25 % congruente (RF02) | 1500 ms |

**Recomendação (DD-07):** mudar uma variável por vez entre blocos, como no Caça às Cores. Se o bloco 2 e o bloco 3 diferem em mais de uma coisa, a interferência não pode ser atribuída a uma só.

# 7 UI / UX

## 7.1 Princípios de interface

- **Neutra durante os blocos de teste.** Sem elementos animados ao fundo, partículas ou variações de brilho (RNF03).
- **Botões fixos.** A posição dos botões de resposta não muda durante a sessão, para que o tempo de busca visual não contamine os dados (RNF02).
- **Feedback mínimo.** Visual ou sonoro, imediato, sem animação longa (RF07).
- **Sem estado só pela cor.** O acerto e o erro se indicam por forma, texto ou movimento. A cor é o estímulo, e não o retorno.

## 7.2 Requisitos de acessibilidade

| Domínio | Requisito |
| --- | --- |
| Visual | Contraste das cores de estímulo contra o fundo de **4,5 : 1** no texto (WCAG 1.4.3), e de **3 : 1** nos botões (WCAG 1.4.11). Modo para daltonismo no menu inicial (RNF04), com a lacuna da seção 2.2 |
| Motor | Clique ou toque simples, com áreas de resposta amplas. **[a definir]** o tamanho mínimo, por causa do público (seção 1.3) |
| Linguístico | Instrução em texto, curta. **[a definir]** se a instrução também é falada |
| Sensorial | Nenhum flash, nenhum som abrupto. Nada alterna claro e escuro mais de uma vez por segundo (padrão do Caça às Cores, seção 7.2 daquele GDD) |

## 7.3 Telas e fluxo

**Início → Configurações → Instrução → Treino → Linha de base → Stroop → Resultado.**

- **Início:** nome do jogo e botão para começar. **[a definir]** o conteúdo.
- **Configurações (mediador):** código do participante, modo daltonismo (RNF04) e opções da sessão. **[a definir]** quais opções.
- **Instrução:** a regra, em texto e curta: "Toque na cor da palavra. Não leia a palavra." **[a definir]** o texto final.
- **Blocos:** só a tentativa, com os botões de resposta. Sem contador visível, para não pressionar a criança.
- **Resultado:** **[a definir]** quem vê. Recomendação (DD-08): o participante não vê os números, que vão só para o registro e o mediador.

## 7.4 Medidas e alvos

**[a definir].** A fonte não dá tamanhos. Recomendação: medidas em CSS px, com referência de 390 × 844 px (a mesma janela do Caça às Cores), botões de resposta de pelo menos 56 px e separação de 16 px, e a palavra legível a cerca de 30 cm. O layout deve se adaptar à janela, sem medidas fixas que quebrem em outra tela.

# 8 FEEDBACK E MOVIMENTO

**O feedback informa e não pune** (DD-09). Acerto e erro são curtos, e o próximo estímulo não espera por eles além do necessário.

| Evento | Retorno proposto | Duração |
| --- | --- | --- |
| Acerto | Contorno no botão escolhido, sem cor | **[a definir]**; recomendação até 300 ms |
| Erro | Contorno e um ícone neutro (por exemplo, um traço), sem cor e sem som punitivo | **[a definir]**; recomendação até 300 ms |
| Omissão | Texto "Responda mais rápido" ou nada | **[a definir]** |

O RF07 pede feedback "sutil". Se o feedback for mesmo sonoro, o som deve ser curto e suave.

**[a definir]:** se o feedback existe em todos os blocos ou só no treino. Os dois são válidos, e a escolha muda a interpretação do erro (seção 15).

# 9 ARTE E DIREÇÃO VISUAL

## 9.1 Estilo e paleta

- **Fundo neutro e uniforme**, o mesmo nos blocos (RNF03). Sem ilustração, para não competir com a palavra.
- **Quatro cores de estímulo:** vermelho, verde, azul e amarelo (RNF04). Os valores exatos ficam num lugar só, para ajustar sem mexer no código, e cada um precisa passar no contraste da seção 7.2 contra o fundo.
- **Palavras em maiúsculas**, em fonte sem serifa, com o mesmo tamanho em todos os estímulos. Tamanho de fonte é uma variável que pode virar pista (palavras maiores atraem mais atenção): deve ser fixo.

## 9.2 Os estímulos

- A palavra, centralizada, na cor do estímulo.
- A neutra: **[a definir]** (a fonte usa "XXXX"; pode ser símbolos ou letras sem sentido, com o mesmo comprimento).

# 10 ÁUDIO

**Não há áudio definido na fonte.** Recomendação (DD-10): sem áudio na tarefa principal, para não introduzir estímulo além do visual. Se houver feedback sonoro, ele é curto e suave, e pode ser desligado pelo mediador.

# 11 TECNOLOGIA E PLATAFORMA

**Stack (DD-11):** **React com TypeScript**, rodando no navegador. O código é em inglês, e a documentação e os textos de tela em português (`docs/engineering/conventions.md`). A interface é em React; o relógio da tarefa é `performance.now()` (RNF01), que não depende do ritmo de quadros da tela.

**Fases fixas no código (DD-14):** os três blocos (treino, linha de base e Stroop), as condições e a proporção 75/25 são **hard-coded** localmente, em módulos de configuração do próprio projeto. Não há carregamento de fases de fora, nem edição por interface.

**Armazenamento (DD-12):** **local**, sem backend. Ao fim da sessão, o jogo gera o arquivo JSON da seção 13 e o oferece para download, sem nome do participante. Nada é enviado para servidor.

**Fora desta etapa:** backend, banco de dados, login, painel do pesquisador e geração de fases por configuração. Entram depois, se houver necessidade (seção 15.4).

# 12 PARÂMETROS

| Variável | Valor de partida | Fonte |
| --- | --- | --- |
| Tempo máximo do estímulo | 1500 ms | RF04 |
| Intervalo entre estímulos (cruz) | 200 a 500 ms | RF05 |
| Proporção no bloco Stroop | 75 % incongruente, 25 % congruente | RF02 |
| Cores de resposta | Vermelho, verde, azul, amarelo | RNF04 |
| Repetição idêntica seguida | Proibida (par palavra e cor) | RF02 |
| Número de tentativas por bloco | **[a definir]** | — |
| Duração do feedback | **[a definir]** | — |

# 13 TELEMETRIA E REGISTRO

**Registra-se cada tentativa**, para análise (RNF05). A estrutura da fonte (seção 4 dela) é a base:

```json
{
  "session_id": "uuid-v4-12345",
  "player_id": "usr_98765",
  "timestamp": "2026-10-21T18:45:00Z",
  "summary": {
    "total_trials": 60,
    "total_correct": 54,
    "total_errors": 4,
    "total_omissions": 2,
    "mean_rt_congruent_ms": 620.5,
    "mean_rt_incongruent_ms": 785.2,
    "stroop_interference_effect_ms": 164.7
  },
  "trials": [
    {
      "trial_index": 1,
      "block_type": "incongruent",
      "text_displayed": "AZUL",
      "color_displayed": "#FF0000",
      "correct_response": "VERMELHO",
      "player_response": "VERMELHO",
      "is_correct": true,
      "response_time_ms": 742,
      "timed_out": false
    }
  ]
}
```

## 13.1 Proposta de ajuste

Sem mudar os campos da fonte, este GDD propõe (DD-13):

- **Campo `condition`** em cada tentativa (`congruent`, `incongruent` ou `neutral`). Hoje a condição é deduzida de `block_type` e do texto, e a neutra não cabe em `block_type`.
- **Campo `block`** (treino, linha de base, Stroop), separado da condição.
- **Instantes:** o da apresentação do estímulo e o da resposta, em milissegundos desde o início da sessão, e não só `response_time_ms`. Assim a base do tempo de reação pode ser escolhida na análise, como faz o Caça às Cores.
- ~~**Tentativas até acertar**~~ — retirado em 21/10/2026: no Strooper cada tentativa aceita uma resposta só (seção 2.3), e não há nova tentativa.
- **`timestamp` relativo** ao início da sessão, e não absoluto, pelo mesmo motivo do Caça às Cores (DD-13 daquele GDD): o relógio de parede não entra no registro.
- **Código pseudônimo** no lugar de `player_id` (`usr_98765` é um identificador de conta). A tabela que liga o código à pessoa fica fora do jogo.

## 13.2 Cálculos

- **Tempo de reação médio** por condição, **só para acertos na primeira tentativa** (RF06 fala em "acertos"; a regra vale para a média, e não para a contagem).
- **Efeito de interferência (SIE):** média incongruente menos média congruente (RF06). **[a definir]** se ele é calculado só no bloco Stroop ou também com a neutra.
- **Erros e omissões** contam à parte, e não entram na média de tempo de reação.

> **Atenção de linguagem.** O SIE e as médias são **indicadores descritivos de eventos de tarefa**. Não são medida diagnóstica (DD-03, seção 14). A fonte chama o SIE de "score psicométrico" (RF06) e fala em "avaliação clínica" (RF07); o texto final deve evitar isso, a menos que haja validação.

# 14 DECISÕES DE DESIGN

> Identificadores estáveis: decisão revista mantém o número, e decisão morta não tem o número reaproveitado.

**DD-01 — Tarefa de cor, com a palavra como distrator.** A regra é sempre responder à cor da tinta. Fonte, seção 1.1.

**DD-02 — Três blocos fixos, em sequência.** Treino, linha de base e Stroop, nessa ordem. Fonte, RF01. A ordem fixa é uma limitação conhecida (seção 5.2).

**DD-03 — Indicadores descritivos, não diagnósticos.** O jogo não diagnostica nem mede isoladamente atenção ou controle inibitório. **Proposta**, derivada da linguagem da fonte (RF06, RF07). Ver também o Caça às Cores (DD-14 daquele GDD), que decidiu o mesmo.

**DD-04 — Botões com o nome da cor, em cor neutra.** Os botões não usam a cor do estímulo, para não dar pista. **Proposta**, em recomendação.

**DD-05 — Tempo máximo de 1500 ms por tentativa, com omissão.** Fonte, RF04.

**DD-06 — Treino com feedback, sem contar.** **Proposta.** Número e condições em aberto.

**DD-07 — Uma variável por vez entre blocos.** **Proposta**, como o Caça às Cores (DD-05 daquele GDD).

**DD-08 — O participante não vê os números.** **Proposta**, como o Caça às Cores (DD-29 daquele GDD).

**DD-09 — Feedback que informa e não pune.** Fonte, RF07. Forma e duração do feedback em aberto.

**DD-10 — Sem áudio na tarefa principal.** **Proposta**, em recomendação. Fonte não define áudio.

**DD-11 — Stack em React com TypeScript, no navegador.** Revista em 21/10/2026: a proposta anterior, Unity 2D para WebGL, saiu; depois, JavaScript virou TypeScript. Decisão do usuário. A fonte cita `Stopwatch` e `performance.now()`; a escolha é `performance.now()`.

**DD-12 — Registro local, pseudônimo, baixado ao fim da sessão, sem backend.** Revista em 21/10/2026: o "backend ou local" da fonte (RNF05) ficou em local. Decisão do usuário.

**DD-14 — Fases hard-coded e locais nesta etapa.** Os blocos, as condições e a proporção ficam no código, sem carregamento externo nem backend. Decisão do usuário de 21/10/2026. Aplica-se às seções 2.4, 5, 11 e 12.

**DD-13 — Ajuste dos campos de telemetria.** Proposta da seção 13.1, sem remover campos da fonte.

# 15 LACUNAS E DECISÕES PENDENTES

Cada item abaixo é uma pergunta para o pesquisador ou o orientador. Enquanto não tiver resposta, o item fica em **[a definir]** no texto.

## 15.1 Sobre o público e o objetivo

1. **Quem joga?** Crianças, adultos ou pacientes? Isso muda o texto, os tamanhos, a duração e a acessibilidade.
2. **Qual é o uso?** A fonte fala em "modo de avaliação clínica" (RF07). O jogo é para treino, para pesquisa ou para avaliação? Sem validação, o último não se sustenta (DD-03).
3. **O mediador é obrigatório?**

## 15.2 Sobre o desenho da tarefa

4. **Número de tentativas por bloco** e a proporção nos blocos 1 e 2.
5. **A neutra:** símbolos (XXXX) ou letras sem sentido? Entra no bloco Stroop?
6. **Ordem dos blocos:** fixa, como na fonte, ou contrabalanceada? Com ordem fixa, a prática entra na interferência.
7. **O treino:** tem feedback? Conta para algum indicador?
8. **Repetir a mesma resposta correta seguida:** permitido ou não?
9. **Feedback:** em todos os blocos, ou só no treino? Duração?
10. **Omissão:** o participante recebe algum aviso?

## 15.3 Sobre a interface e a acessibilidade

11. **Daltonismo:** o modo acessível (RNF04) muda as cores, e então a tarefa muda. Como manter a tarefa comparável? Pode ser uma escolha de pesquisa, com um grupo separado.
12. **Teclado:** quais quatro teclas?
13. **Pausa e saída:** a fonte não prevê. Pausa entre blocos, ou nenhuma?
14. **Instrução:** texto só, ou também falada?
15. **Tamanho dos alvos** para o público definido no item 1.

## 15.4 Sobre a tecnologia e os dados

16. ~~**Plataforma e motor**~~ — resolvido em 21/10/2026: React, no navegador (DD-11).
17. ~~**Armazenamento**~~ — resolvido em 21/10/2026: local, sem backend (DD-12, DD-14). Um backend fica para uma etapa posterior, se houver.
18. **Consentimento e identificação:** o código pseudônimo basta, ou a pesquisa exige termo? A tabela que liga código e pessoa, onde fica?
19. **Cálculo do SIE:** só bloco Stroop, ou também com a neutra?
20. **Exclusão de tempos extremos:** antecipações (RT muito curto) e RTs longos entram nas médias? Hoje nada é excluído, e o dado bruto vai no arquivo (`docs/engineering/telemetry.md`).

## 15.5 O que as referências dizem

Os resumos em `docs/references/summaries/` trazem evidência para várias pendências. Eles **não decidem**: servem para a conversa com o pesquisador.

| Item | O que as referências indicam |
| --- | --- |
| 1 (público) | Em crianças, a interferência só aparece com leitura fluente, e é máxima por volta do 2.º e 3.º anos (MacLeod, 1991). Os outros três textos estudam só adultos |
| 4 (tentativas) | A versão computadorizada citada por Scarpina e Tagini (2017) usa 40 estímulos por condição. Wiley et al. (2024) mostram que a medida se estabiliza depois de 50 a 100 tentativas por condição |
| 5 (neutra) | A neutra deve entrar também no bloco Stroop, para medir no mesmo contexto (Di Russo e Bianco, 2023; MacLeod, 1991). XXXX infla a interferência em cerca de 65 ms em relação a palavras comuns (MacLeod, 1991). Di Russo e Bianco usaram palavras comuns com o mesmo comprimento |
| 6 (ordem) | A prática reduz a interferência, sobretudo com resposta manual (MacLeod, 1991). Di Russo e Bianco sortearam a ordem dos blocos entre participantes |
| 8 (sequência) | Além do par idêntico, a relação entre a palavra de uma tentativa e a cor da seguinte muda o RT (MacLeod, 1991) |
| 9 (feedback) | Feedback e pontos a cada tentativa não prejudicaram o efeito Stroop em adultos (Wiley et al., 2024) |
| 11 (daltonismo) | O daltonismo distorce o desempenho sem relação com a inibição (Scarpina e Tagini, 2017) |
| 19 (SIE) | Incongruente − congruente mistura facilitação e interferência; recomenda-se também incongruente − neutra (MacLeod, 1991; Di Russo e Bianco, 2023). Scarpina e Tagini sugerem considerar também os erros |

# 16 OBJETIVO

## 16.1 Objetivo principal

**Oferecer uma tarefa de efeito Stroop, em blocos, com registro por tentativa, para estudar a resposta a conflito entre palavra e cor.** O jogo produz dados; a interpretação fica com a pesquisa.

## 16.2 Objetivos secundários

- Permitir configurar a sessão (código, modo de cor, opções) sem mexer no código.
- Gerar telemetria completa, em formato estável, para análise posterior.

## 16.3 Fora do escopo

- **Diagnóstico** de qualquer condição (DD-03).
- **Treinamento terapêutico** com promessa de melhora de controle inibitório. Não há validação para isso.
- Medida de atenção ou de controle inibitório como "score clínico". O SIE é um indicador descritivo.

# 17 REQUISITOS: RASTREIO

Como a fonte define os requisitos, esta tabela só diz onde cada um aparece neste GDD.

| Requisito | Resumo | Seção deste GDD | Situação |
| --- | --- | --- | --- |
| RF01 | Três blocos em sequência | 2.4, 5.1 | Feito |
| RF02 | Sorteio controlado, sem repetição idêntica seguida | 2.4, 6 | Parcial: proporção da linha de base em aberto |
| RF03 | Resposta por botão ou teclado | 2.2, 3 | Parcial: teclas em aberto |
| RF04 | Tempo máximo e omissão | 2.3, 12 | Feito |
| RF05 | Intervalo com cruz de 200 a 500 ms | 2.3, 12 | Feito |
| RF06 | Média de RT e SIE | 13.2 | Feito, com ressalva da neutra |
| RF07 | Feedback mínimo, sem animação longa | 8 | Parcial: forma em aberto |
| RNF01 | Precisão temporal | 11 | Feito: `performance.now()` |
| RNF02 | Botões fixos | 7.1 | Feito |
| RNF03 | Interface neutra nos blocos | 7.1, 9.1 | Feito |
| RNF04 | Cores de alto contraste e modo daltônico | 2.2, 7.2 | Parcial: a lacuna da seção 2.2 |
| RNF05 | Telemetria em JSON | 13 | Feito, com ajustes propostos |

# 18 EXPERIÊNCIA PRETENDIDA

**A sensação:** *LER É AUTOMÁTICO, MAS O PEDIDO É A COR.* Quem joga percebe, na prática, que a palavra atrapalha. Essa percepção vem do conflito, e não de uma explicação.
