# authprismapassport

This project is a simple demonstration of creating an Todo application using express.js, prisma and passportjs

## How to use

1. Clone this project

```
git clone https://github.com/GNVageesh/authprismapassport.git
```

2. Add the environmental variable. Follow the instructions given in `.env.example` file

```
cp .env.example .env
```

3. Install the dependencies

```
npm install
or
yarn install
```

4. Create migrations for the database structure

```
npx prisma migrate dev --init "<message here>"
or
yarn prisma migrate dev --init "<message here>"
```

5. Generate the models

```
npx prisma generate
or
yarn prisma generate
```

6. Run the application

```
npm run dev
or
yarn dev
```

## Tech Stack

| Module      | Purpose                             |
| ----------- | ----------------------------------- |
| Express.js  | For the whole project               |
| Prisma      | As an ORM                           |
| MySQL       | For database                        |
| Passport.js | For authentication(local)           |
| EJS         | As Templating engine for express.js |
