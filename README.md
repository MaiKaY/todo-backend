# What is it?

Boilerplate repository to showcase me (and others) my current way of building an AWS baked backend.

# Why am I doing it?

I can't really remember how I wrote code several years ago and why I did things in a certain way. With this repository I would like to capture all my (new) learnings in one central ([or two?](https://github.com/MaiKaY/todo-frontend)) place. I selected a simple theme "Todo list" to keep the scope as small as possible.

# What am I using?

## Clean Architecture

> [...] Nothing in an inner circle can know anything at all about something in an outer circle. In particular, the name of something declared in an outer circle must not be mentioned by the code in the an inner circle. [...]
[read full article](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

##### `0.shared`

Holds functionality which could be used across all layers.

##### `1.domain`

Holds the domain (behavior) logic of the application.

##### `2.application`

Holds the application use cases, how to interact with the application.

##### `3.infrastructure`

Holds the concrete implementation which are defined either in `1.domain` or `2.application`.

##### `4.bin`

Holds the entry points to the application.

##### `5.cdk`

Holds the definition of the AWS infrastructure.

## Event Sourcing

> [...] Event Sourcing ensures that all changes to application state are stored as a sequence of events. [...] [read full article](https://martinfowler.com/eaaDev/EventSourcing.html)

## Snapshotting

It's not part of the code, yet. As soon as it's available I will add a small description here.

## Infrastructure as Code

From the fully automated [CI/CD pipeline](https://github.com/MaiKaY/todo-backend/blob/main/src/5.cdk/pipeline-stack.ts) to the whole [AWS infrastructure](https://github.com/MaiKaY/todo-backend/blob/main/src/5.cdk/infrastructure-stack.ts) everything is written as code to have full visibility and reproducibility of the used infrastructure. Thanks to [AWS CDK](https://aws.amazon.com/cdk/)!

## Linting

No one likes conflicts in code styles. __No__. __One__. Therefore I use (hopefully) the right mixture of three different tools and ensure they are applied even before hitting the repository (at least if the git hooks are not deactivated ~~on purpose~~ accidentally).

- [editorconfig](https://github.com/MaiKaY/todo-backend/blob/main/.editorconfig)
- [eslint](https://github.com/MaiKaY/todo-backend/blob/main/.eslintrc.js)
- [prettier](https://github.com/MaiKaY/todo-backend/blob/main/.prettierrc.js)

# What am I intersted in?

- [ ] using CQRS (Command Query Responsibility Segregation)
- [ ] tell me!
