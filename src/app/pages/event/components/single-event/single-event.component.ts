import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.scss']
})
export class SingleEventComponent implements OnInit {

  @Input() eventData:any;
  @Output() eventClicked = new EventEmitter();
  EventDetails:any;
  isPopupVisible: boolean =false;
  isVisible: boolean = false;

  constructor(private eventService:EventService,private router:Router) { }

  ngOnInit(): void {
  }

  delete(eventData:any){
     this.eventService.deleteEvent(eventData);
     this.eventService.getAllEvents();
  }
  singleEventClick(eventData:any) {
    this.eventClicked.emit(eventData);

    this.eventService.EventDetails=eventData; 
    this.router.navigate(['event/eventDetails'], {queryParams : {id: eventData.id}});
  }
  
  DeleteEvent(event:any)
  {
    this.eventService.deleteEvent(event);
    this.eventService.getAllEvents()
    this.isVisible = true;
  }
  ShawDetails(event:any){
    this.EventDetails = event;
    this.isPopupVisible = !this.isPopupVisible;
  }
  EditEvent(event:any){
    //  this.eventService.updateEvent(event);
  }
  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  
  }
  submitButtonOptions = {
  
    text:"تعديل", icon:"save",
    useSubmitBehavior: true
  }
  employee = {
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
    console.log("emp",this.employee)
   // this.eventService.AddEvent(this.employee)    
    e.preventDefault();
  }
}


  // "items": [],
  // "baseTheme": "material.orange.dark",
  // "assetsBasePath": "../../../node_modules/devextreme/dist/css/",
  // "outputColorScheme": "additional",
  // "makeSwatch": true,
  // "base": true,
  // "widgets": [
  //   "treeview",
  //   "navbar"
  // ]


//   {
//     "items": [
//         {
//             "key": "$base-accent",
//             "value": "rgba(7, 140, 58, 1)"
//         }
//     ],
//     "baseTheme": "material.teal.dark",
//     "assetsBasePath": "../../../node_modules/devextreme/dist/css/",
//     "outputColorScheme": "additional",
//     "makeSwatch": true,
//     "base": true,
//     "widgets": [],
//     "version": "22.1.5",
//     "removeExternalResources": false
// }