import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageLoginComponent } from './features/startpage/components/startpage-login/startpage-login.component';
import { StartpageRegisterComponent } from './features/startpage/components/startpage-register/startpage-register.component';
import { IzvestajComponent } from './features/zahtev-autorska-prava/components/izvestaj/izvestaj.component';
import { PrikazOdobrenihComponent } from './features/zahtev-autorska-prava/components/prikaz-odobrenih/prikaz-odobrenih.component';
import { PrikazZahtevaComponent } from './features/zahtev-autorska-prava/components/prikaz-zahteva/prikaz-zahteva.component';
import { ZahtevAutorskaPravaComponent } from './features/zahtev-autorska-prava/components/zahtev-autorska-prava/zahtev-autorska-prava.component';
import { PregledZahtevaComponent } from './features/zahtev-patent/components/pregled-zahteva/pregled-zahteva.component';
import { ZahtevPatentComponent } from './features/zahtev-patent/components/zahtev-patent/zahtev-patent.component';
import { ZahtevZigComponent } from './features/zahtev-zig/components/zahtev-zig/zahtev-zig.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: StartpageLoginComponent },
  { path: 'register', component: StartpageRegisterComponent },
  { path: 'autorskaRequests', component: PrikazZahtevaComponent },
  { path: 'autorskaApproved', component: PrikazOdobrenihComponent },
  { path: 'autorskaReport', component: IzvestajComponent },
  { path: 'a', component: ZahtevAutorskaPravaComponent },
  { path: 'patentRequest', component: ZahtevPatentComponent },
  { path: 'allPatents', component: PregledZahtevaComponent },
  { path: 'patent/:id', component: PregledZahtevaComponent },
  { path: 'b', component: ZahtevZigComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
