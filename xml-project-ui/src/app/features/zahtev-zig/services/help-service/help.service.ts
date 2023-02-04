import { XmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ZahtevZaPriznanjeZiga } from '../../models/ZahtevZaPriznanjeZiga';
import * as JsonToXML from "js2xmlparser";
import { DatePipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Adresa } from '../../models/Adresa';
import { Kontakt } from '../../models/Kontak';
import { TLice } from '../../models/TLice';
import { TFizickoLice } from '../../models/TFizickoLice';
import { TPravnoLice } from '../../models/TPravnoLice';
import { Znak } from '../../models/Znak';
import { OpisZiga } from '../../models/Opis';
import { BrojeviKlasaRobeUsluga } from '../../models/BrojeviKlasaRobeUsluga';
import { ZatrazenoPravoPrvenstva } from '../../models/ZatrazenoPravoPrvenstva';
import { Prilozi } from '../../models/Pirlozi';
import { Placanje } from '../../models/Placanje';
import { BojeZnaka } from '../../models/BojeZnaka';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(
    private datepipe: DatePipe
  ) { }

  createXML(zahtevZaPriznanjeZiga : ZahtevZaPriznanjeZiga):string{
    let testWithoutBrojZahteva = {...zahtevZaPriznanjeZiga};
    delete testWithoutBrojZahteva.broj_zahteva;


    let xml = JsonToXML.parse("zahtev_za_priznanje_ziga", testWithoutBrojZahteva);
    let position = 47;
    let text = ' xmlns="http://www.tim777.rs/dokumentZ1"\
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
                xsi:schemaLocation="http://www.tim777.rs/dokumentZ1 file:/C:/Users/PC/Desktop/fax/VII_semestar/XML/XML-project/KT2/Z1.xsd"\
                xmlns:addr="http://www.tim777.rs/rdf/"\
                xmlns:pred="http://www.tim777.rs/rdf/predicate/"\n\
                broj_zahteva="Z-'+this.datepipe.transform(new Date() , 'yyyyddMMHHmmss')+'"\
                datum_podnosenja="'+this.datepipe.transform(new Date(), 'dd.MM.yyyy.')+'"'
                
    xml = [xml.slice(0, position), text, xml.slice(position)].join('');
    console.log(xml);
    return xml;
  }

  getFormGroup(formGroup: FormGroup,name : string ): FormGroup{
    return formGroup.get(name) as FormGroup;
  }

  createAdressaFormGroup():FormGroup{
    let ret = new FormGroup({
      drzava: new FormControl(''),
      mesto: new FormControl('' , [
      ]),
      ulica: new FormControl('' , [
      ]),
      postanski_broj: new FormControl('')
    });

    return ret;
  }
  getAdressaFromFormGroup(formGroup:FormGroup):Adresa{
    let adresa : Adresa = {
      drzava: formGroup.get("drzava")?.value,
      mesto: formGroup.get("mesto")?.value,
      ulica: formGroup.get("ulica")?.value,
      postanski_broj: formGroup.get("postanski_broj")?.value
    };

    return adresa;
  }
  
  createContactFormGroup():FormGroup{
    let ret = new FormGroup({
      telefon: new FormControl('',Validators.required),
      email: new FormControl('' , [
        Validators.required
      ]),
      fax: new FormControl('')
    });

    return ret;
  }

  getContactFromFormGroup(formGroup : FormGroup):Kontakt{
    let ret : Kontakt = {
      telefon: formGroup.get("telefon")?.value,
      email:  formGroup.get("email")?.value,
      fax: formGroup.get("fax")?.value
    };

    return ret;
  }
  
  createLiceFormGroup():FormGroup{
    let ret = new FormGroup({
      ime: new FormControl('',[
        Validators.required,
      ]),
      prezime: new FormControl('' , [
        Validators.required,
      ]),
      naziv: new FormControl('' , [
        Validators.required
      ]),
      adresa: this.createAdressaFormGroup(),
      kontakt : this.createContactFormGroup()
    });

    return ret;
  }
  
  getLiceFromFormGroup(formGroup: FormGroup):TFizickoLice | TPravnoLice{
    
    let ret :TFizickoLice | TPravnoLice= {
      ime: formGroup.get("ime")?.value,
      prezime: formGroup.get("prezime")?.value,
      adresa: this.getAdressaFromFormGroup( this.getFormGroup(formGroup,"adresa") ),
      kontakt:  this.getContactFromFormGroup( this.getFormGroup(formGroup,"kontakt") ),
    };
    return ret;
  }

  createZnakFormGroup():FormGroup{
    
    let ret = new FormGroup({
      transliteracija: new FormControl('',[
        Validators.required,
      ]),
      prevod: new FormControl('' , [
        Validators.required,
      ]),
      izgled_znaka: new FormControl('' , [
        Validators.required
      ]),
      vrsta_znaka: new FormControl('' , [
        Validators.required
      ]),
      boje_znaka: new FormControl('' ),
      opis_znaka: new FormControl('' , [
        Validators.required
      ]),

    });

    return ret;
  }

  getBojeZnakaFromFormControl(boje: string){
    let boje_znaka : string[] = [];
    boje.split(",").forEach( (boja: string) => {
      boje_znaka.push(boja);
    });

    let bojeZnaka : BojeZnaka={
      boja:boje_znaka
    }

    return bojeZnaka;
  }

  getZnakFromFormGroup(formGroup: FormGroup):Znak{
    let znak :Znak = {
      transliteracija: formGroup.get("transliteracija")?.value,
      prevod: formGroup.get("prevod")?.value,
      izgled_znaka: formGroup.get("izgled_znaka")?.value,
      vrsta_znaka: formGroup.get("vrsta_znaka")?.value,
      boje_znaka: this.getBojeZnakaFromFormControl(formGroup.get("boje_znaka")?.value),
      opis_znaka: formGroup.get("opis_znaka")?.value,
    }
    return znak;
  }
  
  createOpisZigaFormGroup():FormGroup{
    
    let ret = new FormGroup({
      znak: this.createZnakFormGroup(),
      tip_ziga: new FormControl('')

    });

    return ret;
  }

  getOpisZigaFromFormGroup(formGroup: FormGroup):OpisZiga{

    
    let opisZiga :OpisZiga = {
      znak: this.getZnakFromFormGroup( this.getFormGroup(formGroup,"znak") ),
      tip_ziga: formGroup.get("tip_ziga")?.value,
    }
    return opisZiga;
  }
  
  createBrojeviKlasaRobeUsluga():FormGroup{

    let ret = new FormGroup({
      broj: new FormControl('')
    });

    return ret;
  }

  getBrojeviKlasaRobeUslugaFromFormGroup(formGroup: FormGroup):BrojeviKlasaRobeUsluga{
    let brojevi = formGroup.get("broj")?.value;
    let brojevi_ : number[] = [];
    brojevi.split(',').forEach( (broj:string) =>{
      brojevi_.push( +broj);
    })
    
    let brojeviKlasaRobeUsluga : BrojeviKlasaRobeUsluga = {
      broj: brojevi_
    }
    return brojeviKlasaRobeUsluga;
  }

  createZatrazenoPravoPrvenstva():FormGroup{
    
    let ret = new FormGroup({
      pravo: new FormControl(''),
      osnov: new FormControl('')
    });

    return ret;
  }

  getZatrazenoPravoPrvenstvaFromFormGroup(formGroup : FormGroup):ZatrazenoPravoPrvenstva{
    
    let zatrazenoPravoPrvenstva : ZatrazenoPravoPrvenstva = {
      pravo: formGroup.get("pravo")?.value,
      osnov: formGroup.get("osnov")?.value,
    }

    return zatrazenoPravoPrvenstva;
  }

  createPlacanjeFormGroup():FormGroup{
    
    let ret = new FormGroup({
      uukupno: new FormControl('',[
      ]),
      onsovna_taksa: new FormControl('' , [
      ]),
      graficko_resenje: new FormControl('' , [
      ])

    });

    return ret;
  }
  getPlacanjeFormFormGroup(formGroup : FormGroup):Placanje{
    
    let placanje :Placanje = {
      ukupno: formGroup.get("ukupno")?.value,
      onsovna_taksa: formGroup.get("onsovna_taksa")?.value,
      graficko_resenje: formGroup.get("graficko_resenje")?.value,
    }
    return placanje;
  }

  
  createPriloziFormGroup():FormGroup{
    
    let ret = new FormGroup({
      punomocje: new FormControl(''),
      primerak_znaka: new FormControl(''),
      spisak_robe_usluga: new FormControl(''),
      generalno_punomocje_ranije_prilozeno: new FormControl(''),
      punomocje_naknadno_dostavljeno: new FormControl('' ),
      opsti_akt_o_kolektivnom_zigu: new FormControl('' ),
      dokaz_o_pravu_prvenstva: new FormControl('' ),
      dokaz_o_uplati_takse: new FormControl('' )

    });

    return ret;
  }
  getPriloziFromFormGroup(formGroup : FormGroup):Prilozi{
    
    let prilozi : Prilozi = {
      punomocje: formGroup.get("punomocje")?.value,
      primerak_znaka: formGroup.get("primerak_znaka")?.value,
      spisak_robe_usluga: formGroup.get("spisak_robe_usluga")?.value,
      generalno_punomocje_ranije_prilozeno: formGroup.get("generalno_punomocje_ranije_prilozeno")?.value,
      punomocje_naknadno_dostavljeno: formGroup.get("punomocje_naknadno_dostavljeno")?.value,
      opsti_akt_o_kolektivnom_zigu: formGroup.get("opsti_akt_o_kolektivnom_zigu")?.value,
      dokaz_o_pravu_prvenstva: formGroup.get("dokaz_o_pravu_prvenstva")?.value,
      dokaz_o_uplati_takse: formGroup.get("dokaz_o_uplati_takse")?.value,
    }

    return prilozi;
  }

  createZahtevFormGroup():FormGroup{
    
    let ret = new FormGroup({
      podnosilac: this.createLiceFormGroup(),
      punomocnik: this.createLiceFormGroup(),
      placanje: this.createPlacanjeFormGroup(),
      prilozi: this.createPriloziFormGroup(),
      zajednicki_posrednik: this.createLiceFormGroup(),
      opis_ziga: this.createOpisZigaFormGroup(),
      brojevi_klasa_robe_usluga: this.createBrojeviKlasaRobeUsluga(),
      zatrazeno_pravo_prvenstva: this.createZatrazenoPravoPrvenstva(),
    });

    return ret;
  }

  getZahtevFromFormGroup(formGroup: FormGroup):ZahtevZaPriznanjeZiga{
    
    let test : ZahtevZaPriznanjeZiga = {
      podnosilac: this.getLiceFromFormGroup( this.getFormGroup(formGroup,'podnosilac')),
      punomocnik: this.getLiceFromFormGroup( this.getFormGroup(formGroup,'punomocnik')),
      placanje: this.getPlacanjeFormFormGroup( this.getFormGroup(formGroup,'placanje')),
      prilozi: this.getPriloziFromFormGroup( this.getFormGroup(formGroup,'prilozi')),
      zajednicki_posrednik: this.getLiceFromFormGroup( this.getFormGroup(formGroup,'zajednicki_posrednik')),
      opis_ziga: this.getOpisZigaFromFormGroup( this.getFormGroup(formGroup,'opis_ziga')),
      brojevi_klasa_robe_usluga: this.getBrojeviKlasaRobeUslugaFromFormGroup( this.getFormGroup(formGroup,'brojevi_klasa_robe_usluga')),
      zatrazeno_pravo_prvenstva: this.getZatrazenoPravoPrvenstvaFromFormGroup( this.getFormGroup(formGroup,'zatrazeno_pravo_prvenstva')),
      broj_zahteva: "kumelaa132"
    };

    return test;
  }
  

  
}
