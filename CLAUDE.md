# Claude Guidelines

## Purpose

This is a candidate pair programming exercise. Keep code simple and readable.

## Key Patterns

- **Types**: Shared types in `shared/types.ts`, raw JSON types in `back/src/types.ts`
- **Data transformation**: `back/src/transform.ts` converts raw JSON to clean types
- **API calls**: Centralized in `front/src/api.ts`, consumed via TanStack Query
- **Formatting**: `front/src/utils/format.ts` has shared formatters

## Don't

- Add unnecessary abstractions
- Over-engineer solutions
- Add features not explicitly requested

## When Adding New Data Fields

1. Add to raw types in `back/src/types.ts`
2. Add to shared types in `shared/types.ts`
3. Update transform in `back/src/transform.ts`
4. Update API functions if needed
5. Update React components
