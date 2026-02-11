# Carbonfact Product Viewer

A simple application to explore product carbon footprint data.

## Data Model

A **product** (e.g., a sneaker) is made of **components** (e.g., outsole, upper, laces). Each component is made of **materials** (e.g., rubber, viscose, polyester).

Manufacturing a product involves **process steps** at every level. Materials go through extraction and preparation steps. Those materials are then transformed into components through processes like weaving, dyeing, and molding. Finally, components are assembled into the finished product. Each process step happens at a specific factory location.

```
Product (Sneaker)
├── Process Steps → Assembly (Indonesia)
└── Components
    ├── Upper
    │   ├── Process Steps → Textile Formation → Dyeing → Finishing → Assembly
    │   └── Materials
    │       └── Viscose
    │           └── Process Steps → Raw Materials (Austria) → Yarn Spinning (Austria)
    └── Outsole
        ├── Process Steps → Compression Molding
        └── Materials
            └── Recycled Rubber
                └── Process Steps → Raw Materials (Portugal)
```

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
