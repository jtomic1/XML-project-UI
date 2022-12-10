import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { Kt2Module } from './features/kt2/kt2.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    Kt2Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
