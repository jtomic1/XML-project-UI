import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggedUserService } from 'src/app/shared/services/logged-user-service/logged-user.service';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import * as xml2js from 'xml2js';
import { LoginData } from '../models/LoginData';

@Component({
  selector: 'app-startpage-login',
  templateUrl: './startpage-login.component.html',
  styleUrls: ['./startpage-login.component.css'],
})
export class StartpageLoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  form: FormGroup = this.createLoginForm();

  constructor(
    private router: Router,
    private messageService: MessageService,
    private loggedUserService: LoggedUserService
  ) {}

  ngOnInit(): void {
    if (this.loggedUserService.isTokenPresent)
      this.router.navigateByUrl('/allPatents');
  }

  createLoginForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  loginRequest() {
    let data: LoginData = this.form.getRawValue();
    this.loggedUserService
      .sendLoginRequest(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          const parser = new xml2js.Parser({
            strict: true,
            trim: true,
            explicitArray: false,
          });
          parser.parseString(res, (error, result) => {
            console.log(result);
            this.loggedUserService.setUserData(result.UserTokenState);
            this.redirectLoggedUser();
          });
        },
        error: (err) => {
          const parser = new xml2js.Parser({ strict: true, trim: true });
          parser.parseString(err.error, (error, result) => {
            this.messageService.showMessage(result.error, MessageType.ERROR);
          });
        },
      });
  }

  redirectLoggedUser() {
    this.router.navigateByUrl('/allPatents');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
