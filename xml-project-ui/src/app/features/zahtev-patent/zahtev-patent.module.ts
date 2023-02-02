import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZahtevPatentComponent } from './components/zahtev-patent/zahtev-patent.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NazivPronalaskaComponent } from './components/naziv-pronalaska/naziv-pronalaska.component';
import { PodnosilacPrijaveComponent } from './components/podnosilac-prijave/podnosilac-prijave.component';

@NgModule({
  declarations: [ZahtevPatentComponent, NazivPronalaskaComponent, PodnosilacPrijaveComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [ZahtevPatentComponent],
})
export class ZahtevPatentModule {}
