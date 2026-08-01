# RetroBoard 🎯

Sprint retrospective board built with Angular 22 + NestJS.

Create boards, add cards to columns (Went Well, To Improve, Action Items, Kudos), upvote, and manage your team's retrospectives.

## Quick Start

```bash
# Install dependencies
cd apps/api && npm install
cd ../web && npm install

# Build API
cd apps/api && npm run build

# Build Web (note: Tailwind v4 needs pre-compilation — see docs/FRONTEND.md)
cd apps/web && npm run build
```

## Project Structure

```
apps/
├── api/     NestJS backend (TypeORM, SQLite, Swagger)
└── web/     Angular 22 frontend (standalone, signals, Tailwind v4)
docs/
├── ARCHITECTURE.md
├── API.md
└── FRONTEND.md
```

## API

- Base: `/api`
- Docs: `/api/docs` (Swagger UI)
- Boards: CRUD + default column creation
- Cards: CRUD + upvote

## Tech Stack

| Frontend | Backend | Database | Styling |
|----------|---------|----------|---------|
| Angular 22 | NestJS 11 | SQLite (TypeORM) | Tailwind v4 |
| Signals | Swagger | synchronize: true | Dark theme |
| HttpClient | Validation | UUID PKs | Indigo palette |

## Build Status

✅ API: `npm run build` — clean  
✅ Web: `ng build` — clean (Tailwind @theme needs deploy-time pre-processing)
