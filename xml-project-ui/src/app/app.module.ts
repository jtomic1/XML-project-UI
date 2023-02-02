import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { Kt2Module } from './features/kt2/kt2.module';
import { ZahtevAutorskaPravaModule } from './features/zahtev-autorska-prava/zahtev-autorska-prava.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    Kt2Module,
    ZahtevAutorskaPravaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
