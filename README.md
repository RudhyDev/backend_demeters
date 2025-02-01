<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Docker-Running-blue" alt="Docker" /></a>
  <a href="#"><img src="https://img.shields.io/badge/NestJS-Framework-red" alt="NestJS" /></a>
  <a href="#"><img src="https://img.shields.io/badge/PostgreSQL-Database-blue" alt="PostgreSQL" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Heroku-Deploy-green" alt="Heroku" /></a>
  <a href="#"><img src="https://img.shields.io/badge/OAuth2.0-Secure-orange" alt="OAuth2.0" /></a>
  <a href="#"><img src="https://img.shields.io/badge/JWT-Auth-yellow" alt="JWT" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Swagger-Documentation-%23Clojure?logo=swagger&logoColor=white" alt="Swagger" /></a>
</p>

## Configuração do Projeto

```bash
npm install
```

## Compilar e Executar o Projeto

```bash
# desenvolvimento
$ npm run start

# modo de observação
$ npm run start:dev

# modo de produção
$ npm run start:prod
```

## Executar Testes

```bash
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

## Documentação

Este projeto é baseado no [NestJS](https://docs.nestjs.com/) e segue os princípios de SOLID, DRY, KISS e Clean Architecture. A seguir, encontra-se o diagrama de classes utilizado como referência para os modelos do banco de dados.

## Diagrama de Classes

```mermaid
classDiagram
    class User {
        +id: UUID
        +name: String
        +email: String
        +password: String
        +phone: String
        +createdAt: DateTime
        +updatedAt: DateTime
        +getOrders()
        +updateProfile()
    }

    class Vendor {
        +id: UUID
        +userId: UUID
        +storeName: String
        +description: String
        +cnpj: String
        +openingHours: String
        +isDeliveryAvailable: Boolean
        +isPickupAvailable: Boolean
        +status: String
        +getProducts()
        +updateStore()
    }

    class Product {
        +id: UUID
        +vendorId: UUID
        +name: String
        +description: String
        +price: Decimal
        +promotionalPrice: Decimal
        +category: String
        +unit: String
        +stock: Integer
        +isAvailable: Boolean
        +updateProduct()
    }

    class Cart {
        +id: UUID
        +userId: UUID
        +total: Decimal
        +status: String
        +createdAt: DateTime
        +updatedAt: DateTime
        +addItem()
        +removeItem()
        +updateQuantity()
        +checkout()
    }

    class CartItem {
        +id: UUID
        +cartId: UUID
        +productId: UUID
        +quantity: Integer
        +price: Decimal
        +calculateSubtotal()
    }

    class Address {
        +id: UUID
        +userId: UUID
        +street: String
        +number: String
        +complement: String
        +neighborhood: String
        +city: String
        +state: String
        +zipCode: String
        +isDefault: Boolean
        +updateAddress()
    }

    class Order {
        +id: UUID
        +userId: UUID
        +vendorId: UUID
        +addressId: UUID
        +total: Decimal
        +deliveryFee: Decimal
        +status: String
        +deliveryType: String
        +createdAt: DateTime
        +updateStatus()
    }

    class OrderItem {
        +id: UUID
        +orderId: UUID
        +productId: UUID
        +quantity: Integer
        +price: Decimal
        +calculateSubtotal()
    }

    User "1" -- "n" Address
    User "1" -- "n" Cart
    User "1" -- "n" Order
    Vendor "1" -- "n" Product
    Cart "1" -- "n" CartItem
    CartItem "n" -- "1" Product
    Order "1" -- "n" OrderItem
    OrderItem "n" -- "1" Product
    Order "n" -- "1" Vendor
    Order "n" -- "1" Address
```

Isso demonstra a estrutura principal dos modelos do banco de dados, conforme o diagrama de classes proposto.

## Documentação da API

### Swagger UI

Acessível em [http://localhost:3000/api](http://localhost:3000/api) durante o desenvolvimento

### Arquivo Swagger JSON

Gerado automaticamente na raiz do projeto (`swagger.json`) toda vez que o servidor é iniciado

### Configurações Principais

- CORS habilitado para origens específicas
- Autenticação JWT integrada
- Validação de dados com class-validator
- Tipagem RESTful padrão

## Licença

O Nest é licenciado sob a licença [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
