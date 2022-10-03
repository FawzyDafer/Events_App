import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss']
})
export class AllEventsComponent implements OnInit {
  showSpinner: boolean =false;
  isVisible: boolean = false;
  isPopupVisible: boolean =false;
  EventDetails:any;
 @Output() emittedEvent = new EventEmitter();
  constructor(public eventServices:EventService) { }

  ngOnInit(): void {
   // this.showSpinner = true;


    this.eventServices.getAllEvents();
   // this.showSpinner = false;
  }
  DeleteEvent(event:any){
    this.eventServices.deleteEvent(event);
    this.eventServices.getAllEvents()
    this.isVisible = true;




  }

  updateEvent(event:any){
    this.EventDetails = event;
    //this.isPopupVisible = !this.isPopupVisible;
  }
  sendToshow(event:any)
  {
    this.emittedEvent.emit(event)
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
