import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PatentFormGeneratorService } from '../../services/patent-form-generator/patent-form-generator.service';
import * as xml2js from 'xml2js';
import {
  MessageService,
  MessageType,
} from 'src/app/shared/services/message-service/message.service';
import { Pronalazac } from '../../model/Pronalazac';
import { PatentService } from '../../services/patent-service/patent.service';
import { Zahtev } from '../../model/Zahtev';

declare const Xonomy: any;
@Component({
  selector: 'app-zahtev-patent',
  templateUrl: './zahtev-patent.component.html',
  styleUrls: ['./zahtev-patent.component.css'],
})
export class ZahtevPatentComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup = new FormGroup({});
  punomocnikSeNavodi: boolean = false;

  maxDate: Date;
  constructor(
    private patentFormService: PatentFormGeneratorService,
    private patentService: PatentService,
    private messageService: MessageService
  ) {
    this.form = patentFormService.createPatentForm();
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.subscribePunomocnikChange();
    this.subscribeDopunaChange();
    this.subscribePronalazacChange();
    // this.form.patchValue({
    //   sender: '',
    //   nazivPronalaska: {
    //     nazivSrpski: 'Fudbalska Lopta',
    //     nazivEngleski: 'Football',
    //   },
    //   podnosilacPrijave: {
    //     tipPodnosioca: 'fizicko-lice',
    //     fizickoLice: {
    //       ime: 'Marcus',
    //       prezime: 'RASHFORD',
    //       drzavljanstvo: 'Englesko',
    //     },
    //     poslovnoIme: '',
    //     lokacija: {
    //       ulica: 'Mancesterska',
    //       broj: '22',
    //       postanskiBroj: '22333',
    //       mesto: 'Manchester',
    //       drzava: 'Engleska',
    //     },
    //     kontakt: {
    //       brojTelefona: '123123123',
    //       email: 'mail@mail.com',
    //       brojFaksa: '123123232',
    //     },
    //     podnosilacPronalazac: false,
    //   },
    //   podaciOPronalazacu: {
    //     pronalazacNaveden: true,
    //     pronalazac: {
    //       fizickoLice: {
    //         ime: 'Marcus',
    //         prezime: 'RASHFORDSKI',
    //       },
    //       lokacija: {
    //         ulica: 'Ljermontova',
    //         broj: '11',
    //         postanskiBroj: '22222',
    //         mesto: 'Savnik',
    //         drzava: 'Crna Gora',
    //       },
    //       kontakt: {
    //         brojTelefona: '2312312312',
    //         email: 'mail@mail.com',
    //         brojFaksa: '1312312322',
    //       },
    //     },
    //   },
    //   punomocnik: {
    //     punomocnikSeNavodi: true,
    //     funkcija: {
    //       punomocnikZastupanje: false,
    //       punomocnikPrijemPismena: true,
    //       zajednickiPredstavnik: false,
    //     },
    //     tipPodnosioca: 'poslovni-subjekat',
    //     fizickoLice: {
    //       ime: '',
    //       prezime: '',
    //     },
    //     poslovnoIme: 'KURAJBER DOO',
    //     lokacija: {
    //       ulica: 'Pakistanska',
    //       broj: '22',
    //       postanskiBroj: '20202',
    //       mesto: 'Karachi',
    //     },
    //     kontakt: {
    //       brojTelefona: '213213213',
    //       email: 'p3r5kul45@gmail.com',
    //     },
    //   },
    //   adresaZaDostavljanje: {
    //     ulica: 'adasdasdas',
    //     broj: '13212321',
    //     postanskiBroj: '22222',
    //     mesto: 'Kurdska',
    //   },
    //   nacinDostavljanja: {
    //     elektronski: false,
    //     papirno: true,
    //   },
    //   dopuna: {
    //     dopunskaPrijava: true,
    //     izdvojenaPrijava: false,
    //     brojOsnovnePrijave: 'P1234',
    //     datumOsnovnePrijave: '2023-01-31T23:00:00.000Z',
    //   },
    //   priznanjePravaPrvenstva: [
    //     {
    //       datumPodnosenja: '2022-12-14T23:00:00.000Z',
    //       brojPrijave: 'P2222',
    //       dvoslovnaOznaka: 'AS',
    //     },
    //     {
    //       datumPodnosenja: '2023-01-10T23:00:00.000Z',
    //       brojPrijave: 'P3333',
    //       dvoslovnaOznaka: 'PA',
    //     },
    //   ],
    // });
  }

  getFormGroup(formGroupName: string): FormGroup {
    return this.form.get(formGroupName) as FormGroup;
  }

  getFormArray(formArrayName: string): FormArray {
    return this.form.get(formArrayName) as FormArray;
  }

  validatePronalazac() {
    const parser = new xml2js.Parser({ strict: true, trim: true });
    const xml = Xonomy.harvest();
    parser.parseString(xml, (error, result) => {
      if (!result.podaci_o_pronalazacu.hasOwnProperty('pronalazac_naveden')) {
        this.messageService.showMessage(
          'Морате унети поље "Навођење проналазача" и попунити га са "true" или "false"!',
          MessageType.ERROR
        );
        return;
      } else if (
        !['true', 'false'].includes(
          result.podaci_o_pronalazacu.pronalazac_naveden[0]._
        )
      ) {
        this.messageService.showMessage(
          'Адекватне вредности за поље "Навођење проналазача" су "true" или "false"!',
          MessageType.ERROR
        );
        return;
      }
      let pronalazacInfo: Pronalazac | undefined =
        this.getPronalazacFromXonomy(result);
      if (pronalazacInfo === undefined) {
        this.messageService.showMessage(
          'Нисте адекватно попунили форму!',
          MessageType.ERROR
        );
        return;
      } else {
        this.patchPronalazacFormGroup(pronalazacInfo);
        let errMsg = this.getPronalazacFormErrorString();
        if (errMsg !== '')
          this.messageService.showMessage(errMsg, MessageType.ERROR);
        else
          this.messageService.showMessage(
            'Проналазач је успешно валидиран',
            MessageType.SUCCESS
          );
      }
    });
  }

  getPronalazacFromXonomy(result: any): Pronalazac | undefined {
    let pronalazacXonomy: any;
    let pronalazacInfo: Pronalazac | undefined = undefined;
    try {
      pronalazacXonomy = result.podaci_o_pronalazacu.pronalazac[0];
      pronalazacInfo = {
        pronalazacNaveden:
          result.podaci_o_pronalazacu.pronalazac_naveden[0]._ === 'true',
        pronalazac: {
          fizickoLice: {
            ime: pronalazacXonomy.fizicko_lice[0].ime[0]._,
            prezime: pronalazacXonomy.fizicko_lice[0].prezime[0]._,
          },
          lokacija: {
            ulica: pronalazacXonomy.lokacija[0].ulica[0]._,
            broj: pronalazacXonomy.lokacija[0].broj[0]._,
            postanskiBroj: pronalazacXonomy.lokacija[0].postanski_broj[0]._,
            mesto: pronalazacXonomy.lokacija[0].mesto[0]._,
            drzava: pronalazacXonomy.lokacija[0].drzava[0]._,
          },
          kontakt: {
            brojTelefona: pronalazacXonomy.kontakt[0].broj_telefona[0]._,
            brojFaksa: pronalazacXonomy.kontakt[0].broj_faksa[0]._,
            email: pronalazacXonomy.kontakt[0].e_mail[0]._,
          },
        },
      };
    } catch (error: any) {
      this.messageService.showMessage(
        'Нисте попунили сва поља!',
        MessageType.ERROR
      );
    }
    return pronalazacInfo;
  }

  patchPronalazacFormGroup(pronalazacInfo: Pronalazac) {
    this.form.get('podaciOPronalazacu')!.patchValue(pronalazacInfo);
  }

  getPronalazacFormErrorString(): string {
    if (
      this.form
        .get('podaciOPronalazacu.pronalazac.fizickoLice.prezime')
        ?.hasError('pattern')
    )
      return 'Презиме се мора састојати од великих слова!';
    if (
      this.form
        .get('podaciOPronalazacu.pronalazac.lokacija.postanskiBroj')
        ?.hasError('pattern')
    )
      return 'Неисправан формат поштанског броја!';
    if (
      this.form
        .get('podaciOPronalazacu.pronalazac.kontakt.brojTelefona')
        ?.hasError('pattern')
    )
      return 'Неисправан број телефона (дужина 9-12 бројева)!';
    if (
      this.form
        .get('podaciOPronalazacu.pronalazac.kontakt.email')
        ?.hasError('pattern')
    )
      return 'Неисправан формат е-маил адресе!';
    if (
      this.form
        .get('podaciOPronalazacu.pronalazac.kontakt.brojFaksa')
        ?.hasError('pattern')
    )
      return 'Неисправан број факса (дужина 9-12 бројева)!';
    if (this.form.get('podaciOPronalazacu')!.invalid)
      return 'Нисте попунили сва поља!';
    return '';
  }

  subscribePunomocnikChange() {
    this.form
      .get('punomocnik.punomocnikSeNavodi')!
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (!res) {
          this.form.get('punomocnik')?.disable({ emitEvent: false });
          this.form
            .get('punomocnik.punomocnikSeNavodi')
            ?.enable({ emitEvent: false });
        } else {
          this.form.get('punomocnik')?.enable({ emitEvent: false });
        }
      });
    this.form.get('punomocnik')?.disable({ emitEvent: false });
    this.form
      .get('punomocnik.punomocnikSeNavodi')
      ?.enable({ emitEvent: false });
  }

  subscribeDopunaChange() {
    this.form
      .get('dopuna')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (
          this.form.get('dopuna.dopunskaPrijava')!.value === false &&
          this.form.get('dopuna.izdvojenaPrijava')!.value === false
        ) {
          this.form
            .get('dopuna.brojOsnovnePrijave')!
            .disable({ emitEvent: false });
          this.form
            .get('dopuna.datumOsnovnePrijave')!
            .disable({ emitEvent: false });
        } else {
          this.form
            .get('dopuna.brojOsnovnePrijave')!
            .enable({ emitEvent: false });
          this.form
            .get('dopuna.datumOsnovnePrijave')!
            .enable({ emitEvent: false });
        }
      });
    this.form.get('dopuna.brojOsnovnePrijave')!.disable({ emitEvent: false });
    this.form.get('dopuna.datumOsnovnePrijave')!.disable({ emitEvent: false });
  }

  subscribePronalazacChange() {
    this.form
      .get('podnosilacPrijave.podnosilacPronalazac')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.form.get('podaciOPronalazacu')?.disable({ emitEvent: false });
        } else {
          this.form.get('podaciOPronalazacu')?.enable({ emitEvent: false });
        }
      });
  }

  sendPatentRequest() {
    let data: Zahtev = this.form.getRawValue();

    this.patentService
      .sendPatentRequest(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.showMessage(
            'Патент је успешно евидентиран!',
            MessageType.SUCCESS
          );
        },
        error: (err) => {
          const parser = new xml2js.Parser({
            strict: true,
            trim: true,
            explicitArray: false,
          });
          parser.parseString(err.error, (error, result) => {
            this.messageService.showMessage(result.error, MessageType.ERROR);
          });
        },
      });
  }

  log() {
    console.log(this.form);
  }
}
