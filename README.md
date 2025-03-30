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
    User "1" -- "0..1" Vendor
    Vendor "1" -- "n" Product
    Cart "1" -- "n" CartItem
    CartItem "n" -- "1" Product
    Order "1" -- "n" OrderItem
    OrderItem "n" -- "1" Product
    Order "n" -- "1" Vendor
    Order "n" -- "1" Address
```

Isso demonstra a estrutura principal dos modelos do banco de dados, conforme o diagrama de classes proposto.

## Diagrama de Relacionamento entre Tabelas

```mermaid
erDiagram
    User ||--o{ Address : possui
    User ||--o{ Cart : possui
    User ||--o{ Order : realiza
    User ||--o| Vendor : pode_ser
    
    Vendor ||--o{ Product : oferece
    Vendor ||--o{ Order : recebe
    
    Cart ||--o{ CartItem : contem
    CartItem }o--|| Product : referencia
    
    Order ||--o{ OrderItem : contem
    OrderItem }o--|| Product : referencia
    Order }o--|| Address : entrega_em
    
    User {
        uuid id PK
        string name
        string email
        string password
        string phone
        datetime createdAt
        datetime updatedAt
    }
    
    Vendor {
        uuid id PK
        uuid userId FK
        string storeName
        string description
        string cnpj
        string openingHours
        boolean isDeliveryAvailable
        boolean isPickupAvailable
        string status
    }
    
    Product {
        uuid id PK
        uuid vendorId FK
        string name
        string description
        decimal price
        decimal promotionalPrice
        string category
        string unit
        integer stock
        boolean isAvailable
    }
    
    Cart {
        uuid id PK
        uuid userId FK
        decimal total
        string status
        datetime createdAt
        datetime updatedAt
    }
    
    CartItem {
        uuid id PK
        uuid cartId FK
        uuid productId FK
        integer quantity
        decimal price
    }
    
    Address {
        uuid id PK
        uuid userId FK
        string street
        string number
        string complement
        string neighborhood
        string city
        string state
        string zipCode
        boolean isDefault
    }
    
    Order {
        uuid id PK
        uuid userId FK
        uuid vendorId FK
        uuid addressId FK
        decimal total
        decimal deliveryFee
        string status
        string deliveryType
        datetime createdAt
    }
    
    OrderItem {
        uuid id PK
        uuid orderId FK
        uuid productId FK
        integer quantity
        decimal price
    }
```

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

## Dockerização

### Ambiente de Desenvolvimento
```bash
docker-compose up --build
```

### Ambiente de Produção
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

### Comandos Úteis
- Visualizar logs: `docker-compose logs -f backend`
- Parar containers: `docker-compose down`
- Limpar volumes: `docker-compose down -v`

## Licença

O Nest é licenciado sob a licença [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
