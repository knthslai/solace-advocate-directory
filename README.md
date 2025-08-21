## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Getting Started with Database

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you'd like to configure a database, you're encouraged to do so.

### Quick Setup (Recommended)

**One-liner setup:**

```bash
npm run db:init
```

**Or step by step:**

1. **Start PostgreSQL database**

```bash
docker compose up -d
```

2. **Push schema to database**

```bash
npx drizzle-kit push
```

3. **Seed the database**

```bash
curl -X POST http://localhost:3000/api/seed
```

4. **Start the development server**

```bash
npm run dev
```

### Database Configuration

The project uses PostgreSQL with Drizzle ORM. The database configuration is in `.env`:

```
DATABASE_URL=postgresql://postgres:password@localhost/postgres
```

**Note**: The application will throw a clear error if `DATABASE_URL` is not set, ensuring configuration issues are caught early.
