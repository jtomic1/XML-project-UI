import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartpageLoginComponent } from './components/startpage-login/startpage-login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StartpageRegisterComponent } from './components/startpage-register/startpage-register.component';
import { ZahtevAutorskaPravaModule } from '../zahtev-autorska-prava/zahtev-autorska-prava.module';

@NgModule({
  declarations: [StartpageLoginComponent, StartpageRegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ZahtevAutorskaPravaModule
  ],
})
export class StartpageModule {}
