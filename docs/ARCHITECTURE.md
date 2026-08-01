# RetroBoard — Architecture Document

## Overview

RetroBoard is a sprint retrospective tool built with Angular 22 (frontend) and NestJS (backend).  
It allows teams to create retro boards with four default columns (Went Well, To Improve, Action Items, Kudos), add cards, upvote, and manage their retrospective sessions.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 22 (standalone, signal-first, zoneless-ready) |
| Backend | NestJS 11 |
| Database | SQLite (via TypeORM, with synchronize for dev) |
| API Docs | Swagger/OpenAPI (auto-generated) |
| Styling | Tailwind v4 with custom theme |
| Build | Angular CLI (esbuild), NestJS CLI (webpack) |

## Project Structure

```
/opt/data/repositorios/2026-07-17-retro-board/
├── apps/
│   ├── api/                    # NestJS backend
│   │   ├── src/
│   │   │   ├── main.ts         # Entry point, Swagger setup
│   │   │   ├── app.module.ts   # Root module with TypeORM + Config
│   │   │   ├── boards/         # Board entity, controller, service, DTO
│   │   │   ├── cards/          # Card entity, controller, service, DTO
│   │   │   └── columns/        # Column entity + module
│   │   ├── dist/               # Compiled JS output
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/                    # Angular 22 frontend
│       ├── src/
│       │   ├── main.ts         # Bootstrap
│       │   ├── styles.css      # Tailwind v4 + custom theme
│       │   ├── index.html      # Shell HTML
│       │   └── app/
│       │       ├── app.ts               # Root component
│       │       ├── app.config.ts        # App providers
│       │       ├── app.routes.ts        # Routes
│       │       ├── models.ts            # TypeScript interfaces
│       │       ├── api.service.ts       # HTTP API client
│       │       ├── board-list.component.ts   # Board list page
│       │       ├── board-detail.component.ts # Single board view
│       │       └── card-item.component.ts    # Card with vote/delete
│       ├── dist/               # Compiled static files
│       └── package.json
├── docs/
│   ├── ARCHITECTURE.md         # This file
│   ├── API.md                  # API reference
│   └── FRONTEND.md             # Frontend guide
└── package.json                # Root workspace (optional)
```

## Architecture Decisions

### 1. Standalone Components (Angular 22)
All components use `standalone: true` with explicit imports, avoiding NgModules for the frontend.

### 2. Signals for State
Component state is managed via `signal()` from `@angular/core`, following Angular 22's signal-first pattern.

### 3. TypeORM with SQLite
The API uses TypeORM with SQLite for local development. The `synchronize: true` option auto-creates tables.  
Production would use PostgreSQL (Neon) with migrations.

### 4. Swagger Documentation
API endpoints are documented with `@nestjs/swagger` decorators, available at `/api/docs` when running.

### 5. Tailwind v4 + Custom Theme
A custom `@theme` block defines the project's design tokens (colors, spacing).  
Angular's build does not process Tailwind PostCSS — pre-compilation happens during deployment.

## Data Flow

```
Browser (Angular SPA)
  │  HTTP /api/*
  ▼
Caddy (reverse proxy, /api/* → NestJS)
  │
  ▼
NestJS API (controllers → services → TypeORM)
  │
  ▼
SQLite Database (./data/retroboard.db)
```

## Entity Relationships

```
Board
 ├── id (UUID, PK)
 ├── title, sprintName, description
 ├── createdAt / updatedAt
 ├── columns[] (OneToMany → ColumnEntity)
 └── cards[] (OneToMany → Card)

ColumnEntity
 ├── id (UUID, PK)
 ├── name, position (ordering)
 ├── boardId (FK → Board)
 └── cards[] (OneToMany → Card)

Card
 ├── id (UUID, PK)
 ├── text, author, votes
 ├── position (ordering within column)
 ├── columnId (FK → ColumnEntity)
 └── boardId (FK → Board)
```
