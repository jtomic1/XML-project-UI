import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Adresa } from '../../models/Adresa';
import { BrojeviKlasaRobeUsluga } from '../../models/BrojeviKlasaRobeUsluga';
import { Kontakt } from '../../models/Kontak';
import { OpisZiga } from '../../models/Opis';
import { Prilozi } from '../../models/Pirlozi';
import { Placanje } from '../../models/Placanje';
import { TFizickoLice } from '../../models/TFizickoLice';
import { TTipZiga } from '../../models/TTipZiga';
import { TVrstaZnaka } from '../../models/TVrstaZnaka';
import { ZatrazenoPravoPrvenstva } from '../../models/ZatrazenoPravoPrvenstva';
import { Znak } from '../../models/Znak';
import { BojeZnaka } from '../../models/BojeZnaka';
import * as JsonToXML from "js2xmlparser";
import { ZahtevZaPriznanjeZiga } from '../../models/ZahtevZaPriznanjeZiga';
import { DatePipe } from '@angular/common';
import { ZigService } from '../../services/zig-service/zig.service';
import * as xml2js from 'xml2js';
import { MessageService, MessageType } from 'src/app/shared/services/message-service/message.service';
import { HelpService } from '../../services/help-service/help.service';

@Component({
  selector: 'app-zahtev-zig',
  templateUrl: './zahtev-zig.component.html',
  styleUrls: ['./zahtev-zig.component.css']
})
export class ZahtevZigComponent implements OnInit {

  form: FormGroup = this.createFormGroup();

  constructor(
    public datepipe: DatePipe,
    private zigService: ZigService,
    private messageService: MessageService,
    private helpService:HelpService
  ) { }

  ngOnInit(): void {
    this.testXML();
  }

  contractor: FormControl = new FormControl(true);
  showContractor:boolean = false;
  
  typeChanged(){
  
    this.showContractor =  this.contractor.value;
    console.log( typeof(this.showContractor) );
  }


  getFormGroup(name: string):FormGroup{
    return this.form.get(name) as FormGroup;
  }

  createFormGroup():FormGroup{
    return this.helpService.createZahtevFormGroup();
  }

  testXML(){

    let adresa : Adresa = {
      drzava: 'Srbija',
      mesto: 'Srbija',
      ulica: 'Srbija',
      postanski_broj: 5
    };

    let kontakt : Kontakt = {
      telefon: "ktkt",
      email: "ktkt",
      fax: "ktkt"
    };

    let podnosilac :TFizickoLice = {
      ime: 'Mladen',
      prezime: 'Gajic',
      adresa: adresa,
      kontakt: kontakt
    };

    let punomocnik :TFizickoLice = {
      ime: 'Ognjen',
      prezime: 'Gajic',
      adresa: adresa,
      kontakt: kontakt
    };

    let boje : BojeZnaka = {
      boja :["21esa","dsadas"]
    }

    let znak :Znak = {
      transliteracija: "blabla",
      prevod: "blabla",
      izgled_znaka: "undefined",
      vrsta_znaka: TVrstaZnaka.VERBALNI,
      boje_znaka: boje  ,
      opis_znaka: "undefined"
    }
    
    let opisZiga :OpisZiga = {
      znak: znak,
      tip_ziga: TTipZiga.INDIVIDUALNI_ZIG
    }

    let brojeviKlasaRobeUsluga : BrojeviKlasaRobeUsluga = {
      broj: [1,2,3]
    }

    let zatrazenoPravoPrvenstva : ZatrazenoPravoPrvenstva = {
      pravo: "blablavas",
      osnov: "blablavas"
    }

    let placanje :Placanje = {
      ukupno: 30,
      onsovna_taksa: 0,
      graficko_resenje: 0
    }

    let prilozi : Prilozi = {
      punomocje: "undefined",
      primerak_znaka: "undefined",
      spisak_robe_usluga: "undefined",
      generalno_punomocje_ranije_prilozeno: "undefined",
      punomocje_naknadno_dostavljeno: "undefined",
      opsti_akt_o_kolektivnom_zigu: "undefined",
      dokaz_o_pravu_prvenstva: "undefined",
      dokaz_o_uplati_takse: "undefined"
    }
    
    let test : ZahtevZaPriznanjeZiga = {
      podnosilac: podnosilac,
      punomocnik: punomocnik,
      placanje: placanje,
      prilozi: prilozi,
      zajednicki_posrednik: undefined,
      opis_ziga: opisZiga,
      brojevi_klasa_robe_usluga: brojeviKlasaRobeUsluga,
      zatrazeno_pravo_prvenstva: zatrazenoPravoPrvenstva,
      broj_zahteva: "sretan_stokic"
    };

    this.zigService.save(test).subscribe({
      next: (res) => {
        console.log(res);
        const parser = new xml2js.Parser({
          strict: true,
          trim: true,
          explicitArray: false,
        });
        parser.parseString(res, (error, result) => {
          this.messageService.showMessage(res , MessageType.SUCCESS);
        });
      },
      error: (err) => {
        console.log(err);
        const parser = new xml2js.Parser({ strict: true, trim: true });
        parser.parseString(err.message, (error, result) => {
          console.log(error);
          console.log(result);
          this.messageService.showMessage(result, MessageType.ERROR);
        });
      },
    });;

  }

  sendRequestForZig(){
    let zigZahtev = this.helpService.getZahtevFromFormGroup(this.form);
    this.zigService.save(zigZahtev).subscribe({
      next: (res) => {
        console.log(res);
        const parser = new xml2js.Parser({
          strict: true,
          trim: true,
          explicitArray: false,
        });
        parser.parseString(res, (error, result) => {
          this.messageService.showMessage(res , MessageType.SUCCESS);
        });
      },
      error: (err) => {
        console.log(err);
        const parser = new xml2js.Parser({ strict: true, trim: true });
        parser.parseString(err.message, (error, result) => {
          console.log(error);
          console.log(result);
          this.messageService.showMessage(result, MessageType.ERROR);
        });
      },
    });;
  }
}
