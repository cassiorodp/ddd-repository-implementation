# FC DDD Patterns - Domain-Driven Design Implementation

Implementação completa em TypeScript demonstrando padrões Domain-Driven Design com repositórios, entidades e testes automatizados.

## Instalação

1. Clone o repositório:

   ```bash
   git clone <repository-url>
   cd fc-ddd-patterns
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Executar Testes

Execute todos os testes com:

```bash
npm test
```

**Resultado esperado**: 44 testes passando ✅

## Comandos Disponíveis

```bash
# Rodar todos os testes
npm test

# Rodar testes em modo watch
npm test -- --watch

# Verificar tipos TypeScript
npm run tsc
```

## Estrutura do Projeto

O projeto segue Domain-Driven Design com duas camadas principais:

- **Domain Layer** (`src/domain/`): Lógica de negócio com entidades, value objects e repositórios
- **Infrastructure Layer** (`src/infrastructure/`): Implementações de repositórios com Sequelize/SQLite

## Implementação Completa

A classe `OrderRepository` implementa totalmente a interface `OrderRepositoryInterface` com os métodos:

- `create()` - Criar novas orders
- `update()` - Atualizar orders existentes
- `find()` - Buscar order por ID
- `findAll()` - Listar todas as orders

Todos os testes passam com sucesso validando a manipulação correta de dados.
