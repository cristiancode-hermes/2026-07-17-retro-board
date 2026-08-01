import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board, Card, CreateBoardDto, CreateCardDto, UpdateCardDto } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = '/api';

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.base}/boards`);
  }

  getBoard(id: string): Observable<Board> {
    return this.http.get<Board>(`${this.base}/boards/${id}`);
  }

  createBoard(dto: CreateBoardDto): Observable<Board> {
    return this.http.post<Board>(`${this.base}/boards`, dto);
  }

  deleteBoard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/boards/${id}`);
  }

  createCard(dto: CreateCardDto): Observable<Card> {
    return this.http.post<Card>(`${this.base}/cards`, dto);
  }

  updateCard(id: string, dto: UpdateCardDto): Observable<Card> {
    return this.http.patch<Card>(`${this.base}/cards/${id}`, dto);
  }

  deleteCard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/cards/${id}`);
  }

  upvoteCard(id: string): Observable<Card> {
    return this.http.post<Card>(`${this.base}/cards/${id}/upvote`, {});
  }
}
