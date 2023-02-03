import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObrazacA1 } from '../../model/ObrazacA1';
import * as JsonToXML from "js2xmlparser";
import { environment } from 'src/environments/environment';
import { Zahtev } from '../../model/Zahtev';


@Injectable({
  providedIn: 'root'
})
export class AutorskaPravaService {  

  constructor(private http: HttpClient) { }

  //save(ObrazacA1: ObrazacA1) {
  save(zahtev: Zahtev) {
    const headers = new HttpHeaders().set('Content-Type', 'application/xml');
    const url = `${environment.aServiceUrl}/save`;
    const xml = JsonToXML.parse("obrazac", zahtev);
    console.log(xml);
    return this.http.post(url, xml, {headers: headers, responseType: 'text'});
  }

  getByBrojPrijave(id: string) {
    const url = `${environment.aServiceUrl}/get`;    
    return this.http.get(url, {
      params : {id: id},
      headers : new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });
  }

  getAllPending() {
    const url = `${environment.aServiceUrl}/getAllPending`;
    return this.http.get(url, {
      headers : new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });
  }

  search(query: string) {
    const url = `${environment.aServiceUrl}/search`;
    return this.http.get(url, {
      params: {query: query},
      headers: new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });
  }
}
