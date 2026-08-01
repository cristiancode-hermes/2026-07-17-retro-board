import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { Board, ColumnEntity, Card, CreateCardDto } from './models';
import { CardItemComponent } from './card-item.component';

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CardItemComponent],
  template: `
    <div class="board-detail" style="animation: fadeUp 0.4s var(--ease-out-expo) both;">
      <!-- Header -->
      <div class="board-header">
        <a routerLink="/" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          Boards
        </a>
        <div class="header-title-group">
          <h1>{{ board()?.title }}</h1>
          @if (board()?.sprintName) {
            <span class="sprint-badge">{{ board()?.sprintName }}</span>
          }
        </div>
        <button class="btn btn-danger" (click)="deleteBoard()">Delete Board</button>
      </div>

      <!-- Columns -->
      <div class="columns">
        @for (col of columns(); track col.id) {
          <div class="column card">
            <div class="column-header">
              <h2 class="column-title">{{ col.name }}</h2>
              <span class="column-count">{{ getColumnCards(col.id).length }}</span>
            </div>
            <div class="cards">
              @for (card of getColumnCards(col.id); track card.id) {
                <app-card-item
                  [card]="card"
                  (upvote)="onUpvote($event)"
                  (delete)="onDeleteCard($event)"
                />
              } @empty {
                <div class="empty-col">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--color-text-muted); margin-bottom: 0.3rem;"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  <p>No cards yet</p>
                </div>
              }
            </div>
            <div class="add-card">
              <input
                #cardInput
                placeholder="Add a card..."
                (keyup.enter)="addCard(col.id, cardInput.value)"
                class="card-input"
              />
              <button class="btn btn-add" (click)="addCard(col.id, cardInput.value)" title="Add card">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .board-detail { padding: 1.5rem 2rem; max-width: 1200px; margin: 0 auto; }

    /* Header */
    .board-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    .board-header h1 {
      font-family: var(--font-heading);
      margin: 0;
      font-size: 1.65rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .header-title-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      color: var(--color-primary);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 0.4rem 0.75rem;
      border-radius: 0.5rem;
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
      transition: all 0.2s var(--ease-out-expo);
    }
    .back-link:hover {
      background: color-mix(in srgb, var(--color-primary) 20%, transparent);
    }
    .sprint-badge {
      background: color-mix(in srgb, var(--color-accent-teal) 18%, transparent);
      color: var(--color-accent-teal);
      padding: 0.2rem 0.65rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 500;
    }

    /* Columns */
    .columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      align-items: start;
    }
    .column.card {
      background: var(--color-bg-card);
      border: 1px solid var(--color-border);
      border-radius: 0.75rem;
      padding: 1rem;
      transition: border-color 0.2s var(--ease-out-expo);
    }
    .column.card:hover {
      border-color: var(--color-border-strong);
    }
    .column-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 0.6rem;
      border-bottom: 2px solid var(--color-border);
    }
    .column-title {
      font-family: var(--font-heading);
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text);
    }
    .column-count {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-muted);
      background: var(--color-bg);
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
    }
    .cards { min-height: 60px; }
    .empty-col {
      text-align: center;
      padding: 1.5rem 1rem;
      color: var(--color-text-muted);
      font-size: 0.8rem;
    }
    .empty-col p { margin: 0; }

    /* Add card */
    .add-card {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }
    .card-input {
      flex: 1;
      padding: 0.55rem 0.7rem;
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      background: var(--color-bg);
      color: var(--color-text);
      font-size: 0.85rem;
      outline: none;
      transition: border-color 0.2s var(--ease-out-expo);
    }
    .card-input:focus { border-color: var(--color-primary); }
    .card-input::placeholder { color: var(--color-text-muted); }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s var(--ease-out-expo);
    }
    .btn-add {
      background: var(--color-primary);
      color: #fff;
      padding: 0.5rem;
    }
    .btn-add:hover {
      background: var(--color-primary-hover);
      transform: translateY(-1px);
    }
    .btn-danger {
      background: transparent;
      border: 1px solid var(--color-danger);
      color: var(--color-danger);
      font-size: 0.8rem;
      padding: 0.4rem 0.85rem;
      margin-left: auto;
    }
    .btn-danger:hover {
      background: color-mix(in srgb, var(--color-danger) 12%, transparent);
    }

    @media (prefers-reduced-motion: reduce) {
      .board-detail { animation: none; }
    }
  `]
})
export class BoardDetailComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  board = signal<Board | null>(null);
  columns = signal<ColumnEntity[]>([]);
  cards = signal<Card[]>([]);
  boardId = '';

  ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.boardId) this.loadBoard();
  }

  loadBoard() {
    this.api.getBoard(this.boardId).subscribe(b => {
      this.board.set(b);
      this.columns.set(b.columns ?? []);
      this.cards.set(b.cards ?? []);
    });
  }

  getColumnCards(columnId: string): Card[] {
    return this.cards().filter(c => c.columnId === columnId);
  }

  addCard(columnId: string, text: string) {
    if (!text.trim()) return;
    const dto: CreateCardDto = {
      text: text.trim(),
      columnId,
      boardId: this.boardId,
    };
    this.api.createCard(dto).subscribe(() => this.loadBoard());
  }

  onUpvote(cardId: string) {
    this.api.upvoteCard(cardId).subscribe(() => this.loadBoard());
  }

  onDeleteCard(cardId: string) {
    this.api.deleteCard(cardId).subscribe(() => this.loadBoard());
  }

  deleteBoard() {
    if (confirm('Delete this board and all its cards?')) {
      this.api.deleteBoard(this.boardId).subscribe(() => {
        window.location.href = '/';
      });
    }
  }
}
