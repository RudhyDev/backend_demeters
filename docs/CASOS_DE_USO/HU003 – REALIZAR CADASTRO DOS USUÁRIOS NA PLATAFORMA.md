# HU003 – Realizar Cadastro dos Usuários na Plataforma

**Como** usuário  
**Quero** realizar meu cadastro na plataforma  
**Para** poder comprar meus produtos nesse Empório Online

---

## Critérios de Aceitação

1. Permitir que o usuário insira informações pessoais:
   - Nome
   - Sobrenome
   - Data de nascimento
2. Permitir que o usuário insira informações de contato:
   - E-mail
   - Telefone
3. Não permitir o cadastro sem a confirmação de um e-mail válido.
4. Permitir que o usuário insira o endereço residencial completo:
   - Logradouro
   - Número
   - Bairro
   - Cidade
   - Estado
   - CEP
5. Permitir que o usuário insira um endereço de entrega, se diferente do endereço residencial.
6. Permitir que o usuário selecione a opção de que o endereço residencial é o mesmo que o endereço de entrega.
7. Não permitir o cadastro de um usuário que já existe na plataforma.

---

## Detalhamento dos Critérios de Aceitação

### Critério de Contexto (Premissa para todos os critérios)

- **DADO QUE** não tenho cadastro
- **E** cliquei no botão de cadastramento

---

### 1. Cadastro de Usuário

- **Dado que** preenchi corretamente todos os campos obrigatórios (nome, sobrenome, data de nascimento, e-mail, telefone, endereço)
- **Quando** pressiono o botão “Salvar”
- **Então** o sistema deve registrar meus dados

---

### 2. Campos Obrigatórios

- **Não deve prosseguir** com campos obrigatórios vazios
- **Dado que** deixei um ou mais campos obrigatórios vazios (R1)
- **Quando** o foco sai do campo não preenchido
- **Então** o sistema retorna mensagem (R1)

---

### 3. E-mail Inválido

- **Não deve permitir** e-mail sem `@.com`
- **Dado que** inseri um e-mail sem `@.com` (R1)
- **Quando** o foco sai do campo e-mail
- **Então** o sistema retorna mensagem (R1)

---

### 4. Usuário Já Existente

- **Não deve permitir** o cadastro de um usuário já existente na plataforma
- **Dado que** inseri um e-mail já cadastrado (R1)
- **Quando** pressiono o botão “Salvar”
- **Então** o sistema retorna mensagem (R1)

---

### 5. Endereço de Entrega Diferente

- **Dado que** informei um endereço de entrega diferente do residencial
- **Quando** pressiono o botão “Salvar”
- **Então** o sistema deve registrar ambos os endereços

---

### 6. Endereço de Entrega Igual ao Residencial

- **Dado que** marquei a opção de endereço de entrega igual ao residencial
- **Quando** pressiono o botão “Salvar”
- **Então** o sistema deve registrar apenas o endereço residencial como entrega

---

## Regras de Negócio da História

### R1 – Inconsistência dos Campos

| Inconsistência                   | Mensagem                             |
| -------------------------------- | ------------------------------------ |
| Campo obrigatório não preenchido | “Campo obrigatório”                  |
| E-mail inválido                  | “Favor inserir um e-mail válido”     |
| Usuário já cadastrado            | “E-mail já cadastrado na plataforma” |

---

**Fonte:** O Autor (2024)
