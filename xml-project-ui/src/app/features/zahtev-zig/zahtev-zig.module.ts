import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZahtevZigComponent } from './components/zahtev-zig/zahtev-zig.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ZigTypeComponent } from './components/zig-type/zig-type.component';
import { ZigImageComponent } from './components/zig-image/zig-image.component';
import { ZigDescriptionComponent } from './components/zig-description/zig-description.component';
import { NincanskaClassificationComponent } from './components/nincanska-classification/nincanska-classification.component';
import { ZigPavoIOsnovComponent } from './components/zig-pavo-i-osnov/zig-pavo-i-osnov.component';



@NgModule({
  declarations: [
    ZahtevZigComponent,
    ZigTypeComponent,
    ZigImageComponent,
    ZigDescriptionComponent,
    NincanskaClassificationComponent,
    ZigPavoIOsnovComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[
    ZahtevZigComponent
  ]
})
export class ZahtevZigModule { }
