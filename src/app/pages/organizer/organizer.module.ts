import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { OrganizerComponent } from './organizer.component';
import { AllOrganizersComponent } from './components/all-organizers/all-organizers.component';
import { OrganizerToolbarComponent } from './components/organizer-toolbar/organizer-toolbar.component';
import {  DxButtonModule,  DxFormModule,  DxPopupModule,  DxScrollViewModule,  DxToolbarModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    OrganizerComponent,
    AllOrganizersComponent,
    OrganizerToolbarComponent,
   
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    DxToolbarModule,
    DxButtonModule,
    DxPopupModule,
   DxScrollViewModule,
    DxFormModule
  ]
})
export class OrganizerModule { }
