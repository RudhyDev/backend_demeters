# HU004 – Selecionar Lojas e Seus Produtos – Carrinho

**Como** usuário  
**Quero** selecionar meus produtos a partir da loja selecionada  
**Para** poder adicionar meus produtos no meu carrinho antes de finalizar a compra

---

## Critérios de Aceitação

1. Permitir que o usuário visualize os produtos disponíveis por loja.
2. Permitir que o usuário adicione produtos ao carrinho.
3. Permitir que o usuário remova ou altere a quantidade de produtos no carrinho.
4. Atualizar o total do carrinho conforme os produtos são adicionados ou removidos.

---

## Detalhamento dos Critérios de Aceitação

### Critério de Contexto (Premissa para todos os critérios)

- **DADO QUE** sou um usuário logado na plataforma
- **E** selecionei uma loja para visualizar seus produtos

---

### 1. Visualização de Produtos por Loja

- **Dado que** selecionei uma loja
- **Quando** acesso a página da loja
- **Então** o sistema deve exibir todos os produtos disponíveis dessa loja

---

### 2. Adição de Produtos ao Carrinho

- **Dado que** visualizei os produtos de uma loja
- **Quando** clico em “Adicionar ao carrinho” em um produto
- **Então** o sistema deve adicionar o produto selecionado ao carrinho

---

### 3. Remoção ou Alteração de Quantidade

- **Dado que** tenho produtos no carrinho
- **Quando** clico em “Remover” ou altero a quantidade de um produto
- **Então** o sistema deve atualizar o carrinho conforme a ação

---

### 4. Atualização do Total do Carrinho

- **Dado que** adicionei, removi ou alterei a quantidade de produtos no carrinho
- **Quando** o carrinho é atualizado
- **Então** o sistema deve recalcular e exibir o novo valor total do carrinho

---

## Regras de Negócio da História

| Inconsistência                     | Mensagem                                        |
| ---------------------------------- | ----------------------------------------------- |
| Carrinho vazio ao finalizar compra | “Adicione ao menos um produto ao carrinho.”     |
| Quantidade inválida de produtos    | “Informe uma quantidade válida para o produto.” |

---

**Fonte:** O Autor (2024)
