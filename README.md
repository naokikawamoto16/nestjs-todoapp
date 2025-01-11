## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migration

```bash
# migrate
$ npx prisma migrate dev

# create migration
$ npx prisma migrate dev --name added_id

# prisma studio
$ npx prisma studio
```

## ToDo
- [ ] Refresh token
- [ ] User roles
- [ ] Task due date
  - [ ] Task due date notification
- [ ] OAuth2
- [ ] Cache
- [ ] Tags
- [ ] Profile Picture
- [ ] Task priority
- [ ] Lists
- [ ] Search
