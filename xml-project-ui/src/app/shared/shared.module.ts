import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './services/message-service/message.service';
import { MaterialModule } from './material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PodaciInfoComponent } from './components/user-input/podaci-info/podaci-info.component';
import { ContactInputComponent } from './components/user-input/contact-input/contact-input.component';

@NgModule({
  declarations: [MessageComponent, NavbarComponent, PodaciInfoComponent, ContactInputComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    NavbarComponent,
    PodaciInfoComponent],
})
export class SharedModule {}
