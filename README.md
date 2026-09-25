 # Pokédex

 Pokédex responsiva construída com Next.js 15, React 19, TypeScript e Tailwind CSS 3. A aplicação consulta a [PokéAPI](https://pokeapi.co/) no servidor para listar, buscar e filtrar Pokémon, além de exibir detalhes de cada registro.

 ## Requisitos

 - Node.js 22 ou superior
 - npm 10 ou superior

 ## Execução

 ```bash
 npm install
 npm run dev
 ```

 A aplicação fica disponível em [http://localhost:3000](http://localhost:3000).

 ## Scripts

 ```bash
 npm run dev                 # servidor de desenvolvimento
 npm run lint                # análise estática com ESLint
 npm test -- --runInBand     # testes Jest em série
 npm run build               # build de produção
 npm start                   # servidor do build de produção
 ```

 ## Funcionalidades

 - Catálogo nacional com carregamento incremental
 - Busca parcial por nome em todo o catálogo
 - Filtro global pelos tipos oficiais da PokéAPI
 - Página de detalhes com descrição, medidas, habilidades e atributos
 - Navegação para registros anterior e seguinte
 - Estados de carregamento, lista vazia, erro e registro inexistente
 - Interface responsiva e navegável por teclado

 ## Parâmetros da URL

 A página inicial usa a URL como fonte de estado, permitindo compartilhar consultas:

 - `q`: trecho do nome pesquisado
 - `type`: tipo selecionado em inglês, conforme a PokéAPI
 - `limit`: quantidade de registros exibidos

 Exemplo: `/?q=char&type=fire&limit=48`.

 ## Arquitetura

 - `src/lib/api.ts`: única fronteira de acesso à PokéAPI e agregação dos dados
 - `src/lib/types.ts`: contratos externos mínimos e modelos usados pela interface
 - `src/lib/constants.ts`: paginação, revalidação e apresentação dos tipos
 - `src/app/page.tsx`: Server Component do catálogo
 - `src/app/components/`: filtros, grade, cartões, badges e carregamento incremental
 - `src/app/pokemon/[id]/page.tsx`: Server Component do registro detalhado

 As consultas externas são feitas por Server Components. Somente o botão de carregamento incremental executa no cliente. A busca e o filtro determinam os candidatos primeiro; a aplicação busca os detalhes apenas dos registros que serão exibidos.

 ## Cache e endpoints

 As respostas da PokéAPI usam o cache de `fetch` do Next.js com revalidação diária. Isso reduz chamadas externas e segue a política de uso justo da API.

 Endpoints consumidos:

 - `GET /api/v2/pokemon`
 - `GET /api/v2/pokemon/{id-or-name}`
 - `GET /api/v2/pokemon-species/{id-or-name}`
 - `GET /api/v2/type`
 - `GET /api/v2/type/{id-or-name}`
