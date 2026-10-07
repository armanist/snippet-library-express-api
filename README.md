# Snippet Library Express API

Snippet Library API built with Express 5, TypeScript, SQLite, and TypeORM.

## Features

- Express 5 REST API and Apollo Server GraphQL API, written in TypeScript
- Snippet CRUD, search, and server-side pagination through both APIs
- SQLite persistence through TypeORM migrations, with schema synchronization disabled
- Zod validation and a health-check endpoint

## Requirements

- Node.js 24.19.0 (the version used to verify this project)
- npm

## Setup

Install dependencies from the project root:

```bash
npm install
```

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

If `.env` already exists, keep it and confirm its settings instead of overwriting it.

The example configures:

```dotenv
DATABASE_PATH=./snippets.sqlite
PORT=3000
CLIENT_ORIGIN=http://localhost:5173
```

`.env` and the SQLite database are ignored by Git. Keep secrets and machine-specific configuration in `.env`, not `.env.example`.

Build the project before running migrations. TypeORM runs the compiled migration files from `dist`:

```bash
npm run build
npm run typeorm -- migration:run -d dist/database/data-source.js
```

TypeORM records applied migrations in the database. On an already initialized database, `No migrations are pending` means there are no unapplied migrations. On a fresh setup, if you expected a migration, rebuild and verify that its compiled file exists in `dist/database/migrations`.

## Run the API

Start the development server with watch mode:

```bash
npm run dev
```

The server uses the configured `PORT` or defaults to `3000`. Check that it is responding with:

```http
GET http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

## API

### REST

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Check that the API is responding |
| `GET` | `/snippets` | List snippets; accepts `search`, `page`, and `limit` query parameters |
| `GET` | `/snippets/:id` | Get one snippet |
| `POST` | `/snippets` | Create a snippet |
| `PATCH` | `/snippets/:id` | Update a snippet |
| `DELETE` | `/snippets/:id` | Delete a snippet |

### GraphQL

Send GraphQL operations to `POST /graphql`. During local development, open `http://localhost:3000/graphql` in a browser to use Apollo Sandbox.

The API provides the `snippet` and `snippets` queries, and the `createSnippet`, `updateSnippet`, and `deleteSnippet` mutations. For example:

```graphql
query {
  snippets(search: "php", page: 1, limit: 20) {
    snippets {
      id
      title
      language
    }
    pagination {
      page
      limit
      total
      totalPages
    }
  }
}
```

## Database migrations

The TypeORM DataSource is defined in `src/database/data-source.ts`. It uses `DATABASE_PATH`, loads migrations from the compiled `dist/database/migrations` directory, and sets `synchronize: false` so schema changes are made through migrations rather than automatic synchronization.

Whenever a migration is added or changed, rebuild before running it:

```bash
npm run build
npm run typeorm -- migration:run -d dist/database/data-source.js
```

## Development commands

```bash
# Check TypeScript without writing build output
npm run type-check

# Compile src/ into dist/
npm run build

# Run the compiled application (build first)
npm start
```
