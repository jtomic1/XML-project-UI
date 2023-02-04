import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as JsonToXML from 'js2xmlparser';
import { Zahtev } from '../../model/Zahtev';

@Injectable({
  providedIn: 'root',
})
export class PatentService {
  constructor(private http: HttpClient) {}

  sendPatentRequest(data: Zahtev): Observable<any> {
    let url = `${environment.patentUrl}/createPatent`;
    console.log(data.priznanjePravaPrvenstva);
    let arrayXML = JsonToXML.parse(
      'priznavanjePravaPrvenstva',
      data.priznanjePravaPrvenstva
    ).replace('undefined', '');
    arrayXML = arrayXML.substring(21);
    console.log(arrayXML);
    delete data.priznanjePravaPrvenstva;
    let xml = JsonToXML.parse('patent', data);
    xml = xml.substring(0, xml.length - 9);
    xml = xml.concat(arrayXML, '</patent>');
    return this.http.post(url, xml, {
      responseType: 'text',
    });
  }
}
