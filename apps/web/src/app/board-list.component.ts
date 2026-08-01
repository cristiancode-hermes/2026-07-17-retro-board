import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { Board } from './models';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="board-list">
      <header class="header">
        <div class="brand">
          <span class="logo">◆</span>
          <h1>RetroBoard</h1>
        </div>
        <p class="subtitle">Sprint retrospectives, made fun.</p>
        <button class="btn btn-primary" (click)="showCreate = true">
          <span class="btn-icon">+</span> New Board
        </button>
      </header>

      @if (showCreate) {
        <div class="create-form card">
          <h3>Create New Retro Board</h3>
          <input
            #titleInput
            placeholder="Board title (e.g., Sprint 7 Retro)"
            (keyup.enter)="createBoard(titleInput.value)"
            class="input"
          />
          <input
            #sprintInput
            placeholder="Sprint name (optional)"
            (keyup.enter)="createBoard(titleInput.value)"
            class="input"
          />
          <div class="form-actions">
            <button class="btn btn-primary" (click)="createBoard(titleInput.value)">Create</button>
            <button class="btn btn-ghost" (click)="showCreate = false">Cancel</button>
          </div>
        </div>
      }

      <div class="boards-grid">
        @for (board of boards(); track board.id) {
          <a class="board-card card" [routerLink]="['/board', board.id]">
            <div class="board-card-inner">
              <h2>{{ board.title }}</h2>
              @if (board.sprintName) {
                <span class="sprint-badge">{{ board.sprintName }}</span>
              }
              <span class="date">{{ board.createdAt | date:'mediumDate' }}</span>
            </div>
            <span class="arrow">→</span>
          </a>
        } @empty {
          <div class="empty-state">
            <span class="empty-icon">◇</span>
            <p>No boards yet. Create your first retro board!</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .board-list {
      padding: 2.5rem 2rem;
      max-width: 960px;
      margin: 0 auto;
      min-height: 100vh;
    }

    .header {
      text-align: center;
      margin-bottom: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .logo {
      font-size: 1.8rem;
      color: var(--color-primary);
      animation: logo-pop 0.5s var(--ease-out-expo);
    }

    @keyframes logo-pop {
      0% { transform: scale(0.3); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    .header h1 {
      font-family: var(--font-heading);
      font-size: 2.25rem;
      font-weight: 700;
      margin: 0;
      color: var(--color-text);
      letter-spacing: -0.02em;
    }

    .subtitle {
      color: var(--color-text-muted);
      margin: 0;
      font-size: 0.95rem;
    }

    .boards-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }

    .board-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      text-decoration: none;
      color: inherit;
      transition: transform 0.25s var(--ease-out-expo), box-shadow 0.25s var(--ease-out-expo), border-color 0.25s var(--ease-out-expo);
    }

    .board-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
      border-color: var(--color-primary);
    }

    .board-card-inner h2 {
      font-family: var(--font-heading);
      margin: 0 0 0.35rem;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .sprint-badge {
      display: inline-block;
      background: color-mix(in srgb, var(--color-accent-teal) 18%, transparent);
      color: var(--color-accent-teal);
      padding: 0.15rem 0.55rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 500;
      margin-bottom: 0.35rem;
    }

    .date {
      display: block;
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }

    .arrow {
      color: var(--color-text-muted);
      font-size: 1.1rem;
      transition: transform 0.25s var(--ease-out-expo), color 0.25s var(--ease-out-expo);
    }

    .board-card:hover .arrow {
      transform: translateX(4px);
      color: var(--color-primary);
    }

    .create-form {
      padding: 1.5rem;
      margin-bottom: 1.75rem;
      animation: slide-down 0.3s var(--ease-out-expo);
    }

    @keyframes slide-down {
      0% { transform: translateY(-12px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }

    .create-form h3 {
      font-family: var(--font-heading);
      margin: 0 0 1rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .input {
      width: 100%;
      padding: 0.7rem 0.9rem;
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      background: var(--color-bg);
      color: var(--color-text);
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
      transition: border-color 0.2s var(--ease-out-expo);
    }

    .input:focus {
      border-color: var(--color-primary);
    }

    .input::placeholder {
      color: var(--color-text-muted);
    }

    .form-actions {
      display: flex;
      gap: 0.5rem;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem 2rem;
      color: var(--color-text-muted);
    }

    .empty-icon {
      font-size: 2.5rem;
      display: block;
      margin-bottom: 0.75rem;
      color: var(--color-border-strong);
    }

    .btn {
      padding: 0.6rem 1.25rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.2s var(--ease-out-expo);
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }

    .btn-icon {
      font-size: 1.1rem;
      line-height: 1;
    }

    .btn-primary {
      background: var(--color-primary);
      color: #fff;
    }

    .btn-primary:hover {
      background: var(--color-primary-hover);
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(217, 119, 6, 0.3);
    }

    .btn-ghost {
      background: transparent;
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
    }

    .btn-ghost:hover {
      background: var(--color-bg-elevated);
      color: var(--color-text);
    }

    .card {
      background: var(--color-bg-card);
      border: 1px solid var(--color-border);
      border-radius: 0.75rem;
    }
  `]
})
export class BoardListComponent implements OnInit {
  private api = inject(ApiService);
  boards = signal<Board[]>([]);
  showCreate = false;

  ngOnInit() {
    this.loadBoards();
  }

  loadBoards() {
    this.api.getBoards().subscribe(b => this.boards.set(b));
  }

  createBoard(title: string) {
    if (!title.trim()) return;
    this.api.createBoard({ title: title.trim() }).subscribe(() => {
      this.showCreate = false;
      this.loadBoards();
    });
  }
}
