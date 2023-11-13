# Carbon fact

Stack used:

- NextJS
- NestJS
- Prisma
- sqlite

# Quick start

### Frontend

```
# install frontend dependencies
cd apps/front
pnpm install
```

### Backend

```
# install backend dependencies
cd apps/back
pnpm install
# Install & seed DB
npx prisma db push && npx prisma db seed
```

### Frontend Execution

```
cd apps/front && pnpm dev
```

### Backend Execution

```
cd apps/back && pnpm start:dev
```

Open `localhost:3000`

![testImage](./SCR-20230910-trpq.png)

# Testing

### Back Unit testing

`pnpm run test`

### Backend integration testing

`pnpm run test:e2e`
