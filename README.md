# Welcome to wdw-v2

A game to guess what the others think

## Getting Started

### Installation

Install the dependencies:

```bash
deno install
```

### Development

Start the development server with HMR:

```bash
deno task dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
deno task build
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already
configured for a simple default starting experience. You can use whatever CSS
framework you prefer.

---

Built with ❤️ using React Router.

## Introspection workflow

see here: https://www.prisma.io/docs/orm/prisma-schema/introspection npx prisma
db pull

1. Change the database schema (e.g. using plain SQL)
2. Run prisma db pull to update the Prisma schema
3. Run prisma generate to update Prisma Client
4. Use the updated Prisma Client in your application

## Migration

https://www.prisma.io/docs/orm/prisma-migrate/getting-started npx prisma migrate
dev --name migrate_name dx prisma... also work dx prisma generate

## How to define Models in schema.prisma

https://www.prisma.io/docs/orm/prisma-schema/data-model/models

https://www.prisma.io/docs/orm/prisma-schema/data-model/relations
https://www.prisma.io/docs/orm/reference/prisma-schema-reference#model-field-scalar-types

Attributes:
https://www.prisma.io/docs/orm/reference/prisma-schema-reference#attributes

## Queries:

https://www.prisma.io/docs/orm/reference/prisma-client-reference#model-queries
