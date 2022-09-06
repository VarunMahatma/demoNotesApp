import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { Note } from '../notes-interface';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  
  constructor(private router: Router, private _sharedServiceService:SharedServiceService) { }

  notesList:Note[] = [];
  noteForm:any;
  noteIndex:Number=0;
  selectedNoteObj:any;

  ngOnInit(): void {
     this.selectedNoteObj = this._sharedServiceService.getNote();
     this.notesList = JSON.parse(localStorage.getItem('notelist') || '[]');
     if(this.selectedNoteObj){
        this.noteForm = new FormGroup({
        noteTitle: new FormControl(this.selectedNoteObj?.noteObj.noteTitle, [Validators.required]),
        noteBody: new FormControl(this.selectedNoteObj?.noteObj.noteBody, [Validators.required]),
        noteCreationDate : new FormControl(this.selectedNoteObj?.noteObj.noteCreationDate),
        noteId : new FormControl(this.selectedNoteObj?.noteObj.noteId)
      });
     }
    else{
      this.backToNoteList();
    }  
  }
  /*
    save new note or update older note
  */
  saveNote(){
    if(this.selectedNoteObj.operationType == 'New' && this.noteForm.value.noteTitle && this.noteForm.value.noteBody){
      this.noteForm.value.noteId = uuidv4();
      this.noteForm.value.noteCreationDate = new Date();
      this.notesList.push(this.noteForm.value);
      localStorage.setItem('notelist',  JSON.stringify(this.notesList));
      alert(this.noteForm.value.noteTitle+" have been added in your notes list");
      this.backToNoteList();
    }
    else if(this.selectedNoteObj.operationType == 'Edit' && this.noteForm.value.noteTitle && this.noteForm.value.noteBody){
      this.notesList.find((ob, i)=>{
          if(ob.noteId === this.selectedNoteObj.noteObj.noteId){
             this.notesList[i] = this.noteForm.value
          }
      })
      localStorage.setItem('notelist',  JSON.stringify(this.notesList));
      alert(this.noteForm.value.noteTitle+" have been updated");
      this.backToNoteList();
    }
    
  }
 /*
  go back to note list page
 */
  backToNoteList(){
    this._sharedServiceService.setNote({})
    this.router.navigate(['']);
  }
  /*
    delete note
  */
  deleteNote(){
    if(confirm("Are you sure to delete this note ")) {
      let index:number=0;
      console.log("Implement delete functionality here");
      this.notesList.find((ob, i)=>{
        if(ob.noteId === this.selectedNoteObj.noteObj.noteId){
          index = i;
        }
     })
    this.notesList.splice(index, 1);
    localStorage.setItem('notelist',  JSON.stringify(this.notesList));
    alert(this.noteForm.value.noteTitle+" have been deleted");
    }
    this.backToNoteList();
  }
}

