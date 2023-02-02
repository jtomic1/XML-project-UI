import { Component, OnInit } from '@angular/core';
import { ZahtevDTO } from '../../model/ZahtevDTO';
import { AutorskaPravaService } from '../../services/autorska-prava-service/autorska-prava.service';
import * as xml2js from 'xml2js';
import { AutorskaPravaFactoryService } from '../../services/autorska-prava-factory/autorska-prava-factory.service';
import { Podnosilac } from '../../model/Podnosilac';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-prikaz-zahteva',
  templateUrl: './prikaz-zahteva.component.html',
  styleUrls: ['./prikaz-zahteva.component.css']
})
export class PrikazZahtevaComponent implements OnInit {

  zahtevi: ZahtevDTO[] = [];

  form: FormGroup = this.generateSearchFormGroup();
  showCancelSearch: boolean = false;

  constructor(private autorskaPravaService: AutorskaPravaService,
              private factory: AutorskaPravaFactoryService) { }

  ngOnInit(): void {    
     this.getAllPending();
  }

  generateSearchFormGroup(): FormGroup {
    return new FormGroup({
      query: new FormControl('')
    });
  }

  getAllPending() {
    this.showCancelSearch = false;
    this.zahtevi = [];
    this.form = this.generateSearchFormGroup();
    this.autorskaPravaService.getAllPending().subscribe((res: any) => {
      const parser = new xml2js.Parser({strict: true, trim: true});
      parser.parseString(res.toString(), (err, result) => {          
          let resenja = result.ArrayList.item;          
          if (resenja !== undefined) {
            for (var resenje of resenja) {              
              var zahtev: ZahtevDTO = this.factory.getZahtevDTO(resenje.zahtev[0]);
              this.zahtevi.push(zahtev);
            }
          }          
        });
    });
  }


  search() {
    this.showCancelSearch = true;
    this.zahtevi = [];
    this.autorskaPravaService.search(this.form.controls['query'].value).subscribe((res: any) => {
      const parser = new xml2js.Parser({strict: true, trim: true});
      parser.parseString(res.toString(), (err, result) => {          
          let resenja = result.ArrayList.item;          
          if (resenja !== undefined) {
            for (var resenje of resenja) {              
              var zahtev: ZahtevDTO = this.factory.getZahtevDTO(resenje.zahtev[0]);
              this.zahtevi.push(zahtev);
            }
          }          
        });
    });
    
  }

  getPodnosilac(id: number): string {
    var podnosilac: any = this.zahtevi[id].podnosilac;
    if (podnosilac.ime !== undefined) {
      return ' ' + podnosilac.ime + ' ' + podnosilac.prezime + ' - ' + podnosilac.email + ' - ' + podnosilac.telefon; 
    }
    else {
      return ' ' + podnosilac.poslovno_ime + ' - ' + podnosilac.email + ' - ' + podnosilac.telefon; 
    }    
  }

  getAdresaPodnosioca(id: number): string {
    var podnosilac: any = this.zahtevi[id].podnosilac;
    if (podnosilac.ime !== undefined) {
      return ' ' + podnosilac.adresa.ulica + ' ' + podnosilac.adresa.broj + ' - ' + podnosilac.adresa.grad + ' - ' + podnosilac.adresa.postanski_kod; 
    } else {
      return ' ' + podnosilac.sediste.adresa.ulica + ' ' + podnosilac.sediste.adresa.broj + ' - ' + podnosilac.sediste.adresa.grad + ' - ' + podnosilac.sediste.adresa.postanski_kod; 
    }
  }

  getPunomocnik(id: number): string {
    var punomocnik: any = this.zahtevi[id].punomocnik;
    if (punomocnik.ime === '') {
      return ' Нема пуномоћника';
    } else {
      return ' ' + punomocnik.ime + ' ' + punomocnik.prezime; 
    }
  }

  getDeloPrerade(id: number): string {
    var deloPrerade: any = this.zahtevi[id].naslov_delo_prerade;
    if (deloPrerade.naslov === '') {
      return 'Ауторско дело није дело прераде';
    } else {
      return 'Ауторко дело је засновано на делу ' + deloPrerade.naslov + ' - ' + deloPrerade.autor.ime + ' ' + deloPrerade.autor.prezime;
    }
  }

  getAutor(id: number): string {
    var autor: any = this.zahtevi[id].autor;
    if (autor.drzavljanstvo !== undefined) {
      return ' ' + autor.ime + ' ' + autor.prezime + ' - ' + autor.adresa.ulica + ' ' + autor.adresa.broj + ' ' + autor.adresa.grad;
    } else if (autor.godina_smrti !== undefined) {
      return ' ' + autor.ime + ' ' + autor.prezime + ' - Година смрти: ' + autor.godina_smrti;
    } else {
      return ' ' + autor.ime + ' ' + autor.prezime;
    }
  }

}
