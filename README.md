# Carbonfact Product Viewer

A simple application to explore product carbon footprint data, displaying components, materials, and distribution information.

## Tech Stack

- **Runtime**: Bun
- **Backend**: Hono
- **Frontend**: Vite + React
- **Styling**: Tailwind CSS
- **Linting**: Biome

## Project Structure

```
├── back/           # Hono API server
├── front/          # React frontend
├── shared/         # Shared TypeScript types
└── data/           # Product JSON files
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (see `.bun-version`)

### Installation

```bash
bun install
```

### Development

Start both backend and frontend:

```bash
bun run dev
```

Or run them separately:

```bash
bun run dev:back   # Backend on http://localhost:3001
bun run dev:front  # Frontend on http://localhost:5173
```

### Linting

```bash
bun run lint       # Check for issues
bun run lint:fix   # Auto-fix issues
```

## API Endpoints

- `GET /api/products` - List all products (summary)
- `GET /api/products/:id` - Get product details
