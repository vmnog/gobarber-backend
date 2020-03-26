# Common commands

Fluxo de criação:
1. Migration
2. Model
3. Controller
4. Rota
5. importa o model no index.js e coloca no array de models
6. Modifica o Controller

### Date format
  ```
	"date": "2020-03-25T12:00:00-03:00"
            ano-mes-diaThora:minutos:segundos-timezone
  ```

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

### Postgres Docker

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


### MongoDB Docker

<b>Start / Create your Docker MongoDB Container:</b>

```
$ docker run --name mongobarber -p 27017:27017 -d -t mongo

```