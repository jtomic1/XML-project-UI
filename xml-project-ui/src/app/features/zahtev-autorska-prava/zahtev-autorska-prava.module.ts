import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZahtevAutorskaPravaComponent } from './components/zahtev-autorska-prava/zahtev-autorska-prava.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrikazZahtevaComponent } from './components/prikaz-zahteva/prikaz-zahteva.component';
import { DenyDialogComponent } from './components/dialogs/deny-dialog/deny-dialog.component';



@NgModule({
  declarations: [
    ZahtevAutorskaPravaComponent,
    PrikazZahtevaComponent,
    DenyDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [
    ZahtevAutorskaPravaComponent, PrikazZahtevaComponent
  ]
})
export class ZahtevAutorskaPravaModule { }
