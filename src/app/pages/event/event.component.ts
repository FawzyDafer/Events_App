import { Component, OnInit } from '@angular/core';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  showSpinner: boolean =false;
  isVisible: boolean = false;
  isPopupVisible: boolean =false;
  EventDetails:any;
  constructor(public eventServices:EventService) { }

  ngOnInit(): void {
  }
  handleSubmit(id:any){
    console.log("id",id);
   
    
    this.isPopupVisible = !this.isPopupVisible;
  }
  submitButtonOptions = {
    
    text:"هل تريد حذف هذه الجهة", icon:"remove",

    useSubmitBehavior: true
  }

  ShawDetails(event:any){
  this.EventDetails = event;
  this.isPopupVisible = !this.isPopupVisible;
  }
}
