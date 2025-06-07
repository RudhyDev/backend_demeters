# HU002 – Realizar Cadastro das Formas de Pagamento da Plataforma

**Como** lojista  
**Quero** cadastrar várias formas de pagamentos (crédito/débito, PIX ou dinheiro)  
**Para** poder liberar as transações monetárias empresa/consumidor

---

## Critérios de Aceitação

1. Permitir que o lojista cadastre formas de pagamento:
   - Crédito/Débito
   - PIX
   - Dinheiro
2. Não permitir o cadastro de formas de pagamento sem a devida validação dos dados bancários.
3. Permitir a remoção ou alteração de uma forma de pagamento já cadastrada.

---

## Detalhamento dos Critérios de Aceitação

### Critério de Contexto (Premissa para todos os critérios)

- **DADO QUE** sou um lojista cadastrado na plataforma
- **E** acessei a área de formas de pagamento

---

### 1. Cadastro de Formas de Pagamento

- **Dado que** preenchi corretamente os dados da forma de pagamento (ex: número do cartão, dados bancários, chave PIX, etc.)
- **Quando** pressiono o botão “Salvar”
- **Então** o sistema deve registrar a nova forma de pagamento

---

### 2. Validação dos Dados Bancários

- **Não deve permitir** o cadastro de formas de pagamento com dados bancários inválidos
- **Dado que** inseri dados bancários incompletos ou inválidos (R1)
- **Quando** pressiono o botão “Salvar”
- **Então** o sistema retorna mensagem (R1)

---

### 3. Remoção ou Alteração de Forma de Pagamento

- **Dado que** já possuo uma forma de pagamento cadastrada
- **Quando** pressiono o botão “Remover” ou “Editar”
- **Então** o sistema deve permitir a remoção ou alteração dessa forma de pagamento

---

## Regras de Negócio da História

### R1 – Inconsistência dos Campos

| Inconsistência                   | Mensagem                                |
| -------------------------------- | --------------------------------------- |
| Campo obrigatório não preenchido | “Campo obrigatório”                     |
| Dados bancários inválidos        | “Favor inserir dados bancários válidos” |

---

**Fonte:** O Autor (2024)
