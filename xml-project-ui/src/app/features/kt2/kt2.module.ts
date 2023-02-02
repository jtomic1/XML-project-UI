import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormTabsContainerComponent } from './components/form-tabs-container/form-tabs-container.component';
import { ZahtevAutorskaPravaModule } from '../zahtev-autorska-prava/zahtev-autorska-prava.module';

@NgModule({
  declarations: [FormTabsContainerComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ZahtevAutorskaPravaModule
  ],
  exports: [FormTabsContainerComponent],
})
export class Kt2Module {}
