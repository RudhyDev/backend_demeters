# HU001 – Realizar Cadastro de Lojas na Plataforma

**Como** lojista  
**Quero** realizar meu cadastro na plataforma  
**Para** poder vender meus produtos nesse Empório Online

---

## Critérios de Aceitação

1. Permitir que o lojista insira informações da loja:
   - Nome
   - Descrição
   - Localização

2. Permitir que o lojista insira informações de contato:
   - E-mail
   - Telefone

3. Não permitir cadastro sem confirmação de um e-mail válido.

4. Permitir que o lojista insira detalhes do portfólio de produtos.

5. Não permitir o cadastro de uma loja já existente na plataforma.

---

## Detalhamento dos Critérios de Aceitação

### Critério de Contexto (Premissa para todos os critérios)

- **DADO QUE** não tenho cadastro  
- **E** cliquei no botão de cadastramento

---

### 1. Cadastro de Usuários

- **Dado que** preenchi o campo e-mail com `@.com`
- **E** a senha e confirmação de senha são iguais
- **E** os demais campos (nome de usuário e telefone) foram preenchidos corretamente
- **Quando** pressiono o botão “Salvar”
- **Então** o sistema deve registrar meus dados

---

### 2. Campos Obrigatórios

- **Não deve prosseguir** com campos nome, e-mail, telefone e senha vazios
- **Dado que** deixei um ou mais campos vazios (R1)
- **Quando** o foco sai do campo não preenchido
- **Então** o sistema retorna mensagem (R1)

---

### 3. E-mail Inválido

- **Não deve permitir** e-mail sem `@.com`
- **Dado que** inseri um e-mail sem `@.com` (R1)
- **Quando** o foco sai do campo e-mail
- **Então** o sistema retorna mensagem (R1)

---

### 4. Senha Inválida

- **Não deve permitir** senha com menos de 8 caracteres
- **Dado que** inseri uma senha com menos de 8 caracteres (R1)
- **Quando** o foco sai do campo senha
- **Então** o sistema retorna mensagem (R1)

---

### 5. Confirmação de Senha Diferente

- **Não deve permitir** cadastro se a senha e confirmação de senha forem diferentes
- **Dado que** inseri a confirmação de senha diferente da senha
- **Quando** pressiono o botão “Salvar”
- **Então** o sistema retorna mensagem (R1)

---

### 6. Voltar à Tela Anterior

- **Dado que** não desejo mais me cadastrar
- **Quando** pressiono o botão “Voltar”
- **Então** o sistema retorna à tela anterior ao cadastro

---

### 7. Telefone Inválido

- **Não deve permitir** cadastro com telefone com menos de 10 caracteres (formato: (XX) XXXXX-XXX)
- **Dado que** inseri um telefone com menos de 10 caracteres
- **Quando** o foco sai do campo telefone
- **Então** o sistema retorna mensagem (R1)

---

## Regras de Negócio da História

### R1 – Inconsistência dos Campos

| Inconsistência                   | Mensagem                                       |
| -------------------------------- | ---------------------------------------------- |
| Campo Vazio                      | “Campo obrigatório”                            |
| E-mail Inválido                  | “Favor inserir um e-mail válido”               |
| Senha Inválida                   | “A senha deve ter ao menos 10 caracteres.”     |
| Confirmação de senha não confere | “Senhas não conferem”                          |
| Telefone inválido                | “Insira um número de telefone celular válido.” |

---

**Fonte:** O Autor (2024)
