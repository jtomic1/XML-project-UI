import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PatentFormGeneratorService {
  constructor() {}

  createPatentForm(): FormGroup {
    return new FormGroup({
      sender: new FormControl(''),
      nazivPronalaska: new FormGroup({
        nazivSrpski: new FormControl('', Validators.required),
        nazivEngleski: new FormControl('', Validators.required),
      }),
      podnosilacPrijave: new FormGroup({
        tipPodnosioca: new FormControl('fizicko-lice', Validators.required),
        fizickoLice: this.createFizickoLiceForm(true),
        poslovnoIme: new FormControl('', [
          Validators.pattern('^[A-ZŽŠĆĐČАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ ]*$'),
        ]),
        lokacija: this.createAdresaForm(true),
        kontakt: this.createKontaktForm(true),
        podnosilacPronalazac: new FormControl(false, Validators.required),
      }),
      podaciOPronalazacu: new FormGroup({
        pronalazacNaveden: new FormControl(false, Validators.required),
        pronalazac: new FormGroup({
          fizickoLice: this.createFizickoLiceForm(false),
          lokacija: this.createAdresaForm(true),
          kontakt: this.createKontaktForm(true),
        }),
      }),
      punomocnik: new FormGroup(
        {
          punomocnikSeNavodi: new FormControl(false, Validators.required),
          funkcija: new FormGroup({
            punomocnikZastupanje: new FormControl(false, Validators.required),
            punomocnikPrijemPismena: new FormControl(
              false,
              Validators.required
            ),
            zajednickiPredstavnik: new FormControl(false, Validators.required),
          }),
          tipPodnosioca: new FormControl('fizicko-lice', Validators.required),
          fizickoLice: this.createFizickoLiceForm(false),
          poslovnoIme: new FormControl('', [
            Validators.pattern('^[A-ZŽŠĆĐČАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ ]*$'),
          ]),
          lokacija: this.createAdresaForm(false),
          kontakt: this.createKontaktForm(false),
        },
        { validators: this.punomocnikValidator }
      ),
      adresaZaDostavljanje: this.createAdresaForm(false),
      nacinDostavljanja: new FormGroup(
        {
          elektronski: new FormControl(false, Validators.required),
          papirno: new FormControl(false, Validators.required),
        },
        {
          validators: this.deliveryValidator,
        }
      ),
      dopuna: new FormGroup({
        dopunskaPrijava: new FormControl(false, Validators.required),
        izdvojenaPrijava: new FormControl(false, Validators.required),
        brojOsnovnePrijave: new FormControl('', [
          Validators.required,
          Validators.pattern('^[P][0-9]+$'),
        ]),
        datumOsnovnePrijave: new FormControl('', Validators.required),
      }),
      priznanjePravaPrvenstva: new FormArray([]),
    });
  }

  createFizickoLiceForm(drzavljanstvno: boolean): FormGroup {
    let ret = new FormGroup({
      ime: new FormControl('', Validators.required),
      prezime: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-ZŽŠĆĐČАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ ]*$'),
      ]),
    });
    if (drzavljanstvno)
      ret.addControl('drzavljanstvo', new FormControl('', Validators.required));
    return ret;
  }

  createAdresaForm(drzava: boolean): FormGroup {
    let ret = new FormGroup({
      ulica: new FormControl('', Validators.required),
      broj: new FormControl('', [Validators.required, Validators.min(1)]),
      postanskiBroj: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{5}$'),
      ]),
      mesto: new FormControl('', Validators.required),
    });
    if (drzava)
      ret.addControl('drzava', new FormControl('', Validators.required));
    return ret;
  }

  createKontaktForm(faks: boolean): FormGroup {
    let ret = new FormGroup({
      brojTelefona: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{9,12}$'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$'),
      ]),
    });
    if (faks)
      ret.addControl(
        'brojFaksa',
        new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]{9,12}$'),
        ])
      );
    return ret;
  }

  createDetaljiRanijePrijaveForm(): FormGroup {
    return new FormGroup({
      datumPodnosenja: new FormControl('', Validators.required),
      brojPrijave: new FormControl('', [
        Validators.required,
        Validators.pattern('^[P][0-9]+$'),
      ]),
      dvoslovnaOznaka: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^[A-Za-zŽžŠšĆćĐđČčАаБбВвГгДдЂђЕеЖжЗзИиЈјКкЛлЉљМмНнЊњОоПпРрСсТтЋћУуФфХхЦцЧчЏџШш]{2}$'
        ),
      ]),
    });
  }

  deliveryValidator: ValidatorFn = (
    form: AbstractControl
  ): ValidationErrors | null => {
    let group = form as FormGroup;
    if (
      group.controls['elektronski'].value === false &&
      group.controls['papirno'].value === false
    )
      return { oneRequiredError: 'One control is required to be true!' };
    return null;
  };

  punomocnikValidator: ValidatorFn = (
    form: AbstractControl
  ): ValidationErrors | null => {
    let group = form as FormGroup;

    if (
      group.get('funkcija.punomocnikZastupanje')!.value === false &&
      group.get('funkcija.punomocnikPrijemPismena')!.value === false &&
      group.get('funkcija.zajednickiPredstavnik')!.value === false &&
      group.get('punomocnikSeNavodi')!.value
    ) {
      return { oneRequiredError: 'One control is required to be true!' };
    }
    return null;
  };
}
