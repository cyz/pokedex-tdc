---
description: Diretrizes de desenvolvimento e validação da aplicação Pokédex
applyTo: "**"
---

# Instruções do Projeto

## Contexto

Esta é uma aplicação web de Pokédex desenvolvida com Next.js, React, TypeScript
e Tailwind CSS.

## Stack

- Node.js 22+
- Next.js 15 com App Router
- React 19
- TypeScript em modo strict
- Tailwind CSS 3
- Jest com jsdom

## Estrutura

- `src/app/`: páginas, layout, estilos e componentes da aplicação
- `src/app/api/`: rotas internas da API
- `src/lib/`: tipos, constantes e integração com a PokéAPI

## Regras de implementação

- Use TypeScript e componentes funcionais.
- Preserve a separação entre Server Components e Client Components.
- Use o alias `@/*` para imports dentro de `src`.
- Centralize chamadas à PokéAPI em `src/lib/api.ts`.
- Reutilize os tipos definidos em `src/lib/types.ts`.
- Use Tailwind CSS seguindo o tema visual existente.
- Preserve os comportamentos existentes ao adicionar funcionalidades.
- Não adicione persistência ou novas dependências a menos que o usuário peça
  explicitamente ou que a tarefa seja impossível de implementar com as
  dependências atuais; nesse caso, explique a necessidade antes de alterar.
- Não faça refatorações não relacionadas à tarefa atual.
- Use controles acessíveis e não comunique estado somente por cor.

## Validação

Antes de concluir uma alteração:

1. Verifique o painel Problems do VS Code.
2. Para alterações de código, execute:

   ```bash
   npm run lint
   ```

3. Quando existirem testes ou a tarefa criar ou modificar comportamento testado,
   execute:

   ```bash
   npm test -- --runInBand
   ```

4. Após alterações estruturais ou antes de concluir uma funcionalidade, execute:

   ```bash
   npm run build
   ```

5. Para alterações visuais ou interativas, valide o comportamento no navegador
   e verifique se não há novos erros no console.
6. Se algum comando falhar, informe o erro. Não apresente a tarefa como concluída
   sem explicar a falha.
7. Se você não tiver acesso ao painel Problems, ao navegador ou ao console,
   declare explicitamente que essa verificação não pôde ser realizada e não
   afirme que ela foi concluída.
8. Se um comando não puder ser executado por falta de dependências, permissões,
   terminal indisponível ou limitação do ambiente, informe exatamente qual
   comando não foi executado e o motivo.
