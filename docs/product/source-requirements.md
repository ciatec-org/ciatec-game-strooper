# Documento de Requisitos Técnicos: Strooper Game (Serious Game)

---

## 1. Conceito do Jogo (Dev Overview)

### 1.1. O que é o Efeito Stroop?
O **Efeito Stroop** é um fenômeno neuropsicológico clássico que mede o **controle inibitório** e a **atenção seletiva**. Ocorre um conflito de processamento no cérebro quando duas informações contraditórias são apresentadas simultaneamente: **a leitura de uma palavra** (processo automático e rápido) e **a identificação de uma cor visual** (processo intencional e ligeiramente mais lento).

No jogo, a tarefa principal do jogador é sempre **responder à COR da tinta/fonte em que a palavra está escrita, IGNORANDO completamente o significado do texto**.

### 1.2. Condições de Estímulo
O motor de jogo deve gerar e gerenciar três tipos de condições de estímulo:

| Condição | Descrição | Exemplo | Resposta Correta |
| :--- | :--- | :--- | :--- |
| **Congruente** | Texto e Cor da fonte coincidem | Texto "VERMELHO" em fonte **Vermelha** | VERMELHO |
| **Incongruente** | Texto e Cor da fonte são conflitantes | Texto "AZUL" em fonte **Vermelha** | VERMELHO |
| **Neutra** | Símbolos ou palavras neutras com cores | Texto "XXXX" em fonte **Verde** | VERDE |

---

## 2. Requisitos Funcionais (RF)

| ID | Requisito Funcional | Descrição |
| :--- | :--- | :--- |
| **RF01** | **Gestão de Blocos e Fases** | O jogo deve executar 3 fases distintas em sequência: (1) Bloco Treino, (2) Bloco Baseline (Congruente/Neutro), e (3) Bloco Stroop (Incongruente). |
| **RF02** | **Apresentação de Estímulos Randonizados** | O sistema deve sortear palavras e cores mantendo uma proporção controlada (ex: 75% incongruente e 25% congruente na fase final) sem repetições idênticas consecutivas. |
| **RF03** | **Captura de Resposta do Jogador** | O jogo deve aceitar respostas via botões de UI estáticos (Touch/Mouse) ou teclas de atalho fixas mapeadas no teclado. |
| **RF04** | **Cronometragem e Timeout** | Cada estímulo deve possuir um tempo máximo de exibição (ex: $1500\text{ ms}$). Se o tempo esgotar sem resposta, registrar erro por **Omissão**. |
| **RF05** | **Intervalo Inter-Estímulos (ISI)** | Entre a resposta dada (ou timeout) e o próximo estímulo, o sistema deve apresentar uma tela neutra (cruz de fixação `+`) durante $200\text{ ms}$ a $500\text{ ms}$. |
| **RF06** | **Cálculo de Scores Psicométricos** | Ao final da sessão, o jogo deve calcular a média do Tempo de Reação ($\text{RT}$) para acertos e o Score de Interferência ($\text{SIE} = \text{RT}_{\text{Incongruente}} - \text{RT}_{\text{Congruente}}$). |
| **RF07** | **Feedback Mínimo / Modo Silencioso** | No modo de avaliação clínica, o feedback visual ou sonoro deve ser imediato, sutil e sem animações comemorativas longas que atrasem o próximo estímulo. |

---

## 3. Requisitos Não-Funcionais (RNF)

| ID | Requisito Não-Funcional | Descrição |
| :--- | :--- | :--- |
| **RNF01** | **Precisão Temporal em Milissegundos** | A captura do Tempo de Reação ($\text{RT}$) deve ser realizada utilizando relógios de alta precisão do sistema (`System.Diagnostics.Stopwatch` ou `performance.now()`), independente da taxa de quadros (FPS). |
| **RNF02** | **Estabilidade de Interface (UI)** | A posição dos botões de resposta deve permanecer **rigidamente fixa** na tela durante a sessão para evitar contaminação dos dados por tempo de busca visual. |
| **RNF03** | **Neutralidade Visual (Clean UI)** | Durante os blocos de teste, a interface não pode ter elementos animados ao fundo, partículas ou variações de brilho que distraiam a atenção seletiva. |
| **RNF04** | **Acessibilidade e Contraste** | As cores utilizadas (Vermelho, Verde, Azul, Amarelo) devem possuir alto contraste com o fundo e oferecer opção de modo acessível para daltonismo no menu inicial. |
| **RNF05** | **Exportação de Dados (Telemetria)** | O jogo deve gerar uma estrutura JSON padronizada com a telemetria detalhada por rodada para envio ao backend ou salvamento local. |

---

## 4. Estrutura de Telemetria (Modelo JSON)

Abaixo está o modelo de dados padrão a ser exportado pelo jogo ao término de uma sessão:

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
    },
    {
      "trial_index": 2,
      "block_type": "incongruent",
      "text_displayed": "VERDE",
      "color_displayed": "#0000FF",
      "correct_response": "AZUL",
      "player_response": "VERDE",
      "is_correct": false,
      "response_time_ms": 510,
      "timed_out": false
    }
  ]
}
```