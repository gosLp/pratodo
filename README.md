<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
A nestjs based CRUD Todos application. Assignment 
Done with nestjs, postgres and pactum for e2e testing.  
This project is a web application built with NestJS, a progressive Node.js framework, designed to help you create scalable and maintainable server-side applications. The project follows a dependency injection architecture, which promotes code modularity and reusability, making it easier to manage and extend your codebase.

The application leverages the power of NestJS's design patterns and built-in modules to provide a robust and well-structured back end. It also incorporates Pactum for end-to-end (E2E) testing, ensuring that your application functions correctly from the user's perspective.

## Features
NestJS: The application is built with NestJS, a Node.js framework that simplifies server-side development by providing a scalable, extensible, and maintainable architecture.

Dependency Injection: Follows the dependency injection pattern, a core concept of NestJS, to enhance code modularity, improve testability, and make your codebase more maintainable.

Pactum E2E Testing: Utilizes Pactum for end-to-end (E2E) testing. Pactum is a versatile testing library that allows you to write concise and expressive E2E tests to ensure the reliability of your application.

Modularity: NestJS's module system encourages code modularity, allowing you to organize your application into manageable components and promote reusability.
## Installation

```bash
$ yarn install

```

## Database
build the postgres DB based on the docker compose file
to reset the db and applying all the migrations use the yarn db:dev:restart

```bash
$ docker-compose build

$ docker-compose up

$ yarn db:dev:restart
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

for the testing environment use the yarn db:test:restart to reset test db environment 

End to end testing has been implemnted to test functionality of the following:
1. Login
2. Signup
3. Get User info
4. Edit User info
5. Get User Todo
6. Get Specific Todo
7. Delete Todo based on Id
8. Get Todo based on Status
9. Edit Todo based on ID

```bash

# e2e tests
$ yarn run test:e2e


```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE).
