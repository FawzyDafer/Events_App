import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOrganizersComponent } from './components/all-organizers/all-organizers.component';
import { OrganizerComponent } from './organizer.component';

const routes: Routes = [{ path: '', component: OrganizerComponent },
{ path: 'allOrganizers', component: AllOrganizersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
