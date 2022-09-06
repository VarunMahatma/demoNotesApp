import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  public note:any;

  constructor() { }
/*
  Set data
*/
  setNote(index:object){
    this.note = index;
  }
/*
  Get data
*/
  getNote(){
    return this.note;
  }
}
