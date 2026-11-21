
# Gerenciamento de Clientes

Projeto desenvolvido para praticar o consumo de APIs REST utilizando JavaScript e Fetch API.

A aplicação permite cadastrar, listar e excluir clientes por meio de requisições HTTP.

## Funcionalidades

- Cadastrar clientes com nome e e-mail
- Listar os clientes cadastrados
- Excluir clientes
- Atualizar a lista automaticamente
- Exibir mensagens de sucesso e erro
- Efeito parallax no fundo da página

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- Beeceptor (API de testes)

## Métodos HTTP utilizados

- **GET:** buscar os clientes cadastrados
- **POST:** cadastrar um novo cliente
- **DELETE:** excluir um cliente pelo ID

## Estrutura do projeto

```text
gerenciamento-clientes/
├── index.html
├── styles.css
├── scripts.js
└── README.md
```

## Como executar

1. Clone este repositório.
2. Abra a pasta do projeto no VS Code.
3. Configure a URL da API no arquivo `scripts.js`.
4. Abra o `index.html` utilizando o Live Server.
5. Teste o cadastro, a listagem e a exclusão de clientes.

**Observação:** para que os dados sejam salvos e excluídos, a API Beeceptor precisa estar configurada para essas operações.

## Objetivo do projeto

Este projeto foi desenvolvido como exercício prático para aprender a trabalhar com APIs REST, requisições assíncronas, manipulação do DOM e eventos em JavaScript.

