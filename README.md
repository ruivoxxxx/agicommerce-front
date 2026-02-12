 # Agicommerce API 


### API RESTful desenvolvida em .NET 8 para gerenciar o backend da plataforma de e-commerce Agicommerce. 
Este projeto serve dados para o frontend em React, implementando operações de CRUD completas com validações e persistência de dados.



## Instalação e Execução: 

Siga este passo a passo para rodar a API na sua máquina local.

Pré-requisitos
Ter o NODE.js  instalado.

Um editor de código (VS Code ou Visual Studio).

Passo 1: Clonar e Acessar
```bash
*Abra o terminal e clone o repositório:
git clone https://github.com/ruivoxxxx/agicommerce-front*
```


Passo 2: Restaurar Dependências  

Baixe os pacotes do package.json
```bash
npm install
```


Passo 3: Configurar variáveis de ambiente

```bash
VITE_API_URL=http://localhost:5000/api
```

Passo 4: Executar a API  

Inicie o servidor local
```bash
npm run dev
```







 
# Tecnologias Utilizadas

React 19: Biblioteca principal para construção de interfaces.

TypeScript: Superset do JavaScript para tipagem estática e segurança no código.

Vite: Build tool de nova geração.

Tailwind CSS: Framework de CSS utilitário para estilização ágil.

Shadcn/UI: Coleção de componentes reutilizáveis baseados no Radix UI.

Axios: Cliente HTTP para comunicação com a API Backend.

React Router DOM: Gerenciamento de rotas e navegação SPA.  



# Decisões Técnicas

1. Arquitetura Modular (Feature-Based) Em vez de separar tudo por tipo (só pages e components), organizei o código em Módulos (src/modules).
   

 Co-location. Componentes que só existem para uma funcionalidade específica (como CardProduto ou DialogCreateProduto) ficam dentro da pasta do seu módulo (taskManager), facilitando a manutenção e evitando poluir a pasta de componentes globais.  


2. Separação Shared vs Modules
   
Contém apenas componentes genéricos de UI (Botões, Inputs) que podem ser usados em qualquer lugar.  


Contém a lógica de negócio e as páginas específicas.  


3. Vite e Tailwind v4
   

 Escolha focada em performance de desenvolvimento (Fast Refresh) e estilização moderna sem arquivos CSS legados.  






# Desafios durante desenvolvimento


1. Validação de Formulários Implementar regras robustas de validação nos formulários de criação e edição, garantindo que o usuário receba feedback visual imediato caso tente enviar campos obrigatórios vazios ou com formatos inválidos.

2. Funcionalidades de Lista (Search, Ordenação e Filtro) Desenvolver a lógica para manipular a lista de produtos no front-end, permitindo ao usuário buscar itens por nome, ordenar por preço e filtrar categorias de forma dinâmica e reativa.

3. Integração de Detalhes (Busca por ID) Configurar o roteamento dinâmico na página de detalhes do produto. O desafio foi capturar o ID da URL via parâmetros de rota e realizar uma requisição específica à API para carregar os dados únicos daquele item.

## Melhorias Futuras (O que faria com mais tempo)

Para elevar o nível da aplicação e completar a experiência do usuário, as seguintes funcionalidades seriam prioridade:

1- **Módulo de Autenticação (Login/Registro):**
  Desenvolver as telas de Login e Cadastro, com gerenciamento de sessão seguro (armazenamento de Token JWT) e Redirecionamento de Rotas (Private Routes) para impedir acesso não autorizado.

2- **Painel Administrativo (Dashboard):**
  Criar uma área restrita (`/admin`) com layout exclusivo (Sidebar), contendo tabelas de gestão de produtos, gráficos de vendas e controle de estoque visual.

3- **Carrinho de Compras Global:**
  Implementar um gerenciador de estado global (Context API ou Zustand) para o Carrinho. O usuário poderia adicionar itens, ver o resumo do pedido no topo da página e finalizar a compra sem perder os dados ao navegar.

4- **Feedback Visual e E-mail:**
  Criar telas de "Sucesso na Compra" e integrar notificações visuais (Toasts) informando que o e-mail de confirmação do pedido foi disparado pelo backend.






