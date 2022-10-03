import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { SingleEventComponent } from './components/single-event/single-event.component';
import { EventToolbarComponent } from './components/event-toolbar/event-toolbar.component';
import { DxToolbarModule, DxButtonModule, DxPopupModule, DxScrollViewModule, DxFormModule, DxToastModule } from 'devextreme-angular';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EventDetailsComponent } from './components/event-details/event-details.component'

@NgModule({
  declarations: [
    EventComponent,
    AllEventsComponent,
    SingleEventComponent,
    EventToolbarComponent,
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    DxToolbarModule,
    DxButtonModule,
    DxPopupModule,
   DxScrollViewModule,
    DxFormModule,
   
    DxToastModule
  ]
})
export class EventModule { }
