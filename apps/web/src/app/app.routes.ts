import { Routes } from '@angular/router';
import { BoardListComponent } from './board-list.component';
import { BoardDetailComponent } from './board-detail.component';

export const routes: Routes = [
  { path: '', component: BoardListComponent },
  { path: 'board/:id', component: BoardDetailComponent },
  { path: '**', redirectTo: '' },
];
