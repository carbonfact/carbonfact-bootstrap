# Backend Guidelines

## Adding New Endpoints

Add routes in `src/index.ts`:

```typescript
app.get("/api/endpoint", async (c) => {
  return c.json(data);
});
```

## Data Flow

1. JSON files live in `../data/`
2. Raw types in `src/types.ts` match JSON structure
3. Transform functions in `src/transform.ts` convert to clean types
4. Clean types imported from `../shared/types.ts`

## Adding New Product Fields

1. Add raw field type to `RawProduct` in `src/types.ts`
2. Add clean field type to `Product` in `../shared/types.ts`
3. Map the field in `getProduct()` in `src/transform.ts`
