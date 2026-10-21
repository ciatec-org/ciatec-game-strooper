# Strooper — instruções para agentes (Claude Code e Cursor)

Este arquivo é a porta de entrada comum. O Cursor o lê direto; o Claude Code o importa pelo `CLAUDE.md`. **Tudo que vale para os dois está aqui ou em `docs/`.** As pastas `.claude/` e `.cursor/` só apontam para cá.

## O projeto

Jogo sério de **efeito Stroop**: o participante vê uma palavra de cor (ex.: AZUL) escrita numa cor de tinta (ex.: vermelho) e responde à **cor da tinta**, ignorando a palavra. São três blocos fixos: treino, linha de base e Stroop. Cada tentativa é registrada com tempo de reação em milissegundos, e a sessão é exportada em JSON.

- **Stack:** React + TypeScript, Vite, Vitest. Roda só no navegador.
- **Nesta etapa:** **sem backend**. Os blocos ficam hard-coded no código, e o registro é baixado como arquivo local.
- **Fonte de verdade do produto:** [docs/product/GDD-Strooper.md](docs/product/GDD-Strooper.md).

## Antes de qualquer tarefa

1. Abra **[docs/INDEX.md](docs/INDEX.md)**: ele diz o que ler para cada tipo de tarefa. Leia só o que ele indicar.
2. Se a tarefa é implementar algo, ela tem uma spec em `docs/specs/`. Sem spec, crie uma antes (playbook `create-spec`).
3. Siga o playbook da tarefa, em `docs/playbooks/`.

## Quem programa aqui

Quem programa são estudantes do ensino técnico, em pré-iniciação científica. O plano está em [docs/backlog.md](docs/backlog.md). Ajude de verdade, de um jeito que eles aprendam, mas com leveza:

- Ao propor código, diga o porquê em uma frase. Se aparecer um conceito novo, dê o nome dele.
- Se houver uma escolha que muda o resultado, faça uma pergunta curta antes, em vez de decidir sozinho.
- Nas tasks com a camada **estudo**, prefira pistas e revisão a entregar pronto.

Não transforme toda resposta em aula, e não pergunte o que não muda nada.

## Regras que não se quebram

1. **Idioma:** **tudo que é estrutura ou código é em inglês**: nomes de pastas e arquivos do repositório inteiro (inclusive `docs/`), identificadores, comentários (inclusive nos trechos de código dos documentos), commits e branches. **Só o conteúdo** da documentação e das specs e os textos de tela são em **português do Brasil**. Todo texto de tela mora em `src/content/strings.ts`, e nunca solto num componente.
2. **Tempo é dado científico.** O tempo de reação usa `performance.now()` e o `event.timeStamp`, nunca `Date.now()`. A resposta é capturada em `pointerdown` e `keydown`, e nunca em `click`. Antes de mexer em `src/timing/`, `src/trial/` ou `src/input/`, leia [docs/engineering/timing.md](docs/engineering/timing.md).
3. **Os botões de resposta não mudam de lugar** durante a sessão (RNF02).
4. **Nada animado ou piscando** durante os blocos de teste (RNF03). Nenhum estado da interface se indica só pela cor, porque a cor é o estímulo.
5. **A lógica do jogo é pura.** `src/game/` e `src/telemetry/` não importam React nem tocam no DOM, e são testadas com Vitest.
6. **Os nomes dos campos da telemetria são estáveis.** Mudar o JSON exige atualizar [docs/engineering/telemetry.md](docs/engineering/telemetry.md) e o `schema_version`.
7. **Não invente decisão de produto.** Se o GDD marca algo como **[a definir]**, use o valor provisório da spec e marque o código com `// TODO(GDD-15.N): ...`, citando o item da seção 15 do GDD. Se não houver valor provisório, pare e pergunte.
8. **O GDD é a fonte.** Se o código e o GDD divergem, o código está errado, ou o GDD precisa de uma decisão nova (playbook `record-decision`). Nunca corrija a divergência em silêncio.

## Comandos

Valem depois da SPEC-01, que cria o projeto.

| Comando | Para quê |
| --- | --- |
| `npm install` | Instalar dependências |
| `npm run dev` | Rodar localmente (Vite) |
| `npm run build` | Build de produção |
| `npm test` | Testes (Vitest) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Uma tarefa só está pronta com `typecheck`, `lint` e `test` passando.

## Mapa do repositório

```
AGENTS.md                 ← este arquivo
CLAUDE.md                 ← importa este arquivo (Claude Code)
docs/
  INDEX.md                ← organizador: o que ler para cada tarefa
  product/                ← GDD e documento de requisitos original
  design/                 ← identidade visual e comportamentos
  engineering/             ← arquitetura, convenções, timing, telemetria
  specs/                  ← uma spec por entrega, com status
  playbooks/              ← os fluxos de trabalho (as "skills"), sem depender de ferramenta
  references/            ← PDFs científicos e resumos em Markdown
src/                      ← código (ver docs/engineering/architecture.md)
.claude/skills/           ← adaptadores dos playbooks para o Claude Code
.cursor/rules/, commands/ ← adaptadores dos playbooks para o Cursor
```

## Playbooks

| Playbook | Quando usar |
| --- | --- |
| [organize-context](docs/playbooks/organize-context.md) | No começo de qualquer tarefa, para descobrir o que ler |
| [create-spec](docs/playbooks/create-spec.md) | Para transformar uma parte do GDD numa spec implementável |
| [implement-spec](docs/playbooks/implement-spec.md) | Para implementar uma spec até os critérios de aceite |
| [review-implementation](docs/playbooks/review-implementation.md) | Para revisar código ou PR contra a spec e as regras acima |
| [record-decision](docs/playbooks/record-decision.md) | Quando uma decisão de produto muda ou é tomada |
