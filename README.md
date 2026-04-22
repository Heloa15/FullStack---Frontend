# FullStack---Frontend
O site do mundo mais desejado do momento - Sua melhor versão começa aqui 

## Funcionalidades
- Cadastro de produtos com descrição.
- Busca em tempo real por nome ou marca.
- Visualização detalhada de cada item (clique no card).
- Design responsivo e moderno.

# Print do Site 
![Tela do site](telaSite.png)

## Como rodar

### 1. Banco de Dados
Execute o script abaixo no seu MySQL:
```sql
CREATE DATABASE powerfit;
USE powerfit;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    imagem TEXT,
    preco DECIMAL(10,2),
    categoria VARCHAR(100),
    marca VARCHAR(100),
    descricao TEXT
);
```

