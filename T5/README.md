# Inicializando
```console
bundle install --path .vendor/bundle # instalar dependências
rails db:create # cria database
rails db:migrate # atualiza migrações da database
rails db:seed # pré-popula database
```

# Testando

## Testes unitários

```console
rake test
```

## Servidor

1. Rode o seguinte comando para iniciar o servidor:
    ```console
    rails s
    ````
2. Abrir `localhost:3000` em seu browser
3. Entrar como usuário `admin`:
    1. Entrar credenciais:
        - **email:** admin@example.com
        - **senha:** admin123
    2. Crie e edite novos registros a vontade!
4. Entrar como usuário `user`:
    1. Entrar credenciais:
        - **email:** user@example.com
        - **senha:** user123
    2. Apenas possível ver registros!
