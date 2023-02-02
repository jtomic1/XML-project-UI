import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormTabsContainerComponent } from './features/kt2/components/form-tabs-container/form-tabs-container.component';
import { PrikazZahtevaComponent } from './features/zahtev-autorska-prava/components/prikaz-zahteva/prikaz-zahteva.component';

const routes: Routes = [
  { path: 'requests', component: PrikazZahtevaComponent },
  { path: '', component: FormTabsContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
