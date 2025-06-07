# HU005 – Finalizar Compra, Pagamento e Entrega

**Como** usuário  
**Quero** finalizar a compra dos meus produtos, pagar e selecionar a entrega  
**Para** finalizar a compra dos meus produtos desejados, pagar e receber no local determinado

---

## Critérios de Aceitação

1. Permitir que o usuário revise os itens no carrinho antes da compra.
2. Permitir que o usuário selecione a forma de pagamento desejada.
3. Permitir que o usuário selecione o método de entrega desejado.
4. Confirmar a finalização da compra somente após a verificação bem-sucedida do pagamento.

---

## Detalhamento dos Critérios de Aceitação

### Critério de Contexto (Premissa para todos os critérios)

- **DADO QUE** sou um usuário logado na plataforma
- **E** possuo itens no carrinho de compras

---

### 1. Revisão dos Itens no Carrinho

- **Dado que** finalizei a seleção dos produtos
- **Quando** acesso o carrinho para finalizar a compra
- **Então** o sistema deve exibir todos os itens selecionados para revisão

---

### 2. Seleção da Forma de Pagamento

- **Dado que** revisei os itens do carrinho
- **Quando** seleciono a forma de pagamento (crédito, débito, PIX, dinheiro)
- **Então** o sistema deve registrar a forma de pagamento escolhida

---

### 3. Seleção do Método de Entrega

- **Dado que** revisei os itens do carrinho
- **Quando** seleciono o método de entrega (entrega em domicílio, retirada na loja, etc.)
- **Então** o sistema deve registrar o método de entrega escolhido

---

### 4. Confirmação da Compra

- **Dado que** selecionei a forma de pagamento e o método de entrega
- **Quando** confirmo a compra
- **Então** o sistema deve processar o pagamento e só finalizar a compra após a verificação de pagamento bem-sucedida

---

## Regras de Negócio da História

| Inconsistência                     | Mensagem                                          |
| ---------------------------------- | ------------------------------------------------- |
| Carrinho vazio ao finalizar compra | “Adicione ao menos um produto ao carrinho.”       |
| Pagamento não aprovado             | “Não foi possível aprovar o pagamento.”           |
| Método de entrega não selecionado  | “Selecione um método de entrega para prosseguir.” |

---

**Fonte:** O Autor (2024)
