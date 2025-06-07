# HU006 – Pesquisa de Satisfação e Avaliações

**Como** usuário  
**Quero** avaliar os produtos comprados após o recebimento  
**Para** avaliar os produtos recebidos bem como a loja onde efetuei a compra

---

## Critérios de Aceitação

1. Permitir que o usuário avalie os produtos comprados após o recebimento.
2. Permitir que o usuário avalie a loja onde a compra foi efetuada.
3. Mostrar as avaliações dos produtos e lojas para outros usuários.

---

## Detalhamento dos Critérios de Aceitação

### Critério de Contexto (Premissa para todos os critérios)

- **DADO QUE** realizei uma compra e recebi meus produtos
- **E** estou logado na plataforma

---

### 1. Avaliação de Produtos

- **Dado que** recebi meus produtos
- **Quando** acesso a área de avaliações de produtos
- **Então** o sistema deve permitir que eu avalie cada produto comprado

---

### 2. Avaliação da Loja

- **Dado que** recebi meus produtos de uma loja específica
- **Quando** acesso a área de avaliações da loja
- **Então** o sistema deve permitir que eu avalie a loja onde a compra foi efetuada

---

### 3. Visualização de Avaliações

- **Dado que** estou navegando na plataforma
- **Quando** acesso a página de um produto ou loja
- **Então** o sistema deve exibir as avaliações feitas por outros usuários

---

## Regras de Negócio da História

| Inconsistência             | Mensagem                                          |
| -------------------------- | ------------------------------------------------- |
| Produto ainda não recebido | “Avaliação disponível apenas após o recebimento.” |
| Avaliação já realizada     | “Você já avaliou este produto/loja.”              |

---

**Fonte:** O Autor (2024)
