import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-toolbar',
  templateUrl: './event-toolbar.component.html',
  styleUrls: ['./event-toolbar.component.scss']
})
export class EventToolbarComponent implements OnInit {
  isPopupVisible: boolean =false;
  constructor(public eventService:EventService) { 

  }

  ngOnInit(): void {
  }
  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  
  }
  submitButtonOptions = {
    
    text:"حفظ", icon:"save",
    useSubmitBehavior: true
  }
  removeButtonOptions = {  
    text:"الغاء", icon:"remove",
    useSubmitBehavior: true
  }
  event = {
    title: '',
    startDate:new Date(0, 0, 0),
    
     endDate:new Date(0, 0, 0),
     timeFrom:new Date(0, 0, 0),
     timeTo :new Date(0, 0, 0),
  
    categorization:'',
    locations:'', 
    description:'',
    organizers:'',
    //notes: 'John has been in the Audio/Video industry since 1990.'
  }
  handleSubmit = (e:any)=> {
    setTimeout(() => { 
        alert("Submitted");          
    }, 1000);
    console.log("emp",this.event)
    this.eventService.AddEvent(this.event)  
    this.eventService.getAllEvents();  
    e.preventDefault();
  }


}
