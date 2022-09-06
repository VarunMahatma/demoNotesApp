import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteDetailsComponent } from './Notes/note-details/note-details.component';
import { NotesListComponent } from './Notes/notes-list/notes-list.component';
const routes: Routes = [
  { path : '', component: NotesListComponent },
  { path : 'note-details', component : NoteDetailsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
