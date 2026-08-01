import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from './models';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-item" [class.high-votes]="card().votes > 0">
      <div class="card-body">
        <p class="card-text">{{ card().text }}</p>
        <div class="card-meta">
          @if (card().author) {
            <span class="card-author">— {{ card().author }}</span>
          }
          <span class="card-date">{{ card().createdAt | date:'shortTime' }}</span>
        </div>
      </div>
      <div class="card-actions">
        <button class="vote-btn" (click)="upvote.emit(card().id)" [class.voted]="card().votes > 0">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
          <span class="vote-count">{{ card().votes }}</span>
        </button>
        <button class="delete-btn" (click)="delete.emit(card().id)" title="Delete card">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .card-item {
      background: var(--color-bg-elevated);
      border: 1px solid var(--color-border);
      border-radius: 0.625rem;
      padding: 0.85rem;
      margin-bottom: 0.6rem;
      transition: border-color 0.2s var(--ease-out-expo), transform 0.2s var(--ease-out-expo);
    }
    .card-item:hover {
      border-color: var(--color-primary);
      transform: translateY(-1px);
    }
    .card-item.high-votes {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 1px var(--color-primary), 0 4px 12px rgba(217,119,6,0.15);
    }
    .card-body { margin-bottom: 0.5rem; }
    .card-text {
      margin: 0 0 0.4rem;
      font-size: 0.9rem;
      line-height: 1.5;
      color: var(--color-text);
    }
    .card-meta { display: flex; align-items: center; gap: 0.5rem; }
    .card-author { font-size: 0.78rem; color: var(--color-accent-teal); }
    .card-date { font-size: 0.7rem; color: var(--color-text-muted); }
    .card-actions { display: flex; justify-content: space-between; align-items: center; }
    .vote-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      padding: 0.3rem 0.6rem;
      color: var(--color-text-muted);
      font-size: 0.8rem;
      font-weight: 500;
      transition: all 0.2s var(--ease-out-expo);
    }
    .vote-btn:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
      background: color-mix(in srgb, var(--color-primary) 8%, transparent);
    }
    .vote-btn.voted {
      border-color: var(--color-primary);
      color: var(--color-primary);
      background: color-mix(in srgb, var(--color-primary) 12%, transparent);
    }
    .delete-btn {
      background: transparent;
      border: none;
      color: var(--color-text-muted);
      padding: 0.3rem;
      border-radius: 0.4rem;
      transition: all 0.2s var(--ease-out-expo);
    }
    .delete-btn:hover {
      color: var(--color-danger);
      background: color-mix(in srgb, var(--color-danger) 10%, transparent);
    }
  `]
})
export class CardItemComponent {
  card = input.required<Card>();
  upvote = output<string>();
  delete = output<string>();
}
