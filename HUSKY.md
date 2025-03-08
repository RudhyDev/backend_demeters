# Configuração do Husky

Este projeto utiliza Husky para garantir a qualidade do código através de verificações automatizadas antes de cada commit.

## O que foi implementado

1. **Husky**: Ferramenta que permite executar scripts em diferentes momentos do Git (hooks)
2. **lint-staged**: Executa linters apenas nos arquivos que estão em staging, otimizando o processo

## Hooks configurados

### pre-commit

O hook `pre-commit` executa as seguintes verificações antes de cada commit:

1. **lint-staged**: 
   - Executa o Prettier para formatar o código
   - Executa o ESLint para corrigir problemas de linting que podem ser corrigidos automaticamente

2. **Testes unitários**:
   - Executa todos os testes unitários para garantir que o código continue funcionando corretamente

## Como funciona

Quando você tenta fazer um commit:

1. O Husky intercepta o comando de commit
2. Executa o lint-staged, que:
   - Formata os arquivos modificados com Prettier
   - Corrige problemas de linting com ESLint
3. Em seguida, executa todos os testes unitários
4. Se alguma dessas verificações falhar, o commit é abortado
5. Se todas as verificações passarem, o commit é concluído normalmente

## Contornando as verificações (uso com moderação)

Em casos excepcionais, você pode contornar as verificações usando:

```bash
git commit --no-verify -m "Mensagem do commit"
```

Mas isso deve ser usado apenas em situações especiais e com conhecimento da equipe.

## Configuração técnica

A configuração do lint-staged está definida no `package.json` e o hook pre-commit está definido em `.husky/pre-commit`.
