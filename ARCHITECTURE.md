# Arquitetura do Projeto Demeters

## Padrões Arquiteturais

Este projeto segue os princípios da Clean Architecture, com separação clara entre camadas de domínio, aplicação, infraestrutura e apresentação.

### Padrão Adapter

Padrão Adapter para transformação de entidades de domínio em DTOs de resposta. Este padrão foi adotado para:

1. **Separação de Camadas**: Manter a separação entre a camada de domínio (entidades) e a camada de apresentação (DTOs).

2. **Transformação de Dados**: Transformar os dados do formato interno (entidade) para o formato externo (DTO) que será exposto pela API.

3. **Segurança**: Controlar quais dados são expostos externamente, ocultando informações sensíveis ou desnecessárias.

4. **Flexibilidade**: Permitir que a estrutura interna das entidades mude sem afetar os controllers ou outros componentes externos.

5. **Consistência**: Garantir que todos os endpoints retornem dados no mesmo formato padronizado.

### Estrutura do Adapter

Cada módulo deve implementar:

1. Um arquivo `<entity-name>.adapter.ts` na pasta `application/adapters/` com pelo menos dois métodos:
   - `toDto(entity: Entity): EntityResponseDto`
   - `toDtoList(entities: Entity[]): EntityResponseDto[]`

2. Um arquivo `<entity-name>-response.dto.ts` na pasta `application/dtos/` definindo a estrutura do DTO de resposta.

### Uso nos Controllers

Nos controllers, as entidades retornadas pelos casos de uso devem ser transformadas em DTOs usando o Adapter antes de serem retornadas ao cliente:

```typescript
@Get()
async findAll(): Promise<EntityResponseDto[]> {
  const entities = await this.findAllUseCase.execute();
  return EntityAdapter.toDtoList(entities);
}
```

## Princípios de Design

Este projeto segue os princípios:
- SOLID
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)
- OOC (Object-Oriented Composition)

## Estratégia de Testes

### Testes Unitários

Este projeto implementa exclusivamente testes unitários, sem testes de integração ou e2e. Os testes unitários devem seguir estas diretrizes:

1. **Nomenclatura**: Arquivos de teste devem ter o sufixo `.spec.ts` e estar localizados próximos aos arquivos que testam.

2. **Isolamento**: Cada teste deve isolar a unidade testada, mockando todas as dependências externas.

3. **Cobertura**: Todos os casos de uso e controllers devem ter testes unitários cobrindo os fluxos principais e alternativos.

4. **Adaptadores**: Ao testar controllers que usam o padrão Adapter, deve-se mockar o Adapter para garantir que a transformação de dados está sendo chamada corretamente.

Exemplo de teste para controller com Adapter:

```typescript
describe('findAll', () => {
  it('should return list of users as DTOs', async () => {
    const users = [/* entidades mockadas */];
    const userDtos = [/* DTOs mockados */];
    
    jest.spyOn(UserAdapter, 'toDtoList').mockReturnValue(userDtos);
    userUseCase.findAll.mockResolvedValue(users);

    await expect(controller.findAll()).resolves.toEqual(userDtos);
    expect(userUseCase.findAll).toHaveBeenCalled();
    expect(UserAdapter.toDtoList).toHaveBeenCalledWith(users);
  });
});
```
