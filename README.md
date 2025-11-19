# Fórum (DDD) — Projeto de Exemplo

Resumo
------
Projeto de estudo que aplica princípios de Domain-Driven Design (DDD) e Clean Architeture em TypeScript. O repositório contém uma camada `core` com utilitários, uma camada de domínio (`domain/forum`) com entidades e casos de uso, e uma suíte de testes com repositórios em memória e fábricas.

Visão geral
----------
- Linguagem: TypeScript
- Test runner: Vitest (ver `package.json`)
- Arquitetura: camadas separadas — `core`, `domain` (camada `forum`) e `test`

Estrutura principal
-------------------
- `src/core/` — utilitários e tipos compartilhados (ex.: `Either`, `Entity`, `UniqueEntityId`, parâmetros de paginação).
- `src/domain/forum/enterprise/entities` — entidades do domínio (Question, Answer, Comment, Student, Instructor, etc.).
- `src/domain/forum/application/repositories` — contratos/interfaces de repositórios usados pelos casos de uso.
- `src/domain/forum/application/use-cases` — implementações dos casos de uso (criar, editar, remover, comentar, listar, escolher melhor resposta, etc.).
- `src/test/` — fábricas e repositórios em memória para testes.

Como rodar (Windows PowerShell)
--------------------------------
1. Instale dependências:

```powershell
npm install
```

2. Execute os testes:

```powershell
npm run test
```

Sobre `Either` (`src/core/either.ts`)
----------------------------------
O projeto usa um tipo `Either<L, R>` para representar o resultado de operações que podem falhar. Ele possui duas variantes:

- `Left<L, R>` — representa falha; armazena um valor do tipo `L` (por exemplo, um erro ou motivo de falha).
- `Right<L, R>` — representa sucesso; armazena um valor do tipo `R`.

Os helpers `left(value)` e `right(value)` facilitam a construção dos retornos dos casos de uso. Os casos de uso retornam `Either` para deixar explícito quando há erro (usar `left`) ou sucesso (usar `right`).

Exemplo de uso (padrão do projeto):

```ts
import { left, right } from './src/core/either'

// Falha
const fail = left(new Error('Recurso não encontrado'))

// Sucesso
const ok = right({ id: '1', title: 'Uma pergunta' })

if (ok.isRight()) {
	// ok.value é o valor de sucesso
}
if (fail.isLeft()) {
	// fail.value é o erro
}
```

Testes e utilitários
--------------------
- As fábricas em `src/test/factories` facilitam a criação de entidades com dados válidos nos testes.
- Os repositórios em memória em `src/test/repository` são usados para testar os casos de uso sem dependências externas.

Boas práticas ao contribuir
--------------------------
- Mantenha a separação entre camadas (`core` / `domain` / `application` / `test`).
- Escreva testes para qualquer regra de negócio nova ou alteração em regras existentes.
- Use as fábricas de teste ao criar dados para os testes.

Links rápidos
-----------
- Código principal: `src/`
- Configuração do projeto: `tsconfig.json`, `vite.config.ts`, `package.json`

