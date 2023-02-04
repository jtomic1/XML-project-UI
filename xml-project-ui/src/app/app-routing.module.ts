import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageLoginComponent } from './features/startpage/components/startpage-login/startpage-login.component';
import { StartpageRegisterComponent } from './features/startpage/components/startpage-register/startpage-register.component';
import { PrikazZahtevaComponent } from './features/zahtev-autorska-prava/components/prikaz-zahteva/prikaz-zahteva.component';
import { ZahtevAutorskaPravaComponent } from './features/zahtev-autorska-prava/components/zahtev-autorska-prava/zahtev-autorska-prava.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: StartpageLoginComponent },
  { path: 'register', component: StartpageRegisterComponent },
  { path: 'a', component: ZahtevAutorskaPravaComponent},
  { path: 'requests', component: PrikazZahtevaComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
