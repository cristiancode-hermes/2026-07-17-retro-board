# RetroBoard — Frontend Guide

## Overview

The frontend is an Angular 22 standalone application using signals, routing, and the HttpClient for API communication.

## Key Technologies

- **Angular 22** with standalone components (no NgModules)
- **Signal-based state** — all component state uses `signal()` from `@angular/core`
- **Angular Router** for navigation between board list and board detail
- **HttpClient** with `provideHttpClient()` for backend communication
- **Tailwind v4** via `@import "tailwindcss"` with a custom `@theme` block
- **No external UI libraries** — all styling is custom CSS within components

## Components

### AppComponent (`app.ts`)
Root shell component — just renders `<router-outlet />`.

### BoardListComponent (`board-list.component.ts`)
- Displays all boards in a responsive grid
- Create new board form (inline)
- Navigate to board detail on click
- Signals: `boards`, `showCreate`

### BoardDetailComponent (`board-detail.component.ts`)
- Shows a single board with its 4 columns
- Each column displays its cards
- Add card via input field
- Upvote/delete cards
- Delete board with confirmation
- Signals: `board`, `columns`, `cards`

### CardItemComponent (`card-item.component.ts`)
- Displays a single card with text, author, timestamp
- Upvote button with count
- Delete button
- Inputs/Outputs: `card`, `upvote`, `delete`

## Models (`models.ts`)

```typescript
Board { id, title, sprintName?, description?, createdAt, updatedAt, columns?, cards? }
ColumnEntity { id, name, position, boardId, cards? }
Card { id, text, author?, votes, columnId, boardId, position, createdAt }
CreateBoardDto { title, sprintName?, description? }
CreateCardDto { text, author?, columnId, boardId }
UpdateCardDto { text?, columnId?, position? }
```

## API Service (`api.service.ts`)

Centralized HTTP client mapping all REST endpoints:

| Method | Endpoint |
|--------|----------|
| `getBoards()` | GET /api/boards |
| `getBoard(id)` | GET /api/boards/:id |
| `createBoard(dto)` | POST /api/boards |
| `deleteBoard(id)` | DELETE /api/boards/:id |
| `createCard(dto)` | POST /api/cards |
| `updateCard(id, dto)` | PATCH /api/cards/:id |
| `deleteCard(id)` | DELETE /api/cards/:id |
| `upvoteCard(id)` | POST /api/cards/:id/upvote |

## Routing

| Path | Component |
|------|-----------|
| `/` | BoardListComponent |
| `/board/:id` | BoardDetailComponent |
| `**` | Redirect to `/` |

## Styling

- Global styles in `styles.css` with Tailwind v4 `@import "tailwindcss"`
- Custom `@theme` defines: primary (indigo), success, warning, danger, surface colors
- Dark theme by default (deep indigo backgrounds)
- Component-specific styles use Angular's inline `styles` array
- CSS classes: `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-danger`, `.card`, `.input`

## Build

```bash
# Development (with Tailwind pre-processing needed)
cd apps/web
npm install
node scripts/build-css.js src/styles.css   # if Tailwind needs pre-compilation
npx ng serve                                # development server

# Production build
npx ng build
# Output: dist/web/browser/
```

## Tailwind v4 Note

Angular 22's `@angular/build:application` (esbuild-based) does NOT process Tailwind v4's `@import "tailwindcss"` or `@theme` directives via PostCSS.  
The CSS output will contain raw Tailwind directives that browsers don't understand.  
**Fix applied during deployment:** pre-compile `styles.css` using the PostCSS script before `ng build`, as documented in `scripts/build-css.js`.
