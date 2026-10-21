# Telemetria: schema do JSON e regras de cálculo

O jogo exporta **um arquivo JSON por sessão**, baixado no navegador ao fim da sessão (DD-12). Não há envio para servidor. Este documento é o contrato do arquivo: quem analisa os dados depende dele.

**`schema_version: 1`.** Qualquer mudança de campo sobe a versão e é registrada no fim deste documento.

## Origem dos campos

- Os campos da **fonte** (GDD §13 e `product/source-requirements.md` §4) são mantidos com os mesmos nomes.
- Os campos **acrescentados** vêm da proposta DD-13 do GDD (§13.1) e do [timing.md](timing.md).
- **[a definir] (DD-13, aguarda o orientador):** se `player_id` vira um código pseudônimo e se `timestamp` (data e hora absoluta) sai. Até lá, os dois ficam como na fonte, e `player_id` recebe o código que o mediador digita.

## Formato

```jsonc
{
  "schema_version": 1,
  "session_id": "uuid-v4",                  // source
  "player_id": "P-014",                     // source; code typed on the setup screen
  "timestamp": "2026-10-21T18:45:00Z",      // source; session start
  "app_version": "0.1.0",                   // new
  "frame_interval_ms": 16.7,                // new: see timing.md
  "settings": {                             // new
    "colorblind_mode": false,
    "rng_seed": 123456789
  },
  "summary": {                              // source, plus the fields marked as new
    "total_trials": 80,
    "total_correct": 72,
    "total_errors": 6,
    "total_omissions": 2,
    "mean_rt_congruent_ms": 620.5,
    "mean_rt_incongruent_ms": 785.2,
    "stroop_interference_effect_ms": 164.7,
    "mean_rt_neutral_ms": 690.1,            // new
    "interference_vs_neutral_ms": 95.1,     // new: incongruent − neutral
    "facilitation_vs_neutral_ms": 69.6,     // new: neutral − congruent
    "by_block": { "baseline": { /* same fields */ }, "stroop": { /* … */ } }   // new
  },
  "trials": [
    {
      "trial_index": 1,                     // source; 1..N in the session, practice included
      "block_type": "incongruent",          // source; kept equal to condition (see note)
      "text_displayed": "AZUL",             // source
      "color_displayed": "#FF6B61",         // source; ink color hex
      "correct_response": "VERMELHO",       // source
      "player_response": "VERMELHO",        // source; null on omission
      "is_correct": true,                   // source
      "response_time_ms": 742.3,            // source; null on omission
      "timed_out": false,                   // source
      "block": "stroop",                    // new: practice | baseline | stroop
      "condition": "incongruent",           // new: congruent | incongruent | neutral
      "index_in_block": 1,                  // new
      "isi_ms": 347,                        // new: drawn fixation duration
      "stimulus_onset_ms": 52310.4,         // new: since session start
      "response_at_ms": 53052.7,            // new: since session start; null on omission
      "response_device": "pointer",         // new: pointer | keyboard
      "visibility_lost": false              // new
    }
  ]
}
```

**Nota sobre `block_type`:** na fonte, ele guarda a condição (`"incongruent"`), apesar do nome. Ele é mantido assim para compatibilidade, e `block` e `condition` deixam explícito o que é cada um.

**Tempos relativos:** `stimulus_onset_ms` e `response_at_ms` contam a partir do início da sessão, que é o clique em "Começar" nas configurações (`performance.now()` naquele instante = 0).

## Regras de cálculo (`game/scoring.ts`)

| Grandeza | O que entra | O que não entra |
| --- | --- | --- |
| `total_trials` | Tentativas dos blocos `baseline` e `stroop` | O treino (DD-06) |
| `total_correct` | `is_correct: true` | — |
| `total_errors` | Resposta dada e errada | Omissões |
| `total_omissions` | `timed_out: true` | — |
| Médias de RT | Tentativas **corretas**, sem timeout e sem `visibility_lost`, por condição | Treino, erros, omissões |
| `stroop_interference_effect_ms` (SIE) | Média incongruente − média congruente, **no bloco Stroop** | — |
| `interference_vs_neutral_ms` | Incongruente − neutra, no mesmo bloco; `null` se não houver neutra nele | — |
| `facilitation_vs_neutral_ms` | Neutra − congruente, no mesmo bloco; `null` se não houver neutra nele | — |

- **Por que o SIE é calculado no bloco Stroop:** é o único bloco com as duas condições no mesmo contexto. A proporção de congruentes muda a interferência (MacLeod, 1991, p. 15 do PDF), e comparar entre blocos mistura proporções diferentes. É provisório: `TODO(GDD-15.19)`.
- **Por que há medidas contra a neutra:** a fonte define SIE = incongruente − congruente. A literatura mostra que essa diferença soma facilitação e interferência (MacLeod, 1991, p. 6 e 21; Di Russo e Bianco, 2023, p. 4 e 6–7). As duas medidas novas separam as partes, e só existem quando o bloco tem neutras.
- **Exclusão de RT muito curto ou muito longo** (antecipação, outliers): **[a definir]**, `TODO(GDD-15.20)`. Hoje nada é excluído, e o dado bruto está no arquivo para a análise decidir.
- Média é a média aritmética. Se a análise preferir mediana, ela calcula a partir de `trials`.
- Arredonde a 1 casa decimal só na exportação.

## Download

- Nome do arquivo: `strooper_<player_id>_<session_id curto>.json`.
- O download acontece ao entrar na tela de resultado. **[a definir]**: se também há um botão para baixar de novo.
- Se a aba fechar antes, a sessão se perde (como no Caça às Cores, DD-29 daquele GDD).

## Histórico do schema

| Versão | Mudança |
| --- | --- |
| 1 | Primeira versão: campos da fonte e os acrescentados acima |
