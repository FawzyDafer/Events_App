import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../services/organizer.service';

@Component({
  selector: 'app-all-organizers',
  templateUrl: './all-organizers.component.html',
  styleUrls: ['./all-organizers.component.scss']
})
export class AllOrganizersComponent implements OnInit {
  isPopupVisible: boolean =false;
  orgnizer1:any;
  constructor(public organizerService:OrganizerService) { }

  ngOnInit(): void {
  
    this.organizerService.getAllOrganizer();
   // this.organizerService.updateOrganizer();
    
  }

 
  delete(organizer :any){
      this.organizerService.deleteOrganizer(organizer.id).subscribe(result =>{
        this.organizerService.getAllOrganizer();
      });
      //this.organizerService.DeleteOrganize(organizer.id);
    }
    togglePopup(organizer:any): void {    
    this.isPopupVisible = !this.isPopupVisible;
    
     this.orgnizer1 = organizer; 

    }
    
    showDetails(organizer:any){
      // this.isPopupVisible = !this.isPopupVisible;
     }

     handleSubmit(id:any){
      console.log("id",id);
      console.log("emp",this.organizer)  ;
      this.organizerService.deleteOrganizer(id)
      this.isPopupVisible = !this.isPopupVisible;
    }
    submitButtonOptions = {
      
      text:"هل تريد حذف هذه الجهة", icon:"remove",
  
      useSubmitBehavior: true
    }

    organizer = {

      emailAddress: '',
      label1: '',
      
      address: '',
      label2: '',
  
      phoneNumber: '',
      label3: '',
  
      title: '',
      activity: '',
      website: ''
  
    }

}
