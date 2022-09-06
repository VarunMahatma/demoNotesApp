import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { Note } from '../notes-interface';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  constructor(private router : Router, private _sharedServiceService:SharedServiceService) { }

  notesList:Note[] = [];
  term:string = '';
  ngOnInit(): void {
    this.notesList = (!localStorage.getItem('notelist') ? [] : JSON.parse(localStorage.getItem('notelist') || '{}'))
  }
  /*
   Add a new note
  */
   addNotes(){
    this.router.navigate(['note-details']);
    let obj = {
      noteObj :{
        'noteTitle' : '',
        'noteBody' : '',
        'noteCreationDate' : '',
        'noteId' : ''
      }, 
      'operationType': 'New'
    }
    this._sharedServiceService.setNote(obj);
   }
   /*
   edit a note
   */
   editNote(noteObj:object){
    this.router.navigate(['note-details']);
    let obj = {
        noteObj : noteObj,
       'operationType': 'Edit'
    }
    this._sharedServiceService.setNote(obj);
   }
}