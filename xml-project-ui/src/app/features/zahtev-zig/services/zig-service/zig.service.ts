import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ZahtevZaPriznanjeZiga } from '../../models/ZahtevZaPriznanjeZiga';
import { HelpService } from '../help-service/help.service';
import * as JsonToXML from "js2xmlparser";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZigService {

  serviceUrl:string = `${environment.zigServiceUrl}`;

  constructor(
    private http: HttpClient,
    private helpService: HelpService
    ) { }

  save(zahtevZaPriznanjeZiga: ZahtevZaPriznanjeZiga) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    const url = `${this.serviceUrl}/saveXML`;
    let xml = this.helpService.createXMLnew(zahtevZaPriznanjeZiga);
    console.log(xml);
    return this.http.post(url, xml, {headers: headers, responseType: 'text'});
  }
  
  getByBrojPrijave(id: string) {
    const url = `${this.serviceUrl}/get`;    
    return this.http.get(url, {
      params : {id: id},
      headers : new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });
  }

  getAllPending() {
    const url = `${this.serviceUrl}/getAllApplied`;
    return this.http.get(url, {
      headers : new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });
  }
  getAllApproved() {
    const url = `${this.serviceUrl}/getAllApproved`;
    return this.http.get(url, {
      headers : new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });
  }
  getAllCanceled() {
    const url = `${this.serviceUrl}/getAllCanceled`;
    return this.http.get(url, {
      headers : new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });
  }

  search(query: string) {
    const url = `${this.serviceUrl}/search`;
    return this.http.get(url, {
      params: {query: query},
      headers: new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });
  }

  approve(zahtevZaPriznanjeZiga: ZahtevZaPriznanjeZiga) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    
    const url = `${this.serviceUrl}/approve`;
    let xml = this.helpService.getXML(zahtevZaPriznanjeZiga);
    console.log(xml);
    return this.http.post(url, xml, {headers: headers, responseType: 'text'});
  }

  deny(zahtevZaPriznanjeZiga: ZahtevZaPriznanjeZiga) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    const url = `${this.serviceUrl}/deny`;
    let xml = this.helpService.getSendXML(zahtevZaPriznanjeZiga);
    console.log(xml);
    return this.http.post(url, xml, {headers: headers, responseType: 'text'});
  }

  getHTMLFile(zahtevZaPriznanjeZiga : ZahtevZaPriznanjeZiga){
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    headers.set("Accept","application/pdf");
    // const url = `${this.serviceUrl}/downloadRequestHTML`;
    const url = `${this.serviceUrl}/downloadHTML`;
    let xml = this.helpService.getSendXML(zahtevZaPriznanjeZiga);
    console.log(xml);
    // let xml = "";
    return this.http.post(url, xml, {headers: headers, responseType: 'text'});
    // return this.http.get(url,{headers:headers, responseType:"text"});
    
  }

  getPDFFile(zahtevZaPriznanjeZiga : ZahtevZaPriznanjeZiga){
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    headers.set("Accept","application/pdf");
    // const url = `${this.serviceUrl}/downloadRequestPDF`;
    const url = `${this.serviceUrl}/downloadPDF`;
    let xml = this.helpService.getSendXML(zahtevZaPriznanjeZiga);
    console.log(xml);
    // let xml = "";
    return this.http.post(url, xml, {headers: headers, responseType: 'text'});
    // return this.http.get(url,{headers:headers, responseType:"text"});
    
  }

  getJson(id: string) {
    const url =  `${this.serviceUrl}/getJson`;
    return this.http.get(url, {
      params : {id: id},
      headers : new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'blob'
    });
  }

  getRdf(id: string) {
    const url =  `${this.serviceUrl}/getRdf`;
    return this.http.get(url, {
      params : {id: id},
      headers : new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'blob'
    });
  }

  
  zigSearch(query: string): Observable<any> {
    let url = `${this.serviceUrl}/search/${query}`;
    return this.http.get(url, {
      responseType: 'text',
    });
  }

}
