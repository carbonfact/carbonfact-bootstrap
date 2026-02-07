# Frontend Guidelines

## Data Fetching

Always use TanStack Query via `src/api.ts`:

```typescript
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";

const { data, isLoading, error } = useQuery({
  queryKey: ["products"],
  queryFn: getProducts,
});
```

## Components

- Keep components small and focused
- Use lucide-react for icons
- Format names with `formatName()` from `utils/format.ts`

## Styling

- Tailwind CSS only, no custom CSS
- Follow existing color patterns (blue for primary, gray for secondary)
