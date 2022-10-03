import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventComponent } from './event.component';

const routes: Routes = [{ path: '', component: EventComponent }
,{ path: 'allEvents' , component: AllEventsComponent }
,{ path: 'eventDetails/:id' , component: EventDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
