import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as JsonToXML from 'js2xmlparser';
import { Zahtev } from '../../model/Zahtev';
import { LoggedUserService } from 'src/app/shared/services/logged-user-service/logged-user.service';

@Injectable({
  providedIn: 'root',
})
export class PatentService {
  constructor(
    private http: HttpClient,
    private loggedService: LoggedUserService
  ) {}

  sendPatentRequest(data: Zahtev): Observable<any> {
    let url = `${environment.patentUrl}/createPatent`;
    let arrayXML = JsonToXML.parse(
      'priznavanjePravaPrvenstva',
      data.priznanjePravaPrvenstva
    ).replace('undefined', '');
    arrayXML = arrayXML.substring(21);
    delete data.priznanjePravaPrvenstva;
    let xml = JsonToXML.parse('patent', data);
    xml = xml.substring(0, xml.length - 9);
    xml = xml.concat(arrayXML, '</patent>');
    return this.http.post(url, xml, {
      responseType: 'text',
    });
  }

  getPatents(statusFilter: string): Observable<any> {
    let url = `${environment.patentUrl}/getAllPatents/${statusFilter}`;
    return this.http.get(url, {
      responseType: 'text',
    });
  }

  getPatentById(id: string): Observable<any> {
    let url = `${environment.patentUrl}/getPatentById/${id}`;
    return this.http.get(url, {
      responseType: 'text',
    });
  }

  patentSearch(query: string, status: string): Observable<any> {
    let url = `${environment.patentUrl}/search?query=${query}&status=${status}`;
    return this.http.get(url, {
      responseType: 'text',
    });
  }

  downloadPDF(id: string) {
    let url = `${environment.patentUrl}/downloadPDF/${id}`;
    return this.http.get(url, {
      responseType: 'blob',
    });
  }

  downloadXHTML(id: string) {
    let url = `${environment.patentUrl}/downloadXHTML/${id}`;
    return this.http.get(url, {
      responseType: 'blob',
    });
  }

  downloadRDF(id: string) {
    let url = `${environment.patentUrl}/downloadRDF/${id}`;
    return this.http.get(url, {
      responseType: 'blob',
    });
  }

  downloadJSON(id: string) {
    let url = `${environment.patentUrl}/downloadJSON/${id}`;
    return this.http.get(url, {
      responseType: 'blob',
    });
  }

  sendResenjeZahtev(data: any) {
    let url = `${environment.patentUrl}/sendResenje`;
    let xml = JsonToXML.parse('resenje', data);
    return this.http.post(url, xml, {
      responseType: 'text',
    });
  }

  convertPatentListToObjects(inputList: any[]): Zahtev[] {
    let iter = !!inputList[Symbol.iterator];
    if (!iter) {
      inputList = [inputList];
    }
    let ret: Zahtev[] = [];
    for (let item of inputList) {
      console.log(item);
      let newZahtev: Zahtev = {
        podaciZavod: item.podaciZavod,
        nazivPronalaska: {
          nazivSrpski: item.nazivPronalaska.naziv.naziv[0].value,
          nazivEngleski: item.nazivPronalaska.naziv.naziv[1].value,
        },
        podnosilacPrijave: item.podnosilacPrijave,
        podaciOPronalazacu: item.podaciOPronalazacu,
        punomocnik: item.punomocnik,
        adresaZaDostavljanje: item.adresaZaDostavljanje,
        nacinDostavljanja: item.nacinDostavljanja,
        dopuna: item.dopuna,
        priznanjePravaPrvenstva:
          item.priznanjePravaPrvenstvaIzRanijihPrijava.detaljiRanijePrijave,
      };
      ret.push(newZahtev);
    }
    if (this.loggedService.user!.role === 'citizen')
      ret = ret.filter((x) => x.podaciZavod?.statusZahteva === 'accepted');
    return ret;
  }
}
