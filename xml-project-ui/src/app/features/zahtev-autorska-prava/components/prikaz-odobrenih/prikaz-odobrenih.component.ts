import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoggedUserService } from 'src/app/shared/services/logged-user-service/logged-user.service';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { ZahtevDTO } from '../../model/ZahtevDTO';
import { AutorskaPravaFactoryService } from '../../services/autorska-prava-factory/autorska-prava-factory.service';
import { AutorskaPravaService } from '../../services/autorska-prava-service/autorska-prava.service';
import * as xml2js from 'xml2js';
import { MetadataSearch } from '../../model/MetadataSearch';
import { Resenje } from '../../model/Resenje';
import { DenyDialogComponent } from '../dialogs/deny-dialog/deny-dialog.component';

@Component({
  selector: 'app-prikaz-odobrenih',
  templateUrl: './prikaz-odobrenih.component.html',
  styleUrls: ['./prikaz-odobrenih.component.css']
})
export class PrikazOdobrenihComponent implements OnInit {

  metadataOptions: String[] = [
    'broj_prijave',
    'datum_podnosenja',
    'email_podnosilac',
    'forma_zapisa',
    'naslov_dela',
    'telefon_podnosilac',
    'vrsta_dela'
  ];

  operatorOptions: String[] = [
    'NE',
    'I',
    'ILI'
  ];

  zahtevi: ZahtevDTO[] = [];

  formTextSearch: FormGroup = this.generateTextSearchForm();
  formMetadataSearch: FormGroup = this.generateMetadataSearchForm();
  showCancelSearch: boolean = false;
  isOfficialLogged: boolean = false;

  constructor(private autorskaPravaService: AutorskaPravaService,
              private factory: AutorskaPravaFactoryService,
              private messageService: MessageService,
              private dialog: MatDialog,
              private loginService: LoggedUserService) { }

  ngOnInit(): void {    
     this.getAllApproved();
     console.log(this.loginService.user?.name);
     console.log(this.loginService.user?.surname);
     console.log(this.loginService.user?.role);
     if (this.loginService.user?.role === 'official') {
      this.isOfficialLogged = true;
     }
  }

  generateTextSearchForm(): FormGroup {
    return new FormGroup({
      query: new FormControl('')
    });
  }

  generateMetadataSearchForm(): FormGroup {
    return new FormGroup({
      metadataOption1: new FormControl('', Validators.required),
      metadataValue1: new FormControl('', Validators.required),
      operatorOption: new FormControl('', Validators.required),
      metadataOption2: new FormControl(''),
      metadataValue2: new FormControl('')
    });
  }

  getAllApproved() {
    this.showCancelSearch = false;
    this.zahtevi = [];
    this.formTextSearch = this.generateTextSearchForm();
    this.autorskaPravaService.getAllApproved().subscribe((res: any) => {
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

  searchByText() {
    this.showCancelSearch = true;
    this.zahtevi = [];
    this.autorskaPravaService.searchApproved(this.formTextSearch.controls['query'].value).subscribe((res: any) => {
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

  searchByMetadata() {
    if ((this.formMetadataSearch.valid && this.formMetadataSearch.controls['operatorOption'].value === 'NE') || this.checkMetadataForm()) {      
      var metadata: MetadataSearch = {
        first_type: this.formMetadataSearch.controls['metadataOption1'].value,
        first_value: this.formMetadataSearch.controls['metadataValue1'].value,
        operator: this.formMetadataSearch.controls['operatorOption'].value,
        second_type: this.formMetadataSearch.controls['metadataOption2'].value,
        second_value: this.formMetadataSearch.controls['metadataValue2'].value 
      };
      this.showCancelSearch = true;
      this.zahtevi = [];
      this.autorskaPravaService.searchMetadata(metadata).subscribe((res: any) => {
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
    } else {
      this.messageService.showMessage('Подаци који су унети за претрагу по метаподацима су неисправни', MessageType.ERROR);
    }
  }

  checkMetadataForm(): boolean {
    if (this.formMetadataSearch.controls['operatorOption'].value !== 'NE' &&
        this.formMetadataSearch.controls['metadataOption2'].value !== '' &&
        this.formMetadataSearch.controls['metadataValue2'].value !== ''){
          return true;
    }
    return false;
  }

  getJson(id: string) {
    this.autorskaPravaService.getJson(id).subscribe(data => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = id + '.json';
      a.click();
    });
  }

  getRdf(id: string) {
    this.autorskaPravaService.getRdf(id).subscribe(data => {      
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = id + '.rdf';
      a.click();
    });
  }

  getPdf(id: string) {
    this.autorskaPravaService.getPdf(id).subscribe(data => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = id + '.pdf';
      a.click();
    });
  }

  getXhtml(id: string) {
    this.autorskaPravaService.getXhtml(id).subscribe(data => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = id + '.html';
      a.click();
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
