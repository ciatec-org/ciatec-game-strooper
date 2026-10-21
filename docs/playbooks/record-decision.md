# Playbook: registrar uma decisão

**Quando usar:** quando o usuário, o orientador ou o pesquisador **toma** uma decisão de produto, ou **muda** uma decisão existente. Exemplos: o número de tentativas por bloco, o tipo de neutra, as teclas, a paleta aprovada.

**Quem decide:** pessoas. O agente registra; ele **nunca** decide sozinho uma pendência do GDD.

## Regras de numeração (as mesmas do GDD §14)

- Decisões são `DD-NN`, e o número é estável para sempre.
- Decisão **revista** mantém o número: o texto é reescrito, e uma frase diz "Revista em DD/MM/AAAA: <o que mudou>".
- Decisão **morta** fica riscada (`~~DD-NN~~`), com a data e o que a substituiu. O número não é reaproveitado.
- Decisão nova recebe o próximo número livre.

## Passos

1. **Confirme a fonte:** quem decidiu e quando. Se veio só da conversa, cite "decisão do usuário de DD/MM/AAAA".
2. **Ache o que muda no GDD** (`docs/product/GDD-Strooper.md`):
   - o item da seção 15 que a decisão responde;
   - as seções do corpo que mencionam o assunto (`grep` pelo tema e por "[a definir]").
3. **Atualize o GDD:**
   - Seção 14: a nova `DD-NN`, ou a revisão da existente. O formato é **título em negrito**, depois o que se decidiu, por quê, a fonte, e "Aplica-se às seções …".
   - Corpo: troque o **[a definir]** pelo valor, citando a `DD-NN`.
   - Seção 15: risque o item resolvido (`~~**Título**~~ — resolvido em DD/MM/AAAA: … (DD-NN)`). **Não renumere** os itens, porque o código cita `TODO(GDD-15.N)`.
   - Cabeçalho: suba a `versao`, atualize a `data_atualizacao` e escreva a mudança no começo de `mudanca`.
4. **Propague:**
   - `grep -rn "TODO(GDD-15.N)" src docs` e atualize o código e as specs que usavam o provisório.
   - Se a decisão é de design, marque ☑ em `docs/design/*`.
   - Se afeta o JSON, atualize o [telemetry.md](../engineering/telemetry.md) (e o `schema_version`, se mudar campo).
5. **Resuma** para o usuário: a decisão registrada, a `DD-NN`, os arquivos alterados e os TODOs que sobraram.

## Não faça

- Não apague uma decisão antiga: risque.
- Não renumere a seção 15 nem as DDs.
- Não registre como decidido algo que foi só sugerido. Sugestões ficam como **Proposta** na DD, até alguém aprovar.
