import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZahtevPatentComponent } from './components/zahtev-patent/zahtev-patent.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NazivPronalaskaComponent } from './components/naziv-pronalaska/naziv-pronalaska.component';
import { FizickoLiceComponent } from './components/fizicko-lice/fizicko-lice.component';
import { AdresaComponent } from './components/adresa/adresa.component';
import { KontaktComponent } from './components/kontakt/kontakt.component';
import { RanijaPrijavaArrayComponent } from './components/ranija-prijava-array/ranija-prijava-array.component';
import { RanijaPrijavaComponent } from './components/ranija-prijava/ranija-prijava.component';
import { XonomyEditorComponent } from './components/xonomy-editor/xonomy-editor.component';

@NgModule({
  declarations: [
    ZahtevPatentComponent,
    NazivPronalaskaComponent,
    FizickoLiceComponent,
    AdresaComponent,
    KontaktComponent,
    RanijaPrijavaArrayComponent,
    RanijaPrijavaComponent,
    XonomyEditorComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [ZahtevPatentComponent],
})
export class ZahtevPatentModule {}
