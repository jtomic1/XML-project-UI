import { Injectable } from '@angular/core';
import { Adresa } from '../../models/Adresa';
import { BojeZnaka } from '../../models/BojeZnaka';
import { BrojeviKlasaRobeUsluga } from '../../models/BrojeviKlasaRobeUsluga';
import { Kontakt } from '../../models/Kontak';
import { OpisZiga } from '../../models/Opis';
import { Prilozi } from '../../models/Pirlozi';
import { Placanje } from '../../models/Placanje';
import { TFizickoLice } from '../../models/TFizickoLice';
import { TTipZiga } from '../../models/TTipZiga';
import { TVrstaZnaka } from '../../models/TVrstaZnaka';
import { ZahtevZaPriznanjeZiga } from '../../models/ZahtevZaPriznanjeZiga';
import { ZatrazenoPravoPrvenstva } from '../../models/ZatrazenoPravoPrvenstva';
import { Znak } from '../../models/Znak';

@Injectable({
  providedIn: 'root'
})
export class ZigFactoryService {

  constructor() { }

  getZigFromXML(zahtev:any):ZahtevZaPriznanjeZiga{
    console.log("Service");

    let adresaPodnosilac : Adresa = {
      drzava: zahtev.podnosilac.adresa.drzava,
      mesto: zahtev.podnosilac.adresa.mesto,
      ulica: zahtev.podnosilac.adresa.ulica,
      postanski_broj: zahtev.podnosilac.adresa.postanskiBroj
    };
    let adresaPunomocnik : Adresa = {
      drzava: zahtev.punomocnik.adresa.drzava,
      mesto: zahtev.punomocnik.adresa.mesto,
      ulica: zahtev.punomocnik.adresa.ulica,
      postanski_broj: zahtev.punomocnik.adresa.postanskiBroj
    };

    let kontaktPunomocnik : Kontakt = {
      telefon:  zahtev.punomocnik.kontakt.telefon,
      email:  zahtev.punomocnik.kontakt.email,
      fax:  zahtev.punomocnik.kontakt.fax
    };

    let kontaktPodnosilac : Kontakt = {
      telefon:  zahtev.podnosilac.kontakt.telefon,
      email:  zahtev.podnosilac.kontakt.email,
      fax:  zahtev.podnosilac.kontakt.fax
    };
    let podnosilac :TFizickoLice = {
      ime: zahtev.podnosilac.ime,
      prezime: zahtev.podnosilac.prezime,
      adresa: adresaPodnosilac,
      kontakt: kontaktPodnosilac
    };

    let punomocnik :TFizickoLice = {
      ime: zahtev.punomocnik.ime,
      prezime: zahtev.punomocnik.prezime,
      adresa: adresaPunomocnik,
      kontakt: kontaktPunomocnik
    };

    let boje : BojeZnaka = {
      boja : zahtev.opisZiga.znak.bojeZnaka.boja
    }

    let znak :Znak = {
      transliteracija:zahtev.opisZiga.znak.transliteracija,
      prevod:zahtev.opisZiga.znak.prevod,
      izgledZnaka:zahtev.opisZiga.znak.izgledZnaka,
      vrstaZnaka:zahtev.opisZiga.znak.vrstaZnaka,
      bojeZnaka: boje,
      opisZnaka:zahtev.opisZiga.znak.opisZnaka,   
    }
    
    let opisZiga :OpisZiga = {
      znak: znak,
      tipZiga: zahtev.opisZiga.tipZiga
    }

    let brojeviKlasaRobeUsluga : BrojeviKlasaRobeUsluga = {
      broj: zahtev.brojeviKlasaRobeUsluga.broj.broj
    }

    let zatrazenoPravoPrvenstva : ZatrazenoPravoPrvenstva = {
      pravo: zahtev.zatrazenoPravoPrvenstva.pravo,
      osnov: zahtev.zatrazenoPravoPrvenstva.osnov
    }

    let placanje :Placanje = {
      ukupno: zahtev.placanje.ukupno,
      onsovnaTaksa: zahtev.placanje.onsovnaTaksa,
      grafickoResenje: zahtev.placanje.grafickoResenje
    }

    let prilozi : Prilozi = {
      punomocje: "undefined",
      primerakZnaka: "undefined",
      spisakRobe_usluga: "undefined",
      generalnoPunomocjeRanijePrilozeno: "undefined",
      punomocjeNaknadnoDostavljeno: "undefined",
      opstiAktOKolektivnomZigu: "undefined",
      dokazOPravuPrvenstva: "undefined",
      dokazOUplatiTakse: "undefined"
    }
    
    let ret : ZahtevZaPriznanjeZiga = {
      podnosilac: podnosilac,
      punomocnik: punomocnik,
      placanje: placanje,
      prilozi: prilozi,
      // zajednickiPosrednik: undefined,
      opisZiga: opisZiga,
      brojeviKlasaRobeUsluga: brojeviKlasaRobeUsluga,
      zatrazenoPravoPrvenstva: zatrazenoPravoPrvenstva,
      brojZahteva: zahtev.brojZahteva
    };

    return ret;
  }

  getZahtevForSent(zahtevZaPriznanjeZiga : ZahtevZaPriznanjeZiga){
    
  }
}
