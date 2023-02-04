import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { StartpageModule } from './features/startpage/startpage.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptor/TokenInterceptor';
import { ZahtevAutorskaPravaModule } from './features/zahtev-autorska-prava/zahtev-autorska-prava.module';
import { RouterModule } from '@angular/router';
import { ZahtevPatentModule } from './features/zahtev-patent/zahtev-patent.module';
import { ZahtevZigModule } from './features/zahtev-zig/zahtev-zig.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    ZahtevAutorskaPravaModule,
    ZahtevPatentModule,
    StartpageModule,
    ZahtevZigModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
