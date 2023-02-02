import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { matchingPasswordsValidator } from 'src/app/shared/validators/validators';
import { RegistrationService } from '../../services/registration-service/registration.service';
import { RegistrationData } from '../models/RegistrationData';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-startpage-register',
  templateUrl: './startpage-register.component.html',
  styleUrls: ['./startpage-register.component.css'],
})
export class StartpageRegisterComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  form = this.createRegistrationForm();

  constructor(
    private messageService: MessageService,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createRegistrationForm(): FormGroup {
    return new FormGroup(
      {
        email: new FormControl(
          '',
          Validators.pattern('^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$')
        ),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.minLength(8),
            Validators.maxLength(30),
          ])
        ),
        confirmPassword: new FormControl(''),
        name: new FormControl(''),
        surname: new FormControl(''),
        username: new FormControl(''),
        identificationNumber: new FormControl(''),
        role: new FormControl('citizen'),
      },
      { validators: matchingPasswordsValidator }
    );
  }

  saveRequest() {
    if (this.form.invalid) {
      this.messageService.showMessage(
        'Регистрациона форма није адекватно попуњена!',
        MessageType.ERROR
      );
    } else {
      let data: RegistrationData = this.form.getRawValue();
      this.registrationService
        .sendRegistrationRequest(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.showMessage(
              'Регистрација успешна!',
              MessageType.SUCCESS
            );
            this.router.navigate(['/login']);
          },
          error: (err) => {
            const parser = new xml2js.Parser({ strict: true, trim: true });
            parser.parseString(err.error, (error, result) => {
              console.log(error);
              console.log(result);
              this.messageService.showMessage(result.error, MessageType.ERROR);
            });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
