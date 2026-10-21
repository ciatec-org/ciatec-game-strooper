# Specs

Cada spec é uma entrega pequena e verificável, derivada do GDD. O GDD diz **o quê** e **por quê**; a spec diz **o que fazer agora** e **como saber que acabou**.

- Para criar uma spec, siga o playbook [create-spec](../playbooks/create-spec.md), a partir do [_template.md](_template.md).
- Para implementar uma spec, siga o playbook [implement-spec](../playbooks/implement-spec.md).
- **Atualize o status aqui e no cabeçalho da spec** quando ele mudar.

## Quadro

| Spec | Título | Depende de | Status |
| --- | --- | --- | --- |
| [SPEC-00](SPEC-00-visual-identity-and-behaviors.md) | Identidade visual e comportamentos | — | a fazer |
| [SPEC-01](SPEC-01-project-setup.md) | Setup do projeto | — | a fazer |
| [SPEC-02](SPEC-02-blocks-and-generator.md) | Blocos hard-coded e gerador de estímulos | 01 | a fazer |
| [SPEC-03](SPEC-03-trial-cycle.md) | Ciclo da tentativa e timing | 01, 02 | a fazer |
| [SPEC-04](SPEC-04-response-input.md) | Botões de resposta e teclado | 00, 03 | a fazer |
| [SPEC-05](SPEC-05-screens-and-flow.md) | Telas e fluxo da sessão | 00, 03, 04 | a fazer |
| [SPEC-06](SPEC-06-feedback.md) | Feedback de acerto, erro e omissão | 00, 04 | a fazer |
| [SPEC-07](SPEC-07-telemetry.md) | Telemetria, cálculos e exportação | 02, 03 | a fazer |

## Ordem sugerida

```
SPEC-00 (time: design) ─┐
                        ├─► SPEC-04 ─► SPEC-05 ─► SPEC-06
SPEC-01 ─► SPEC-02 ─► SPEC-03 ─┘
                   └─────────► SPEC-07
```

**A SPEC-00 é a primeira intervenção do time** e corre em paralelo com a SPEC-01 e a SPEC-02, que não dependem de visual. As specs 04 a 06 esperam a SPEC-00 ter pelo menos a paleta, os botões e o feedback decididos.
