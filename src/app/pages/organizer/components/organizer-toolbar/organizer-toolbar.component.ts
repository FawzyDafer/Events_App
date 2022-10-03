import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../services/organizer.service';

@Component({
  selector: 'app-organizer-toolbar',
  templateUrl: './organizer-toolbar.component.html',
  styleUrls: ['./organizer-toolbar.component.scss']
})
export class OrganizerToolbarComponent implements OnInit {
  isPopupVisible: boolean =false;
  constructor(private organizerService:OrganizerService) { }

  ngOnInit(): void {
  }
  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  
  }
 label = "Ss"
  addOrganizer(organizer:any)
  {
    this.organizerService.addOrganizer(organizer);
  }
  handleSubmit = (e:any)=> {
    setTimeout(() => { 
        alert("Submitted");          
    }, 1000);
    console.log("emp",this.organizer)
    this.addOrganizer(this.organizer) 
    e.preventDefault();
  }
  submitButtonOptions = {
    
    text:"حفظ", icon:"save",

    useSubmitBehavior: true
  }
  organizer = {

    emailAddress: '',
    label1: '',
    
    address: '',
    label2: '',

    phoneNumber: '',
    label3: '',

    name: '',
    activity: '',
    website: ''

  }
}
