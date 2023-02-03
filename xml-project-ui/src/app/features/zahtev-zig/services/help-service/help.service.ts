import { XmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ZahtevZaPriznanjeZiga } from '../../models/ZahtevZaPriznanjeZiga';
import * as JsonToXML from "js2xmlparser";
import { DatePipe } from '@angular/common';

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
                broj_zahteva="'+zahtevZaPriznanjeZiga.broj_zahteva+'"\
                datum_podnosenja="'+this.datepipe.transform(new Date(), 'dd.MM.yyyy.')+'"'
                
    xml = [xml.slice(0, position), text, xml.slice(position)].join('');
    console.log(xml);
    return xml;
  }
}
