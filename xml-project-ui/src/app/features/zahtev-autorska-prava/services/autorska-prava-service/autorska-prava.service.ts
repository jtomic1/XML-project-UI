import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as JsonToXML from "js2xmlparser";
import { environment } from 'src/environments/environment';
import { MetadataSearch } from '../../model/MetadataSearch';
import { Resenje } from '../../model/Resenje';
import { Zahtev } from '../../model/Zahtev';


@Injectable({
  providedIn: 'root'
})
export class AutorskaPravaService {  

  constructor(private http: HttpClient) { }
  
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

  searchText(query: string) {
    const url = `${environment.aServiceUrl}/search`;
    return this.http.get(url, {
      params: {query: query},
      headers: new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });
  }

  searchMetadata(md: MetadataSearch) {
    const url = `${environment.aServiceUrl}/searchMetadata`;
    const xml = JsonToXML.parse("metadata", md);
    console.log(xml)
    return this.http.post(url, xml, {
      headers: new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });
  }

  approve(resenje: Resenje) {
    const url = `${environment.aServiceUrl}/approved`;
    const xml = JsonToXML.parse("resenjeDTO", resenje);
    console.log(xml)
    return this.http.post(url, xml, {
      headers: new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });    
  }

  deny(resenje: Resenje) {
    const url = `${environment.aServiceUrl}/denied`;
    const xml = JsonToXML.parse("resenjeDTO", resenje);
    console.log(xml)
    return this.http.post(url, xml, {      
      headers: new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'text'
    });
  }

  getJson(id: string) {
    const url =  `${environment.aServiceUrl}/getJson`;
    return this.http.get(url, {
      params : {id: id},
      headers : new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'blob'
    });
  }

  getRdf(id: string) {
    const url = `${environment.aServiceUrl}/getRdf`;
    return this.http.get(url, {
      params : {id: id},
      headers : new HttpHeaders().set('Content-Type', 'application/xml'),
      responseType: 'blob'
    });
  }

  getPdf(id: string) {
    const url = `${environment.aServiceUrl}/getPdf`;
    return this.http.get(url, {
      params: {id: id},
      responseType: 'blob'
    });
  }

  getXhtml(id: string) {
    const url = `${environment.aServiceUrl}/getXhtml`;
    return this.http.get(url, {
      params: {id: id},
      responseType: 'blob'
    });
  }
}
