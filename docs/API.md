# RetroBoard API Reference

Base URL: `/api`  
Swagger UI: `/api/docs` (when server is running)

---

## Boards

### `GET /api/boards`
List all boards (newest first).

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Sprint 7 Retro",
    "sprintName": "Sprint 7",
    "description": "...",
    "createdAt": "2026-07-17T...",
    "updatedAt": "2026-07-17T..."
  }
]
```

### `POST /api/boards`
Create a new board. Auto-creates 4 default columns.

**Body:**
```json
{
  "title": "Sprint 7 Retro",
  "sprintName": "Sprint 7",
  "description": "Our sprint 7 retrospective"
}
```

**Response:** Full board object with columns and cards.

### `GET /api/boards/:id`
Get board with all columns and cards.

**Response:**
```json
{
  "id": "uuid",
  "title": "Sprint 7 Retro",
  "columns": [
    {
      "id": "uuid",
      "name": "🌟 Went Well",
      "position": 0,
      "cards": [
        { "id": "uuid", "text": "Great teamwork", "votes": 3, ... }
      ]
    }
  ],
  "cards": [...]
}
```

### `PATCH /api/boards/:id`
Update board metadata.

**Body:** (partial)
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

### `DELETE /api/boards/:id`
Delete board and all associated columns/cards (cascade).

---

## Cards

### `POST /api/cards`
Add a card to a board column.

**Body:**
```json
{
  "text": "Deployed to production smoothly",
  "author": "Alice",
  "columnId": "column-uuid",
  "boardId": "board-uuid"
}
```

### `PATCH /api/cards/:id`
Update card text, move to different column, or change position.

**Body:** (partial)
```json
{
  "text": "Updated text",
  "columnId": "new-column-uuid",
  "position": 2
}
```

### `DELETE /api/cards/:id`
Delete a card.

### `POST /api/cards/:id/upvote`
Increment card vote count by 1.

**Response:** Updated card object.

---

## Error Responses

```json
{
  "message": "Board xyz not found",
  "error": "Not Found",
  "statusCode": 404
}
```

## Default Columns

When a board is created, 4 columns are auto-generated:

| Position | Name |
|----------|------|
| 0 | 🌟 Went Well |
| 1 | 🔧 To Improve |
| 2 | 📋 Action Items |
| 3 | 🎉 Kudos |
