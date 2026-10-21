# Strooper

**Jogo sério sobre o efeito Stroop**, feito por estudantes de pré-iniciação científica do ensino técnico, no CIATec.

O jogador vê uma palavra de cor escrita numa cor de tinta, como a palavra **AZUL** pintada de vermelho, e responde à **cor da tinta**, ignorando o que está escrito. Ler é automático; nomear a cor exige esforço. O jogo mede quanto a palavra atrapalha, em milissegundos.

> **Status:** em desenvolvimento. O app jogável está previsto para **janeiro de 2027**. O código ainda não existe neste repositório; os comandos abaixo passam a valer depois do setup do projeto ([SPEC-01](docs/specs/SPEC-01-project-setup.md)).

## Como o jogo funciona

```
+  ──►  AZUL  ──►  [VERMELHO] [VERDE] [AZUL] [AMARELO]  ──►  próxima
fixação  estímulo         o jogador toca na cor da tinta
200–500 ms  até 1500 ms
```

A sessão tem três blocos: **treino**, **linha de base** e **Stroop**. Cada tentativa é registrada, e no fim o navegador baixa um arquivo JSON com os tempos de reação e o efeito de interferência (SIE). O jogo é só uma ferramenta de pesquisa: **não faz diagnóstico**.

## Stack

| | |
| --- | --- |
| Interface | React + TypeScript |
| Build e servidor local | Vite |
| Testes | Vitest |
| Dados | Arquivo JSON local, sem backend |

## Rodar localmente

Requisitos: Node.js LTS e npm.

```bash
npm install
npm run dev        # abre o jogo no navegador
npm test           # roda os testes
npm run lint       # confere o estilo do código
npm run typecheck  # confere os tipos
npm run build      # gera a versão final em dist/
```

## Onde está cada coisa

| Para… | Veja |
| --- | --- |
| Entender o jogo e as decisões | [docs/product/GDD-Strooper.md](docs/product/GDD-Strooper.md) |
| Saber o que fazer nesta semana | [docs/backlog.md](docs/backlog.md) |
| Os detalhes técnicos de cada entrega | [docs/specs/](docs/specs/README.md) |
| Descobrir o que ler para uma tarefa | [docs/INDEX.md](docs/INDEX.md) |
| Regras de código, timing e dados | [docs/engineering/](docs/engineering/) |
| Visual e comportamento das telas | [docs/design/](docs/design/) |
| Artigos científicos (com resumos) | [docs/references/](docs/references/) |

```
docs/        documentação (conteúdo em português)
src/         código (em inglês), criado no setup
.claude/     skills do Claude Code
.cursor/     regras e comandos do Cursor
AGENTS.md    instruções comuns aos agentes de IA
```

## Trabalhando no projeto

1. Escolha uma task do [backlog](docs/backlog.md) e crie uma branch: `git checkout -b spec-02-blocks-and-generator`.
2. Faça a task, com commits pequenos **em inglês**: `feat(game): add trial generator`.
3. Antes do pull request, rode `npm run typecheck && npm run lint && npm test`.
4. Abra o PR citando a história (ex.: `US-02.1`). O colega revisa e faz o merge.

**Idioma:** nomes de pastas, arquivos, código, comentários e commits em **inglês**; conteúdo da documentação e textos de tela em **português**.

## Com agentes de IA (Claude Code ou Cursor)

Os dois leem o [AGENTS.md](AGENTS.md) e usam os mesmos playbooks de [docs/playbooks/](docs/playbooks/):

| Comando | Para quê |
| --- | --- |
| `/organize-context` | Descobrir o que ler antes de uma tarefa |
| `/implement-spec SPEC-02` | Implementar uma spec |
| `/review-implementation` | Revisar o código antes do PR |
| `/create-spec` | Criar uma spec a partir do GDD |
| `/record-decision` | Registrar uma decisão no GDD |

Use o agente para **aprender**: peça que ele explique o porquê, e prefira pistas nas tasks de estudo.

## Dados e privacidade

O jogo não envia nada para servidores. O arquivo de cada sessão fica no computador de quem aplicou, identificado só por um código, e **nunca deve ser enviado para este repositório** (o `.gitignore` já bloqueia `strooper_*.json`).

## Equipe

- **Orientação:** [a definir]
- **Estudantes:** [a definir]
- **Organização:** CIATec

## Licença

[a definir]
