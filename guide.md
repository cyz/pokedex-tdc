# Demo da Pokédex — roteiro de palco

## Passo 1 — Mostrar a base e o contexto

Custom Instructions

---

## Passo 2 — Investigar e corrigir um bug

**Tempo:** 3 minutos e 30 segundos

### Objetivo

Reproduzir o problema, investigar sua causa e aplicar a menor correção possível.

### O que fazer

1. Abrir o checkpoint `demo/01-bug`.
2. Mostrar que as imagens estão pequenas e de costas.
3. Confirmar que nomes, números e tipos continuam corretos.
4. Enviar o prompt de investigação.

### Prompt de investigação

```text
Depois de uma alteração, os cards passaram a mostrar sprites pequenos e de
costas no lugar da arte frontal. Nomes e tipos continuam visíveis e as
requisições terminam com sucesso.

Investigue o problema usando o código, os tipos TypeScript e as evidências do
navegador. Explique a causa antes de editar.
```

### Prompt de correção

Depois que a causa for explicada:

```text
Implemente a menor correção para a causa identificada. Preserve o fallback de
imagem e não altere o layout.
```

### Confirmar

- [ ] Problems panel sem novos erros.
- [ ] Arte oficial restaurada.
- [ ] Nomes, números, tipos e busca continuam funcionando.

### Fala-chave

> Confiança não vem da frase "corrigido". Vem de reproduzir o problema,
> investigar a causa e executar novamente o cenário.

---

## Passo 3 — Planejar e implementar favoritos

**Tempo:** 7 minutos

### Objetivo

Transformar uma necessidade de produto em critérios claros, planejar a mudança e
implementá-la sem quebrar os comportamentos existentes.

### O que fazer

1. Selecionar **Plan Mode**.
2. Enviar o prompt de planejamento.
3. Revisar se o plano trata estado, `localStorage`, hidratação e filtro.
4. Usar **Implement** ou trocar para **Agent Mode**.
5. Enviar o prompt de implementação.

### Prompt de planejamento

```text
Quero adicionar favoritos à Pokédex.

Critérios:
- cada card tem um botão acessível para favoritar e desfavoritar;
- favoritos ficam visualmente identificados;
- IDs favoritos persistem em localStorage após reload;
- existe um filtro para mostrar somente favoritos;
- o filtro sem resultados mostra uma mensagem clara;
- busca, paginação e seleção de equipe continuam funcionando;
- não adicionar dependências;
- validar com npm run build e no navegador.

Analise a implementação atual e apresente um plano curto. Liste os arquivos que
pretende alterar, considere a hidratação do Next.js e ainda não edite.
```

Se o plano estiver grande demais:

```text
Simplifique o plano. Prefira a menor mudança que preserve a arquitetura atual.
Não adicione biblioteca de estado nem refatore funcionalidades não relacionadas.
```

### Prompt de implementação

```text
Implemente o plano aprovado. Preserve os comportamentos existentes e não
adicione funcionalidades fora dos critérios. Ao terminar, execute npm run build.
```

### Confirmar

- [ ] Problems panel sem novos erros.
- [ ] É possível favoritar e desfavoritar.
- [ ] O estado visual e o nome acessível mudam.
- [ ] Favoritos sobrevivem ao reload.
- [ ] O filtro mostra somente favoritos.
- [ ] Remover o último favorito mostra o estado vazio.

### Fala-chave

> O plano nos permite discutir decisões de estado, persistência e interface
> antes que elas virem implementação.

---

## Passo 4 — Validar com a skill

**Tempo:** 4 minutos

### Objetivo

Executar um procedimento repetível e validar a experiência real no navegador.

### O que fazer

Invocar:

```text
/pokedex-dogfooding
```

### Observar

- [ ] Cards carregam corretamente.
- [ ] Favoritar altera o card e o controle.
- [ ] Favoritos sobrevivem ao reload.
- [ ] Filtro e estado vazio funcionam.
- [ ] Busca continua funcionando.
- [ ] **Load more** continua funcionando.
- [ ] Seleção de equipe continua funcionando.
- [ ] Layout funciona em 320px.
- [ ] Console sem novos erros.
- [ ] Relatório apresenta `PASS` ou `FAIL` com evidências.

### Fala-chave

> As instruções definem como trabalhar no projeto. A skill guarda um
> procedimento especializado que podemos repetir depois de cada mudança.

---

## Passo 5 — Confirmar e fechar

**Tempo:** 1 minuto e 30 segundos

### Objetivo

Confirmar o resultado final, recapitular o fluxo e voltar aos slides.

### O que fazer

1. Mostrar o resultado de `npm run build`.
2. Recapitular: contexto, investigação, planejamento, implementação e validação.
3. Voltar aos slides.

### Fala final

> Partimos de uma primeira versão criada com IA. Usamos instruções persistentes,
> investigamos uma regressão antes de editar, planejamos uma mudança e validamos
> o comportamento real no navegador.
>
> A IA acelerou o trabalho, mas os requisitos, as decisões e a validação
> continuaram conosco.

## Regra de corte

- Se uma correção ou implementação ultrapassar 90 segundos além do previsto,
  usar o próximo checkpoint.
- Se favoritos demorarem, abrir `demo/03-favorites` e seguir para a skill.
- Se a skill falhar, mostrar o relatório salvo do ensaio.
- Não depurar problemas de infraestrutura no palco.
- Sempre dizer claramente quando um checkpoint ou resultado salvo for usado.
