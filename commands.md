# Common commands

Fluxo de criação:
1. Rota
2. Controller
3. Migration
4. Model
5. importa no index.js e coloca no array de models
6. Modifica o Controller

## Sequelize

<b>Create a migration</b>

```
$ yarn sequelize migration:create --name=create-users
```

<b>Run all migrations</b>

```
$ yarn sequelize db:migrate
```

<b>Undo last migration</b>

```
$ yarn sequelize db:migrate:undo
```

<b>Undo all migrations</b>

```
$ yarn sequelize db:migrate:undo:all
```

## Docker

<b>Start / Create your <a href="https://hub.docker.com/_/postgres">Docker Postgres</a> Container:</b>

```
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

<b>Run docker postgres database</b>

```
$ docker start database
```

<b>Stop docker postgres database</b>

```
$ docker stop database
```

<b>List all docker containers running</b>

```
$ docker ps
```

<b>List all docker containers</b>

```
$ docker ps -a
```
