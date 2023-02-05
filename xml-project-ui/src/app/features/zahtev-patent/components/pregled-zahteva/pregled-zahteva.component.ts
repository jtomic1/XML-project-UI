import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoggedUserService } from 'src/app/shared/services/logged-user-service/logged-user.service';
import { PatentService } from '../../services/patent-service/patent.service';
import * as xml2js from 'xml2js';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';

@Component({
  selector: 'app-pregled-zahteva',
  templateUrl: './pregled-zahteva.component.html',
  styleUrls: ['./pregled-zahteva.component.css'],
})
export class PregledZahtevaComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  showPretraga: boolean = true;

  patenti: any[] = [];
  statusOptions: { status: string; name: string }[] = [];
  form: FormGroup = new FormGroup({
    pretraga: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(
    private loggedService: LoggedUserService,
    private patentService: PatentService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  get statusControl() {
    return this.form.controls['status'];
  }

  get disableStatusSelect() {
    return this.loggedService.user!.role === 'citizen';
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'patent') {
      this.patentService
        .getPatentById(this.route.snapshot.url[1].path)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            const parser = new xml2js.Parser({
              strict: true,
              trim: true,
              explicitArray: false,
            });
            parser.parseString(res, (error, result) => {
              this.patenti = this.patentService.convertPatentListToObjects([
                result.ZahtevZaPriznanjePatenta,
              ]);
              if (this.patenti.length === 0) {
                this.messageService.showMessage(
                  'Немате приступ овом захтеву!',
                  MessageType.INFO
                );
                this.router.navigateByUrl('/allPatents');
              }
              this.showPretraga = false;
            });
          },
          error: (err) => {
            const parser = new xml2js.Parser({ strict: true, trim: true });
            parser.parseString(err.error, (error, result) => {
              this.messageService.showMessage(
                'Патент није пронађен!',
                MessageType.ERROR
              );
              this.router.navigateByUrl('/allPatents');
            });
          },
        });
    } else {
      let role = this.loggedService.user?.role;
      if (role === 'citizen') {
        this.form.controls['status'].setValue('accepted');
        this.statusOptions = [{ status: 'accepted', name: 'Поднети захтеви' }];
      } else {
        this.form.controls['status'].setValue('all');
        this.statusOptions = [
          { status: 'all', name: 'Сви захтеви' },
          { status: 'accepted', name: 'Поднети захтеви' },
          { status: 'declined', name: 'Одбијени захтеви' },
          { status: 'pending', name: 'Неразрешени захтеви' },
        ];
      }
      this.patentService
        .getPatents(this.statusControl.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          const parser = new xml2js.Parser({
            strict: true,
            trim: true,
            explicitArray: false,
          });
          parser.parseString(res, (error, result) => {
            if (result.ArrayList === '') return;
            this.patenti = this.patentService.convertPatentListToObjects(
              result.ArrayList.item
            );
            this.showPretraga = true;
          });
        });
    }
  }

  search() {
    this.patentService
      .patentSearch(
        this.form.controls['pretraga'].value,
        this.statusControl.value
      )
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
            if (result.ArrayList === '') this.patenti = [];
            else
              this.patenti = this.patentService.convertPatentListToObjects(
                result.ArrayList.item
              );
            this.showPretraga = true;
            if (this.patenti.length > 0) {
              this.messageService.showMessage(
                `Претрага успешна! Пронађено ${this.patenti.length} патената`,
                MessageType.SUCCESS
              );
            } else {
              this.messageService.showMessage(
                `Ни један патент не садржи задати упит! Бићете враћени на преглед.`,
                MessageType.INFO
              );
              this.ngOnInit();
            }
          });
        },
        error: (err) => {
          const parser = new xml2js.Parser({ strict: true, trim: true });
          parser.parseString(err.error, (error, result) => {
            this.messageService.showMessage(
              'Ни један патент није пронађен!',
              MessageType.ERROR
            );
            this.router.navigateByUrl('/allPatents');
          });
        },
      });
  }
}
