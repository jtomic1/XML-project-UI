import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ZahtevZaPriznanjeZiga } from '../../models/ZahtevZaPriznanjeZiga';
import { HelpService } from '../help-service/help.service';

@Injectable({
  providedIn: 'root'
})
export class ZigService {

  constructor(
    private http: HttpClient,
    private helpService: HelpService
    ) { }

  save(ZahtevZaPriznanjeZiga: ZahtevZaPriznanjeZiga) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    const url = `${environment.zigServiceUrl}/saveXML`;
    let xml = this.helpService.createXML(ZahtevZaPriznanjeZiga);
    // console.log(xml);
    return this.http.post(url, xml, {headers: headers, responseType: 'text'});
  }
}
