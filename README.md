<h1 align="center">GoBarber Backend</h1>

### Environment

- <b>Eslint</b>: linting the code
- <b>Prettier</b>: make the code prettier
- <b>EditorConfig</b>: force standarts vscode for all coders
- <b>Esm</b>: able to use ES5 import/export syntax
- <b>Docker</b>: create containers without having to install database in computer
- <b>Postgres</b>: for realational sql data
- <b>Sequelize</b>: to interact with postgres via MVC
- <b>Bcryptjs</b>: to encrypt data such as user's password
- <b>jsonwebtoken</b>: to create session for a user and login
- <a href="https://www.md5online.org/">MD5 Online</a>: generate sentence hash to security use of jwt (SessionController)
- <b>YUP</b>: to validate inputs on http requests
- <b>Multer</b>: to handle multi part form data (file upload)
- <b>Crypto</b>: to generate handle bytes to storage files with unique names
- <b>path/resolve</b>: to handle with folder location in this project (where the files are going to be storaged)
- <b>date-fns</b>: to handle dates/days/hour in providers appointments
- <b>Nodemailer</b>: to send emails
- <b>handlebarsjs</b>: to set template engines for emails
- <b>Sentry</b>: to see / manage errors more clearly
- <b>Youch</b>: to treat and format errors

## How to run

<b> Clone de project to your local repository </b>

```
$ git clone https://github.com/vmnog/gobarber-backend.git

$ cd gobarber-backend

```

<b> Install all dependencies </b>

```
$ yarn install
```

<b>Start / Create your <a href="https://hub.docker.com/_/postgres">Docker Postgres</a> Container:</b>

```
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

<b>Start / Create your Docker MongoDB Container:</b>

```
$ docker run --name mongobarber -p 27017:27017 -d -t mongo

```

<b>Check if this container is running:</b>

```
$ docker ps
```

<b>To visualize the postgres database we are going to use <a href="https://www.electronjs.org/apps/postbird">Postbird</a> </b>

![](assets/postbird_login.png)

<b>Open Postbird and create a new database called `gobarber` </b>

<b>Run all migrations to create all needed tables</b>

```
$ yarn sequelize db:migrate
```

<b> To visualize the email that we are sending to the provider we use <a href="https://mailtrap.io">Mailtrap</a>.

Using mailtrap substitute the values in src/app/config/mail.js to your smtp values, otherwise the emails feature won't work.

### Continue ...
