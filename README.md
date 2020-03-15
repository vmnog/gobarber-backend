# GoBarber Backend

### environment
- Eslint
- Prettier
- EditorConfig
- ES5 import/export syntax
- Docker
- Postgres

## How to run

<b>Start / Create your <a href="https://hub.docker.com/_/postgres">Docker Postgres</a> Container:</b>

```
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
<b>Check if this container is running:</b>

```
$ docker ps
```
<b>To visualize the postgres database we are going to use <a href="https://www.electronjs.org/apps/postbird">Postbird</a> </b>

![](assets/postbird_login.png)

<b>Create a new database in Postbird called ```gobarber``` </b>


